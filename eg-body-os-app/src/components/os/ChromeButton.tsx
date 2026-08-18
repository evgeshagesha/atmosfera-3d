import Link from "next/link";

type ChromeButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export function ChromeButton({
  children,
  href,
  type = "button",
  onClick,
  disabled,
  className = "",
}: ChromeButtonProps) {
  const classes = `btn-chrome inline-flex h-14 w-full items-center justify-center rounded-full px-8 font-medium uppercase tracking-[0.18em] transition disabled:opacity-50 ${className}`;

  if (href && !disabled) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
