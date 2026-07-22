import { Stat, SkillCategory, Project, ExperienceItem, Certificate, Achievement, PinnedProject } from "./types";

export const ownerInfo = {
  name: "Rajesh",
  title: "AI-Powered Full Stack Developer",
  tagline: "Building Intelligent Solutions with AI and Modern Web Technologies.",
  avatar: "/src/assets/images/rajesh_avatar_1783955995863.jpg",
  about: `I am an Electronics and Communication Engineering (ECE) student passionate about Artificial Intelligence, Full Stack Development, and Prompt Engineering. I enjoy creating AI-powered applications that solve real-world problems and improve people's daily lives. I continuously learn new technologies, build innovative projects, and participate in hackathons to enhance my skills. My long-term goal is to become an AI Engineer and build impactful products that benefit society.`,
  socials: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    email: "mailto:patutammu0315@gmail.com",
    location: "Tamil Nadu, India",
    resume: "#resume-preview"
  }
};

export const stats: Stat[] = [
  {
    id: "projects",
    label: "Projects Completed",
    value: 12,
    suffix: "+",
    iconName: "FolderCode"
  },
  {
    id: "tech",
    label: "Technologies Learned",
    value: 15,
    suffix: "+",
    iconName: "Cpu"
  },
  {
    id: "certs",
    label: "Certificates Earned",
    value: 8,
    suffix: "+",
    iconName: "Award"
  },
  {
    id: "hackathons",
    label: "Hackathons Participated",
    value: 5,
    suffix: "+",
    iconName: "Trophy"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "HTML", level: 95, iconName: "FileHtml" },
      { name: "CSS", level: 90, iconName: "FileCss" },
      { name: "JavaScript", level: 88, iconName: "BrandJavascript" },
      { name: "Python", level: 85, iconName: "BrandPython" },
      { name: "C", level: 80, iconName: "LetterC" },
      { name: "Java", level: 75, iconName: "BrandJava" }
    ]
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90, iconName: "ReactIcon" },
      { name: "Tailwind CSS", level: 95, iconName: "TailwindIcon" }
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 82, iconName: "NodeIcon" },
      { name: "Express.js", level: 85, iconName: "ExpressIcon" }
    ]
  },
  {
    category: "Database",
    skills: [
      { name: "MySQL", level: 80, iconName: "DatabaseIcon" },
      { name: "MongoDB", level: 78, iconName: "MongoIcon" }
    ]
  },
  {
    category: "AI & Tools",
    skills: [
      { name: "Prompt Engineering", level: 95, iconName: "SparklesIcon" },
      { name: "Google AI Studio", level: 90, iconName: "AiStudioIcon" },
      { name: "Gemini API", level: 92, iconName: "GeminiIcon" },
      { name: "OpenAI API", level: 85, iconName: "OpenAiIcon" },
      { name: "Git", level: 88, iconName: "GitIcon" },
      { name: "GitHub", level: 90, iconName: "GithubIcon" },
      { name: "VS Code", level: 95, iconName: "VsCodeIcon" },
      { name: "Canva", level: 85, iconName: "CanvaIcon" },
      { name: "Figma", level: 80, iconName: "FigmaIcon" }
    ]
  },
  {
    category: "Deployment",
    skills: [
      { name: "Vercel", level: 90, iconName: "VercelIcon" },
      { name: "Netlify", level: 85, iconName: "NetlifyIcon" }
    ]
  }
];

export const projects: Project[] = [
  {
    id: "crop-doctor",
    title: "AI Crop Doctor",
    description: "An AI-powered web application that helps farmers identify crop diseases using leaf images. The system provides disease detection, treatment suggestions, and farming recommendations.",
    features: [
      "AI Disease Detection",
      "Image Upload",
      "Treatment Suggestions",
      "Farmer-Friendly UI",
      "Future Weather Integration",
      "Tamil Language Support"
    ],
    techStack: ["React", "Node.js", "Gemini AI", "Supabase"],
    image: "/src/assets/images/crop_doctor_mockup_1783956015297.jpg"
  },
  {
    id: "portfolio",
    title: "Personal Portfolio",
    description: "A premium responsive portfolio showcasing my projects, technical skills, achievements, and AI journey.",
    features: [
      "Modern UI",
      "Responsive Design",
      "Dark Theme",
      "Smooth Animations",
      "Interactive Sections"
    ],
    techStack: ["React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    image: "/src/assets/images/crop_doctor_mockup_1783956015297.jpg" // We can use the same or a generated one, we will styled this with CSS gradients or canvas placeholder as it represents the portfolio itself
  },
  {
    id: "smart-attendance",
    title: "Smart Attendance System",
    description: "AI-powered attendance management using face recognition and QR code backup.",
    features: [
      "Face Recognition",
      "Attendance Dashboard",
      "Analytics",
      "QR Backup"
    ],
    techStack: ["Python", "OpenCV", "React", "Flask", "MongoDB"],
    image: "/src/assets/images/smart_attendance_mockup_1783956030847.jpg"
  },
  {
    id: "resume-analyzer",
    title: "AI Resume Analyzer",
    description: "Upload a resume and receive AI-powered feedback, ATS score, and personalized improvement suggestions.",
    features: [
      "Resume Upload",
      "ATS Analysis",
      "Skill Gap Detection",
      "Improvement Suggestions"
    ],
    techStack: ["React", "Express", "Gemini API", "PDF-Parse"],
    image: "/src/assets/images/resume_analyzer_mockup_1783956047659.jpg"
  }
];

export const experience: ExperienceItem[] = [
  {
    id: "learning-ai",
    role: "AI & Prompt Engineering",
    company: "Self-Driven Learning",
    duration: "Ongoing",
    description: [
      "Mastering LLM utilization, crafting efficient prompt templates, and structuring multi-shot agentic workflows.",
      "Developing applications integrated with Google AI Studio and Gemini API for natural language and image processing tasks.",
      "Exploring zero-shot, few-shot, and Chain-of-Thought reasoning to optimize system performance."
    ],
    tags: ["Gemini API", "Google AI Studio", "Prompt Engineering", "Agents"]
  },
  {
    id: "full-stack-dev",
    role: "Full Stack Web Development",
    company: "Academic & Personal Projects",
    duration: "Ongoing",
    description: [
      "Building responsive user interfaces with modern React, Tailwind CSS, and Framer Motion.",
      "Creating backend APIs using Node.js, Express.js, and implementing database persistence with MySQL and MongoDB.",
      "Participating in coding hackathons and technical bootcamps to construct practical MVP applications."
    ],
    tags: ["React", "Node.js", "Express", "MongoDB", "MySQL", "Tailwind CSS"]
  },
  {
    id: "open-source",
    role: "Open Source Contributor & Learner",
    company: "GitHub Community",
    duration: "Ongoing",
    description: [
      "Publishing personal utility systems, templates, and hackathon prototypes to public repositories.",
      "Collaborating with developer communities, learning standard code review flows, and practicing version control with Git."
    ],
    tags: ["Git", "GitHub", "Open Source", "Collaboration"]
  }
];

export const certificates: Certificate[] = [
  {
    id: "ibm-web-dev",
    title: "IBM Web Development Certificate",
    issuer: "IBM",
    date: "2025",
    credentialUrl: "#",
    image: "/assets/ibm_web_dev.png"
  },
  {
    id: "databricks-hack",
    title: "Databricks Hackathon Participation",
    issuer: "Databricks",
    date: "2025",
    credentialUrl: "#",
    image: "/assets/databricks_hack.png"
  },
  {
    id: "future-ai",
    title: "Future AI Certifications",
    issuer: "AI Certification Consortium",
    date: "In Progress",
    credentialUrl: "#",
    image: "/assets/future_ai_cert.png"
  }
];

export const achievements: Achievement[] = [
  {
    id: "ach-ibm",
    title: "IBM Web Development Course Completed",
    description: "Successfully mastered HTML5, CSS3, JavaScript ES6, Node.js, and server-side deployment methodologies.",
    iconName: "Award"
  },
  {
    id: "ach-ai",
    title: "Built AI-Powered Solutions",
    description: "Designed, engineered, and deployed multiple deep-tech applications leveraging the Gemini Pro models and advanced prompting.",
    iconName: "Sparkles"
  },
  {
    id: "ach-hack",
    title: "Participated in Hackathons",
    description: "Collaborated under intense time constraints to pitch and build fully functional MVPs solving pressing environmental and administrative issues.",
    iconName: "Trophy"
  },
  {
    id: "ach-learn",
    title: "Continuous Learning in AI & Full Stack",
    description: "Committed to learning daily: exploring state-of-the-art vector stores, RAG frameworks, and next-generation UI layouts.",
    iconName: "TrendingUp"
  }
];

export const pinnedProjects: PinnedProject[] = [
  {
    id: "crop-doctor-repo",
    name: "AI-Crop-Doctor",
    description: "Tensor-powered agricultural diagnostic app utilizing LLMs to identify crop diseases instantly. High-fidelity Tamil support.",
    stars: 28,
    forks: 7,
    language: "TypeScript",
    languageColor: "#3178c6",
    url: "https://github.com"
  },
  {
    id: "resume-analyzer-repo",
    name: "AI-Resume-Analyzer",
    description: "Automated ATS scanning and scoring platform built for job seekers. Integrates Gemini API for precision feedback.",
    stars: 19,
    forks: 3,
    language: "JavaScript",
    languageColor: "#f1e05a",
    url: "https://github.com"
  },
  {
    id: "smart-attendance-repo",
    name: "smart-attendance-facial",
    description: "Face recognition attendance system with live status web portal, analytical charting, and dynamic backup QR codes.",
    stars: 34,
    forks: 12,
    language: "Python",
    languageColor: "#3572A5",
    url: "https://github.com"
  }
];
