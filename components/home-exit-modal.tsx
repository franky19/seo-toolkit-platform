"use client";

import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { X } from "lucide-react";

export default function ExitIntentModal() {
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    const onMouseOut = (event: MouseEvent) => {
      const dismissed = localStorage.getItem("gnst_exit_modal_closed") === "1";
      if (dismissed || event.clientY > 8) return;
      setExitOpen(true);
      localStorage.setItem("gnst_exit_modal_closed", "1");
      track("exit_intent_modal_shown");
    };

    document.addEventListener("mouseout", onMouseOut);
    return () => document.removeEventListener("mouseout", onMouseOut);
  }, []);

  if (!exitOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Exit intent offer">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#082029] p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-white">Before You Leave</h3>
            <p className="mt-2 text-sm text-slate-300">Run one free google news checker audit now. No login required.</p>
          </div>
          <button
            type="button"
            onClick={() => setExitOpen(false)}
            aria-label="Close dialog"
            className="rounded-md p-1 text-slate-300 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => {
              setExitOpen(false);
              document.getElementById("analyze")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex-1 rounded-lg bg-cyan-300 px-4 py-2 text-sm font-bold text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
          >
            Analyze Free
          </button>
          <button
            type="button"
            onClick={() => setExitOpen(false)}
            className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/40"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
