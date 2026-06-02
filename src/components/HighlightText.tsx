const HIGHLIGHT_TERMS = [
  "GenAI",
  "LLM",
  "AI",
  "NAI",
  "optimization",
  "optimisation",
  "optimize",
  "optimise",
  "simulation",
  "simulate",
  "streaming",
  "WebSocket",
  "WebSockets",
  "RBAC",
  "FastAPI",
  "React",
  "TypeScript",
  "microservices",
  "Plotly",
  "Recharts",
  "RGM",
  "polling",
  "ML-driven",
  "data-science",
  "data science",
  "ROI",
  "K-ROI",
  "i-NTS",
  "NTS",
  "Python",
  "Node.js",
  "Next.js",
  "Power BI",
  "lineage",
  "discount",
  "scenario",
  "scenarios",
  "chatbot",
  "inferencing",
  "multimodal",
  "token-level",
  "SQL",
  "KPI",
  "KPIs",
  "DS",
  "analytics",
];

const HIGHLIGHT_PATTERN = new RegExp(
  `\\b(${HIGHLIGHT_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})\\b`,
  "gi",
);

export function HighlightText({ text }: { text: string }) {
  const parts = text.split(HIGHLIGHT_PATTERN);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <mark key={`${part}-${index}`} className="project-keyword">
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}
