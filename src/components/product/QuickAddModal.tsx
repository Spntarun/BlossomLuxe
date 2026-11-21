'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShoppingBag } from 'lucide-react';
import { Product, ProductColor } from '@/types';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { useToast } from '@/components/common/Toast';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface QuickAddModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickAddModal({ product, isOpen, onClose }: QuickAddModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCartStore();
  const { toast } = useToast();

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0]);
      setQuantity(1);
      // Lock body scroll
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, product]);

  if (!isOpen) return null;

  const discount = calculateDiscount(product.price, product.mrp);

  const handleAddToCart = () => {
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor.name}`,
      productId: product.id,
      title: product.title,
      slug: product.slug,
      price: product.price,
      mrp: product.mrp,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0],
      quantity,
    });
    onClose();
    toast(`Added ${product.title.slice(0, 20)}... (${selectedSize}) to bag`, 'success');
    openCart();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-burgundy/60 backdrop-blur-xs"
        />

        {/* Content Box: Bottom Sheet on Mobile, Modal on Desktop */}
        <motion.div
          initial={{ y: '100%', opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-t-2xl md:rounded-2xl p-5 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-3 border-b border-burgundy/10">
            <div className="flex gap-3">
              <div className="relative w-16 h-20 rounded-md overflow-hidden bg-blush/20 shrink-0">
                <ImageWithFallback
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider text-rose-600 font-bold">
                  {product.category}
                </span>
                <h4 className="text-sm font-semibold text-burgundy line-clamp-1">
                  {product.title}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-bold text-burgundy">
                    {formatPrice(product.price)}
                  </span>
                  {product.mrp > product.price && (
                    <>
                      <span className="text-xs text-burgundy/50 line-through">
                        {formatPrice(product.mrp)}
                      </span>
                      <span className="text-xs font-bold text-rose-600">
                        {discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Close size selector"
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-blush/40 text-burgundy transition-colors -mr-2 -mt-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Color Selector */}
          {product.colors.length > 1 && (
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-burgundy uppercase tracking-wider">
                  Color: <span className="font-normal text-burgundy/80">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select color ${color.name}`}
                    className={`min-w-[44px] min-h-[44px] p-1 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === color.name
                        ? 'border-burgundy scale-105 shadow-xs'
                        : 'border-transparent hover:border-rose/50'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-burgundy/20 block flex items-center justify-center"
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.name === color.name && (
                        <Check className="w-4 h-4 text-burgundy stroke-[3]" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-burgundy uppercase tracking-wider">
                Select Size
              </span>
              <span className="text-[11px] text-burgundy/70 underline cursor-pointer">
                Size Guide
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-h-[44px] rounded-md text-xs font-semibold uppercase tracking-wider transition-all flex items-center justify-center border ${
                    selectedSize === size
                      ? 'bg-burgundy text-white border-burgundy shadow-sm'
                      : 'bg-white text-burgundy border-burgundy/20 hover:border-burgundy'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-burgundy uppercase tracking-wider">
              Quantity
            </span>
            <div className="flex items-center border border-burgundy/20 rounded-md overflow-hidden">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="w-11 h-11 flex items-center justify-center text-burgundy hover:bg-blush/40 transition font-bold"
              >
                -
              </button>
              <span className="w-10 text-center text-xs font-bold text-burgundy">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="w-11 h-11 flex items-center justify-center text-burgundy hover:bg-blush/40 transition font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* CTA Add to Bag */}
          <div className="mt-6 pt-2">
            <button
              onClick={handleAddToCart}
              className="w-full min-h-[48px] bg-burgundy hover:bg-burgundy-600 active:scale-98 text-white rounded-lg font-semibold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-rose" />
              <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

