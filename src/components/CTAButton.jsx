export default function CTAButton({ label, href = "#", onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="inline-block px-6 py-3 rounded-full bg-indigo-500 text-white font-semibold text-sm shadow-md hover:bg-indigo-600 transition-all"
    >
      {label}
    </a>
  );
}