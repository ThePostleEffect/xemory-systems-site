import type { Metadata } from "next";
import { LegalLayout, type LegalSection } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "How Xemory Systems handles website visits, contact messages and digital-product purchase information.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "scope",
    title: "Who this notice covers",
    content: (
      <>
        <p>
          Xemory Systems (“we,” “us” or “Xemory”) operates the Xemory Systems
          website and Xemory Products store from Bellingham, Washington, United
          States. This notice covers information handled in connection with this
          website, inquiries to us and our digital-product sales.
        </p>
        <p>
          Payhip checkout and other external services also have their own
          privacy notices. Downloaded products may work differently from this
          website; review the product guide before entering personal information
          into a tool.
        </p>
      </>
    ),
  },
  {
    id: "information",
    title: "Information we receive",
    content: (
      <>
        <ul>
          <li>
            <strong>Visits:</strong> our web server and hosting service can
            receive your IP address, requested page, access time, browser
            information, referring page and technical or error information.
          </li>
          <li>
            <strong>Contact:</strong> when you email us or use an available
            contact form, we receive your name, email address, inquiry category,
            message and any information you choose to include. The form also
            submits a start time and a hidden anti-spam field.
          </li>
          <li>
            <strong>Purchases:</strong> Payhip makes order information available
            to us, such as the buyer’s name and email address, purchased item,
            amount, payment status and relevant billing, tax or download
            information. Payment details are entered with the checkout payment
            provider. This website does not collect full card numbers or
            security codes.
          </li>
        </ul>
        <p>
          Please do not send passwords, API keys, payment-card details or
          sensitive personal records in a support message.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "Why information is used",
    content: (
      <>
        <p>
          Information is used to serve and secure the website, diagnose
          problems, respond to inquiries, deliver and support purchases, handle
          refunds or disputes, prevent abuse and maintain records required for
          business and legal obligations.
        </p>
        <p>
          Submitting a contact message does not subscribe you to a marketing
          list. This website has no newsletter signup, advertising pixels or
          visitor-analytics scripts. We use private server-log reports to
          estimate daily visitors, page requests and referring sites. Known
          bots, assets, API calls and identifiable page-prefetch requests are
          excluded. Visitor estimates use an IP address and browser information
          for each day; they do not identify verified individuals. The report
          shows aggregate counts and referring domains, not individual IP
          addresses or full referring URLs. If you separately choose to receive
          marketing through the store, use the unsubscribe option in those
          messages or contact us.
        </p>
      </>
    ),
  },
  {
    id: "storage",
    title: "Browser storage & tracking",
    content: (
      <>
        <p>
          The entrance saves <code>xemory-entered</code> with the value{" "}
          <code>1</code> in your browser’s session storage after you enter. It
          remembers that the introduction has been shown in that tab. It is not
          a unique visitor ID and the site does not send it to our server.
        </p>
        <p>
          Session storage normally lasts for the tab’s session; browser session
          restoration can preserve it. You can clear site data in your browser.
          Blocking storage may cause the introduction to appear again, but you
          can still browse the site.
        </p>
        <p>
          This website does not set advertising or analytics cookies, and it
          does not track you across other websites. It does not change its
          behavior in response to a Do Not Track signal. Payhip and payment
          providers may use their own cookies and fraud-prevention technologies
          after you follow a checkout link.
        </p>
      </>
    ),
  },
  {
    id: "providers",
    title: "Service providers & sharing",
    content: (
      <>
        <p>
          Information passes through services needed to operate the site and
          handle your requests:
        </p>
        <ul>
          <li>
            <a href="https://www.digitalocean.com/legal/privacy-policy">
              DigitalOcean
            </a>{" "}
            provides website hosting.
          </li>
          <li>
            <a href="https://resend.com/legal/privacy-policy">Resend</a>{" "}
            delivers messages submitted through the contact form when that form
            is enabled. Our email service also handles messages sent to our
            contact address.
          </li>
          <li>
            <a href="https://payhip.com/privacy">Payhip</a> hosts the store and
            manages checkout and digital-file delivery.
          </li>
          <li>
            <a href="https://stripe.com/privacy">Stripe</a>, or another payment
            method expressly shown at checkout, processes payments.
          </li>
        </ul>
        <p>
          We do not sell information collected through this website or share it
          for cross-context behavioral advertising. Information may be disclosed
          when reasonably necessary to meet legal obligations, address fraud or
          security incidents, or protect legal rights. These service providers
          may process information in the United States and other countries under
          their applicable policies and safeguards.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "Retention & security",
    content: (
      <>
        <p>
          We retain information as needed for the purpose it was collected:
          responding to an inquiry, providing support, keeping transaction
          records, resolving disputes or meeting legal obligations. Relevant
          factors include whether a request remains open, whether a purchase
          record is needed for accounting or tax purposes, and whether a legal
          preservation requirement applies. Provider logs, backups and records
          may have separate retention periods.
        </p>
        <p>
          Our dedicated traffic log records IP addresses, browser information,
          public page paths, access times and referring domains without URL
          query strings. It rotates daily with up to 14 archived logs; the
          current log is also retained. Private traffic reports cover a rolling
          14-day period. Ordinary hosting and security logs are separate and may
          retain additional request details. No separate analytics company
          receives this traffic data.
        </p>
        <p>
          Contact us about deletion of information we control. Some records may
          need to be retained for legal, accounting or security reasons. No
          website, email service or storage system can guarantee absolute
          security.
        </p>
      </>
    ),
  },
  {
    id: "choices",
    title: "Your choices & requests",
    content: (
      <>
        <p>
          You can choose not to send a message or make a purchase. You can ask
          to access, correct or delete personal information we hold by emailing{" "}
          <a href="mailto:contact@xemorysystems.com">
            contact@xemorysystems.com
          </a>
          . Include enough context to locate your request, such as the email
          used for an order; do not include payment-card details. We may need
          proportionate identity verification before releasing or changing
          information.
        </p>
        <p>
          Depending on your location and applicable law, you may also have
          rights to restrict or object to processing, receive a portable copy,
          withdraw consent where processing relies on it, appeal a decision or
          complain to a privacy regulator. We will handle requests as required
          by the law that applies. Information independently controlled by
          Payhip or a payment provider may require a separate request to that
          provider.
        </p>
      </>
    ),
  },
  {
    id: "children",
    title: "Children’s information",
    content: (
      <>
        <p>
          The site is intended for a general audience and does not ask children
          to create accounts or submit personal information. Children under 13
          should not send personal information through the site. A parent or
          guardian who believes a child has submitted information can contact us
          so we can investigate and address it.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to this notice",
    content: (
      <>
        <p>
          We will update this page and its revision date when our practices
          change. Where required, we will provide additional notice or obtain
          consent before using information in a materially different way.
        </p>
      </>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalLayout
      title="PRIVACY."
      summary="What the site receives, why it is used, and how to get in touch about your information."
      sections={sections}
      related="terms"
    />
  );
}
