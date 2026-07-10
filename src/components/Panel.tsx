import { ReactNode } from "react";

interface PanelProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  accent?: boolean;
}

export default function Panel({
  children,
  className = "",
  hover = true,
  accent = false,
}: PanelProps) {
  return (
    <div
      className={`panel ${hover ? (accent ? "panel-accent" : "panel-hover") : ""} ${className}`}
    >
      {children}
    </div>
  );
}
