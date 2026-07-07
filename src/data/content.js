// =====================================================================
// content.js  —  Eshan Kumar Jain's portfolio data
// =====================================================================

export const SITE_CONTENT = {
  meta: {
    title: "Eshan Kumar Jain",
    description:
      "Eshan Kumar Jain's portfolio: AI Specialist & Data Analyst. Building agentic AI workflows and turning complex data into decisions.",
    author: "Eshan Kumar Jain",
    profilePic: "/assets/profile-pic.jpeg",
  },

  hero: {
    greeting: "Hello",
    status: "Building ⚡",
    headline:
      "I'm Eshan — an AI Specialist & Data Analyst turning complex data into decisions and building agentic workflows that actually ship.",
    intro:
      "Manager-level analyst at HDFC Bank, now completing my MSc at <span class=\"highlight-asu\">Maynooth University</span>. Certified by Anthropic in Claude, Subagents, and Agent Skills. I build things that bridge data and intelligence.",
    scrollPrompt: "scroll down ✦ scroll down ✦",
  },

  tech: [
    {
      category: "Languages & Query",
      items: [
        { name: "Python",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/python/python-original.svg" },
        { name: "SQL",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg" },
        { name: "PostgreSQL",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/postgresql/postgresql-original.svg" },
        { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/typescript/typescript-original.svg" },
        { name: "JavaScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/javascript/javascript-original.svg" },
        { name: "R",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/r/r-original.svg" },
        { name: "C++",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/cplusplus/cplusplus-original.svg" },
        { name: "HTML/CSS",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/html5/html5-original.svg" },
        { name: "Bash",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/bash/bash-original.svg" },
      ],
    },
    {
      category: "AI & LLMs",
      items: [
        { name: "Claude API",         icon: "/assets/skill-logos/anthropic.svg" },
        { name: "Claude Code",        icon: "/assets/skill-logos/anthropic.svg" },
        { name: "Subagent Design",    icon: "/assets/skill-logos/anthropic.svg" },
        { name: "Prompt Engineering", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/openai.svg" },
        { name: "Groq",               icon: "/assets/skill-logos/groq.svg" },
        { name: "GitHub Copilot",     icon: "/assets/skill-logos/github.svg" },
        { name: "Windsurf",           icon: "/assets/skill-logos/notion.svg" },
        { name: "TensorFlow",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tensorflow/tensorflow-original.svg" },
        { name: "Scikit-learn",       icon: "/assets/skill-logos/scikitlearn.svg" },
        { name: "Pandas",             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/pandas/pandas-original.svg" },
        { name: "NumPy",              icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/numpy/numpy-original.svg" },
        { name: "Matplotlib",         icon: "/assets/skill-logos/Matplotlib_icon.svg.png" },
        { name: "Seaborn",            icon: "/assets/skill-logos/python.svg" },
        { name: "Plotly",             icon: "/assets/skill-logos/plotly.svg" },
        { name: "OpenCV",             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/opencv/opencv-original.svg" },
      ],
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "Next.js",       icon: "/assets/skill-logos/nextdotjs.svg" },
        { name: "React",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/react/react-original.svg" },
        { name: "Node.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/nodejs/nodejs-original.svg" },
        { name: "Vite",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/vitejs/vitejs-original.svg" },
        { name: "Tailwind CSS",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/tailwindcss/tailwindcss-original.svg" },
        { name: "Framer Motion", icon: "/assets/skill-logos/framer.svg" },
      ],
    },
    {
      category: "Data & Cloud Tools",
      items: [
        { name: "Power BI",    icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/powerbi.svg" },
        { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mongodb/mongodb-original.svg" },
        { name: "Redis",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/redis/redis-original.svg" },
        { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/git/git-original.svg" },
        { name: "GitHub",      icon: "/assets/skill-logos/github.svg" },
        { name: "Vercel",      icon: "/assets/skill-logos/vercel.svg" },
        { name: "Linux",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/linux/linux-original.svg" },
        { name: "REST APIs",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/fastapi/fastapi-original.svg" },
        { name: "Streamlit",   icon: "/assets/skill-logos/streamlit.svg" },
      ],
    },
    {
      category: "Operations & Management",
      items: [
        { name: "JIRA",                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/jira/jira-original.svg" },
        { name: "ServiceNow",            icon: "/assets/skill-logos/Microsoft_365_Symbol_0.svg" },
        { name: "Agile / Scrum",         icon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/scrumalliance.svg" },
        { name: "SDLC",                  icon: "/assets/skill-logos/notion.svg" },
        { name: "Requirements Elicit.",  icon: "/assets/skill-logos/googledocs.svg" },
        { name: "UAT Execution",         icon: "/assets/skill-logos/leetcode.svg" },
        { name: "SLA Management",        icon: "/assets/skill-logos/wolfram.svg" },
        { name: "Microsoft 365",         icon: "/assets/skill-logos/Microsoft_365_Symbol_0.svg" },
        { name: "Google Workspace",      icon: "/assets/skill-logos/googledocs.svg" },
        { name: "Stakeholder Mgmt",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/linkedin/linkedin-original.svg" },
        { name: "Communication",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/slack/slack-original.svg" },
      ],
    },
  ],

  projects: [
    {
      title: "WealthIQ",
      badge: "🚀 Live · Production AI Agent",
      description:
        "Production AI agent using the Claude API that delivers plain-English fundamental analysis for NSE/BSE stocks — covering valuation, growth, health, and ownership with structured diagnostic reasoning.",
      overview:
        "WealthIQ is a deployed production AI agent built on the Claude API that delivers plain-English fundamental analysis for NSE/BSE stocks. It covers valuation, growth, health, and ownership using multi-step agentic prompt workflows that interpret financial data, generate structured insights, and recommend analysis paths.",
      detailedDescription: [
        "Stock fundamental analysis is typically buried in dense financial reports that require hours of interpretation. WealthIQ eliminates that barrier by running a multi-step agentic workflow on the Claude API that automatically interprets key financial metrics and synthesizes them into actionable plain-English insights.",
        "The system is built on Claude API with carefully designed agentic prompt workflows. Each analysis session runs multiple reasoning steps: extracting valuation metrics (P/E, P/B, EV/EBITDA), assessing growth trajectory (revenue CAGR, earnings growth), evaluating financial health (debt ratios, cash flow), and analyzing ownership patterns (promoter holding, institutional interest). The agent synthesizes all four dimensions into a structured diagnostic report.",
        "The frontend is built with Next.js and TypeScript, deployed on Vercel for production reliability. Users enter a stock ticker and receive a comprehensive analysis with clear sections, risk flags, and investment considerations — all generated and structured by the Claude API without requiring any financial literacy.",
        "The agentic design mirrors modern AI-assisted reasoning: structured tool use, multi-step reasoning chains, and grounded output that traces each conclusion back to a specific financial data point.",
      ],
      timeline: "2025",
      projectType: "Personal Project",
      impact: "Deployed production AI agent delivering structured NSE/BSE stock analysis with multi-step Claude API reasoning workflows.",
      technologies: ["Claude API", "Next.js", "TypeScript", "Vercel", "Anthropic SDK", "REST APIs"],
      categories: ["Web-App", "AI/ML", "FinTech", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
        live: "https://wealth-iq-a-stock-analyzer.vercel.app/",
      },
      link: "https://wealth-iq-a-stock-analyzer.vercel.app/",
    },
    {
      title: "Multi-Class Skin Disease Classification",
      badge: "🏆 93.2% Accuracy",
      description:
        "3-stage ML pipeline achieving 93.2% accuracy across 23 skin conditions via transfer learning, ensemble modelling (MobileNetV2 + ShuffleNet), and stratified k-fold cross-validation — outperforming baseline CNN by 7.4 percentage points.",
      overview:
        "A 3-stage ML pipeline achieving 93.2% accuracy across 23 skin conditions via transfer learning, ensemble modelling, and stratified k-fold cross-validation — outperforming a vanilla CNN baseline by 7.4 percentage points. Built using MobileNetV2 and ShuffleNetV2 as complementary feature extractors.",
      detailedDescription: [
        "Skin disease classification is a high-stakes computer vision problem where misclassification has real medical consequences. The challenge is compounded by severe class imbalance, high visual similarity between conditions, and the diversity of skin tones across patient populations.",
        "The pipeline runs three stages: semantic preprocessing → ensemble CNN feature extraction → ensemble decision fusion. Stage 1 applies targeted augmentation to address class imbalance. Stage 2 runs MobileNetV2 and ShuffleNetV2 in parallel as complementary feature extractors — MobileNetV2 excels at texture features while ShuffleNetV2 better captures structural patterns, making their combination more robust than either alone.",
        "Stage 3 fuses the per-class probability vectors from both models with tuned weights, producing a final prediction that consistently outperforms individual models. Stratified 5-fold cross-validation ensures each fold maintains the original class distribution, giving reliable accuracy estimates across all 23 conditions.",
        "The result: 93.2% classification accuracy across 23 skin conditions, a 7.4 percentage point improvement over the vanilla CNN baseline. This demonstrates that ensemble design and principled evaluation methodology can close a meaningful gap without requiring larger datasets or more compute.",
      ],
      timeline: "2024 – 2025",
      projectType: "Research / Final Year Project",
      impact: "93.2% accuracy across 23 conditions — 7.4pp gain over baseline CNN via transfer learning ensemble.",
      technologies: ["Python", "TensorFlow", "MobileNetV2", "ShuffleNetV2", "Scikit-learn", "Transfer Learning", "CNN"],
      categories: ["AI/ML", "Computer-Vision", "Healthcare", "Research"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain/University-Final-year-project",
      },
      link: "#",
    },
    {
      title: "Path to AI Engineer",
      description:
        "Full-stack AI-powered learning platform with a streaming Groq LLM chatbot (llama-3.3-70b), roadmap visualisation, job hunt Kanban board, and streak tracker — deployed on Vercel.",
      overview:
        "Path to AI Engineer is a full-stack AI-powered learning platform with a streaming LLM chatbot powered by Groq's llama-3.3-70b, roadmap visualisation, job hunt Kanban, and streak tracker. Deployed on Vercel, it demonstrates end-to-end agentic application design without reliance on heavy ML frameworks.",
      detailedDescription: [
        "Most AI learning platforms are static — they hand you a curriculum and expect you to navigate it alone. Path to AI Engineer wraps the learning journey in a structured AI-powered experience that adapts to where you actually are in your skills development.",
        "The core is a streaming LLM chatbot built on Groq's inference API (llama-3.3-70b), integrated directly into the learning interface. The bot has context about the user's current roadmap position, completed milestones, and streak history, so it gives targeted guidance rather than generic advice. Responses stream token-by-token for a natural conversation feel.",
        "The platform also includes a roadmap visualisation that breaks the path to AI Engineer into concrete milestones with dependencies, a Kanban board for tracking job applications and interviews, and a streak tracker that gamifies consistency. All state is persisted across sessions using modern Next.js server components and client-side storage.",
        "The architecture demonstrates full agentic application design principles: AI integration with structured context injection, multi-step user workflows, and knowledge systems that make the AI's responses grounded and actionable. Deployed on Vercel with TypeScript throughout for type safety.",
      ],
      timeline: "2025",
      projectType: "Personal Project",
      impact: "Full-stack agentic learning platform with streaming LLM guidance, roadmap visualisation, and job hunt tracking — deployed on Vercel.",
      technologies: ["Next.js", "TypeScript", "Groq LLM (llama-3.3-70b)", "Vercel", "React", "Tailwind CSS"],
      categories: ["Web-App", "AI/ML", "EdTech", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
        live: "https://path-to-ai-engineer.vercel.app/",
      },
      link: "https://path-to-ai-engineer.vercel.app/",
    },
    {
      title: "FIFA WC 2026 Predictor",
      badge: "⚽ Live on Streamlit",
      description:
        "ML-powered FIFA World Cup 2026 match predictor — trained on historical international fixtures, team ratings, and tournament data to forecast match outcomes and bracket progressions.",
      overview:
        "A deployed Streamlit app that uses machine learning to predict FIFA World Cup 2026 match outcomes, trained on historical international match data, FIFA rankings, and team performance metrics.",
      detailedDescription: [
        "Predicting football match outcomes is a classic classification problem complicated by small sample sizes, high variance, and the outsized impact of individual player form. This project builds a practical ML pipeline to forecast World Cup 2026 match results.",
        "The model is trained on historical international fixtures and FIFA rankings data. Feature engineering captures team strength (ranking, goal differential, recent form), head-to-head history, and tournament stage pressure. Multiple classifiers were evaluated and the best-performing model was selected based on validation accuracy.",
        "The Streamlit app lets users select any two national teams and instantly get a predicted winner with probability scores, plus a full bracket simulation mode that projects the entire tournament from the group stage through the final.",
        "Deployed on Streamlit Community Cloud for zero-friction access — no install, no API key, just open and predict. The project demonstrates end-to-end ML deployment: data pipeline, model training, evaluation, and interactive front-end in a single lightweight stack.",
      ],
      timeline: "2026",
      projectType: "Personal Project",
      impact: "Live ML app predicting FIFA WC 2026 match outcomes with bracket simulation — deployed on Streamlit.",
      technologies: ["Python", "Scikit-learn", "Pandas", "Streamlit", "Machine Learning"],
      categories: ["AI/ML", "Data-Analysis", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
        live: "https://fifa-wc-2026-predictor-letsgo.streamlit.app/",
      },
      link: "https://fifa-wc-2026-predictor-letsgo.streamlit.app/",
    },
    {
      title: "Claude Subagents",
      description:
        "Custom Claude Code subagents (code-reviewer and summary-generator) with specialised system prompts, model selection, and tool restrictions — implementing human-in-the-loop control patterns.",
      overview:
        "Designed and deployed custom Claude Code subagents — a code-reviewer and summary-generator — with specialised system prompts, model selection, and tool restrictions implementing human-in-the-loop control patterns.",
      detailedDescription: [
        "Building reliable AI systems requires composing multiple specialised agents rather than relying on a single monolithic prompt. This project implements two production Claude Code subagents: a code-reviewer that audits diffs for correctness, security, and simplification opportunities; and a summary-generator that produces structured technical overviews of files and modules.",
        "Each subagent is configured with a tight system prompt that defines its scope, a specific model selection matching the task complexity, and explicit tool restrictions that prevent scope creep. The code-reviewer has read-only tool access and outputs severity-tagged findings; the summary-generator reads files and produces structured markdown — neither can modify code or trigger external actions without human approval.",
        "This human-in-the-loop architecture means the agents augment developer judgment rather than replacing it. The code-reviewer surfaces issues a developer might miss at speed; the summary-generator handles the tedious task of explaining unfamiliar modules. Both patterns are directly applicable to building AI copilots for support engineering, log interpretation, and API payload analysis.",
        "The implementation demonstrates Anthropic's agent composition patterns in practice: specialised tools, bounded context, explicit model selection, and safety constraints that keep humans in control of consequential decisions.",
      ],
      timeline: "2025 – 2026",
      projectType: "Personal Project",
      impact: "Production Claude Code subagents with human-in-the-loop control implementing Anthropic's agent composition patterns.",
      technologies: ["Claude Code", "Agentic AI", "Prompt Engineering", "Subagent Design", "Anthropic SDK"],
      categories: ["AI/ML", "Developer-Tools", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
      },
      link: "#",
    },
    {
      title: "ATS CV Optimizer",
      description:
        "Claude Code skill that autonomously rewrites CVs for ATS compatibility using structured prompt engineering, keyword mirroring, and quantification formulas — a reusable knowledge automation tool.",
      overview:
        "A Claude Code skill that autonomously rewrites CVs for ATS compatibility using structured prompt engineering, keyword mirroring, and quantification formulas. Converts operational knowledge (recruiter patterns, ATS rules) into structured AI-assisted automation.",
      detailedDescription: [
        "ATS systems reject a significant percentage of qualified candidates before any human reads their CV — often due to keyword mismatches, poor formatting, or unquantified achievements. This Claude Code skill automates the rewrite process by encoding recruiter knowledge and ATS rules into structured prompt engineering workflows.",
        "The skill runs in three phases: first, it analyses the job description to extract required keywords, skill clusters, and implicit seniority signals. Second, it audits the existing CV against these extracted requirements, identifying gaps and unquantified bullets. Third, it rewrites each bullet using proven quantification formulas (e.g., 'improved X by Y% resulting in Z') while mirroring the job description's exact terminology.",
        "The design demonstrates a key principle: operational knowledge (how recruiters evaluate CVs, how ATS systems parse text, what quantification formulas work) can be systematically encoded into an AI workflow that produces consistent, reliable output. This is the same pattern used in knowledge base automation and self-service support copilots.",
        "The skill is reusable across different job types and industries — users provide the job description and their CV, and the skill handles the rest. It runs as a proper Claude Code skill with defined inputs, structured reasoning steps, and formatted output.",
      ],
      timeline: "2025 – 2026",
      projectType: "Personal Project",
      impact: "Reusable Claude Code skill encoding recruiter and ATS patterns into structured AI automation.",
      technologies: ["Claude Code", "Prompt Engineering", "Agentic Workflows", "Anthropic SDK"],
      categories: ["AI/ML", "Developer-Tools", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
      },
      link: "#",
    },
    {
      title: "Customer Shopping Trends",
      description:
        "End-to-end analytics solution: ingested and normalised retail data in PostgreSQL, authored SQL queries computing CLV, category revenue share, and seasonal demand; built interactive Power BI dashboard with RFM segmentation and time-series trends.",
      overview:
        "An end-to-end BI pipeline: normalised retail data in PostgreSQL, authored advanced SQL (CTEs, window functions) to compute customer lifetime value, category revenue share, and seasonal demand. Built an interactive Power BI dashboard with RFM segmentation, cohort analysis, and time-series trendlines.",
      detailedDescription: [
        "Retail analytics projects often fail not at the analysis stage but at the data preparation stage — messy source data, inconsistent schemas, and missing values compound into unreliable insights. This project builds the full pipeline from raw CSVs to an executive-ready Power BI dashboard.",
        "Data ingestion starts with Python (Pandas) for cleaning and normalisation, followed by structured loading into PostgreSQL. The schema is designed around a star schema with fact and dimension tables, making the SQL analytics clean and performant.",
        "The SQL analysis layer covers three tiers: basic KPIs (total revenue, order volume, AOV), segment analysis (RFM scoring, category performance, geographic breakdowns), and predictive indicators (CLV projections, churn signals, seasonal demand curves). All queries use CTEs for readability and window functions for running totals and rankings.",
        "The Power BI dashboard translates these queries into interactive visuals: an RFM scatter plot for customer segmentation, category revenue treemaps, time-series trendlines with seasonality bands, and cohort retention heat maps. The result is an analytics surface that a business stakeholder can use without touching the underlying data.",
      ],
      timeline: "2024",
      projectType: "Personal Project",
      impact: "End-to-end retail analytics pipeline: PostgreSQL → advanced SQL → interactive Power BI dashboard with RFM segmentation.",
      technologies: ["Python", "PostgreSQL", "Power BI", "DAX", "Pandas", "SQL", "RFM Analysis"],
      categories: ["Data-Analysis", "SQL", "Data-Visualization", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
      },
      link: "#",
    },
    {
      title: "Diwali Sales & Music Store Analytics",
      description:
        "EDA and statistical segmentation on 10,000+ transaction records to surface top-revenue demographics and highest-selling products. Advanced SQL (CTEs, window functions, subqueries) to analyse genre revenue, artist performance, and purchase frequency.",
      overview:
        "Exploratory data analysis and statistical segmentation on 10,000+ transaction records, identifying top-revenue customer demographics, peak purchase periods, and highest-selling categories. Advanced SQL across genre revenue, artist performance, and purchase frequency metrics.",
      detailedDescription: [
        "Two independent SQL analytics projects tackling real-world business questions on transactional datasets. Each project demonstrates the progression from raw data to actionable business insight using only Python and SQL.",
        "The Diwali Sales analysis examines 10,000+ purchase records from an Indian e-commerce platform during the Diwali festive season. EDA reveals purchasing patterns by age group, gender, state, occupation, and product category. Statistical segmentation identifies the highest-revenue demographic cohorts and the product categories with the strongest seasonal uplift.",
        "The Music Store SQL project works against a relational PostgreSQL schema (artists, albums, tracks, invoices, customers, employees) to answer 18 business questions of increasing complexity. Basic queries cover top customers and best-selling genres. Advanced queries use recursive CTEs for employee hierarchies, window functions for running revenue totals, and correlated subqueries for per-country best-selling artists.",
        "Both projects emphasise writing clean, readable SQL rather than black-box scripts — every query is a single self-contained statement that can be read, understood, and modified by any analyst. This is the style of SQL that works in production data environments and holds up in code review.",
      ],
      timeline: "2024",
      projectType: "Personal Project",
      impact: "Statistical segmentation on 10K+ records; 18-question SQL walkthrough covering recursive CTEs, window functions, and correlated subqueries.",
      technologies: ["Python", "Pandas", "Seaborn", "Plotly", "PostgreSQL", "SQL", "pgAdmin"],
      categories: ["Data-Analysis", "SQL", "Database", "Personal Project"],
      logo: null,
      links: {
        github: "https://github.com/Eshan-kumar-jain",
      },
      link: "#",
    },
  ],

  projectsCta: {
    label: "More Projects →",
    href: "/projects",
  },

  experience: [
    {
      title: "Manager — Tech & Digital Business Data Analyst",
      company: "HDFC Bank Ltd",
      shortName: "HDFC",
      location: "Mumbai, India",
      startDate: "Jul 2023",
      endDate: "Jul 2025",
      type: "Full-time",
      logo: "https://www.google.com/s2/favicons?domain=hdfcbank.com&sz=128",
      bullets: [
        "Spearheaded API Integration & Customised Statements initiatives processing €1.5M+ daily transaction volume — designed AI-ready agentic workflows to classify incidents, validate payloads, and route issues intelligently across JIRA and ServiceNow.",
        "Analysed operational datasets using SQL cohort analysis and trend modelling to identify process bottlenecks, reducing average turnaround time by 25% across 50+ stakeholders.",
        "Translated complex business requirements into technical specifications for 5+ developers using Agile and SDLC frameworks, improving sprint delivery accuracy across multiple release cycles.",
        "Designed and executed PostgreSQL-based test plans and UAT for 5+ major product releases, reducing data reconciliation errors by 30% and improving release quality.",
        "Built Power BI dashboards tracking throughput, SLA adherence, and API error rates, enabling senior management to cut decision turnaround by 20%.",
        "Led all EPFO development projects end-to-end, achieving 100% regulatory compliance across data handling, audit trails, and reporting pipelines.",
      ],
    },
  ],

  resumeCta: {
    label: "View Full Resume →",
    href: "/resume",
  },

  resume: {
    role: "AI Specialist & Data Analyst",
    location: "Maynooth, Ireland",
    downloadHref: "/assets/Eshan_Kumar_Jain_CV.pdf",
  },

  softSkills: [
    "Problem-Solving", "Leadership", "Communication", "Stakeholder Management",
    "Requirements Elicitation", "SLA Management", "Incident Triage",
    "Agile / Scrum", "SDLC", "UAT", "Change Management",
    "Microsoft 365", "Google Workspace",
  ],

  education: [
    {
      school: "Maynooth University",
      degree: "MSc Data Science and Analytics — 1st Class Honours (Expected)",
      location: "Maynooth, Ireland",
      dates: "Sept 2025 – Sept 2026",
      coursework:
        "Machine Learning, Statistical Modelling, NLP, Big Data Analytics, Data Visualisation",
    },
    {
      school: "NIT Nagpur (VNIT)",
      degree: "B.Tech Computer Science and Engineering",
      location: "Nagpur, India",
      dates: "Jul 2019 – Jun 2023",
      coursework:
        "Data Structures & Algorithms, Operating Systems, Computer Networks, Database Management Systems, Business Intelligence",
    },
  ],

  publishedWork: [],

  certifications: [
    { name: "Introduction to Subagents — Anthropic",        link: null },
    { name: "Introduction to Agent Skills — Anthropic",     link: null },
    { name: "Claude 101 — Prompt Engineering — Anthropic",  link: null },
    { name: "SQL Certificate — HackerRank",                 link: null },
    { name: "Understanding APIs & RESTful APIs — Udemy",    link: null },
  ],

  contact: {
    heading: "Get In Touch",
    body:
      "I'm always open to discussing data, AI, new projects, or opportunities to collaborate. Feel free to reach out.",
    email: "eshanjain552@gmail.com",
    cta: "Send Me a Message",
  },

  about: {
    heading: "Who even is Eshan?",
    sub: "I'm glad you asked.",
    teaser: "KEEP SCROLLING TO EXPLORE",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/eshan-kumar-jain-a140921b6/",
    github:   "https://github.com/Eshan-kumar-jain",
    devpost:  "#",
    instagram: "#",
    facebook: "#",
    spotify:  "#",
    resume:   "/assets/Eshan_Kumar_Jain_CV.pdf",
  },
};
