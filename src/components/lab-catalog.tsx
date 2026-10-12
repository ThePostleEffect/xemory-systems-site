"use client";
import { useState } from "react";
import { labItems } from "@/lib/lab";
import { LabCard } from "./lab-card";
const categories = [
  "All creations",
  "Creative software",
  "Build guides",
  "Creative assets",
];
export function LabCatalog() {
  const [category, setCategory] = useState(categories[0]);
  const shown = labItems.filter(
    (i) => category === categories[0] || i.category === category,
  );
  return (
    <>
      <div className="catalog-toolbar">
        <div className="filters" role="group" aria-label="Filter creations">
          {categories.map((c) => (
            <button
              key={c}
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <span aria-live="polite">
          {String(shown.length).padStart(2, "0")} CREATIONS
        </span>
      </div>
      <div className="lab-grid">
        {shown.map((i) => (
          <LabCard item={i} key={i.id} />
        ))}
      </div>
    </>
  );
}
