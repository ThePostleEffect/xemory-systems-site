"use client";

import type { FormEvent } from "react";
import { useEffect, useId, useRef, useState } from "react";

import {
  type ContactFormErrors,
  type ContactFormValues,
  projectTypeOptions,
  validateContactForm,
} from "@/lib/contact-form";
import { siteContent } from "@/lib/site-content";

export function ContactIntakeForm() {
  const startedAtRef = useRef("");
  const formId = useId();
  const [form, setForm] = useState({
    fullName: "",
    emailAddress: "",
    organization: "",
    projectType: projectTypeOptions[0],
    message: "",
    companyWebsite: "",
  });
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    startedAtRef.current = Date.now().toString();
  }, []);

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload: ContactFormValues = {
      ...form,
      startedAt: startedAtRef.current || "",
    };

    const nextErrors = validateContactForm(payload);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setStatusMessage("Please review the highlighted fields and try again.");
      return;
    }

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string; errors?: ContactFormErrors }
        | null;

      if (!response.ok || !result?.ok) {
        if (result?.errors) {
          setErrors(result.errors);
        }
        setStatus("error");
        setStatusMessage(
          result?.message ||
            "Something went wrong while sending your inquiry. Please try again or email us directly.",
        );
        return;
      }

      setStatus("success");
      setStatusMessage("Thank you. Your inquiry has been sent successfully.");
      setErrors({});
      setForm({
        fullName: "",
        emailAddress: "",
        organization: "",
        projectType: projectTypeOptions[0],
        message: "",
        companyWebsite: "",
      });
      startedAtRef.current = Date.now().toString();
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong while sending your inquiry. Please try again or email us directly.");
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit} className="grid gap-5">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${formId}-companyWebsite`}>Company website</label>
        <input
          id={`${formId}-companyWebsite`}
          type="text"
          name="companyWebsite"
          tabIndex={-1}
          autoComplete="off"
          value={form.companyWebsite}
          onChange={(event) => updateField("companyWebsite", event.target.value)}
        />
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">Full Name</span>
          <input
            type="text"
            id={`${formId}-fullName`}
            name="fullName"
            autoComplete="name"
            required
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? `${formId}-fullName-error` : undefined}
            className="min-h-14 rounded-[1.3rem] border border-white/10 bg-[rgba(5,9,14,0.72)] px-4 text-[1.02rem] text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/20"
            placeholder="Your full name"
          />
          {errors.fullName ? (
            <p id={`${formId}-fullName-error`} className="text-sm text-[var(--accent-amber)]">
              {errors.fullName}
            </p>
          ) : null}
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
            Email Address
          </span>
          <input
            type="email"
            id={`${formId}-emailAddress`}
            name="emailAddress"
            autoComplete="email"
            required
            value={form.emailAddress}
            onChange={(event) => updateField("emailAddress", event.target.value)}
            aria-invalid={errors.emailAddress ? true : undefined}
            aria-describedby={errors.emailAddress ? `${formId}-emailAddress-error` : undefined}
            className="min-h-14 rounded-[1.3rem] border border-white/10 bg-[rgba(5,9,14,0.72)] px-4 text-[1.02rem] text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/20"
            placeholder="you@organization.com"
          />
          {errors.emailAddress ? (
            <p id={`${formId}-emailAddress-error`} className="text-sm text-[var(--accent-amber)]">
              {errors.emailAddress}
            </p>
          ) : null}
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
          Organization / Company
        </span>
        <input
          type="text"
          id={`${formId}-organization`}
          name="organization"
          autoComplete="organization"
          required
          value={form.organization}
          onChange={(event) => updateField("organization", event.target.value)}
          aria-invalid={errors.organization ? true : undefined}
          aria-describedby={errors.organization ? `${formId}-organization-error` : undefined}
          className="min-h-14 rounded-[1.3rem] border border-white/10 bg-[rgba(5,9,14,0.72)] px-4 text-[1.02rem] text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/20"
          placeholder="Organization or team"
        />
        {errors.organization ? (
          <p id={`${formId}-organization-error`} className="text-sm text-[var(--accent-amber)]">
            {errors.organization}
          </p>
        ) : null}
      </label>

      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">Project Type</span>
          <select
            id={`${formId}-projectType`}
            name="projectType"
            value={form.projectType}
            onChange={(event) => updateField("projectType", event.target.value)}
            aria-invalid={errors.projectType ? true : undefined}
            aria-describedby={errors.projectType ? `${formId}-projectType-error` : undefined}
            className="min-h-14 rounded-[1.3rem] border border-white/10 bg-[rgba(5,9,14,0.72)] px-4 text-[1.02rem] text-[var(--foreground)] outline-none transition focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/20"
          >
            {projectTypeOptions.map((option) => (
              <option key={option} value={option} className="bg-[var(--background)] text-[var(--foreground)]">
                {option}
              </option>
            ))}
          </select>
          {errors.projectType ? (
            <p id={`${formId}-projectType-error`} className="text-sm text-[var(--accent-amber)]">
              {errors.projectType}
            </p>
          ) : null}
        </label>
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--muted)]">Message</span>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={7}
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          className="rounded-[1.5rem] border border-white/10 bg-[rgba(5,9,14,0.72)] px-4 py-4 text-[1.02rem] leading-[1.7] text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--accent-cyan)] focus:ring-2 focus:ring-[var(--accent-cyan)]/20"
          placeholder="Tell us what you are working on, what feels blocked, and what a good outcome would look like."
        />
        {errors.message ? (
          <p id={`${formId}-message-error`} className="text-sm text-[var(--accent-amber)]">
            {errors.message}
          </p>
        ) : null}
      </label>

      <div className="flex flex-col gap-4 pt-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.98rem] leading-[1.7] text-[var(--muted)]">
            Prefer direct contact? Email{" "}
            <a
              href={`mailto:${siteContent.contactEmail}`}
              className="text-[var(--foreground)] underline decoration-white/20 underline-offset-4 transition hover:decoration-[var(--accent-cyan)]"
            >
              {siteContent.contactEmail}
            </a>
            {" "}or call {siteContent.contactPhone}.
          </p>
          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[color:var(--accent-amber)]/35 bg-[linear-gradient(135deg,rgba(244,180,107,0.18),rgba(134,216,255,0.14))] px-7 py-3 text-sm font-semibold tracking-[0.18em] text-[var(--foreground)] uppercase shadow-[0_18px_40px_rgba(0,0,0,0.32)] transition hover:border-[color:var(--accent-cyan)]/45 hover:shadow-[0_20px_55px_rgba(27,83,128,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send Inquiry"}
          </button>
        </div>

        <div aria-live="polite" className="min-h-6">
          {status === "success" ? (
            <p className="text-sm text-[var(--accent-cyan)]">
              Thank you. Your inquiry has been sent successfully.
            </p>
          ) : null}
          {status === "error" && statusMessage ? (
            <p className="text-sm text-[var(--accent-amber)]">
              {statusMessage}
            </p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
