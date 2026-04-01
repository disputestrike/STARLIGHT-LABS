/**
 * Compensation bands reflect typical gross annual pay for experienced hires in the Nigerian
 * technology and IT services market (Lagos / major hubs, 2025–2026), not US/EU salaries converted to ₦.
 */
export type JobPosting = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship" | "Program";
  /** Indicative local range in Naira — not an offer; depends on level, interview, and budget. */
  compensationNgn: string;
  summary: string;
  responsibilities: string[];
  /** Required / minimum bar */
  qualifications: string[];
  /** Nice-to-have — used for shortlisting */
  preferredQualifications?: string[];
};

export const JOB_POSTINGS: JobPosting[] = [
  {
    slug: "ai-ml-engineer",
    title: "AI / ML Engineer",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote (global clients)",
    type: "Full-time",
    compensationNgn:
      "₦5,500,000 – ₦9,500,000 / year gross (typical senior IC band, Lagos IT services market)",
    summary:
      "Own model development and production integration for client programs: from problem framing and datasets to evaluation, deployment, and monitoring—with clear documentation for regulated environments.",
    responsibilities: [
      "Partner with product and client stakeholders to translate business outcomes into measurable ML objectives and evaluation metrics",
      "Design and run experiments; document methodology, limitations, and failure modes for peer and client review",
      "Build and maintain training and inference pipelines with versioning, reproducibility, and cost awareness",
      "Collaborate with backend and data engineers on feature stores, batch/stream scoring, and API contracts",
      "Implement monitoring for drift, data quality, and model performance; participate in incident review",
      "Apply privacy, security, and ethics considerations appropriate to the client’s sector (e.g. financial services, health)",
      "Contribute to code review, shared libraries, and internal playbooks for responsible AI delivery",
    ],
    qualifications: [
      "Bachelor’s degree in Computer Science, Engineering, Mathematics, Statistics, or equivalent practical experience",
      "4+ years of professional software engineering experience, including 2+ years hands-on ML or applied AI",
      "Strong Python; proficiency with at least one major ML framework (e.g. PyTorch, TensorFlow, scikit-learn stack)",
      "Experience with data preparation, feature engineering, and offline/online evaluation—not only notebook prototypes",
      "Familiarity with cloud ML workflows (training jobs, object storage, secrets) on at least one major provider",
      "Solid written English for design notes, runbooks, and client-facing summaries",
      "Ability to work with distributed teams and overlapping time zones with clients",
    ],
    preferredQualifications: [
      "M.Sc. or Ph.D. in a quantitative field, or published work in relevant venues",
      "Experience with LLM/RAG pipelines, vector stores, or agentic workflows in production constraints",
      "Exposure to regulated industries and model risk or validation expectations",
      "Contributions to open source, internal platforms, or reusable MLOps tooling",
    ],
  },
  {
    slug: "ml-engineer-production",
    title: "Machine Learning Engineer (Production)",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦5,000,000 – ₦8,500,000 / year gross (Lagos benchmark)",
    summary:
      "Bridge data science and platform engineering: ship reliable inference, batch pipelines, observability, and release discipline so models stay healthy after launch day.",
    responsibilities: [
      "Design and operate inference services (latency, autoscaling, cold start, cost) aligned with SLOs",
      "Build and maintain batch and streaming scoring pipelines with idempotency and backfill strategies",
      "Partner with ML scientists on packaging models, artifacts, and metadata for reproducible deploys",
      "Instrument services for logging, tracing, and metrics; define alerts tied to business impact",
      "Drive canary/blue-green or shadow deployments for model updates with rollback plans",
      "Collaborate on capacity planning, FinOps for GPU/CPU, and incident response for production AI systems",
      "Document runbooks, on-call expectations, and handover for client or internal operations teams",
    ],
    qualifications: [
      "Bachelor’s degree in CS, Engineering, or equivalent; 3+ years in software engineering with 1+ year serving ML in production",
      "Strong Python; experience with containers (Docker) and orchestration (Kubernetes or managed equivalents)",
      "Understanding of REST/gRPC APIs, message queues, and at least one major cloud provider’s ML/serving stack",
      "Hands-on debugging of production issues (latency spikes, memory, dependency failures)",
      "Familiarity with CI/CD, infrastructure-as-code, and secrets management",
      "Comfortable reading model artifacts and collaborating on evaluation metrics with data scientists",
    ],
    preferredQualifications: [
      "Experience with feature stores, model registries, or experiment tracking at scale",
      "Background in SRE or platform engineering with service-level ownership",
      "GPU workload optimization or cost profiling experience",
    ],
  },
  {
    slug: "full-stack-engineer",
    title: "Full Stack Engineer",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦3,600,000 – ₦6,500,000 / year gross (mid-level band; senior hires discussed separately)",
    summary:
      "Deliver end-to-end features across modern web frontends, APIs, and persistence layers for client products— with tests, observability, and clear ownership in agile squads.",
    responsibilities: [
      "Implement user-facing features and APIs from agreed specifications and design systems",
      "Write and maintain automated tests (unit, integration, e2e where appropriate) to protect regressions",
      "Participate in backlog refinement, estimation, and risk callouts early",
      "Perform code review with constructive feedback; uphold security and performance baselines",
      "Collaborate with UX, QA, and DevOps on accessibility, release readiness, and rollout plans",
      "Triage production defects, contribute to root-cause analysis, and improve observability",
      "Document APIs, environment setup, and deployment steps for handover and audits",
    ],
    qualifications: [
      "Bachelor’s degree in CS, Software Engineering, or related field, or demonstrable equivalent experience",
      "3+ years of professional full-stack or strong frontend+backend combined experience",
      "Proficiency in TypeScript/JavaScript and at least one modern frontend framework (React/Next.js strongly preferred)",
      "Solid experience building REST (or GraphQL) APIs and working with relational databases (PostgreSQL or similar)",
      "Understanding of authentication, authorization, and secure handling of sessions/tokens",
      "Experience with Git, code review, and agile ceremonies in a team environment",
      "Strong problem-solving skills and clear written communication in English",
    ],
    preferredQualifications: [
      "Experience with Next.js App Router, server components, and edge/runtime constraints",
      "Familiarity with Prisma, Drizzle, or similar ORM/query layers",
      "Exposure to design systems, Storybook, or component-driven development",
      "Prior client-facing or consulting delivery experience",
    ],
  },
  {
    slug: "backend-engineer",
    title: "Backend Engineer",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦3,800,000 – ₦6,800,000 / year gross",
    summary:
      "Design and build resilient services, data access layers, and integrations for enterprise workloads—with emphasis on correctness, performance, and operability.",
    responsibilities: [
      "Implement domain logic, APIs, and integration adapters with clear contracts and error handling",
      "Model schemas, migrations, and query patterns for performance and data integrity",
      "Implement caching, rate limiting, and backoff strategies where appropriate",
      "Work with security requirements: secrets rotation, least-privilege DB access, audit trails",
      "Support on-call rotation for owned services; improve dashboards and alerts over time",
      "Profile and optimize hot paths; document tradeoffs for reviewers and clients",
      "Coordinate with frontend, mobile, and partner teams on versioning and compatibility",
    ],
    qualifications: [
      "Bachelor’s degree in CS or equivalent; 3+ years backend-focused development",
      "Strong proficiency in at least one backend stack (Node.js/TypeScript, Java, Go, .NET, or similar)",
      "Deep SQL skills and experience with PostgreSQL or equivalent relational databases",
      "Understanding of distributed systems basics: idempotency, retries, eventual consistency, messaging",
      "Experience building and consuming REST APIs; familiarity with OpenAPI/Swagger is a plus",
      "Comfortable with Linux environments, logging, metrics, and basic networking concepts",
    ],
    preferredQualifications: [
      "Event-driven architectures (Kafka, RabbitMQ, SNS/SQS, etc.)",
      "Multi-tenant SaaS or B2B integration patterns",
      "Financial services, health, or other regulated-domain experience",
    ],
  },
  {
    slug: "frontend-engineer",
    title: "Frontend Engineer",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦3,400,000 – ₦6,000,000 / year gross",
    summary:
      "Build accessible, performant user interfaces and shared component libraries—aligned with design systems and quality bars expected by enterprise clients.",
    responsibilities: [
      "Implement responsive UIs from Figma or design specs with attention to spacing, typography, and states",
      "Improve performance (Core Web Vitals, bundle size, lazy loading) and fix accessibility issues",
      "Write tests (unit, component, e2e) appropriate to risk and user impact",
      "Collaborate with designers on feasibility, tokens, and edge cases",
      "Integrate with APIs and handle loading, error, and empty states consistently",
      "Participate in design reviews and contribute to shared UI patterns",
      "Document component APIs and usage for other engineers",
    ],
    qualifications: [
      "Bachelor’s degree or equivalent; 2+ years professional frontend development",
      "Strong React (or equivalent) with TypeScript in production codebases",
      "Solid HTML/CSS skills including layout (Flex/Grid), responsive design, and semantic markup",
      "Understanding of WCAG-oriented practices and keyboard/screen-reader basics",
      "Experience with state management (React Query, Zustand, Redux, or similar) as appropriate",
      "Familiarity with build tooling (Vite, Webpack, Next.js) and environment-based configuration",
    ],
    preferredQualifications: [
      "Next.js SSR/SSG/ISR experience and familiarity with caching semantics",
      "Design systems (Tailwind, Radix, Chakra, Material) at scale",
      "Internationalization and localization patterns",
    ],
  },
  {
    slug: "devops-engineer",
    title: "DevOps Engineer",
    department: "Platform",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦4,500,000 – ₦7,800,000 / year gross",
    summary:
      "Automate infrastructure, CI/CD, and release pipelines so squads ship safely— with guardrails, observability, and cost-aware cloud operations.",
    responsibilities: [
      "Maintain and evolve CI/CD pipelines for multiple services and environments",
      "Implement infrastructure as code (Terraform, Pulumi, CloudFormation, or Bicep) with reviewable changes",
      "Standardize observability: centralized logging, metrics, tracing, and actionable dashboards",
      "Partner with security on image scanning, secrets management, and least-privilege IAM",
      "Support environment provisioning, drift detection, and disaster-recovery exercises",
      "Optimize cloud spend through rightsizing, reservations, and tagging discipline",
      "Document platform standards and train squads on self-service patterns",
    ],
    qualifications: [
      "3+ years in DevOps, SRE, or platform engineering roles",
      "Hands-on experience with at least one major cloud (AWS, Azure, or GCP)",
      "Strong scripting (Bash, Python, or similar) and Git-based workflows",
      "Experience with containerization and Kubernetes or managed container services",
      "Understanding of networking (VPC, DNS, TLS, load balancing) in cloud contexts",
      "Exposure to policy-as-code or config validation for safer rollouts",
    ],
    preferredQualifications: [
      "Certifications from cloud providers (associate level or higher)",
      "Experience with GitOps (Argo CD, Flux) or progressive delivery",
      "Windows/Linux hybrid estates or regulated-sector constraints",
    ],
  },
  {
    slug: "site-reliability-engineer",
    title: "Site Reliability Engineer (SRE)",
    department: "Platform",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦5,000,000 – ₦8,500,000 / year gross",
    summary:
      "Own reliability targets, error budgets, and incident lifecycle for critical services—balancing velocity with sustainable operations.",
    responsibilities: [
      "Define SLIs/SLOs with product and engineering; track error budgets and governance",
      "Lead incident response, communication, and blameless postmortems with action tracking",
      "Improve detection and reduction of toil through automation and self-healing where safe",
      "Drive capacity planning, load testing, and failover drills",
      "Collaborate with DevOps on runbooks, dashboards, and paging policies",
      "Participate in architecture reviews from a reliability and operability lens",
      "Mentor developers on production readiness checklists and operational excellence",
    ],
    qualifications: [
      "4+ years in production engineering, SRE, or equivalent operations-heavy software role",
      "Strong coding ability (Python, Go, or similar) for automation—not only tickets",
      "Deep experience with monitoring stacks (Prometheus, Grafana, Datadog, New Relic, or similar)",
      "Proven incident leadership and structured problem solving under pressure",
      "Understanding of distributed systems failure modes and mitigation patterns",
    ],
    preferredQualifications: [
      "SRE book methodology (error budgets, toil budgets) applied in practice",
      "Multi-region or multi-cloud resilience patterns",
      "Customer-facing SaaS at scale",
    ],
  },
  {
    slug: "technical-project-manager",
    title: "Technical Project Manager",
    department: "Delivery",
    location: "Lagos · Nigeria · Hybrid / client travel as needed",
    type: "Full-time",
    compensationNgn: "₦4,500,000 – ₦7,500,000 / year gross",
    summary:
      "Plan and steer complex engineering programs: dependencies, risks, stakeholder communication, and delivery governance—without substituting for engineering judgment.",
    responsibilities: [
      "Build and maintain integrated schedules, critical paths, and dependency maps",
      "Facilitate agile ceremonies and cross-team syncs; surface blockers early",
      "Manage RAID logs (risks, assumptions, issues, dependencies) with owners and dates",
      "Coordinate releases, environment promotions, and change windows with clients",
      "Translate technical status into executive-ready summaries and dashboards",
      "Support scope change control: impact analysis, options, and decision records",
      "Ensure documentation and audit artifacts meet client procurement and compliance needs",
    ],
    qualifications: [
      "Bachelor’s degree; 4+ years in technical project or program management for software delivery",
      "Demonstrable understanding of SDLC, testing phases, and deployment pipelines",
      "Strong facilitation, conflict resolution, and stakeholder management skills",
      "Proficiency with Jira, Azure DevOps, or similar; comfortable reading burndowns and velocity trends",
      "Excellent English verbal and written communication",
      "Willingness to align with client working hours for critical meetings when required",
    ],
    preferredQualifications: [
      "PMP, PRINCE2, Scrum Master (CSM), or SAFe credentials",
      "Experience with fixed-price and T&M commercial models",
      "Domain experience in financial services, telecom, or public sector",
    ],
  },
  {
    slug: "delivery-manager",
    title: "Delivery Manager",
    department: "Delivery",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦6,000,000 – ₦10,500,000 / year gross",
    summary:
      "Accountable for outcomes across multiple squads: utilization, quality, client satisfaction, and team health—within commercial and contractual guardrails.",
    responsibilities: [
      "Own delivery governance for assigned accounts or portfolios: forecasts, staffing, and escalations",
      "Partner with sales and engineering leadership on scope, change requests, and risk",
      "Coach squad leads on execution, communication, and quality expectations",
      "Monitor KPIs: velocity, defect trends, CSAT, and financial burn vs plan",
      "Drive resource planning with talent operations; flag bench and skill gaps",
      "Represent Starlight in executive client forums with credibility and honesty",
      "Foster psychological safety while maintaining accountability for commitments",
    ],
    qualifications: [
      "7+ years in professional services, consulting, or product engineering organizations",
      "3+ years people or delivery leadership for distributed engineering teams",
      "Strong grasp of software delivery metrics and how they connect to P&L",
      "Experience with enterprise clients, statements of work, and governance cadences",
      "Proven ability to navigate conflict and negotiate tradeoffs with clients and internal teams",
    ],
    preferredQualifications: [
      "MBA or advanced degree in a relevant field",
      "Experience scaling delivery organizations or GCC-style setups",
      "Exposure to Africa/Europe/US client overlap and follow-the-sun models",
    ],
  },
  {
    slug: "special-projects-lead",
    title: "Special Projects Lead",
    department: "Delivery",
    location: "Lagos · Nigeria · Hybrid",
    type: "Full-time",
    compensationNgn: "₦8,000,000 – ₦13,000,000 / year gross (principal band)",
    summary:
      "Lead high-ambiguity initiatives: proofs of concept, transformation workstreams, and executive-sponsored programs where the playbook is still being written.",
    responsibilities: [
      "Frame problems crisply; align sponsors on success criteria and non-goals",
      "Assemble cross-functional teams and remove organizational blockers",
      "Drive weekly executive-ready reporting: decisions needed, risks, and options",
      "Oversee vendor or partner coordination when multiple parties are involved",
      "Ensure technical and commercial guardrails are respected (security, compliance, margin)",
      "Transition stable outcomes into line operations or BAU teams with clean handover",
    ],
    qualifications: [
      "10+ years total experience including significant time in consulting or senior delivery leadership",
      "Demonstrated success owning ambiguous initiatives end-to-end",
      "Strong technical literacy across cloud, data, and application layers",
      "Executive presence and ability to facilitate C-level conversations",
      "Willingness to travel domestically and occasionally internationally",
    ],
    preferredQualifications: [
      "Prior Big-4, global systems integrator, or top-tier product company background",
      "Experience with M&A integrations, carve-outs, or large-scale migrations",
    ],
  },
  {
    slug: "solutions-architect",
    title: "Solutions Architect",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦7,500,000 – ₦12,000,000 / year gross",
    summary:
      "Shape solution design for pursuits and engagements: feasibility, integration, security, cost, and phased roadmaps that clients can defend internally.",
    responsibilities: [
      "Lead discovery workshops; capture requirements, constraints, and success measures",
      "Produce architecture views (context, component, deployment) appropriate to audience",
      "Define integration patterns, API boundaries, and data flows across systems",
      "Support estimates and staffing models with engineering leads",
      "Present to client architecture and security forums; respond to RFP/RFI technical sections",
      "Identify reusable assets and accelerators to improve win rates and delivery speed",
      "Stay current on cloud-native, data, and security patterns relevant to target industries",
    ],
    qualifications: [
      "8+ years in software architecture, consulting engineering, or principal engineer roles",
      "Breadth across applications, integration, identity, and cloud infrastructure",
      "Strong written communication: proposals, HLD/LLD artifacts, and decision records",
      "Experience with enterprise procurement, vendor evaluation, and proof-of-concept cycles",
      "Comfortable whiteboarding and facilitating technical working sessions",
    ],
    preferredQualifications: [
      "Certifications in cloud architecture (e.g. AWS/Azure/GCP professional levels)",
      "Industry vertical depth (financial services, health, energy, or public sector)",
      "Experience with SAP, Oracle, Salesforce, or Microsoft business applications ecosystems at integration level",
    ],
  },
  {
    slug: "data-engineer",
    title: "Data Engineer",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦4,000,000 – ₦7,200,000 / year gross",
    summary:
      "Build governed data pipelines and warehouse patterns that analytics and ML teams can trust— with observability, lineage, and cost discipline.",
    responsibilities: [
      "Design batch and streaming pipelines with schema evolution and backfill strategies",
      "Implement data quality checks, SLAs, and alerting on freshness and completeness",
      "Partner with analysts and scientists on contracts, grain, and metric definitions",
      "Optimize query performance and warehouse costs (partitioning, clustering, materializations)",
      "Support privacy requirements: masking, tokenization, regional residency where applicable",
      "Document lineage and support audit requests with reproducible artifacts",
      "Collaborate on self-service patterns (dbt, metrics layers) where appropriate",
    ],
    qualifications: [
      "3+ years in data engineering or equivalent (ETL/ELT heavy roles)",
      "Strong SQL and one major warehouse (Snowflake, BigQuery, Redshift, Databricks, etc.)",
      "Experience with orchestration (Airflow, Dagster, Prefect, or cloud-native schedulers)",
      "Proficiency in Python or Scala for transforms and tooling",
      "Understanding of IAM, encryption, and least-privilege access to data stores",
    ],
    preferredQualifications: [
      "dbt or similar transformation tooling in production",
      "Kafka/Pub/Sub or equivalent event streaming experience",
      "FinOps or unit economics mindset for data platforms",
    ],
  },
  {
    slug: "qa-automation-engineer",
    title: "QA Automation Engineer",
    department: "Engineering",
    location: "Lagos · Nigeria · Hybrid / remote",
    type: "Full-time",
    compensationNgn: "₦2,800,000 – ₦5,200,000 / year gross",
    summary:
      "Raise quality through test automation, tooling, and release gates—embedded with squads to prevent defects rather than only finding them late.",
    responsibilities: [
      "Design and maintain automated regression suites (API, UI, contract tests as appropriate)",
      "Integrate tests into CI/CD with flaky-test management and reporting",
      "Collaborate on testability requirements during design and story refinement",
      "Build and maintain test data strategies including synthetic and masked production-like sets",
      "Support performance and load testing campaigns with clear pass/fail criteria",
      "Track quality metrics: escape rate, MTTR, coverage vs risk",
      "Champion shift-left practices and developer-owned quality culture",
    ],
    qualifications: [
      "2+ years in QA automation or SDET roles in agile teams",
      "Strong experience with at least one UI framework (Playwright, Cypress, Selenium) and API testing (REST, Postman, code-first)",
      "Proficiency in TypeScript/JavaScript or Python for test code",
      "Understanding of CI systems and how tests gate merges and releases",
      "Analytical mindset, attention to detail, and clear defect reporting",
    ],
    preferredQualifications: [
      "ISTQB or similar testing certifications",
      "Contract testing (Pact) or service virtualization",
      "Accessibility testing automation experience",
    ],
  },
  {
    slug: "college-intern-engineering",
    title: "College Intern — Engineering",
    department: "Talent",
    location: "Lagos · Nigeria · Program",
    type: "Internship",
    compensationNgn: "₦60,000 – ₦120,000 / month stipend (cohort & institution dependent)",
    summary:
      "Structured internship for students in CS, CE, Software Engineering, or related fields—real backlog tasks, mentorship, and feedback toward readiness for full-time pipelines.",
    responsibilities: [
      "Complete scoped tasks under mentor supervision; participate in code review as a learner",
      "Attend learning sessions on engineering practices, security, and communication",
      "Present a short capstone or demo to peers and mentors at program end",
      "Follow team norms: standups, tickets, and documentation expectations",
    ],
    qualifications: [
      "Currently enrolled in an accredited undergraduate or graduate program in a relevant major",
      "Completed coursework in data structures, programming, and software engineering fundamentals",
      "Strong academic standing or portfolio projects demonstrating initiative",
      "Legal right to intern in Nigeria per program rules (documentation may be requested)",
    ],
    preferredQualifications: [
      "Contributions to campus tech communities, hackathons, or open source",
      "Prior internship or freelance project references",
    ],
  },
  {
    slug: "career-day-campus",
    title: "Career Day & Campus Programs",
    department: "Talent",
    location: "Nigeria & select regions · Events",
    type: "Program",
    compensationNgn: "Event-based stipend or volunteer — disclosed per invitation",
    summary:
      "Represent Starlight Labs at universities and community events: career talks, panels, and pipeline-building—professional, inclusive, and aligned to our recruiting standards.",
    responsibilities: [
      "Deliver prepared sessions on technology careers and our delivery model",
      "Engage students respectfully; collect interest per data-privacy guidelines",
      "Coordinate with talent operations on follow-up and assessment pathways",
      "Report attendance highlights and feedback to internal stakeholders",
    ],
    qualifications: [
      "Excellent communication and professionalism in public settings",
      "Background in technology delivery, talent, or related field",
      "Availability for scheduled events; reliability on commitments",
    ],
    preferredQualifications: [
      "Prior campus ambassador or teaching assistant experience",
      "Active professional network in Nigerian tech ecosystems",
    ],
  },
];

export function getJobBySlug(slug: string): JobPosting | undefined {
  return JOB_POSTINGS.find((j) => j.slug === slug);
}

export function getAllJobSlugs(): string[] {
  return JOB_POSTINGS.map((j) => j.slug);
}
