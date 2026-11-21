import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LotusLogoProps {
  className?: string;
  variant?: 'horizontal' | 'stacked' | 'emblem';
  color?: 'burgundy' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export function LotusLogo({
  className = '',
  variant = 'horizontal',
  color = 'burgundy',
  size = 'md',
}: LotusLogoProps) {
  if (variant === 'horizontal') {
    const src = color === 'white' ? '/blossom-luxe-horizontal-white.png' : '/blossom-luxe-horizontal.png';
    
    // Responsive sizing: compact on mobile so it never overflows 375px, full size on desktop
    const sizeClasses = {
      sm: 'w-[130px] sm:w-[165px] h-[24px] sm:h-[30px]',
      md: 'w-[145px] sm:w-[190px] md:w-[220px] h-[26px] sm:h-[34px] md:h-[39px]',
      lg: 'w-[170px] sm:w-[220px] md:w-[260px] h-[30px] sm:h-[39px] md:h-[46px]',
    };

    return (
      <Link
        href="/"
        className={`inline-flex items-center group transition-opacity hover:opacity-95 shrink-0 ${className}`}
        aria-label="Blossom Luxe Home"
      >
        <div className={`relative ${sizeClasses[size]} shrink-0 flex items-center`}>
          <Image
            src={src}
            alt="Blossom Luxe - Unfolding the Art of Luxury"
            fill
            sizes="(max-width: 640px) 150px, 220px"
            className="object-contain object-left sm:object-center"
            priority
          />
        </div>
      </Link>
    );
  }

  if (variant === 'stacked') {
    const src = color === 'white' ? '/blossom-luxe-logo-white.png' : '/blossom-luxe-logo.png';
    const sizeClasses = {
      sm: 'w-[90px] sm:w-[110px] h-[57px] sm:h-[69px]',
      md: 'w-[130px] sm:w-[160px] h-[82px] sm:h-[101px]',
      lg: 'w-[160px] sm:w-[200px] h-[101px] sm:h-[126px]',
    };

    return (
      <Link
        href="/"
        className={`inline-flex items-center group transition-opacity hover:opacity-95 shrink-0 ${className}`}
        aria-label="Blossom Luxe Home"
      >
        <div className={`relative ${sizeClasses[size]} shrink-0 flex items-center justify-center`}>
          <Image
            src={src}
            alt="Blossom Luxe - Unfolding the Art of Luxury"
            fill
            sizes="(max-width: 640px) 110px, 160px"
            className="object-contain"
            priority
          />
        </div>
      </Link>
    );
  }

  // Emblem only
  const src = color === 'white' ? '/blossom-luxe-emblem-white.png' : '/blossom-luxe-emblem.png';
  const sizeClasses = {
    sm: 'w-7 h-6',
    md: 'w-9 h-8',
    lg: 'w-12 h-11',
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center group transition-opacity hover:opacity-95 shrink-0 ${className}`}
      aria-label="Blossom Luxe Home"
    >
      <div className={`relative ${sizeClasses[size]} shrink-0 flex items-center justify-center`}>
        <Image
          src={src}
          alt="Blossom Luxe Emblem"
          fill
          sizes="48px"
          className="object-contain"
          priority
        />
      </div>
    </Link>
  );
}
