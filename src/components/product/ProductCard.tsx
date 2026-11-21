'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useWishlistStore } from '@/lib/store';
import { useToast } from '@/components/common/Toast';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { QuickAddModal } from '@/components/product/QuickAddModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { toast } = useToast();
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const discount = calculateDiscount(product.price, product.mrp);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isFavorited) {
      toast(`Added "${product.title.slice(0, 25)}..." to wishlist`, 'success');
    } else {
      toast('Removed from wishlist', 'info');
    }
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickAddOpen(true);
  };

  const primaryBadge = product.badges[0] || (product.isNew ? 'NEW' : null);

  return (
    <>
      <div
        className="group relative flex flex-col bg-white rounded-md overflow-hidden border border-burgundy/10 transition-all hover:shadow-card hover:border-burgundy/25"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Clickable Area to Product Page */}
        <Link
          href={`/product/${product.slug}`}
          className="flex flex-col flex-1"
          aria-label={`View ${product.title}`}
        >
          {/* Image Container with 3:4 Aspect Ratio */}
          <div className="relative w-full aspect-[3/4] bg-[#FFF0F3] overflow-hidden">
            <ImageWithFallback
              src={product.images[0]}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={priority}
              className={`object-cover transition-opacity duration-300 ${
                product.images[1] && isHovered ? 'md:opacity-0' : 'opacity-100'
              }`}
            />

            {/* Second Image on Hover (desktop only) */}
            {product.images[1] && (
              <div className="hidden md:block absolute inset-0 transition-opacity duration-300">
                <ImageWithFallback
                  src={product.images[1]}
                  alt={`${product.title} back view`}
                  fill
                  sizes="(max-width: 1024px) 33vw, 25vw"
                  className={`object-cover transition-opacity duration-300 ${
                    isHovered ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>
            )}

            {/* Top Left Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 pointer-events-none">
              {primaryBadge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider rounded bg-rose text-burgundy shadow-xs uppercase">
                  {primaryBadge}
                </span>
              )}
              {product.badges.length > 1 && product.badges.includes('B1G1') && primaryBadge !== 'B1G1' && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider rounded bg-burgundy text-white shadow-xs uppercase">
                  B1G1
                </span>
              )}
            </div>

            {/* Wishlist Button Top-Right (min 44px tap target) */}
            <button
              onClick={handleWishlistToggle}
              aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
              className="absolute top-1.5 right-1.5 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-xs text-burgundy hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xs"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorited ? 'fill-rose text-rose' : 'text-burgundy'
                }`}
              />
            </button>

            {/* Rating Pill Bottom-Left */}
            <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/90 backdrop-blur-xs text-[11px] font-semibold text-burgundy shadow-xs">
              <Star className="w-3 h-3 fill-gold text-gold" />
              <span>{product.rating}</span>
              <span className="text-burgundy/40">|</span>
              <span className="text-burgundy/75 text-[10px] font-medium">
                {product.reviewCount > 999
                  ? `${(product.reviewCount / 1000).toFixed(1)}k`
                  : product.reviewCount}
              </span>
            </div>

            {/* Quick Add Overlay on Desktop Hover */}
            <div className="hidden md:block absolute bottom-2 right-2 left-2 z-20 transition-all opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
              <button
                onClick={handleQuickAddClick}
                className="w-full py-2 bg-burgundy text-white text-xs font-semibold uppercase tracking-wider rounded hover:bg-burgundy-600 active:scale-98 transition shadow-md"
              >
                Quick Add
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <div className="p-2.5 flex flex-col flex-1 justify-between gap-1.5">
            {/* Title */}
            <h3 className="text-xs md:text-sm font-medium text-burgundy/90 line-clamp-2 leading-snug group-hover:text-burgundy">
              {product.title}
            </h3>

            {/* Price Row */}
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <span className="text-sm md:text-base font-bold text-burgundy">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-xs text-burgundy/50 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="text-xs font-semibold text-rose-600">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Color Swatches and Quick Add Mobile Button */}
            <div className="flex items-center justify-between pt-1 mt-auto">
              {/* Swatches */}
              <div className="flex items-center gap-1">
                {product.colors.slice(0, 3).map((col, idx) => (
                  <span
                    key={idx}
                    title={col.name}
                    className="w-3 h-3 rounded-full border border-burgundy/20 shadow-2xs"
                    style={{ backgroundColor: col.hex }}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[10px] text-burgundy/60 font-medium ml-0.5">
                    +{product.colors.length - 3}
                  </span>
                )}
              </div>

              {/* Mobile Quick Add Button */}
              <button
                onClick={handleQuickAddClick}
                aria-label={`Quick add ${product.title}`}
                className="md:hidden px-2.5 py-1 text-[11px] font-bold text-burgundy border border-burgundy/30 rounded bg-blush/30 hover:bg-blush active:bg-rose/40 uppercase tracking-wider min-h-[32px]"
              >
                + Add
              </button>
            </div>
          </div>
        </Link>
      </div>

      {/* Quick Add Sheet/Modal */}
      <QuickAddModal
        product={product}
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
      />
    </>
  );
}

