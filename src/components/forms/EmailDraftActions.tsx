"use client";

import { useState } from "react";
import { ArrowUpRight, Copy } from "lucide-react";

export function EmailDraftActions({
  draftText,
  gmailUrl,
  mailtoUrl,
}: {
  draftText: string;
  gmailUrl: string;
  mailtoUrl: string;
}) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draftText);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      <button type="button" onClick={copyDraft} className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange">
        <Copy aria-hidden="true" className="size-4" />Copy email details
      </button>
      <a className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange" href={gmailUrl} target="_blank" rel="noopener noreferrer">Open Gmail draft <ArrowUpRight aria-hidden="true" className="size-4" /></a>
      <a className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand-orange-ink underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange" href={mailtoUrl}>Open email app <ArrowUpRight aria-hidden="true" className="size-4" /></a>
      <p role="status" aria-live="polite" className="basis-full text-sm text-charcoal-700">
        {copyStatus === "copied" && "Copied. Paste the details into your email draft."}
        {copyStatus === "failed" && "Copy was blocked. Select and copy the draft text below."}
      </p>
      {copyStatus === "failed" && <textarea aria-label="Email draft details to copy" readOnly value={draftText} rows={5} className="basis-full rounded-xl border border-border-strong bg-canvas-base p-3 text-sm text-charcoal-900" />}
    </div>
  );
}
