import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(value, duration = 900) {
  const isNumber =
    typeof value === "number" ||
    (typeof value === "string" && !isNaN(Number(value)));

  const target = isNumber ? Number(value) : null;

  // ✅ State ONLY for animation
  const [animatedValue, setAnimatedValue] = useState(0);

  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    // ❌ No state update if value is not numeric
    if (!isNumber) return;

    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const progress = Math.min(
        (timestamp - startTimeRef.current) / duration,
        1
      );

      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = Math.floor(eased * target);

      setAnimatedValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [target, duration, isNumber]);

  // ✅ Return directly for non-numbers
  return isNumber ? animatedValue : value;
}
