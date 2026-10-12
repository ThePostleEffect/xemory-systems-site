"use client";
import Link from "next/link";
import { useRef, useState, useEffect, type FormEvent } from "react";
export function ContactForm() {
  const time = useRef(0);
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    time.current = Date.now();
  }, []);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setBusy(true);
    setStatus("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.get("name"),
          emailAddress: data.get("email"),
          message: data.get("message"),
          projectType: data.get("category"),
          organization: "",
          companyWebsite: data.get("website"),
          startedAt: String(time.current),
        }),
      });
      const result = await res.json();
      if (!res.ok || !result.ok)
        throw new Error(
          result.message || "Please check your details and try again.",
        );
      setStatus("Thanks. Your message has been sent.");
      form.reset();
      time.current = Date.now();
    } catch (e) {
      setStatus(
        e instanceof Error
          ? e.message
          : "Unable to send. Please email us directly.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <label>
        Name
        <input
          name="name"
          autoComplete="name"
          required
          minLength={2}
          maxLength={150}
        />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label>
        What’s it about?
        <select name="category">
          <option>General</option>
          <option>Product Support</option>
          <option>Business</option>
          <option>Collaboration</option>
        </select>
      </label>
      <label>
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <p className="contact-privacy">
        We use these details to respond to your inquiry. Please don’t include
        passwords or payment details.{" "}
        <Link href="/privacy">Read our privacy notice.</Link>
      </p>
      <button className="action" disabled={busy}>
        {busy ? "SENDING…" : "SEND MESSAGE ↗"}
      </button>
      <p role="status">{status}</p>
    </form>
  );
}
