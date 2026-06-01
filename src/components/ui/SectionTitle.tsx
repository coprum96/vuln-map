interface SectionTitleProps {
  children: string;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h3 className="text-[11px] font-semibold uppercase tracking-wide text-cbr-navy">
      {children}
    </h3>
  );
}
