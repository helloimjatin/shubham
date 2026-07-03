interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="display-heading">{title}</h2>
    </div>
  );
}
