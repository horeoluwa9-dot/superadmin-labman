import { ReactNode } from "react";

export function Panel({
  title, subtitle, actions, children, className = "",
}: { title?: string; subtitle?: string; actions?: ReactNode; children: ReactNode; className?: string; }) {
  return (
    <section className={`panel ${className}`}>
      {(title || actions) && (
        <header className="flex items-center justify-between px-5 py-3.5 border-b border-border">
          <div>
            {title && <h2 className="text-sm font-bold text-navy">{title}</h2>}
            {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {actions}
        </header>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}
