// A small public preview rig. Artwork stays in the supplied SVG files.
export type DemoReaction = "Wave" | "Happy hop" | "Dance";
export function reactBuddy(host: HTMLElement, reaction: DemoReaction, reduced: boolean) {
  host.getAnimations({ subtree: true }).forEach((animation) => animation.cancel());
  const parts = Object.fromEntries(Array.from(host.querySelectorAll<SVGElement>("[data-part]"), (node) => {
    node.style.transformBox = "view-box";
    node.style.transformOrigin = node.dataset.pivot || "180px 170px";
    return [node.dataset.part!, node];
  }));
  if (reduced) return;
  const play = (part: string, frames: Keyframe[], duration: number, delay = 0) =>
    parts[part]?.animate(frames, { duration, delay, easing: "ease-in-out" });
  if (reaction === "Wave") {
    play("greeting", [0, -58, -35, -70, -35, -58, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 1600);
    play("head", [0, -5, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 1600);
    play("body", [{ transform: "translateY(0)" }, { transform: "translateY(-5px)" }, { transform: "translateY(0)" }], 1600);
  } else if (reaction === "Happy hop") {
    play("body", ["none", "translateY(4px) scale(1.03,.97)", "translateY(-28px) scale(.98,1.03)", "translateY(2px) scale(1.03,.97)", "translateY(-17px)", "none"].map((transform) => ({ transform })), 1350);
    play("greeting", [0, -45, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 1350);
    play("support", [0, 35, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 1350);
  } else {
    play("body", [0, -7, 7, -9, 9, -5, 0].map((n) => ({ transform: `translateY(-4px) rotate(${n}deg)` })), 2100);
    play("head", [0, 8, -8, 8, -8, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 2100);
    play("greeting", [0, -65, -15, -60, -15, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 2100);
    play("support", [0, 15, 50, 15, 50, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 2100);
    play("accessory", [0, -12, 12, -12, 12, 0].map((n) => ({ transform: `rotate(${n}deg)` })), 2100);
  }
}
