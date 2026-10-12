/* eslint-disable @next/next/no-img-element */
type BrandLogoImageProps = {
  className?: string;
};

export function BrandLogoImage({ className }: BrandLogoImageProps) {
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
