export const CinemaRadarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100"
      height="100"
    >
      <circle cx="50" cy="65" r="18" fill="url(#gradient)" />
      <path d="M45 57 L45 73 L60 65 Z" fill="#fff" />

      <path
        d="M25 30 Q50 10, 75 30"
        stroke="url(#gradient)"
        strokeWidth="5"
        fill="none"
      />
      <path
        d="M30 40 Q50 20, 70 40"
        stroke="url(#gradient)"
        strokeWidth="5"
        fill="none"
      />
      {/* <path
    d="M35 50 Q50 30, 65 50"
    stroke="url(#gradient)"
    stroke-width="5"
    fill="none"
  /> */}

      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ff9800" />
          <stop offset="100%" stopColor="#ff1100" />
        </linearGradient>
      </defs>
    </svg>
  );
};
