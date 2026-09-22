export default function Logo({ size = 38, className = "" }) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="RRAVI Organic Enterprises logo"
    >
      <defs>
        <linearGradient id="rravi-grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F49E4C" />
          <stop offset="1" stopColor="#D96B27" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22.5" fill="url(#rravi-grad)" />
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="#F9F6F0" strokeOpacity="0.4" strokeWidth="1" />
      {/* sprout growing out of the R */}
      <path
        d="M27 20 C29.5 15.5 33 12.5 37.5 11"
        fill="none"
        stroke="#0B2219"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="M37.5 11 C40 5.5 45.5 5.5 46.5 7.5 C45 11.5 40 13 37.5 11 Z" fill="#F9F6F0" />
      <path d="M28.5 17 C26 12.5 21.5 11.5 19 13 C21 16.5 25.5 18 28.5 17 Z" fill="#0B2219" opacity="0.55" />
      <text
        x="23"
        y="34"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="25"
        fill="#F9F6F0"
      >
        R
      </text>
    </svg>
  );
}
