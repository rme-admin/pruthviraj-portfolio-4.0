interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  compact?: boolean;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  align = "left",
  compact = false,
}: SectionHeadingProps) {
  return (
    <div className={`${compact ? "mb-6" : "mb-14"} ${align === "center" ? "text-center" : ""}`}>
      <span className="section-number block mb-3">{number}</span>
      <h2 className="font-display text-3xl md:text-[2.5rem] font-bold tracking-tight text-[var(--text-primary)] leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-3 text-[var(--text-secondary)] text-base max-w-lg leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`divider-line mt-6 ${align === "center" ? "max-w-xs mx-auto" : "max-w-md"}`} />
    </div>
  );
}
