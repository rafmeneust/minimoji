export default function Section({ id, children, className="" }) {
  return <section id={id} className={`section ${className}`}>
    <div className="container-pg">{children}</div>
  </section>;
}