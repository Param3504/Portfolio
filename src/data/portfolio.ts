export type ArchitectureLayer = {
  tabLabel: string;
  title: string;
  description: string;
  panelImage?: string;
  panelImageAlt?: string;
};

export type ProjectScreenshot = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  client?: string;
  image: string;
  screenshots?: ProjectScreenshot[];
  /** Extra slides for small project card carousel only (appended after screenshots) */
  cardScreenshots?: ProjectScreenshot[];
  screenshotsInitialIndex?: number;
  featured?: boolean;
  tags: string[];
  stackSummary?: string;
  architectureLayers?: ArchitectureLayer[];
  highlights: string[];
  /** Shorter line on small project cards; falls back to subtitle */
  cardSubtitle?: string;
  /** Body copy shown in the project detail popup */
  modalDescription?: string;
};

export function getProjectModalImages(project: Project): ProjectScreenshot[] {
  return project.cardScreenshots ?? project.screenshots ?? [];
}

export type Experience = {
  id: string;
  tabLabel: string;
  company: string;
  role: string;
  period: string;
  location: string;
  intro?: string;
  bullets: string[];
  highlightTerms?: string[];
};

export type AboutProject = {
  name: string;
  client: string;
  description: string;
  highlightTerms?: string[];
};

export type AboutTab = {
  id: string;
  tabLabel: string;
  title: string;
  paragraphs?: string[];
  projects?: AboutProject[];
  highlightTerms?: string[];
  highlightParagraphIndex?: number;
  responseTypes?: string[];
  clients?: string[];
  education?: boolean;
};

export const PROFILE = {
  name: "Param Prajapati",
  title: "Associate Software Development Engineer",
  heroRoleChips: [
    "Associate Software Development Engineer",
    "Mercor AI Evaluator · Contractor",
  ],
  tagline:
    "I am an end-to-end product chatbot developer using GenAI, shipping enterprise assistants with streaming, charts, and workflow-heavy UIs. I also pre-release tested Claude Octopus by evaluating the model across 10+ Git repositories before launch.",
  email: "paramprajapati7570@gmail.com",
  github: "https://github.com/Param3504",
  phone: "+91 6351285937",
  linkedin: "https://www.linkedin.com/in/param-prajapati-714424267/",
  resume: {
    file: "Param-Prajapati-Resume.pdf",
    downloadName: "Param-Prajapati-Resume.pdf",
  },
  location: "Bengaluru, India",
  education: {
    school: "IIIT Vadodara - ICD",
    degree: "B.Tech Computer Science & Engineering",
    period: "Dec 2021 to Aug 2025",
    gpa: "8.00 CGPA",
  },
  heroBadges: [
    {
      id: "top-talent",
      label: "Top Talent",
      detail: "Sigmoid · 2026",
      icon: "medal",
      tone: "gold",
    },
    {
      id: "claude-ai",
      label: "Claude AI Tester",
      detail: "Pre-release · 10+ repos",
      icon: "ai",
      tone: "violet",
    },
    {
      id: "chatbot-dev",
      label: "Chatbot Developer",
      detail: "GenAI · End-to-end",
      icon: "chat",
      tone: "teal",
    },
  ],
  heroStats: [
    { value: "2+", label: "Yrs Exp" },
    { value: "10+", label: "Projects" },
    { value: "12+", label: "Tech Stacks" },
    { value: "2+", label: "Bots Evaluated" },
    { value: "6+", label: "Chatbots Delivered" },
  ],
  mercorNote:
    "evaluating and stress-testing AI models for quality, safety, and real-world coding tasks",
  contactCopy: {
    lead:
      "Open to building seamless chatbots · full-time roles & interesting projects.",
    location: "Based in Bengaluru, India · open to remote and hybrid opportunities.",
  },
  contactUspSlides: [
    {
      id: "ai-evaluator",
      title: "AI Evaluator",
      subtitle: "Pre-release model testing · Mercor & Claude · 10+ Git repositories",
      image: "/contact-usp/usp-ai-evaluator.png",
      imageAlt: "AI Evaluator: I evaluate AI so you can trust it",
    },
    {
      id: "chatbot",
      title: "Chatbot Developer",
      subtitle: "Intelligent chatbots that deliver real results",
      image: "/contact-usp/usp-chatbot.png",
      imageAlt: "Chatbot Developer: I build intelligent chatbots that deliver real results",
      emphasis: true,
    },
    {
      id: "enterprise-dashboard",
      title: "Data Visualization & Dashboards",
      subtitle: "Executive analytics UIs with KPIs, charts and enterprise reporting",
      image: "/contact-usp/usp-enterprise-dashboard.png",
      imageAlt: "Data visualization expert dashboard with revenue charts and KPI cards",
    },
    {
      id: "chatbot-support",
      title: "Chatbot Developer",
      subtitle: "Intelligent chatbots that automate conversations and deliver real impact",
      image: "/contact-usp/usp-chatbot-2.png",
      imageAlt: "Chatbot developer showcase with support assistant and order tracking UI",
      emphasis: true,
    },
  ],
  about: [
    "Associate SDE at Sigmoid with a year of product engineering across Pfizer, Reckitt, and MD Johnson engagements, shipping on tight deadlines without compromising quality.",
    "I specialise in React/TypeScript frontends, scalable Node backends, and data-heavy UIs with charts, workflows, and real-time streaming.",
    "From GenAI chatbots with token-level WebSocket streaming to trade promotion optimisation dashboards, I enjoy owning features end-to-end.",
  ],
};

export const ABOUT_TABS: AboutTab[] = [
  {
    id: "product-dev",
    tabLabel: "Product Developer",
    title: "Product Developer · Sigmoid",
    paragraphs: [
      "I own end-to-end product engineering, React/TypeScript UIs, workflow-heavy dashboards, and integrations with analytics backends, for enterprise clients in consumer health and insights.",
    ],
    projects: [
      {
        name: "Trade Promo Optimiser",
        client: "Kenvue",
        description:
          "A three-layer RGM platform (budget constraints → DS optimisation → scenario simulation) for trade promotion planning. I built the executive UI on FastAPI microservices and the data-science layer, promo calendar, scenario manager, reports, and customer configuration.",
        highlightTerms: ["FastAPI", "DS optimisation", "scenario simulation"],
      },
      {
        name: "Data Product Marketplace",
        client: "Kenvue",
        description:
          "Kenvue’s unified DMP: a landing hub to discover global data products, onboard new products through guided forms, configure Snowflake-Databricks lineage, visualise report lineage graphs, and drill into coverage sufficiency by market and brand.",
        highlightTerms: ["lineage", "onboarding", "coverage sufficiency"],
      },
      {
        name: "CITE",
        client: "Compass",
        description:
          "Canteen CITE, a unified Compass platform for sales, product, catalog, and service visibility across lines of business, with drill-down charts, product hub, and service case analytics.",
        highlightTerms: ["Compass", "KPIs", "drill-down"],
      },
      {
        name: "Smart Targets",
        client: "Reckitt",
        description:
          "Target planning and approvals for regional sales teams, primary and secondary adjustments, bulk upload, and staged approval states. I owned the backend: Azure Logic Apps workflows that send notification emails when an approver acts, plus zero-loss migration of large Excel target sheets into structured tables.",
        highlightTerms: ["Azure Logic Apps", "approval workflows", "Excel ETL"],
      },
    ],
  },
  {
    id: "chatbot-dev",
    tabLabel: "Chatbot Developer",
    title: "Chatbot Developer · Sigmoid",
    paragraphs: [
      "I have built many production GenAI chatbots at Sigmoid, each with a different client stack, response shape, and real-time architecture. Below are five flagship deliveries.",
    ],
    projects: [
      {
        name: "Compass Analytics Chatbot",
        client: "Compass",
        description:
          "Graph and tabular outputs for analytics queries. Each user question uses Polling for status sync and Browser Streaming while the model generates results, so analysts see charts and tables as soon as data is ready.",
        highlightTerms: ["Polling", "Browser Streaming", "Graph", "tabular"],
      },
      {
        name: "MD Johnson GenAI Assistant",
        client: "MD Johnson",
        description:
          "Open-domain questions with Markdown-rendered answers end to end. Polling was the core transport, reliable round-trips for every query type without holding a long-lived connection.",
        highlightTerms: ["Markdown", "Polling"],
      },
      {
        name: "Atlas · Reckitt",
        client: "Reckitt",
        description:
          "Full multimodal stack: SQL query, tables, bar chart, line chart, FAQs, and general answers, delivered over Web Sockets and Browser Streaming. A sixth path lets the DS model ask a fallback clarifying question mid-run; the user replies and the prompt continues.",
        highlightTerms: [
          "Web Sockets",
          "Browser Streaming",
          "SQL query",
          "fallback",
        ],
      },
      {
        name: "Promo Executive Dashboard",
        client: "Kenvue",
        description:
          "Split layout: Power BI reports on the left, GenAI chatbot on the right, built for a Kenvue CEO workflow. When filters change in Power BI, the Power BI SDK sends slice context and filtered result data to the model so GenAI answers with the same filters applied.",
        highlightTerms: ["Power BI SDK", "GenAI", "filters"],
      },
      {
        name: "Pfizer Patient-Doctor Portal",
        client: "Pfizer",
        description:
          "RBAC for doctors and patients: doctors view cases, schedule appointments, and prescribe; patients query, book visits, and receive messages. The AI surfaces prior cases when symptoms recur, and appointment types flow through doctor-controlled scheduling.",
        highlightTerms: ["RBAC", "appointments", "prescriptions"],
      },
    ],
  },
  {
    id: "education",
    tabLabel: "Education",
    title: "Education",
    education: true,
  },
];

export const EXPERIENCE: Experience[] = [
  {
    id: "sigmoid",
    tabLabel: "Sigmoid",
    company: "Sigmoid",
    role: "Associate SDE (Jul 2025 to Present) · SWE Intern (Jan to Jun 2025)",
    period: "Jan 2025 to Present",
    location: "Bengaluru, India",
    intro:
      "Full-time product engineering across consumer health and pharma, GenAI chatbots, RGM platforms, and data marketplaces for Kenvue, Reckitt, Pfizer, Compass, and MD Johnson.",
    highlightTerms: [
      "GenAI",
      "WebSockets",
      "FastAPI",
      "React",
      "lineage graphs",
      "RBAC",
    ],
    bullets: [
      "Delivered 7+ enterprise products for Pfizer, Reckitt, and MD Johnson with Agile CI/CD across distributed systems.",
      "Built Atlas Companion, a real-time GenAI chatbot with LLM inferencing, WebSockets, and multi-modal responses (charts, SQL, tables) in 72 hours.",
      "Shipped Data Product Marketplace with RBAC onboarding, lineage graphs, and multi-client report management.",
      "Engineered Smart Targets backend: approval workflows, 100-column Excel migrations, Azure Logic Apps notifications.",
      "Established reusable component libraries cutting development time ~40% across projects.",
    ],
  },
  {
    id: "techplement",
    tabLabel: "Techplement",
    company: "Techplement",
    role: "Full Stack Intern",
    period: "Jun 2024 to Jul 2024",
    location: "Remote",
    intro:
      "Internship focused on a unified social analytics dashboard with multi-platform API integrations.",
    highlightTerms: ["React", "Node.js", "MongoDB"],
    bullets: [
      "Social Media Dashboard integrating Facebook, Instagram, YouTube, and Spotify APIs with React, Tailwind, Node.js, and MongoDB.",
    ],
  },
];

/** Trade Promo first , flagship execDas work */
export const PROJECTS: Project[] = [
  {
    id: "trade-promo",
    title: "Trade Promo Optimiser",
    subtitle:
      "3-layer RGM platform · React UI · FastAPI (6 microservices) · DS optimisation",
    cardSubtitle: "Kenvue · RGM · config, optimise, calendar & reports",
    period: "Jan 2026 to Present",
    client: "Sigmoid · Consumer Health (Kenvue / Reckitt)",
    image: "/project-trade-promo.svg",
    screenshots: [
      {
        src: "/trade-promo-reports.png",
        alt: "Reporting & Analytics dashboard comparing My Calendar vs Baseline with KROI, trade spend, and brand charts",
        caption: "Reports · analytics & compare",
      },
      {
        src: "/trade-promo-calendar-1.png",
        alt: "Promo Calendar year view with KPI cards, promotion-type charts, and monthly budget bars",
        caption: "Year view · KPIs & charts",
      },
      {
        src: "/trade-promo-calendar-2.png",
        alt: "Promo Calendar quarter view with promotion list and product-level promo bars",
        caption: "Quarter view · promo timeline",
      },
      {
        src: "/trade-promo-calendar-3.png",
        alt: "Promo Calendar month view with optimized results and week-level promotion grid",
        caption: "Month view · calendar grid",
      },
    ],
    cardScreenshots: [
      {
        src: "/trade-promo-reports.png",
        alt: "Reporting & Analytics dashboard comparing My Calendar vs Baseline with KROI, trade spend, and brand charts",
      },
      {
        src: "/trade-promo-calendar-1.png",
        alt: "Promo Calendar year view with KPI cards, promotion-type charts, and monthly budget bars",
      },
      {
        src: "/trade-promo-calendar-2.png",
        alt: "Promo Calendar quarter view with promotion list and product-level promo bars",
      },
      {
        src: "/trade-promo-calendar-3.png",
        alt: "Promo Calendar month view with optimized results and week-level promotion grid",
      },
      {
        src: "/trade-promo-compare-1.png",
        alt: "Scenario comparison with trade spend by month and volume lift share donut chart",
      },
      {
        src: "/trade-promo-compare-2.png",
        alt: "Scenario comparison with overall sales and incremental NTS by month",
      },
    ],
    featured: true,
    tags: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "Microservices",
      "Data Science",
      "Recharts",
      "RGM",
    ],
    stackSummary:
      "I owned the React/TypeScript executive UI; the platform sits on a Python FastAPI backend (6 microservices) integrated with a data-science optimisation layer. Together they lift overall sales by aligning customer & brand budgets, ML-driven discount recommendations, and what-if scenario simulation.",
    architectureLayers: [
      {
        tabLabel: "Customer configuration",
        title: "Customer configuration",
        description:
          "Step one, customer configuration: planners set min discount, max discount, share %, total budget and brand-level budget, and choose an objective (profitability, sales, and related goals). Discount and frequency guardrails and promo combo rules are captured here. This constraint bundle is the foundation every optimisation run and scenario simulation builds on.",
        panelImage: "/trade-promo-arch-config.png",
        panelImageAlt:
          "Discount and financial constraints form with min discount, brand budgets, share %, and objective dropdowns",
      },
      {
        tabLabel: "Optimise · DS backend",
        title: "Optimise (DS + backend)",
        description:
          "Step two, optimise: after configuration is confirmed and pushed, the DS layer and FastAPI backend maximise overall sales, profit, and min/max profit output according to the objective selected in configuration. Six microservices preprocess budgets and guardrails, run the promotion model, and return recommended product-level discounts for the best ROI back to the UI.",
        panelImage: "/trade-promo-arch-optimise.png",
        panelImageAlt:
          "Configurations table listing customer configs with status, budget, and push actions",
      },
      {
        tabLabel: "Scenarios · simulate",
        title: "Scenarios · simulate (DS)",
        description:
          "Step three, scenarios: planners create a scenario and assign discount % per product (PPG), then send it to DS simulate APIs. Product-wise revenue, discount, and ROI flow into Scenario Manager for compare, publish, or promo-calendar handoff, so teams validate what-if plans before committing trade spend.",
        panelImage: "/trade-promo-arch-scenario.png",
        panelImageAlt:
          "Scenario Manager table with status chips, ROI, i-NTS, and compare workflow",
      },
    ],
    modalDescription:
      "Trade Promo Optimiser (TPx 360) is Kenvue’s end-to-end revenue growth management workspace. Planners begin in Customer Configuration, setting min/max discount, share %, brand budgets, and objectives, then push configs to the data-science layer for optimisation. The Promo Calendar supports year, quarter, and month planning with KPIs, compare modes, and exports. Scenario Manager covers draft, run, publish, and side-by-side comparison with K-ROI, volume lift, i-NTS, and PPG-level analytics. Reports & Analytics benchmarks My Calendar vs Baseline on trade spend and overall sales. The Business Rulebook centralises promotion rules and guardrails alongside the core modules. I owned the React/TypeScript UI integrated with FastAPI microservices and DS optimise/simulate APIs.",
    highlights: [
      "Three-layer architecture (constraints → optimise → simulate) drives higher overall sales, incremental NTS, and trade spend efficiency versus manual planning.",
      "Customer & channel configuration UI: budgets, brand constraints, optimisation push, currency toggles, and config lifecycle (tables, status, RBAC-style flows).",
      "Scenario Manager: draft/run/publish workflows, side-by-side scenario comparison, KPI cards (K-ROI, Volume Lift, i-NTS, C-ROS), and visual analytics (month-wise & PPG-level charts).",
      "Promo calendar & compare mode: plan promotions, open week-level detail, compare two scenarios on the calendar, and export views for stakeholders.",
      "Reports & executive dashboard: filterable chart bundles for trade spend, overall sales, and incremental metrics aligned to business KPI definitions.",
      "Integrated end-to-end with FastAPI microservices and DS endpoints, frontend reflects live optimisation and simulation results without manual spreadsheet handoffs.",
    ],
  },
  {
    id: "compass-data-companion",
    title: "Data Companion",
    subtitle: "Compass GenAI analytics · Polling + Browser Streaming",
    cardSubtitle: "Compass · polling & streaming chatbot",
    period: "Mar 2025 to May 2025",
    client: "Sigmoid · Compass (Canteen)",
    image: "/project-genai.svg",
    screenshots: [
      {
        src: "/compass-companion/compass-1-home.png",
        alt: "Data Companion home with suggested queries and chat input",
      },
      {
        src: "/compass-companion/compass-2-chart.png",
        alt: "Data Companion grouped bar chart for yearly units sold and revenue trend",
      },
      {
        src: "/compass-companion/compass-3-forecast.png",
        alt: "Data Companion forecast line chart with three-month unit predictions",
      },
      {
        src: "/compass-companion/compass-4-table.png",
        alt: "Data Companion tabular response with top product sales",
      },
    ],
    screenshotsInitialIndex: 0,
    modalDescription:
      "Data Companion is Compass’s GenAI analytics chatbot for natural-language questions over sales, revenue, and product performance. Analysts ask in plain English and receive bar charts, forecast lines, tabular breakdowns, or narrative summaries depending on intent. Each query uses Polling to sync job status with the backend while Browser Streaming renders partial model output, so charts and text appear progressively instead of blocking on a long-running DS call. Suggested query chips, customise/tutorial flows, and thumbs-up/down feedback keep the experience guided and measurable. I built the React UI and wired the polling plus streaming transport end to end for Compass’s canteen analytics program.",
    tags: ["GenAI", "Polling", "Streaming", "React", "Charts"],
    highlights: [
      "Graph and tabular outputs for analytics queries with progressive Browser Streaming while the model generates answers.",
      "Polling on every request for reliable status sync without a persistent WebSocket session.",
      "Forecast, trend, and table response types with suggested follow-up chips and guided tutorial entry points.",
    ],
  },
  {
    id: "pfizer-bot",
    title: "Pfizer Doctor Assistant",
    subtitle: "GenAI · RBAC · chat, voice notes & call log",
    cardSubtitle: "Pfizer · doctor-patient assistant",
    period: "Dec 2025 to Jan 2025",
    client: "Sigmoid · Pfizer",
    image: "/project-genai.svg",
    screenshots: [
      {
        src: "/pfizer-bot/pfizer-1-home.png",
        alt: "Pfizer assistant home with example doctor interaction queries",
      },
      {
        src: "/pfizer-bot/pfizer-2-chat.png",
        alt: "Pfizer Pflippy chat with doctor profile and meeting suggestions",
      },
      {
        src: "/pfizer-bot/pfizer-3-recording.png",
        alt: "Pfizer Rapid Response Tool voice note logging form",
      },
      {
        src: "/pfizer-bot/pfizer-4-summary.png",
        alt: "Pfizer generated call summary with content utilization insights",
      },
    ],
    screenshotsInitialIndex: 0,
    modalDescription:
      "Pfizer’s doctor-interaction assistant helps field teams prepare for HCP meetings with GenAI chat, voice capture, and structured call logs. The home hub offers example queries, appointment tips, product talking points, and follow-ups, plus chat history and multilingual support. In chat, Pflippy returns doctor context: institutions, specialty, prior brand discussions, and meeting suggestions. The Rapid Response Tool records voice notes after calls, then generates summaries and insight cards (content used, effectiveness, patient cases). RBAC separates doctor and patient roles: doctors view cases and schedules; patients query, book appointments, and receive prescriptions and messages, with the AI surfacing prior visits when symptoms recur.",
    tags: ["GenAI", "RBAC", "React", "Voice", "Healthcare"],
    highlights: [
      "Smarter Doctor Interactions chatbot with structured HCP profiles and meeting prep.",
      "Rapid Response Tool for voice-note logging and AI-generated call summaries.",
      "RBAC for doctors and patients, appointments, prescriptions, and case history in one portal.",
    ],
  },
  {
    id: "atlas",
    title: "Atlas Companion",
    subtitle: "Real-time GenAI Analytics Chatbot",
    period: "12 Aug 2025 to 15 Aug 2025",
    image: "/project-genai.svg",
    screenshots: [
      {
        src: "/atlas/atlas-1-home.png",
        alt: "ATLAS Data Companion chat with bar chart response",
      },
      {
        src: "/atlas/atlas-2-table.png",
        alt: "ATLAS data table with brand sales and follow-up tabs",
      },
      {
        src: "/atlas/atlas-3-line.png",
        alt: "ATLAS line chart for top sales declines by brand",
      },
      {
        src: "/atlas/atlas-4-bar.png",
        alt: "ATLAS bar chart for largest sales declines",
      },
    ],
    screenshotsInitialIndex: 3,
    modalDescription:
      "Atlas Companion is Reckitt’s production GenAI analytics assistant for enterprise data. Users ask in natural language and receive SQL, tabular results, bar or line charts, FAQs, or conversational answers. The stack uses WebSockets and browser streaming for responsive, token-level rendering, plus a fallback flow when the model asks a clarifying question mid-prompt. I built the multimodal UI and integrations in 72 hours with Plotly charts, patterns later extended across Compass, Kenvue, Pfizer, and MD Johnson chatbot programs.",
    tags: ["GenAI", "WebSockets", "Plotly", "LLM", "React"],
    highlights: [
      "LLM-powered assistant with token-level streaming and multi-modal outputs: text, tables, SQL, bar/line charts, and popups.",
      "Full-stack delivery in 72 hours including Plotly visualisations and WebSocket integration.",
    ],
  },
  {
    id: "dpm",
    title: "Data Product Marketplace",
    subtitle: "Kenvue · discovery, onboarding, lineage & coverage",
    period: "Aug 2025 to Jan 2026",
    image: "/project-default.svg",
    screenshots: [
      {
        src: "/dmp/dmp-1-landing.png",
        alt: "DMP landing page with global data product catalogue and explore entry points",
      },
      {
        src: "/dmp/dmp-2-explore.png",
        alt: "DMP product detail page for Business Pulse with coverage and navigation cards",
      },
      {
        src: "/dmp/dmp-3-onboard.png",
        alt: "DMP add new data product onboarding wizard with step progress",
      },
      {
        src: "/dmp/dmp-4-lineage-map.png",
        alt: "DMP lineage configuration with Snowflake-Databricks table mapping",
      },
      {
        src: "/dmp/dmp-5-lineage-graph.png",
        alt: "DMP report lineage graph from source through bronze silver gold to report",
      },
      {
        src: "/dmp/dmp-6-coverage.png",
        alt: "DMP data sufficiency summary with drill-down by country customer and brand",
      },
    ],
    screenshotsInitialIndex: 0,
    modalDescription:
      "Data Product Marketplace is Kenvue’s unified catalog for every certified data product in one governed space. The landing hub lists global products, forums, and functions with paths into foundational and derived assets. Multi-step onboarding guides owners through requests, overview, configuration, documentation, and scope with donut-tracked progress. Lineage configuration maps Snowflake tables to Databricks; the report lineage graph visualises bronze → silver → gold flows into reports like Business Pulse. Coverage sufficiency heat-maps drill from use case to country, customer, category, and brand so teams spot gaps before analysis. I built the React UI with RBAC, lineage graphs, and lifecycle management for stewards and consumers.",
    tags: ["RBAC", "React", "Node.js", "Lineage Graphs"],
    highlights: [
      "Landing hub for all Kenvue data products, browse global products, forums, and functions, then drill into certified assets.",
      "Multi-step onboarding for new global data products: ownership, configuration, documentation, and scope with progress tracking.",
      "Lineage built in-product, map Snowflake ↔ Databricks tables, then visualise bronze → silver → gold flows into reports.",
      "Coverage & sufficiency views with heat-mapped drill-down from use case to country, customer, category, and brand.",
    ],
  },
  {
    id: "cite",
    title: "Canteen CITE",
    subtitle: "Compass · sales, products, catalog & service analytics",
    period: "Sep 2025 to Oct 2026",
    image: "/project-default.svg",
    screenshots: [
      {
        src: "/cite/cite-1-portfolio.png",
        alt: "CITE client portfolio with LOB cards, portfolio value, and quarterly sales charts",
      },
      {
        src: "/cite/cite-2-sales.png",
        alt: "CITE sales insights with monthly stacked bars, top locations, and category breakdown",
      },
      {
        src: "/cite/cite-3-products.png",
        alt: "CITE product insights with units by category, location, and fast or slow movers",
      },
      {
        src: "/cite/cite-4-product-hub.png",
        alt: "CITE product hub table grouped by location with search and dietary filters",
      },
      {
        src: "/cite/cite-5-service.png",
        alt: "CITE service insights with case KPIs, case type, location, and SLA charts",
      },
    ],
    screenshotsInitialIndex: 0,
    modalDescription:
      "Canteen CITE is Compass’s unified platform for clarity, insights, transparency, and engagement across sales, product, catalog, and service operations. Home surfaces program insights, service summaries, new features, and expert support requests. Client Portfolio shows LOB performance (Market, OCS, Vending, Dining) with portfolio value, consumer sales vs client spend, and drill-down to locations and delivery sites. Sales Insights adds month/quarter charts, YoY, top and bottom locations, and category views across ~90 KPIs. Product Insights and Product Hub cover units by category and site, fast/slow movers, supplier certifications, and 90-day product charts. Service Insights and Budget Overview round out case analytics, SLA tracking, and spend vs plan with category drill-down.",
    tags: ["React", "Charts", "Compass", "Analytics", "RBAC"],
    highlights: [
      "Unified platform for enterprise visibility into sales, product performance, catalog, and service with clarity, insights, transparency, and engagement for leadership decisions.",
      "Client Portfolio & Sales Insights: LOB-level performance, consumer vs client spend toggles, ~90 KPI-style charts with month/quarter views, YoY, top/bottom locations, and category drill-down.",
      "Product Insights & Product Hub: hundreds of graphs across categories and sites; location-grouped catalog, 90-day product analysis, supplier certifications, export by location or product.",
      "Service Insights & Budget: case analytics (active/completed, SLA, origin), budget vs spend with table view and category drill-down to product-level spend.",
    ],
  },
  {
    id: "smart-targets",
    title: "Smart Targets",
    subtitle: "RBAC target approvals · Logic Apps mail workflow",
    cardSubtitle: "Backend logic · trigger mails on approvals",
    period: "May 2025 to Aug 2025",
    client: "Sigmoid · Reckitt",
    image: "/project-default.svg",
    screenshots: [
      {
        src: "/smart-targets/smart-targets-1-adjust-approve.png",
        alt: "Smart Target adjust and approve screen with primary and secondary adjustment workflow",
      },
      {
        src: "/smart-targets/smart-targets-2-summary-table.png",
        alt: "Smart Target summary table with KPI cards and target rows by region and channel",
      },
      {
        src: "/smart-targets/smart-targets-3-upload-approval.png",
        alt: "Smart Target upload approval workflow table with selected targets and send for approval action",
      },
    ],
    screenshotsInitialIndex: 0,
    modalDescription:
      "Smart Targets is a target-planning and approvals module used by business teams to set, adjust, and approve regional targets with role-based controls. The flow supports primary and secondary adjustments, row-level edits, upload-based bulk updates, and action states like Not Started, In Progress, Sent for Approval, and Approved. My ownership was mainly backend-side orchestration: building the Azure Logic Apps approval workflow that triggers notification emails as soon as an approver acts, so ownership moves to the next reviewer without manual follow-ups. I also handled structured data migration pipelines for large Excel inputs to keep target values consistent across approval stages.",
    tags: [
      "Azure Logic Apps",
      "Workflow Automation",
      "Node.js",
      "RBAC",
      "Excel ETL",
    ],
    highlights: [
      "Built backend workflow automation where approval actions trigger Logic Apps email notifications instantly.",
      "Implemented staged approval lifecycle (draft, sent, in-progress, approved) with role-based action controls.",
      "Handled zero-loss migration of large Excel datasets into structured target tables for business users.",
    ],
  },
  {
    id: "crime-ml",
    title: "Crime Prediction & Forecasting",
    subtitle: "IEEE Research · Ensemble & Deep Learning",
    period: "2024",
    image: "/project-default.svg",
    tags: ["Python", "PyTorch", "XGBoost", "LSTM", "Prophet"],
    highlights: [
      "Led team of five; ensemble models (RF, XGBoost, AdaBoost, KNN) reached 93% accuracy; LSTM/RNN/Prophet for forecasting.",
    ],
  },
  {
    id: "employee-track",
    title: "Employee Tracking System",
    subtitle: "Real-time MERN + Maps",
    period: "2024",
    image: "/project-default.svg",
    tags: ["MERN", "Socket.io", "Leaflet.js", "MongoDB"],
    highlights: [
      "Live location tracking with Leaflet maps, Socket.io broadcasts, and role-based admin/employee access.",
    ],
  },
];

/** Small project cards below the featured block (top to bottom) */
export const PROJECT_GRID_ORDER = [
  "trade-promo",
  "dpm",
  "cite",
  "compass-data-companion",
  "pfizer-bot",
  "atlas",
  "smart-targets",
] as const;

export const SKILL_GROUPS = [
  {
    title: "Languages",
    items: ["C", "C++", "JavaScript", "TypeScript", "Python", "SQL", "Bash"],
  },
  {
    title: "Web & Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Material UI (MUI)",
      "Lucide React",
      "AG Grid",
      "Recharts",
      "Chart.js",
      "Plotly",
      "TanStack Table",
      "Handsontable",
      "React Hook Form",
      "Redux Toolkit",
      "Framer Motion",
    ],
  },
  {
    title: "Backend & Data",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "FastAPI",
      "Python APIs",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Prisma",
      "Redis",
      "Azure Logic Apps",
      "WebSockets",
      "SSE / Browser Streaming",
      "Polling Orchestration",
      "RBAC & Approval Workflows",
    ],
  },
  {
    title: "AI / Chatbot Architecture",
    items: [
      "GenAI",
      "LLM Inferencing",
      "Prompt Engineering",
      "RAG Patterns",
      "Function / Tool Calling",
      "Conversation Memory",
      "Multimodal Chat UX",
      "Evaluation & Feedback Loops",
      "Guardrails & Safety",
      "Model Streaming UX",
    ],
  },
  {
    title: "Deployment & DevOps",
    items: [
      "Docker",
      "CI/CD Pipelines",
      "GitHub Actions",
      "Vercel",
      "Netlify",
      "Azure App Services",
      "Nginx",
      "Environment & Secrets Management",
      "Release Versioning",
      "Production Monitoring",
    ],
  },
];
