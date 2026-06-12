import { useEffect, useState } from "react";

export function Particles({ count = 50 }: { count?: number }) {
  const [items, setItems] = useState<Array<{ id: number; left: number; delay: number; duration: number; size: number; type: "heart" | "star" | "sparkle" }>>([]);

  useEffect(() => {
    const types: Array<"heart" | "star" | "sparkle"> = ["heart", "star", "sparkle"];
    setItems(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 14 + Math.random() * 16,
        size: 8 + Math.random() * 14,
        type: types[Math.floor(Math.random() * types.length)],
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {items.map((p) => (
        <span
          key={p.id}
          className="absolute block"
          style={{
            left: `${p.left}%`,
            bottom: 0,
            fontSize: `${p.size}px`,
            animation: `float-up ${p.duration}s linear ${p.delay}s infinite`,
            color: p.type === "heart" ? "oklch(0.82 0.09 25 / 0.7)" : p.type === "star" ? "oklch(0.92 0.08 85 / 0.8)" : "oklch(0.84 0.06 300 / 0.7)",
            filter: "drop-shadow(0 0 6px currentColor)",
          }}
        >
          {p.type === "heart" ? "♥" : p.type === "star" ? "✦" : "✧"}
        </span>
      ))}
    </div>
  );
}

export function Twinkles({ count = 60 }: { count?: number }) {
  const [stars, setStars] = useState<Array<{ id: number; top: number; left: number; size: number; delay: number }>>([]);
  useEffect(() => {
    setStars(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 3,
      })),
    );
  }, [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            boxShadow: "0 0 6px white, 0 0 12px oklch(0.84 0.06 300 / 0.6)",
          }}
        />
      ))}
    </div>
  );
}
