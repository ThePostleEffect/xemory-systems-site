export const creativeTiers = [
  { id: "essentials", name: "Essentials", price: 35, line: "A strong starting point.", description: "A complete, usable set of creative work, tailored to your brief through a streamlined workflow." },
  { id: "enhanced", name: "Enhanced", price: 65, line: "Closer to your vision.", description: "More tailored detail and closer reference and brand matching, with extra care in the finishing." },
  { id: "above-beyond", name: "Above & Beyond", price: 98, line: "The most refined finish.", description: "Our highest level of detail, consistency and finishing, with higher-resolution output where the work permits." },
] as const;
export const creativeServices = [
  { id: "images", name: "AI images", title: "Worlds, characters, possibilities.", description: "Illustrations, concept art, lifestyle scenes, website imagery and backgrounds. A themed images-only request is welcome.", icon: "image" },
  { id: "videos", name: "AI short videos", title: "Give an idea a little motion.", description: "Atmospheric clips, B-roll, visual scenes and image-to-video motion. Duration, editing and output are agreed for your brief.", icon: "video" },
  { id: "graphics", name: "Custom graphics", title: "Your brand, in the picture.", description: "Thumbnails, banners, social posts and promotional layouts. Bring your own logo, photos and reference artwork.", icon: "graphics" },
  { id: "tutorials", name: "Tutorial slides", title: "Make the next step clear.", description: "Step-by-step instructions, onboarding and visual walkthroughs, shaped around the information you provide.", icon: "tutorial" },
  { id: "presentations", name: "PowerPoint decks", title: "A story worth presenting.", description: "Editable decks for introductions, projects and ideas. Tell us your audience, purpose and source material; we agree the slide count.", icon: "deck" },
  { id: "prompts", name: "Prompt packs", title: "Better starting points for AI.", description: "Purpose-built prompts for images, video, writing or workflows, tailored to your tools and goals.", icon: "prompt" },
] as const;
export const categoryOptions = [...creativeServices.map(({ id, name }) => ({ id, name })), { id: "other", name: "Other / custom idea" }];
export const uploadLimits = { count: 4, bytes: 4 * 1024 * 1024, pixels: 12_000_000, requestBytes: 17 * 1024 * 1024 };
export type CreativeBrief = { tier: string; categories: string[]; idea: string; name: string; email: string; brand: string; usage: string; links: string; targetDate: string; consent: boolean };
export function validateBrief(value: unknown): { brief?: CreativeBrief; errors: Record<string, string> } {
  const errors: Record<string, string> = {};
  if (!value || typeof value !== "object" || Array.isArray(value)) return { errors: { form: "Please complete your request." } };
  const data = value as Record<string, unknown>;
  const text = (key: string, max: number, min = 0) => {
    if (typeof data[key] !== "string") { errors[key] = "Please enter a valid value."; return ""; }
    const s = (data[key] as string).trim();
    if (s.length < min || s.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(s)) errors[key] = `Use ${min ? `at least ${min} and ` : ""}no more than ${max.toLocaleString()} characters.`;
    return s;
  };
  const brief: CreativeBrief = { tier: text("tier", 30), categories: [], idea: text("idea", 6000, 20), name: text("name", 150, 2), email: text("email", 254, 3).toLowerCase(), brand: text("brand", 150), usage: text("usage", 500), links: text("links", 2000), targetDate: text("targetDate", 10), consent: data.consent === true };
  if (!creativeTiers.some(t => t.id === brief.tier)) errors.tier = "Choose one tier.";
  if (!Array.isArray(data.categories) || !data.categories.length || data.categories.length > categoryOptions.length || data.categories.some(c => typeof c !== "string" || !categoryOptions.some(o => o.id === c))) errors.categories = "Choose one service or a custom mix.";
  else brief.categories = [...new Set(data.categories as string[])];
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email)) errors.email = "Enter an email address we can reply to.";
  if (brief.targetDate && (!/^\d{4}-\d{2}-\d{2}$/.test(brief.targetDate) || !Number.isFinite(Date.parse(brief.targetDate)) || new Date(brief.targetDate).toISOString().slice(0, 10) !== brief.targetDate)) errors.targetDate = "Choose a valid target date.";
  if (!brief.consent) errors.consent = "Please confirm permission to use your submitted material.";
  return Object.keys(errors).length ? { errors } : { brief, errors };
}
