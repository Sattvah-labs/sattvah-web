"use client";

import { useEffect } from "react";

/**
 * Registers /sw.js on mount. No "install our PWA" prompt, no
 * notification permission. The service worker only caches static chrome
 * (HTML, JS, CSS, fonts). API calls always go to the network.
 *
 * This component is intentionally invisible.
 */
export function SwRegister() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    // Defer until window load so the SW install doesn't fight with the
    // first-paint render on low-bandwidth Jio browser sessions.
    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {
          // Silent. SW is progressive enhancement; the site works
          // without it.
        });
    };
    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }
  }, []);

  return null;
}
