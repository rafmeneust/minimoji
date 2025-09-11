// src/ui/Button.jsx
const base =
  "inline-flex items-center justify-center px-5 py-2.5 rounded-full font-semibold transition " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:opacity-50 disabled:pointer-events-none";

const variants = {
  primary: `${base} bg-brand text-white hover:bg-indigo-600 shadow-soft`,
  accent:  `${base} bg-accent text-white hover:bg-orange-500 shadow-soft`,
  ghost:   `${base} bg-white text-gray-900 border border-gray-200 hover:bg-gray-50`,
};

export default function Button({
  as,                // 'a' ou 'button' (optionnel)
  href,              // si présent, on rend un <a>
  variant = "primary",
  className = "",
  children,
  ...props
}) {
  const v = variants[variant] ?? variants.primary;
  const cls = `${v} ${className}`.trim();

  // Rend un lien si href est fourni (ou si as === 'a')
  if (as === "a" || typeof href === "string") {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    );
  }

  // Sinon, rend un <button>
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  );
}