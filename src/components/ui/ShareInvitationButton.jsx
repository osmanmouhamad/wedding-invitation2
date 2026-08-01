import { useEffect, useRef, useState } from "react";

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="size-5"
    >
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="m8.2 10.8 7.6-4.5" />
      <path d="m8.2 13.2 7.6 4.5" />
    </svg>
  );
}

async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textArea);

  if (!copied) {
    throw new Error("Copy failed");
  }
}

export default function ShareInvitationButton({ couple, sharing }) {
  const [status, setStatus] = useState("idle");
  const resetTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const scheduleReset = () => {
    if (resetTimerRef.current) {
      window.clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = window.setTimeout(() => {
      setStatus("idle");
    }, 2500);
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = `دعوة زفاف ${couple.groomName} و${couple.brideName}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: sharing.shareText,
          url,
        });
        return;
      }

      await copyText(url);
      setStatus("copied");
      scheduleReset();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        return;
      }

      setStatus("error");
      scheduleReset();
    }
  };

  const statusMessage =
    status === "copied"
      ? sharing.copiedLabel
      : status === "error"
        ? sharing.errorLabel
        : "";

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#b9935e]/35 bg-[#fffaf2]/75 px-5 py-3 text-sm font-medium text-[#705949] shadow-[0_10px_24px_rgba(92,66,48,0.08)] transition hover:-translate-y-0.5 hover:bg-[#fffaf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b9935e]/55 focus-visible:ring-offset-4"
      >
        <ShareIcon />
        <span>{sharing.label}</span>
      </button>

      <p
        aria-live="polite"
        className="mt-3 min-h-5 text-xs font-medium text-[#927866]"
      >
        {statusMessage}
      </p>
    </div>
  );
}
