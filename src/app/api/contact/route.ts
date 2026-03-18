import { NextResponse } from "next/server";

import { type ContactFormValues, validateContactForm } from "@/lib/contact-form";
import { siteContent } from "@/lib/site-content";

export const runtime = "nodejs";

const resendApiUrl = "https://api.resend.com/emails";

type ResendError = {
  message?: string;
  name?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Partial<ContactFormValues>;

    const values: ContactFormValues = {
      fullName: payload.fullName ?? "",
      emailAddress: payload.emailAddress ?? "",
      organization: payload.organization ?? "",
      projectType: (payload.projectType as ContactFormValues["projectType"]) ?? "Other",
      message: payload.message ?? "",
      companyWebsite: payload.companyWebsite ?? "",
      startedAt: payload.startedAt ?? "",
    };

    if (values.companyWebsite.trim()) {
      return NextResponse.json({ ok: true });
    }

    const startedAtMs = Number(values.startedAt);
    if (Number.isFinite(startedAtMs) && Date.now() - startedAtMs < 2500) {
      return NextResponse.json({ ok: true });
    }

    const errors = validateContactForm(values);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { ok: false, errors, message: "Please review the highlighted fields and try again." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const toEmail = process.env.CONTACT_TO_EMAIL || siteContent.contactEmail;

    if (!resendApiKey || !fromEmail) {
      return NextResponse.json(
        {
          ok: false,
          message: "Contact delivery is not configured yet. Please try again or email us directly.",
        },
        { status: 500 },
      );
    }

    const subject = `${siteContent.contactSubject} - ${values.projectType}`;
    const text = [
      "New inquiry from the Xemory Systems website",
      "",
      `Full Name: ${values.fullName}`,
      `Email Address: ${values.emailAddress}`,
      `Organization / Company: ${values.organization}`,
      `Project Type: ${values.projectType}`,
      "",
      "Message:",
      values.message,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin-bottom: 16px;">New inquiry from the Xemory Systems website</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(values.fullName)}</p>
        <p><strong>Email Address:</strong> ${escapeHtml(values.emailAddress)}</p>
        <p><strong>Organization / Company:</strong> ${escapeHtml(values.organization)}</p>
        <p><strong>Project Type:</strong> ${escapeHtml(values.projectType)}</p>
        <div style="margin-top: 20px;">
          <strong>Message:</strong>
          <p style="white-space: pre-wrap;">${escapeHtml(values.message)}</p>
        </div>
      </div>
    `;

    const response = await fetch(resendApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: values.emailAddress,
        subject,
        text,
        html,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as ResendError | null;
      console.error("Resend contact form delivery failed", errorBody);

      return NextResponse.json(
        {
          ok: false,
          message: "Something went wrong while sending your inquiry. Please try again or email us directly.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unexpected contact form error", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while sending your inquiry. Please try again or email us directly.",
      },
      { status: 500 },
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
