import Image from "next/image";
import { type LabItem, checkout } from "@/lib/lab";
export function LabCard({ item }: { item: LabItem }) {
  return (
    <article className="lab-card" id={`creation-${item.id}`}>
      <div className="card-topline">
        <span>XS—{item.number}</span>
        <span
          className={`status ${item.status === "Experimental" ? "experimental" : ""}`}
        >
          <i />
          {item.status}
        </span>
      </div>
      <div className="card-image">
        <Image
          src={`/creations/${item.image}.png`}
          alt={`${item.title} — ${item.id === "86Tbx" ? "concept illustration" : "product preview"}`}
          fill
          sizes="(max-width: 680px) 90vw, (max-width: 1000px) 45vw, 32vw"
        />
      </div>
      <div className="card-content">
        <p className="eyebrow muted">{item.category}</p>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <details>
          <summary>
            Inside this creation <span aria-hidden="true">+</span>
          </summary>
          <p>{item.includes}</p>
          <p>{item.note}</p>
          <a href={`https://payhip.com/b/${item.id}`}>Full product details ↗</a>
        </details>
        <div className="card-buy">
          <span>
            ${item.price.toFixed(2)} <small>USD</small>
          </span>
          <a
            href={checkout(item.id)}
            aria-label={`Get ${item.title} for $${item.price.toFixed(2)} on Payhip`}
          >
            GET IT <span aria-hidden="true">↗</span>
          </a>
        </div>
        {item.status === "Experimental" && (
          <p className="prototype-note">
            Prototype instructions · Hardware not included
            <br />
            Physical build validation pending
          </p>
        )}
      </div>
    </article>
  );
}
