import nodemailer from "nodemailer";

// In-memory rate limiting map for serverless execution instance
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function isRateLimited(ip: string, limit = 5, windowMs = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (record.count >= limit) {
    return true;
  }

  record.count += 1;
  return false;
}

export default async function handler(req: any, res: any) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method Not Allowed. Only POST transmissions are accepted at this gateway."
    });
  }

  // Rate Limiting Check based on client IP
  const clientIp = (req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "127.0.0.1").toString().split(",")[0].trim();
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      error: "Rate limit exceeded. Too many messages sent from this IP. Please wait 15 minutes before trying again."
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { name, email, subject, message, honeypot } = body;

    // 1. Honeypot check for spam protection
    if (honeypot && String(honeypot).trim() !== "") {
      return res.status(200).json({
        success: true,
        message: "Thank you for reaching out! Your message has been sent successfully."
      });
    }

    // 2. Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: Full Name, Email Address, Subject, and Message are mandatory."
      });
    }

    // 3. Input sanitization & trim
    const cleanName = String(name).trim().replace(/<[^>]*>?/gm, "");
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanSubject = String(subject || "Portfolio Contact Inquiry").trim().replace(/<[^>]*>?/gm, "");
    const cleanMessage = String(message).trim().replace(/<[^>]*>?/gm, "");

    // 4. Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        error: "Invalid email address format. Please provide a valid email."
      });
    }

    // Prevent header injection attack in subject or name
    if (/[\r\n]/.test(cleanName) || /[\r\n]/.test(cleanEmail) || /[\r\n]/.test(cleanSubject)) {
      return res.status(400).json({
        success: false,
        error: "Malformed characters detected in inputs."
      });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || process.env.EMAIL_USER || "demigodgamingawn@gmail.com";
    const submissionDate = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
      timeZone: "Asia/Kolkata"
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; border: 1px solid #1e293b;">
        <h2 style="color: #38bdf8; border-bottom: 2px solid #38bdf8; padding-bottom: 8px;">New Contact Transmission from Portfolio</h2>
        <p style="margin-top: 16px;">You received a new inquiry through your personal portfolio website.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; width: 140px; font-weight: bold;">Sender Name:</td>
            <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${cleanName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Sender Email:</td>
            <td style="padding: 8px 0; color: #38bdf8;"><a href="mailto:${cleanEmail}" style="color: #38bdf8;">${cleanEmail}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Subject:</td>
            <td style="padding: 8px 0; color: #ffffff;">${cleanSubject}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #94a3b8; font-weight: bold;">Timestamp:</td>
            <td style="padding: 8px 0; color: #cbd5e1; font-size: 13px;">${submissionDate}</td>
          </tr>
        </table>

        <div style="margin-top: 20px; background-color: #1e293b; padding: 16px; border-radius: 8px; border-left: 4px solid #38bdf8;">
          <h4 style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message Content:</h4>
          <p style="margin: 0; white-space: pre-wrap; color: #f1f5f9; font-size: 14px; line-height: 1.6;">${cleanMessage}</p>
        </div>

        <p style="margin-top: 24px; font-size: 12px; color: #64748b; text-align: center;">
          Sent automatically via Rajesh Portfolio Contact Service
        </p>
      </div>
    `;

    const emailText = `
New Contact Transmission from Portfolio
=======================================
Sender Name: ${cleanName}
Sender Email: ${cleanEmail}
Subject: ${cleanSubject}
Timestamp: ${submissionDate}

Message Content:
----------------
${cleanMessage}
    `;

    // 5. Send via Nodemailer if credentials are configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });

      await transporter.sendMail({
        from: `"${cleanName} via Portfolio" <${process.env.EMAIL_USER}>`,
        to: receiverEmail,
        replyTo: cleanEmail,
        subject: `[Portfolio Inquiry] ${cleanSubject}`,
        text: emailText,
        html: emailHtml
      });

      console.log(`[Contact API] Email successfully routed via Nodemailer to ${receiverEmail}`);
    } else {
      console.log(`[Contact API - Preview Mode] Form transmission received for ${receiverEmail}:`, {
        from: `${cleanName} <${cleanEmail}>`,
        subject: cleanSubject,
        message: cleanMessage
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully."
    });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "An unexpected error occurred while attempting email transmission. Please try again later."
    });
  }
}
