export function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-svh bg-bg">
      <div className="phone-shell">{children}</div>
    </div>
  );
}
