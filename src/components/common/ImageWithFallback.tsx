'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc = '/logo.png',
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full bg-[#FFF0F3] flex flex-col items-center justify-center p-4 text-center select-none ${className || ''}`}
      >
        <div className="relative w-12 h-12 rounded-full border border-rose/40 flex items-center justify-center mb-2 bg-white/80 shadow-xs overflow-hidden p-1.5">
          <Image
            src="/blossom-luxe-emblem.png"
            alt="Blossom Luxe Emblem"
            width={36}
            height={32}
            className="object-contain"
          />
        </div>
        <span className="text-[10px] uppercase tracking-widest text-burgundy/60 font-serif">
          Blossom Luxe
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
      {...props}
    />
  );
}

