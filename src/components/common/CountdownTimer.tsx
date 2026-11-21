'use client';

import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  className?: string;
  onExpire?: () => void;
}

export function CountdownTimer({ initialHours = 18, className = '' }: CountdownTimerProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: initialHours,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    setMounted(true);

    // Fixed end target 18 hours from now stored in session or computed
    const targetTime = Date.now() + (initialHours * 3600 + 42 * 60 + 15) * 1000;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });

      if (diff <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [initialHours]);

  // Prevent hydration mismatch: render static placeholder shell during SSR
  if (!mounted) {
    return (
      <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold">00</span>:
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold">18</span>:
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold">42</span>:
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold">15</span>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className={`inline-flex items-center gap-1.5 font-mono text-xs ${className}`}>
      <div className="flex flex-col items-center">
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold text-xs shadow-inner">
          {pad(timeLeft.days)}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-burgundy font-sans font-semibold mt-0.5">D</span>
      </div>
      <span className="text-burgundy font-bold -mt-3">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold text-xs shadow-inner">
          {pad(timeLeft.hours)}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-burgundy font-sans font-semibold mt-0.5">H</span>
      </div>
      <span className="text-burgundy font-bold -mt-3">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold text-xs shadow-inner">
          {pad(timeLeft.minutes)}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-burgundy font-sans font-semibold mt-0.5">M</span>
      </div>
      <span className="text-burgundy font-bold -mt-3">:</span>
      <div className="flex flex-col items-center">
        <span className="bg-burgundy text-white px-1.5 py-0.5 rounded font-bold text-xs shadow-inner">
          {pad(timeLeft.seconds)}
        </span>
        <span className="text-[9px] uppercase tracking-wider text-burgundy font-sans font-semibold mt-0.5">S</span>
      </div>
    </div>
  );
}

