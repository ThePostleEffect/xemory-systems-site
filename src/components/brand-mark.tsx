/* eslint-disable @next/next/no-img-element */
type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <img
      src="/logo.png"
      alt=""
      width={120}
      height={120}
      aria-hidden="true"
      className={className ? `block object-contain ${className}` : "block object-contain"}
    />
  );
}
