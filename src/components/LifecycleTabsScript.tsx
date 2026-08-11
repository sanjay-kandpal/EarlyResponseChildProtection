"use client";

import { useEffect } from "react";

const ACTIVE_BTN =
  "flex flex-col justify-start items-center gap-4 lg:absolute transition-all duration-150 flex-[0_0_auto] text-[14px] leading-[20px] font-medium z-10 text-[#000] font-bold scale-110";
const INACTIVE_BTN =
  "flex flex-col justify-start items-center gap-4 lg:absolute transition-all duration-150 flex-[0_0_auto] text-[14px] leading-[20px] font-medium z-10 text-[#344054] hover:text-[#00B2BD]";
const ACTIVE_ICON =
  "inline-flex custom-shadow-xl items-center justify-center p-4 rounded-full border-[1px] w-fit text-5xl transition-all duration-300 border-[#fff] bg-[linear-gradient(135deg,_rgba(0,0,0,1)_0%,_rgba(0,0,0,1)_100%)] shadow-lg shadow-[#00b2bd33]";
const INACTIVE_ICON =
  "inline-flex custom-shadow-xl items-center justify-center p-4 rounded-full border-[1px] w-fit text-5xl transition-all duration-300 border-transparent bg-white hover:border-[#fff]";

function activate(id: string, opts: { scroll?: boolean } = {}) {
  const root = document.getElementById("lifecycle-tabs");
  if (!root) return;

  const buttons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-lifecycle-tab]"),
  ];
  const panels = [
    ...root.querySelectorAll<HTMLElement>("[data-lifecycle-panel]"),
  ];

  for (const btn of buttons) {
    const active = btn.dataset.lifecycleTab === id;
    const pos = btn.getAttribute("style") || "";
    const center = /\blg:-translate-x-1\/2\b/.test(btn.className);
    btn.className = `${active ? ACTIVE_BTN : INACTIVE_BTN}${center ? " lg:-translate-x-1/2" : ""}`;
    btn.setAttribute("style", pos);
    const icon = btn.querySelector(":scope > span");
    if (icon) {
      icon.className = active ? ACTIVE_ICON : INACTIVE_ICON;
      (icon as HTMLElement).style.color = active
        ? "rgb(255, 255, 255)"
        : "rgb(0, 0, 0)";
    }
  }

  for (const panel of panels) {
    const show = panel.dataset.lifecyclePanel === id;
    // Prefer inline display over Tailwind `hidden`+`flex` fighting in the cascade.
    panel.classList.toggle("hidden", !show);
    panel.style.display = show ? "flex" : "none";
  }

  if (!opts.scroll) return;
  const activePanel = panels.find((p) => p.dataset.lifecyclePanel === id);
  if (!activePanel) return;
  const rect = activePanel.getBoundingClientRect();
  // Only if the whole card is below the viewport — small nudge, keep arc on screen.
  if (rect.top >= window.innerHeight) {
    window.scrollBy({
      top: rect.top - window.innerHeight + Math.min(220, rect.height * 0.45),
      behavior: "smooth",
    });
  }
}

/**
 * Wires the static DPDP lifecycle curved-tab section so clicking a stage
 * swaps the detail card (the original capture only included one panel).
 */
export default function LifecycleTabsScript() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const btn = target?.closest?.(
        "#lifecycle-tabs [data-lifecycle-tab]",
      ) as HTMLButtonElement | null;
      if (!btn?.dataset.lifecycleTab) return;
      e.preventDefault();
      activate(btn.dataset.lifecycleTab, { scroll: true });
    };

    document.addEventListener("click", onClick, true);

    // Defer until after the static HTML is in the document.
    const t = window.setTimeout(() => {
      const first = document.querySelector<HTMLButtonElement>(
        "#lifecycle-tabs [data-lifecycle-tab]",
      );
      if (first?.dataset.lifecycleTab) {
        activate(first.dataset.lifecycleTab, { scroll: false });
      }
    }, 0);

    return () => {
      document.removeEventListener("click", onClick, true);
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
