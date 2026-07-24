import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory rate limiting for security
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const rateLimiter = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown-ip";
  const now = Date.now();

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    res.status(429).json({
      success: false,
      error: "Too many contact transmissions from this IP. Please wait 15 minutes before retrying."
    });
    return;
  }

  record.count += 1;
  next();
};

// Health Check API
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "Rajesh Portfolio API", timestamp: new Date().toISOString() });
});

// Secure Contact API Endpoint
app.post("/api/contact", rateLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, honeypot } = req.body || {};

    // 1. Honeypot check for spam protection
    if (honeypot && String(honeypot).trim() !== "") {
      // Quietly reject bot submission
      return res.status(200).json({
        success: true,
        message: "Thank you for reaching out! Your message has been sent successfully."
      });
    }

    // 2. Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required sectors: Full Name, Email Address, and Message are mandatory."
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
          Sent automatically via Rajesh AI Portfolio Contact Service
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

    // 5. Send via Nodemailer if credentials are explicitly configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      try {
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
      } catch (mailError: any) {
        console.error("[Contact API Mailer Error]: Failed to deliver email via SMTP:", mailError?.message || mailError);
        
        if (
          mailError?.code === "EAUTH" ||
          mailError?.response?.includes("534") ||
          String(mailError?.message).includes("Application-specific password required") ||
          String(mailError?.message).includes("Invalid login")
        ) {
          console.warn("[Contact API Setup Note]: Gmail requires a 16-character App Password when 2FA is enabled on your Google Account. Visit https://myaccount.google.com/apppasswords to create one and set it as EMAIL_PASSWORD in environment variables.");
        }

        // Save fallback log so message details are never lost
        console.log(`[Contact API - Saved Backup Log] Transmission from ${cleanName} <${cleanEmail}> to ${receiverEmail}:`);
        console.log(`Subject: ${cleanSubject}`);
        console.log(`Message:\n${cleanMessage}`);
      }
    } else {
      // In development/preview mode where EMAIL_USER/EMAIL_PASSWORD is not set, simulate transmission output
      console.log(`[Contact API - Preview Mode] Form transmission received for ${receiverEmail}:`);
      console.log(`From: ${cleanName} <${cleanEmail}>`);
      console.log(`Subject: ${cleanSubject}`);
      console.log(`Message: ${cleanMessage}`);
    }

    return res.status(200).json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully."
    });
  } catch (error: any) {
    console.error("[Contact API Error]:", error);
    return res.status(500).json({
      success: false,
      error: "An unexpected system error occurred while attempting email transmission. Please try again later."
    });
  }
});

// Serve frontend in dev (via Vite middleware) or prod (via dist build)
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
