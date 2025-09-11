// src/ui/Card.jsx
export default function Card({ children, className = "", as: Tag = "div", ...props }) {
  return (
    <Tag className={`card p-6 ${className}`} {...props}>
      {children}
    </Tag>
  );
}