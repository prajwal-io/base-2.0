"use client";

import { useActionState, useState } from "react";
import { Send } from "lucide-react";
import { prepareJoin } from "@/app/join-actions";
import type { JoinState } from "@/lib/join-submission";
import { EmailDraftActions } from "./EmailDraftActions";

const initialState: JoinState = { status: "idle" };
const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-border-strong bg-white px-4 text-base text-charcoal-950 placeholder:text-charcoal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange";
const labelClass = "block text-sm font-semibold text-charcoal-900";

export default function JoinForm() {
  const [state, action, pending] = useActionState(prepareJoin, initialState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(value: string, checked: boolean) {
    setInterests((current) => checked ? [...current, value] : current.filter((interest) => interest !== value));
  }

  return (
    <form action={action} className="space-y-5" aria-label="Join the BacktoBase community">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass} htmlFor="join-name">Full name
          <input id="join-name" name="name" autoComplete="name" required maxLength={120} className={fieldClass} value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className={labelClass} htmlFor="join-email">Email address
          <input id="join-email" name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
      </div>
      <label className={labelClass} htmlFor="join-role">Profession or current role <span className="font-normal text-charcoal-600">(optional)</span>
        <input id="join-role" name="role" maxLength={120} placeholder="Student, engineer, mentor, creator…" className={fieldClass} value={role} onChange={(event) => setRole(event.target.value)} />
      </label>
      <fieldset>
        <legend className={labelClass}>Areas of interest <span className="font-normal text-charcoal-600">(optional)</span></legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["events", "Attend community events"],
            ["mentoring", "Mentor or share experience"],
            ["building", "Build with the community"],
            ["volunteering", "Volunteer"],
            ["partnerships", "Explore a partnership"],
          ].map(([value, label]) => (
            <label key={value} className="flex min-h-11 items-center gap-3 rounded-xl border border-border-subtle bg-white px-3 text-sm text-charcoal-800">
              <input name="interests" type="checkbox" value={value} checked={interests.includes(value)} onChange={(event) => toggleInterest(value, event.target.checked)} className="size-4 accent-brand-orange" />{label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="hidden" aria-hidden="true"><label htmlFor="join-website">Website</label><input id="join-website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <button type="submit" disabled={pending} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-orange-ink px-6 text-sm font-bold text-white transition-colors hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 disabled:opacity-60">
        {pending ? "Preparing…" : "Join BacktoBase"}<Send aria-hidden="true" className="size-4" />
      </button>
      <p className="text-xs leading-relaxed text-charcoal-700">Your details prepare an email draft only. The site does not store your application or send it to BacktoBase; you choose whether to send it.</p>
      <div className="text-sm text-charcoal-800">
        {state.status === "error" && <p role="status">{state.message}</p>}
        {state.status === "draft" && <><p role="status" className="mb-2">Your application details are ready. Copy them into your email draft before sending.</p><EmailDraftActions draftText={state.draftText} gmailUrl={state.gmailUrl} mailtoUrl={state.mailtoUrl} /></>}
      </div>
    </form>
  );
}
