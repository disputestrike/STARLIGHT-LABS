export type JobPosting = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship" | "Program";
  summary: string;
  responsibilities: string[];
  qualifications: string[];
};

export const JOB_POSTINGS: JobPosting[] = [
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Design, train, and ship ML models and AI-assisted features alongside client squads—production focus, not slide decks.",
    responsibilities: [
      "Own model lifecycle from data readiness through deployment and monitoring",
      "Partner with software engineers on APIs, feature stores, and evaluation",
      "Apply responsible-AI practices for client-regulated environments",
    ],
    qualifications: [
      "Strong Python; experience with modern ML frameworks",
      "Familiarity with cloud ML ops and CI/CD for models",
      "Clear written communication for distributed teams",
    ],
  },
  {
    slug: "ml-engineer-production",
    title: "Machine Learning Engineer (Production)",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Bridge research and operations: ship reliable inference, pipelines, and observability at scale.",
    responsibilities: [
      "Build and maintain inference services, batch pipelines, and monitoring",
      "Optimize latency, cost, and reliability across environments",
      "Collaborate on MLOps and release discipline",
    ],
    qualifications: [
      "Experience serving models in production",
      "Strong software engineering fundamentals",
      "Comfort with containers, orchestration, and observability",
    ],
  },
  {
    slug: "full-stack-engineer",
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "End-to-end delivery across modern web stacks, APIs, and data layers for client products.",
    responsibilities: [
      "Implement features across frontend and backend with clear ownership",
      "Participate in code review, testing, and documentation",
      "Align with delivery leads on scope, risk, and tradeoffs",
    ],
    qualifications: [
      "Strong TypeScript or equivalent; React/Next.js or similar",
      "Solid API and database design instincts",
      "Experience working in agile, remote teams",
    ],
  },
  {
    slug: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Design resilient services, data access patterns, and integration layers for enterprise systems.",
    responsibilities: [
      "Build and maintain APIs, services, and data pipelines",
      "Focus on reliability, security, and performance",
      "Support production incidents and root-cause analysis",
    ],
    qualifications: [
      "Strong experience in one major backend ecosystem",
      "PostgreSQL or similar relational DB expertise",
      "Understanding of auth, rate limiting, and observability",
    ],
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Craft accessible, performant UIs and design systems that scale across client products.",
    responsibilities: [
      "Implement responsive interfaces and client-side architecture",
      "Collaborate with design and QA on quality bars",
      "Improve performance, accessibility, and maintainability",
    ],
    qualifications: [
      "Deep React (or equivalent) and modern CSS",
      "Performance and accessibility mindset",
      "Experience with component libraries and testing",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Platform",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Automate infrastructure, CI/CD, and release pipelines so squads ship safely and often.",
    responsibilities: [
      "Implement IaC, pipelines, and environment strategy",
      "Support observability, incident response, and cost controls",
      "Partner with security on secrets, posture, and compliance baselines",
    ],
    qualifications: [
      "Strong experience with cloud providers and IaC",
      "CI/CD and platform tooling depth",
      "Scripting and troubleshooting under pressure",
    ],
  },
  {
    slug: "site-reliability-engineer",
    title: "Site Reliability Engineer (SRE)",
    department: "Platform",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Own reliability targets, SLIs/SLOs, and operational excellence for critical services.",
    responsibilities: [
      "Define and improve reliability practices and tooling",
      "Lead incident management and blameless postmortems",
      "Drive capacity planning and performance optimization",
    ],
    qualifications: [
      "Production operations experience at scale",
      "Strong metrics and monitoring discipline",
      "Coding ability for automation",
    ],
  },
  {
    slug: "technical-project-manager",
    title: "Technical Project Manager",
    department: "Delivery",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Drive planning, dependencies, and stakeholder alignment for complex engineering programs.",
    responsibilities: [
      "Own schedules, milestones, and risk registers",
      "Facilitate communication between clients and engineering",
      "Ensure scope and quality gates are respected",
    ],
    qualifications: [
      "Technical background with software delivery experience",
      "Strong facilitation and stakeholder management",
      "Comfort with agile and hybrid delivery models",
    ],
  },
  {
    slug: "delivery-manager",
    title: "Delivery Manager",
    department: "Delivery",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Accountable for outcomes across multiple squads: velocity, quality, and client satisfaction.",
    responsibilities: [
      "Lead delivery governance and resource alignment",
      "Remove blockers and escalate issues early",
      "Coach teams on execution and communication",
    ],
    qualifications: [
      "Proven experience managing distributed engineering teams",
      "Metrics-driven mindset with client empathy",
      "Background in professional services or product delivery",
    ],
  },
  {
    slug: "special-projects-lead",
    title: "Special Projects Lead",
    department: "Delivery",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Lead high-ambiguity initiatives: cross-functional workstreams, proofs of concept, and strategic bets.",
    responsibilities: [
      "Structure unclear problems and drive execution",
      "Coordinate across engineering, product, and leadership",
      "Deliver crisp reporting and decision-ready artifacts",
    ],
    qualifications: [
      "Strong technical fluency and executive presence",
      "Comfort operating without a fixed playbook",
      "Experience in fast-moving environments",
    ],
  },
  {
    slug: "solutions-architect",
    title: "Solutions Architect",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Shape technical direction for engagements: architecture, integration, and feasibility.",
    responsibilities: [
      "Lead discovery, solution design, and estimates",
      "Align security, scalability, and cost with client needs",
      "Support sales and delivery with credible technical depth",
    ],
    qualifications: [
      "Broad systems design experience",
      "Excellent written and verbal communication",
      "Client-facing consulting experience preferred",
    ],
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Build reliable data pipelines, warehouses, and governance for analytics and AI workloads.",
    responsibilities: [
      "Design ingestion, transformation, and quality frameworks",
      "Partner with analytics and ML on contracts and SLAs",
      "Implement observability and cost-aware processing",
    ],
    qualifications: [
      "Strong SQL and pipeline tooling",
      "Experience with cloud data platforms",
      "Understanding of privacy and compliance considerations",
    ],
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Engineering",
    location: "Remote · Global",
    type: "Full-time",
    summary:
      "Raise quality through automated testing, tooling, and release discipline.",
    responsibilities: [
      "Design and maintain test suites across the stack",
      "Integrate tests into CI/CD and quality gates",
      "Partner with developers on testability and defect prevention",
    ],
    qualifications: [
      "Strong automation framework experience",
      "API and UI testing depth",
      "Analytical mindset and attention to detail",
    ],
  },
  {
    slug: "college-intern-engineering",
    title: "College Intern — Engineering",
    department: "Talent",
    location: "Hybrid · Program",
    type: "Internship",
    summary:
      "Structured summer or semester program for students pursuing CS, CE, or related fields.",
    responsibilities: [
      "Contribute to real projects with mentorship",
      "Participate in code review, learning sessions, and demos",
      "Present outcomes to peers and mentors",
    ],
    qualifications: [
      "Enrolled in an accredited degree program",
      "Foundational programming and problem-solving skills",
      "Authorization to work per program rules (varies by region)",
    ],
  },
  {
    slug: "career-day-campus",
    title: "Career Day & Campus Programs",
    department: "Talent",
    location: "Events · Global",
    type: "Program",
    summary:
      "Partner with universities and communities for career days, panels, and recruiting events—not a single role; we maintain a pipeline for expressions of interest.",
    responsibilities: [
      "Represent Starlight Labs at scheduled events",
      "Engage students and share our delivery model",
      "Collect interest and route to recruiting",
    ],
    qualifications: [
      "Strong communication and professionalism",
      "Passion for technology careers and mentorship",
      "Availability aligned to published event calendar",
    ],
  },
];

export function getJobBySlug(slug: string): JobPosting | undefined {
  return JOB_POSTINGS.find((j) => j.slug === slug);
}

export function getAllJobSlugs(): string[] {
  return JOB_POSTINGS.map((j) => j.slug);
}
