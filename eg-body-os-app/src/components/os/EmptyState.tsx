export function EmptyState({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <div className="glass-card rounded-3xl px-6 py-8 text-center">
      <h2 className="font-display text-xl uppercase tracking-wide text-fg">{title}</h2>
      <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
    </div>
  );
}
