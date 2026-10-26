const RED = "#C8372D";

type Point = [number, number];

function Crab({
  x,
  y,
  scale = 1,
  leftClaw,
  rightClaw
}: {
  x: number;
  y: number;
  scale?: number;
  leftClaw: Point;
  rightClaw: Point;
}) {
  const arm = (side: -1 | 1, end: Point) => (
    <g>
      <path
        d={`M ${side * 34} -6 Q ${side * 52} ${end[1] / 2 - 10} ${end[0]} ${end[1]}`}
        stroke={RED}
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx={end[0]} cy={end[1]} r="12" fill={RED} />
      <path
        d={`M ${end[0]} ${end[1]} l ${side * 6} -9`}
        stroke="#FAF8F5"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );

  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {[-1, 1].map((side) =>
        [0, 1, 2].map((i) => (
          <path
            key={`${side}-${i}`}
            d={`M ${side * 28} ${10 + i * 6} L ${side * (46 + i * 4)} ${22 + i * 5} L ${side * (52 + i * 4)} ${34 + i * 3}`}
            stroke={RED}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        ))
      )}
      {arm(-1, leftClaw)}
      {arm(1, rightClaw)}
      <ellipse cx="0" cy="0" rx="40" ry="28" fill={RED} />
      {[-14, 14].map((cx) => (
        <g key={cx}>
          <line x1={cx} y1="-24" x2={cx} y2="-36" stroke={RED} strokeWidth="4" strokeLinecap="round" />
          <circle cx={cx} cy="-39" r="6" fill="#fff" />
          <circle cx={cx} cy="-38" r="2.5" fill="#1F2937" />
        </g>
      ))}
      <path d="M -10 6 Q 0 14 10 6" stroke="#FAF8F5" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
  );
}

export function CrabLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="-70 -50 140 100" className={className} role="img" aria-label="TamilNandu red crab logo">
      <Crab x={0} y={4} leftClaw={[-58, -30]} rightClaw={[58, -30]} />
    </svg>
  );
}
