export const Pill = ({
  tone = "muted", children, pulse = false,
}: { tone?: "success" | "warning" | "danger" | "info" | "muted" | "gold"; children: React.ReactNode; pulse?: boolean }) => {
  const cls = {
    success: "pill-success", warning: "pill-warning", danger: "pill-danger",
    info: "pill-info", muted: "pill-muted", gold: "pill-gold",
  }[tone];
  const dotColor = {
    success: "bg-emerald-500", warning: "bg-amber-500", danger: "bg-red-500",
    info: "bg-blue-500", muted: "bg-slate-400", gold: "bg-navy",
  }[tone];
  return (
    <span className={cls}>
      <span className={`pill-dot ${dotColor} ${pulse ? "animate-pulse" : ""}`} />
      {children}
    </span>
  );
};

export const LevelPill = ({ level }: { level: 1 | 2 | 3 | 4 | 5 }) => {
  const map = {
    1: "bg-slate-200 text-slate-700",
    2: "bg-blue-100 text-blue-800",
    3: "bg-teal-100 text-teal-800",
    4: "bg-amber-100 text-amber-800",
    5: "bg-gradient-gold text-navy",
  } as const;
  return <span className={`pill ${map[level]}`}>{level === 5 && "👑 "}L{level}</span>;
};
