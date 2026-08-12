const ALERT_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-alert w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>`;

export type LifecyclePanel = {
  id: string;
  title: string;
  subtitle: string;
  bullets: string[];
};

export const LIFECYCLE_PANELS: LifecyclePanel[] = [
  {
    id: "data-collection",
    title: "Data Collection",
    subtitle: "Consent, Cookie, Discovery, Agentic DPIA and RoPA",
    bullets: [
      "Consent - Multi-lingual, Updatable, Cryptographically verifiable, versioned, withdrawable consent.",
      "Discovery - Data Risk Quantification, Privacy Threat Modeling, Attribute classification & Regulatory recommendation",
      "Agentic DPIA - Dynamic Contextual questions, minimal hassle, automated recommendation, risk summarization & DPO enablement",
      "RoPA - Dynamic graph generation with approved data flows and risk, attributes and organization wide flow visualization",
      "Cookie - Cookie preference banner, automatic cookie classification, preference management, vendor management",
    ],
  },
  {
    id: "data-in-use",
    title: "Data In Use Protection",
    subtitle:
      "Privacy Enhancing Technologies based Privacy by Design solutions",
    bullets: [
      "Consent Based Access Control",
      "Expert Grade Anonymization",
      "Pseudonymous data sharing",
      "Test data with synthetic attributes",
      "Synthetic data with mathematical utility",
      "Differentially Private Insight sharing",
    ],
  },
  {
    id: "ai-training",
    title: "AI Training & Assessment",
    subtitle:
      "Privacy Preserved Machine Learning, AI Red teaming & AI Governance",
    bullets: [
      "PPML with Synthetic Data",
      "PPML with Differential & Anonymized data",
      "AI Red Teaming for Privacy, Safety, Security, Fairness & Reliability",
      "AI Impact Assessment for transparency and compliance with various regulatory requirements",
    ],
  },
  {
    id: "safe-ai",
    title: "Safe AI Inference",
    subtitle: "Enterprise inline AI Usage Protection",
    bullets: [
      "SLM based protection for AI inference inline",
      "Privacy compliance by understanding risks & mitigating flow",
      "Identify Security attacks and prevent prompts",
      "Pseudonymization of prompt and documents for AI Security",
      "Risk summarization, Human in the Loop and reporting",
    ],
  },
  {
    id: "trusted-agents",
    title: "Trusted Agents",
    subtitle:
      "Identifying trusted and risky agents. Protecting agentic conversations & tool usage inline.",
    bullets: [
      "Validate if agent is behaving as per the description",
      "Monitor the behaviour of the agent during its LLM interaction",
      "Identify and mitigate attacks by malicious agents",
      "Contextual firewalling for prevention of malicious behaviour & exfiltration",
      "Summarization & Reporting of agentic behaviour",
    ],
  },
];

export function renderLifecyclePanel(
  panel: LifecyclePanel,
  visible: boolean,
): string {
  const bullets = panel.bullets
    .map(
      (b) =>
        `<div class="flex items-start gap-3">${ALERT_ICON}<p class="text-[15px] text-slate-600 leading-snug">${escapeHtml(b)}</p></div>`,
    )
    .join("");

  return `<div data-lifecycle-panel="${panel.id}" class="${visible ? "" : "hidden "}w-full sm:w-[100%] lg:w-full lg:pt-2 transition-all duration-300 ease-in-out mt-8 lg:mt-0 flex justify-center lg:justify-end"><div class="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 w-full relative overflow-hidden group"><div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#059669] to-emerald-400"></div><div class="flex items-start justify-between mb-2"><div><h3 class="text-[24px] font-bold text-slate-900 leading-tight">${escapeHtml(panel.title)}</h3></div></div><p class="text-[18px] font-medium text-slate-700 mb-6 leading-relaxed">${escapeHtml(panel.subtitle)}</p><div class="space-y-4 bg-slate-50 rounded-2xl p-5 border border-slate-100">${bullets}</div></div></div>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
