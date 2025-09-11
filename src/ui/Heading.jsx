export function H1({ children, kicker }) {
  return (
    <header className="mb-6 md:mb-8">
      {kicker && <p className="text-sm md:text-base text-brand font-semibold mb-2">{kicker}</p>}
      <h1>{children}</h1>
    </header>
  );
}
export const H2 = ({ children }) => <h2 className="mb-4">{children}</h2>;
export const H3 = ({ children }) => <h3 className="mb-3">{children}</h3>;