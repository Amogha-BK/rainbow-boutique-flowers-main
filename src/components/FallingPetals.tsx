import { motion } from "framer-motion";
import { useMemo } from "react";

const PETALS = ["🌸", "🌷", "🌹", "🪷", "🌺"];

export function FallingPetals({ count = 18 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 9 + Math.random() * 8,
        size: 14 + Math.random() * 22,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 120,
        char: PETALS[Math.floor(Math.random() * PETALS.length)],
        opacity: 0.5 + Math.random() * 0.4,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p) => (
        <motion.span
          key={p.id}
          initial={{ y: "-10vh", x: 0, rotate: p.rotate, opacity: 0 }}
          animate={{ y: "110vh", x: p.drift, rotate: p.rotate + 360, opacity: [0, p.opacity, p.opacity, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "linear" }}
          style={{ left: `${p.left}%`, fontSize: p.size, position: "absolute", top: 0 }}
        >
          {p.char}
        </motion.span>
      ))}
    </div>
  );
}
