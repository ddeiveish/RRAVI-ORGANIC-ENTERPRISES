export default function Marquee({ items, className = "", textClassName = "", speed = 60 }) {
  const row = [...items, ...items];
  return (
    <div className={`overflow-hidden ${className}`} data-testid="editorial-marquee">
      <div
        className="marquee-track flex w-max items-center whitespace-nowrap animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {row.map((item, i) => (
          <span key={i} aria-hidden={i >= items.length} className={`flex items-center ${textClassName}`}>
            <span className="mx-6 sm:mx-8">{item}</span>
            <span className="h-1.5 w-1.5 rotate-45 bg-current opacity-50" />
          </span>
        ))}
      </div>
    </div>
  );
}
