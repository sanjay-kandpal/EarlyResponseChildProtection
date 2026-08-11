"use client";

import { useEffect } from "react";

/** Degrees clockwise from top — matches the five hub translate positions. */
const ARC_ROTATIONS = [0, 72, 144, 216, 288];

const INNER_BASE =
  "relative -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 transition-all duration-500 group";

const DOT_BASE =
  "w-4 h-4 rounded-full border-2 border-white shadow-md transition-colors duration-300";

const CARD_SIDE_LEFT = "left-7 items-start text-left";
const CARD_SIDE_RIGHT = "right-7 items-end text-right";

const CARD_BASE =
  "absolute top-1/2 -translate-y-1/2 w-32 sm:w-36 md:w-40 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-sm flex flex-col cursor-pointer border-slate-200";

type OrbitController = {
  stop: () => void;
};

declare global {
  interface Window {
    __heroOrbit?: OrbitController;
  }
}

function cardSide(index: number) {
  return index <= 2 ? CARD_SIDE_LEFT : CARD_SIDE_RIGHT;
}

function activate(index: number) {
  const root = document.getElementById("hero-orbit");
  if (!root) return;

  const arc = root.querySelector<HTMLElement>("[data-orbit-arc]");
  if (arc) {
    // Remote stylesheet forces transform:none unless !important is used.
    arc.style.setProperty("transition", "transform 0.5s ease", "important");
    arc.style.setProperty(
      "transform",
      `rotate(${ARC_ROTATIONS[index] ?? 0}deg)`,
      "important",
    );
  }

  const hubs = [
    ...root.querySelectorAll<HTMLElement>("[data-orbit-hub]"),
  ].sort(
    (a, b) => Number(a.dataset.orbitHub) - Number(b.dataset.orbitHub),
  );

  hubs.forEach((hub, i) => {
    const active = i === index;
    const inner = hub.querySelector<HTMLElement>(":scope > div");
    if (!inner) return;

    inner.className = `${INNER_BASE} ${active ? "z-20" : "z-10"}`;
    inner.style.setProperty("opacity", active ? "1" : "0.55", "important");

    const parts = [
      ...inner.querySelectorAll<HTMLElement>(":scope > div"),
    ];
    const dot = parts[0];
    const card = parts[1];

    if (dot) {
      dot.className = DOT_BASE;
      dot.style.setProperty(
        "background-color",
        active ? "rgb(5, 150, 105)" : "rgb(226, 232, 240)",
        "important",
      );
    }

    if (card) {
      card.className = `${CARD_BASE} ${cardSide(i)} ${
        active ? "ring-1 ring-black/5" : ""
      }`;
      card.style.setProperty("opacity", active ? "1" : "0.55", "important");
    }
  });
}

/**
 * Restores click + autoplay for the hero Privacy Risk Score orbit.
 * The static capture froze one mid-rotation state with no React handlers.
 */
export default function HeroOrbitScript() {
  useEffect(() => {
    // Ensure HMR / Strict Mode never leave duplicate timers running.
    window.__heroOrbit?.stop();

    const root = document.getElementById("hero-orbit");
    if (!root) return;

    let active = 0;
    let timer: number | undefined;
    let pausedUntil = 0;
    let stopped = false;
    let generation = 0;

    const tick = () => {
      if (stopped || Date.now() < pausedUntil) return;
      const g = generation;
      const next = (active + 1) % ARC_ROTATIONS.length;
      // Bail if a user click happened after this tick started.
      if (stopped || g !== generation || Date.now() < pausedUntil) return;
      active = next;
      activate(active);
    };

    const select = (idx: number) => {
      generation += 1;
      active = idx;
      pausedUntil = Date.now() + 10000;
      activate(active);
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const hub = target?.closest?.(
        "[data-orbit-hub]",
      ) as HTMLElement | null;
      if (!hub || !root.contains(hub)) return;
      const idx = Number(hub.dataset.orbitHub);
      if (Number.isNaN(idx)) return;
      e.preventDefault();
      select(idx);
    };

    const onKey = (e: KeyboardEvent) => {
      const hub = e.target as HTMLElement | null;
      if (!hub?.hasAttribute?.("data-orbit-hub") || !root.contains(hub)) {
        return;
      }
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      const idx = Number(hub.dataset.orbitHub);
      if (Number.isNaN(idx)) return;
      select(idx);
    };

    document.addEventListener("click", onClick, true);
    root.addEventListener("keydown", onKey);

    activate(0);
    timer = window.setInterval(tick, 3200);

    const stop = () => {
      stopped = true;
      document.removeEventListener("click", onClick, true);
      root.removeEventListener("keydown", onKey);
      if (timer) window.clearInterval(timer);
      if (window.__heroOrbit?.stop === stop) delete window.__heroOrbit;
    };

    window.__heroOrbit = { stop };

    return stop;
  }, []);

  return null;
}
