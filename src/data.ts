import { Stat, SkillCategory, Project, ExperienceItem, Certificate, Achievement, PinnedProject } from "./types";

export const ownerInfo = {
  name: "Rajesh",
  title: "AI-Powered Full Stack Developer",
  tagline: "Building Intelligent Solutions with AI, Full-Stack Engineering, and Real-World Impact.",
  avatar: "/src/assets/images/rajesh_avatar_1783955995863.jpg",
  about: `I am an Electronics and Communication Engineering (ECE) student passionate about Artificial Intelligence, Full Stack Development, and Prompt Engineering. I specialize in building intelligent AI platforms, web applications, and data-driven solutions that solve real-world challenges. From developing multimodal generative AI tools to engineering full-stack college management systems and agricultural diagnostic AI, I bring end-to-end technical capabilities across frontend, backend, computer vision, and cloud infrastructure. My long-term goal is to become an AI Engineer crafting transformative software for global impact.`,
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:demigodgamingawn@gmail.com",
    instagram: "https://instagram.com",
    location: "Tamil Nadu, India",
    resume: "#resume-preview"
  }
};

export const stats: Stat[] = [
  {
    id: "projects",
    label: "Featured Projects",
    value: 3,
    suffix: "+",
    iconName: "FolderCode"
  },
  {
    id: "tech",
    label: "Technologies Mastered",
    value: 18,
    suffix: "+",
    iconName: "Cpu"
  },
  {
    id: "certs",
    label: "Certifications & Credentials",
    value: 5,
    suffix: "",
    iconName: "Award"
  },
  {
    id: "hackathons",
    label: "Hackathons & AI Labs",
    value: 4,
    suffix: "+",
    iconName: "Trophy"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Full Stack Development",
    skills: [
      { name: "HTML5 & CSS3", level: 95, iconName: "FileHtml" },
      { name: "JavaScript / TypeScript", level: 92, iconName: "BrandJavascript" },
      { name: "React / Next.js", level: 90, iconName: "ReactIcon" },
      { name: "Node.js & Express.js", level: 88, iconName: "NodeIcon" },
      { name: "Java & Spring Boot", level: 80, iconName: "BrandJava" },
      { name: "SQL, Prisma & Databases", level: 85, iconName: "DatabaseIcon" }
    ]
  },
  {
    category: "AI & Prompt Engineering",
    skills: [
      { name: "Generative AI & LLMs", level: 95, iconName: "SparklesIcon" },
      { name: "Prompt Engineering", level: 96, iconName: "SparklesIcon" },
      { name: "Google AI Studio & Gemini API", level: 94, iconName: "GeminiIcon" },
      { name: "Computer Vision & Image Analysis", level: 85, iconName: "AiStudioIcon" },
      { name: "Voice AI & Tamil Speech", level: 82, iconName: "SparklesIcon" }
    ]
  },
  {
    category: "Networking & Cloud Tech",
    skills: [
      { name: "Cisco Networking Protocols", level: 85, iconName: "Cpu" },
      { name: "Databricks Cloud & Analytics", level: 82, iconName: "DatabaseIcon" },
      { name: "REST APIs & Microservices", level: 90, iconName: "ExpressIcon" },
      { name: "Git & GitHub Version Control", level: 92, iconName: "GithubIcon" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "aura-ai",
    title: "Aura AI",
    label: "01 / AI CREATIVE INTELLIGENCE",
    tagline: "One Intelligence. Infinite Possibilities.",
    category: "AI Platform / Generative AI / Creative Intelligence",
    description: "An AI-powered creative intelligence platform that brings generation, writing, vision, voice, and visual creativity into one unified workspace.",
    overview: "Aura AI serves as an all-in-one generative intelligence suite bringing together text generation, image synthesis, voice interaction, media creation, and multimodal vision understanding into a sleek, personalized AI workspace.",
    problemStatement: "Modern AI tools are fragmented across isolated subscription platforms, forcing users to context-switch between separate chat assistants, image generators, voice bots, and document editors.",
    solution: "Aura AI unifies multiple multimodal AI capabilities into a single cohesive studio interface with centralized search history, user authentication, and persistent workspace states.",
    featurePills: [
      "Aura Create",
      "Aura Canvas",
      "Aura Studio",
      "Aura Write",
      "Aura Voice",
      "Aura Vision"
    ],
    features: [
      "Aura Create — AI-powered content & creative generation",
      "Aura Canvas — Visual creative workspace",
      "Aura Studio — Image, video, and media creation",
      "Aura Write — AI writing assistant",
      "Aura Voice — Voice-based AI interaction",
      "Aura Vision — Image & visual understanding",
      "AI-powered image generation",
      "AI-powered video generation",
      "AI chat and intelligent assistance",
      "Google authentication",
      "User profiles & accounts",
      "Conversation & search history",
      "Personalized AI workspace"
    ],
    techStack: ["AI", "Generative AI", "React", "TypeScript", "Cloud", "Authentication"],
    status: "Active Development",
    isFeatured: true,
    workflow: [
      "User authenticates via Google Account and creates a personalized AI profile.",
      "Selects specialized Aura Workspace module (Aura Create, Canvas, Studio, Write, Voice, Vision).",
      "Submits multimodal prompt or asset to backend AI pipelines.",
      "Aura AI streams real-time responses, renders synthesized visual media, or processes voice queries.",
      "System automatically logs conversation and search history to persistent database storage."
    ],
    challengesSolved: [
      "Engineered low-latency streaming pipelines for unified multimodal AI responses.",
      "Created dynamic state synchronization between visual canvas and LLM context window."
    ],
    futureImprovements: [
      "Multi-user real-time collaborative AI canvas workspaces.",
      "Custom fine-tuned domain models for specialized enterprise workflows."
    ],
    image: "/src/assets/images/resume_analyzer_mockup_1783956047659.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: "smart-leave-management",
    title: "Smart Leave Management",
    label: "02 / FULL-STACK SYSTEM",
    tagline: "From Request to Approval. Completely Digital.",
    category: "Full Stack Web Application / College Management",
    description: "A full-stack college management platform that transforms traditional leave requests into a structured, automated, and paperless approval workflow.",
    overview: "Engineered specifically for educational institutions to eliminate manual paper leave forms and replace them with an automated, role-authenticated digital approval workflow.",
    problemStatement: "Traditional leave approval in colleges relies on physical paper slips, causing delays, loss of records, manual approval bottlenecks, and lack of verifiable reference numbers.",
    solution: "A role-based full-stack web application featuring automated mentor approval routing, auto-generated unique reference numbers, and instant PDF leave letter generation with college branding.",
    featurePills: [
      "Role-Based Authentication",
      "Student Dashboard",
      "Mentor Approval Workflow",
      "Admin Management",
      "PDF Leave Letter Generation",
      "Approval Reference Number"
    ],
    features: [
      "Role-Based Authentication",
      "Student Dashboard",
      "Mentor Approval Workflow",
      "Admin Management",
      "PDF Leave Letter Generation",
      "Approval Reference Number",
      "Department & section management",
      "Leave status tracking",
      "Automatic approval reference number",
      "PDF leave letter download",
      "College logo integration"
    ],
    techStack: ["React", "Node.js", "Prisma", "Database", "REST API", "PDF Generation"],
    status: "Completed / Production Ready",
    isFeatured: false,
    workflow: [
      "STUDENT",
      "APPLY LEAVE",
      "MENTOR REVIEW",
      "APPROVE / REJECT",
      "AUTO-GENERATED PDF LETTER"
    ],
    challengesSolved: [
      "Programmed server-side PDFKit dynamic rendering with college letterheads and watermarks.",
      "Designed robust Prisma ORM schema supporting multi-department hierarchy and mentor assignment."
    ],
    futureImprovements: [
      "Automated SMS/WhatsApp alerts for urgent leave requests.",
      "Biometric attendance integration for auto-reconciliation."
    ],
    image: "/src/assets/images/smart_attendance_mockup_1783956030847.jpg",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: "ai-crop-doctor",
    title: "AI Crop Doctor",
    label: "03 / AI FOR AGRICULTURE",
    tagline: "Technology That Helps Every Farmer.",
    category: "Artificial Intelligence / Agriculture Technology / Computer Vision",
    description: "An AI-powered agricultural assistant that analyzes crop images, detects possible diseases, and provides intelligent treatment recommendations.",
    overview: "An accessible agritech tool empowering farmers to perform immediate diagnostic scans of damaged leaves, receive treatment solutions in Tamil voice or text, and check weather & fertilizer insights.",
    problemStatement: "Rural farmers lack rapid access to agricultural expert diagnostics, suffering severe crop yield loss due to delayed disease identification.",
    solution: "An instant computer-vision diagnostic tool with localized Tamil voice output, offline capabilities, and actionable treatment recommendations.",
    featurePills: [
      "AI Crop Disease Detection",
      "Tamil Voice Support",
      "Offline AI Capability",
      "Weather Prediction",
      "Fertilizer Suggestions"
    ],
    features: [
      "AI Crop Disease Detection",
      "Tamil Voice Support",
      "Offline AI Capability",
      "Weather Prediction",
      "Fertilizer Suggestions",
      "Upload crop or leaf image",
      "Disease identification & confidence scoring",
      "Treatment recommendations",
      "Farmer-friendly AI assistance",
      "Multilingual and accessible UX"
    ],
    techStack: ["Computer Vision", "Generative AI", "Voice AI", "Image Analysis", "Offline AI"],
    status: "AI Innovation Project",
    isFeatured: false,
    workflow: [
      "UPLOAD CROP IMAGE",
      "AI VISION ANALYSIS",
      "DISEASE DETECTION",
      "TREATMENT RECOMMENDATION"
    ],
    challengesSolved: [
      "Implemented client-side image compression and offline prediction caching for low-network rural farms.",
      "Integrated regional Tamil speech synthesis for non-literate agricultural users."
    ],
    futureImprovements: [
      "IoT soil moisture and ambient humidity sensor integration.",
      "Pest identification using live camera video feed."
    ],
    image: "/src/assets/images/crop_doctor_mockup_1783956015297.jpg",
    liveUrl: "#",
    githubUrl: "#"
  }
];

export const experience: ExperienceItem[] = [
  {
    id: "ai-prompt-engineering",
    role: "AI & Prompt Engineering Specialist",
    company: "Self-Driven Learning & Projects",
    duration: "Ongoing",
    description: [
      "Acquired practical knowledge of Artificial Intelligence, Generative AI models, and advanced Prompt Engineering techniques.",
      "Engineered multi-modal applications utilizing Google AI Studio, Gemini API, and custom AI agents.",
      "Applied prompt optimization patterns to streamline structured outputs and zero-shot reasoning."
    ],
    tags: ["Generative AI", "Prompt Engineering", "Gemini API", "AI Agents", "Google AI Studio"]
  },
  {
    id: "full-stack-mastery",
    role: "Full Stack Web Developer",
    company: "Academic & Professional Applications",
    duration: "Ongoing",
    description: [
      "Mastered full stack web technologies including HTML, CSS, JavaScript, React, Node.js, Express, Java, Spring Boot, and SQL databases.",
      "Engineered the Smart Leave Management System with role-based authentication, Prisma ORM, and automated PDFKit letter generation.",
      "Created high-performance REST APIs and responsive UI layouts styled with Tailwind CSS."
    ],
    tags: ["React", "Node.js", "Java", "Spring Boot", "SQL", "Express.js", "Tailwind CSS"]
  },
  {
    id: "cisco-databricks",
    role: "Networking & Cloud Data Contributor",
    company: "Cisco Platforms & Databricks Hackathons",
    duration: "2025 - Present",
    description: [
      "Completed Cisco technical networking modules mastering TCP/IP, subnetting, routing, and network infrastructure.",
      "Participated in Databricks Hackathons building cloud-based AI, data analytics, and intelligent data-driven solution prototypes."
    ],
    tags: ["Cisco Networking", "Databricks", "Cloud Technologies", "Data Analytics", "Hackathons"]
  }
];

export const certificates: Certificate[] = [
  {
    id: "ibm-web-dev",
    title: "IBM Web Development Course",
    issuer: "IBM",
    date: "2025",
    focus: "Web Development, Frontend Technologies, Backend Fundamentals, and Modern Web Technologies.",
    skills: ["HTML5", "CSS3", "JavaScript ES6", "Node.js", "Express", "Deployment"],
    credentialUrl: "https://ibm.com/credentials",
    image: "/src/assets/images/crop_doctor_mockup_1783956015297.jpg"
  },
  {
    id: "cisco-networking",
    title: "Cisco Networking / Technical Learning",
    issuer: "Cisco Networking Academy",
    date: "2025",
    focus: "Relevant networking and technical skills learned through Cisco platforms.",
    skills: ["Networking Protocols", "TCP/IP", "Subnetting", "Network Architecture", "Security Fundamentals"],
    credentialUrl: "https://cisco.com/credentials",
    image: "/src/assets/images/smart_attendance_mockup_1783956030847.jpg"
  },
  {
    id: "databricks-hackathon",
    title: "Databricks Hackathon Participation",
    issuer: "Databricks",
    date: "2025",
    focus: "Highlight experience in AI, Data Analytics, Cloud Technologies, and building intelligent data-driven solutions.",
    skills: ["AI Analytics", "Cloud Technologies", "Databricks Workspace", "Generative AI Data Pipelines"],
    credentialUrl: "https://databricks.com/credentials",
    image: "/src/assets/images/resume_analyzer_mockup_1783956047659.jpg"
  },
  {
    id: "ai-prompt-eng",
    title: "AI & Prompt Engineering Learning",
    issuer: "AI Learning Consortium",
    date: "2025",
    focus: "Practical knowledge of Artificial Intelligence, Generative AI, Prompt Engineering, AI Tools, and AI-powered application development.",
    skills: ["Generative AI", "Prompt Engineering", "AI Tooling", "LLM Fine-tuning", "Google AI Studio"],
    credentialUrl: "https://ai-learning.org/credentials",
    image: "/src/assets/images/crop_doctor_mockup_1783956015297.jpg"
  },
  {
    id: "full-stack-dev",
    title: "Full Stack Development Learning",
    issuer: "Full Stack Academy",
    date: "2025",
    focus: "Knowledge of HTML, CSS, JavaScript, React, Node.js, Java, Spring Boot, SQL, Databases, APIs, and Full Stack Application Development.",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Java", "Spring Boot", "SQL", "APIs"],
    credentialUrl: "https://fullstack.org/credentials",
    image: "/src/assets/images/smart_attendance_mockup_1783956030847.jpg"
  }
];

export const achievements: Achievement[] = [
  {
    id: "ach-ibm",
    title: "IBM Web Development Certification",
    description: "Completed comprehensive IBM training in HTML, CSS, JS, Node.js, and modern full-stack web architectures.",
    iconName: "Award"
  },
  {
    id: "ach-aura-ai",
    title: "Creator of Aura AI Platform",
    description: "Architected Aura AI, a unified multimodal workspace featuring Aura Canvas, Voice, Write, Studio, Create, and Vision.",
    iconName: "Sparkles"
  },
  {
    id: "ach-databricks",
    title: "Databricks AI Hackathon Finalist",
    description: "Built intelligent cloud data analytics solutions utilizing Databricks and generative AI models.",
    iconName: "Trophy"
  },
  {
    id: "ach-cisco",
    title: "Cisco Technical Credentials",
    description: "Mastered core network infrastructure, security protocols, and TCP/IP data transmission layers.",
    iconName: "Cpu"
  }
];

export const pinnedProjects: PinnedProject[] = [
  {
    id: "aura-ai-repo",
    name: "Aura-AI-Platform",
    description: "Unified AI creative workspace integrating LLM assistance, media synthesis, vision, and voice workflows.",
    stars: 42,
    forks: 11,
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://github.com"
  },
  {
    id: "smart-leave-repo",
    name: "Smart-Leave-Management-System",
    description: "Full-stack academic leave approval portal featuring multi-role access, Prisma ORM, and automated PDFKit letter generation.",
    stars: 31,
    forks: 9,
    language: "JavaScript",
    languageColor: "#f1e05a",
    url: "https://github.com"
  },
  {
    id: "crop-doctor-repo",
    name: "AI-Crop-Doctor",
    description: "Computer vision agritech application providing leaf disease diagnosis, Tamil speech synthesis, and offline recommendations.",
    stars: 38,
    forks: 14,
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://github.com"
  }
];
