import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, type LegalSection } from "@/components/legal-layout";

export const metadata: Metadata = {
  title: "Terms & Purchases",
  description:
    "Xemory Systems purchase information, digital-product licenses, refunds and support.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "seller",
    title: "Who you’re buying from",
    content: (
      <>
        <p>
          Xemory Systems (“Xemory,” “we” or “us”) operates the Xemory Systems
          website and Xemory Products store from Bellingham, Washington, United
          States. Reach us at{" "}
          <a href="mailto:contact@xemorysystems.com">
            contact@xemorysystems.com
          </a>
          .
        </p>
        <p>
          These terms explain use of this site and purchases of our digital
          products. Review the product listing, license and checkout details
          before purchasing. Product-specific terms disclosed at the time of
          purchase govern that product if they differ from these general terms.
          Nothing here takes away rights you have under applicable consumer law.
        </p>
      </>
    ),
  },
  {
    id: "digital-products",
    title: "What a purchase includes",
    content: (
      <>
        <p>
          Our current catalog consists of digital guides, source files, artwork
          and templates. You are buying downloadable instructions or files—not
          hardware, a physical robot, a computer, a hosted service or a
          done-for-you installation.
        </p>
        <p>
          The listing identifies the included files and requirements. Computers,
          electronics, tools, domains, hosting, paid software and AI-service
          access are separate unless expressly included. Hardware-cost estimates
          vary by location, supplier, tax, shipping and availability.
        </p>
        <p>
          Products labeled experimental or prototype may require troubleshooting
          and further validation. The Desk Buddy Build Guide is a prototype
          guide with physical build validation pending. Check compatibility,
          follow equipment safety instructions and get qualified help where
          needed.
        </p>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment & delivery",
    content: (
      <>
        <p>
          Website prices are in US dollars. Review the final checkout total,
          including any applicable taxes, before paying. Your bank or payment
          provider may apply currency-conversion or other fees.
        </p>
        <p>
          Purchase links open Payhip, where the available payment provider
          processes payment and Payhip provides digital-file delivery. Use an
          email address you can access and keep the order receipt and download
          information. If delivery fails or a file is missing, contact us with
          the product name and order reference. Do not send card details.
        </p>
        <p>
          A digital-file purchase does not include a subscription, ongoing
          custom development, lifetime updates or unlimited support unless the
          listing expressly says so. Download and back up your files. You must
          be legally able to make the purchase, or have a parent or guardian
          purchase for you.
        </p>
      </>
    ),
  },
  {
    id: "creative-requests",
    title: "Custom creative requests",
    content: <p>Custom creative requests are separate from ready-made digital downloads.
      Submitting a brief does not make a purchase or start production. We discuss
      the achievable deliverables, output specifications, timing and purchase
      details with you before production and payment. A selected starting budget is not a final quote. We agree the scope, total price,
        revisions and delivery date before payment. This is not a subscription or unlimited work.</p>,
  },
  {
    id: "refunds",
    title: "14-day money-back guarantee",
    content: (
      <>
        <p>
          <strong>
            If a product isn’t right for you, contact us within 14 days of
            purchase for a full refund of the amount paid for that product.
          </strong>{" "}
          You do not need to prove that the files are defective or unused.
          Downloading the files or using a promotional reward does not remove
          this guarantee.
        </p>
        <p>
          Email{" "}
          <a href="mailto:contact@xemorysystems.com">
            contact@xemorysystems.com
          </a>{" "}
          with the product name and order reference or the email address used at
          checkout. For a multi-product order, tell us which items you want
          refunded. No special explanation is required.
        </p>
        <p>
          Refunds are returned through the original payment method, including
          applicable refundable taxes. The time it takes for the refund to
          appear depends on the payment provider and your bank. A refund returns
          the money paid; promotional credit or a discount is not redeemable for
          additional cash.
        </p>
        <p>
          This guarantee is in addition to your legal rights. If a product is
          missing, faulty or not as described, contact us even after 14 days.
          Nothing in these terms limits a remedy or refund required by
          applicable law.
        </p>
      </>
    ),
  },
  {
    id: "licenses",
    title: "Using the files you buy",
    content: (
      <>
        <p>
          You receive the permissions in the product’s license, rather than
          ownership of Xemory’s underlying product content. The following
          summaries link to the licenses supplied with the current editions:
        </p>
        <ul>
          <li>
            <a href="/licenses/first-website.txt">First Website Kit:</a>{" "}
            customize and publish personal, business or client websites,
            including handing a finished site’s source to your client. Do not
            resell the guide or substantially unchanged starter as a kit.
          </li>
          <li>
            <a href="/licenses/animated-buddy.txt">Animated Desktop Buddy:</a>{" "}
            personal use and customization; you may show screenshots and videos.
            No kit or source redistribution or resale rights.
          </li>
          <li>
            <a href="/licenses/robot-faces.txt">DIY Robot Face Pack:</a> use and
            modify artwork in personal or commercial finished projects,
            including distribution as an integrated part of those projects. No
            standalone asset-pack resale or redistribution.
          </li>
          <li>
            <a href="/licenses/command-center.txt">Personal Command Center:</a>{" "}
            personal use and source customization on your own devices. No kit
            redistribution or resale.
          </li>
          <li>
            <a href="/licenses/launch-kit.txt">Digital Product Launch Kit:</a>{" "}
            adapt templates into materials for your own business and publish the
            completed copy. Do not redistribute the blank templates, guide or
            source as a kit.
          </li>
        </ul>
        <p>
          For other products, follow the permissions in the listing and included
          files. A purchase does not by itself grant permission to redistribute
          a guide or resell the original download. Third-party materials you add
          remain subject to their own rights and licenses.
        </p>
      </>
    ),
  },
  {
    id: "support",
    title: "Support & expectations",
    content: (
      <>
        <p>
          For download problems or questions about the supplied files, contact
          us with the product name, a description of the problem and your order
          reference. Custom programming, hardware assembly and third-party
          account setup are not included unless stated in the listing.
        </p>
        <p>
          Guides, examples and AI-assisted workflows require your review. We do
          not promise a particular business outcome, earnings, uninterrupted
          third-party services or compatibility with every device or future
          software version. Keep backups before changing code or data. Any
          “as-is” language in a product license applies only to the extent
          permitted by law and does not override the refund policy or mandatory
          rights.
        </p>
      </>
    ),
  },
  {
    id: "site-use",
    title: "Website use & third parties",
    content: (
      <>
        <p>
          Do not use this site to submit unlawful material, infringe others’
          rights, introduce malicious code or interfere with services. The
          Xemory name, branding and site content are not transferred to you by a
          purchase.
        </p>
        <p>
          Payhip, Stripe, OpenAI, Codex and other third-party names belong to
          their respective owners. Their names describe services or
          compatibility; they do not imply sponsorship or endorsement of
          Xemory’s independent products. External services have their own terms,
          fees and privacy practices.
        </p>
        <p>
          See our <Link href="/privacy">privacy notice</Link> for information
          about website visits, contact messages and purchase information.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes & questions",
    content: (
      <>
        <p>
          We may update the site, catalog and these terms. The revision date
          appears above. Changes do not retroactively remove permissions or
          purchase rights already granted. A future promotion or membership
          applies only when its specific terms are published and the offer is
          available; a mention of a planned offer is not an active checkout
          benefit.
        </p>
        <p>
          If something is unclear, contact us before buying so we can explain
          what is included.
        </p>
      </>
    ),
  },
];

export default function Terms() {
  return (
    <LegalLayout
      title="TERMS."
      summary="Straightforward information about digital purchases, permissions, refunds and support."
      sections={sections}
      related="privacy"
    />
  );
}
