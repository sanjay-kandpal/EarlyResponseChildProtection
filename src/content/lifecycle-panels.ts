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
    title: "Continuous Sensing",
    subtitle: "Watch, hubs and personal-baseline calibration",
    bullets: [
      "The Watch — heart rate & ECG (MAX86150), EDA skin-sweat, and motion sensing in an ordinary-looking timepiece.",
      "Home Hubs — mains-powered room listeners that detect raised voices, crying and impact sounds on-device.",
      "Personal baseline — each child's readings are measured against their own calibrated normal, not a generic average.",
      "45-second polling with instant ramp-up — the watch switches to high-frequency sensing the moment a trigger fires.",
      "EDA catches the freeze response — a frightened child who goes very still, whom heart rate alone might miss.",
    ],
  },
  {
    id: "data-in-use",
    title: "On-Device Privacy",
    subtitle:
      "Structural privacy — guarantees built into the architecture, not policy promises",
    bullets: [
      "Speech stripped on-device before any other processing",
      "Only confidence-scored event labels leave the hub",
      "No audio or video is ever recorded or transmitted",
      "Physiological readings sent over encrypted BLE",
      "Cloud holds event metadata, never biometric waveforms",
      "No household member can view or disable monitoring",
    ],
  },
  {
    id: "ai-training",
    title: "Detection & Fusion",
    subtitle:
      "Personal baseline, dual-signal fusion, and transparent thresholds",
    bullets: [
      "Personal Z-score baseline per child",
      "Dual-signal fusion — physiological + acoustic",
      "Arousal Correlation Index (ACI) risk scoring, 0–100",
      "Rule-based, interpretable thresholds tuned from labelled data",
    ],
  },
  {
    id: "safe-ai",
    title: "Early Warning & Response",
    subtitle: "The Tiered Response Ladder",
    bullets: [
      "Tier 1 — neutral, non-accusatory nudge to the at-risk adult",
      "Tier 2 — alert to the designated safe adult (WhatsApp/SMS)",
      "Monitoring loop adapts to the safe adult's stated ETA",
      "Tier 3 — escalation to the assigned Protection Officer",
      "The PO — not the system — makes every further decision",
    ],
  },
  {
    id: "trusted-agents",
    title: "Protection Officer Oversight",
    subtitle:
      "A longitudinal dashboard, not just real-time alerts — patterns and events derived from sensor signals only.",
    bullets: [
      "Risk trend line — ACI over time between check-ins",
      "Event history — every alert, its tier and outcome",
      "Device status — battery, connectivity and wear",
      "PO felt-safety score plotted against the sensor trend",
      "Auto-generated case summary reports for case reviews",
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
