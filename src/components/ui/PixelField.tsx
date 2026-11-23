const PATTERNS = {
  cascade: [
    "..........b...b.obibb.bibbibbb",
    "......b.....o..bbibbbibibbbb.",
    "..........b...b..bbbibibbb...",
    "...b............o..bbibbb....",
    "........o..b.........bbbi.b..",
    ".............b.........b.....",
    "......b...........o.....b....",
    ".............................",
    "............b...............o",
  ],
  branch: [
    "...........................ib",
    ".................b.......bibb",
    ".............b......o..bbib..",
    ".........b.....bib..bbibb....",
    "....b.......bbibbbibbb.o.....",
    ".......o..bibbb.bb...........",
    ".....bibb.b...b......b.......",
    "..bbib..o....................",
    "......b......................",
  ],
  drift: [
    "......................b..b...",
    "..........b.......o......bib.",
    "..............bb..b..bib..bbb",
    ".................bibb.o.....",
    ".....b......b..bbb.b.......b.",
    ".........o....b..............",
    "..................b.....o....",
    "..........b..................",
    ".............................",
  ],
} as const;

const INKS = { b: "#175fe0", i: "#18202e", o: "#e75524" };

export function PixelField({
  className = "",
  variant = "cascade",
}: {
  className?: string;
  variant?: keyof typeof PATTERNS;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={`pointer-events-none ${className}`}
      viewBox="0 0 250 102"
      fill="none"
    >
      {[36, 68, 100, 132, 164, 196, 228].map((x) => (
          <path key={x} d={`M${x} 4v80`} stroke="#2469dc" strokeOpacity=".18" strokeWidth=".6" />
      ))}
      {PATTERNS[variant].flatMap((row, y) =>
        [...row].map((cell, x) =>
          cell === "b" || cell === "i" || cell === "o" ? (
            <rect
              key={`${x}-${y}`}
              x={x * 8 + 5}
              y={y * 8 + 5}
              width={6.5}
              height={6.5}
              fill={INKS[cell]}
              opacity={cell === "o" ? 1 : 0.65 + ((x + y * 3) % 5) * 0.075}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
