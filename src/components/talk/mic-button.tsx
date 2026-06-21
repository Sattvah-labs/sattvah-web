"use client";

import { useEffect, useRef, useState } from "react";

import { transcribe } from "@/lib/talk-api";

type RecState = "idle" | "asking-mic" | "recording" | "uploading" | "done" | "error";

/**
 * Stub mic button. Tap = ask for mic, record via MediaRecorder, POST to
 * /api/voice/transcribe, surface the returned text. Real STT lands in
 * A18. For now /api/voice/transcribe returns a fixture string in mock
 * mode so the surface is fully demoable.
 */
export function MicButton() {
  const [state, setState] = useState<RecState>("idle");
  const [transcript, setTranscript] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    return () => {
      // Stop any in-flight recording when the surface unmounts.
      if (recorderRef.current && recorderRef.current.state !== "inactive") {
        recorderRef.current.stop();
      }
    };
  }, []);

  async function start() {
    setError(null);
    setTranscript("");
    setState("asking-mic");
    try {
      if (typeof navigator === "undefined" || !navigator.mediaDevices) {
        throw new Error("Voice is not supported in this browser. Use the tiles below.");
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const rec = new MediaRecorder(stream);
      recorderRef.current = rec;
      chunksRef.current = [];
      rec.ondataavailable = (ev) => {
        if (ev.data && ev.data.size > 0) chunksRef.current.push(ev.data);
      };
      rec.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        setState("uploading");
        try {
          const r = await transcribe(blob);
          setTranscript(r.text);
          setState("done");
        } catch (e) {
          setError(e instanceof Error ? e.message : "Could not understand. Try again.");
          setState("error");
        }
      };
      rec.start();
      setState("recording");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Mic blocked. Allow microphone access in your browser.");
      setState("error");
    }
  }

  function stop() {
    const rec = recorderRef.current;
    if (rec && rec.state !== "inactive") rec.stop();
  }

  const recording = state === "recording";
  const label = recording ? "Stop and send" : "Tap to talk";

  return (
    <div className="flex flex-col items-center" data-testid="mic-region">
      <button
        type="button"
        onClick={recording ? stop : start}
        aria-label={label}
        aria-pressed={recording}
        data-testid="mic-button"
        disabled={state === "asking-mic" || state === "uploading"}
        className={[
          "relative inline-flex items-center justify-center",
          "h-40 w-40 md:h-48 md:w-48 rounded-full",
          "bg-accent text-accent-foreground",
          "shadow-[0_20px_80px_-20px_hsl(36_92%_58%/0.65)]",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-accent/40",
          "transition-transform active:scale-95 disabled:opacity-60",
          recording ? "motion-safe:animate-pulse" : "",
        ].join(" ")}
      >
        {/* Mic glyph, pure SVG so the bundle stays tiny. */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-16 w-16 md:h-20 md:w-20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0" />
          <line x1="12" y1="18" x2="12" y2="22" />
          <line x1="8" y1="22" x2="16" y2="22" />
        </svg>
        <span className="sr-only">{label}</span>
      </button>
      <p className="mt-4 text-lg md:text-xl text-foreground/80" aria-live="polite">
        {state === "idle" && "Tap to talk."}
        {state === "asking-mic" && "Asking mic..."}
        {state === "recording" && "Listening. Tap again to send."}
        {state === "uploading" && "Sending..."}
        {state === "done" && "Heard you."}
        {state === "error" && (error || "Could not record.")}
      </p>
      {transcript && (
        <p
          data-testid="transcript"
          className="mt-3 max-w-md text-center text-base text-foreground/70"
        >
          &ldquo;{transcript}&rdquo;
        </p>
      )}
    </div>
  );
}
