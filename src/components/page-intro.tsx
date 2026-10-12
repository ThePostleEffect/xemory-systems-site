export function PageIntro({
  number,
  kicker,
  title,
  children,
}: {
  number: string;
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">
        <span className="tiny-core" /> {number} / {kicker}
      </p>
      <h1>{title}</h1>
      {children && <div className="intro-description">{children}</div>}
    </div>
  );
}
