"use client";

import { useScrollCounter } from "@/lib/hooks/useScrollAnimation";

type CounterProps = {
  end: number;
  start?: number;
  duration?: number; // Duration in milliseconds
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: string; // Thousands separator
};

export default function Counter({
  end,
  start = 0,
  duration = 2000,
  className,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = ",",
}: CounterProps) {
  const { ref, count } = useScrollCounter(end, duration);

  // Format the number with thousands separator
  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    return parts.join(".");
  };

  return (
    <span ref={ref as any} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
}
