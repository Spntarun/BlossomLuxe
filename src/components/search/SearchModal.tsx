'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_SEARCHES = [
  'Corset Tops',
  'Pre-Draped Saree',
  'Lehenga Set',
  'Sharara',
  'Gowns',
  'Ivory',
  'Burgundy',
];

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase().trim();
    const matched = PRODUCTS.filter((p) => {
      return (
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q) ||
        p.fabric.toLowerCase().includes(q) ||
        p.colors.some((c) => c.name.toLowerCase().includes(q))
      );
    });
    setResults(matched);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 md:pt-16 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-burgundy/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Search Header Bar */}
          <div className="p-4 border-b border-burgundy/10 flex items-center gap-3 bg-ivory">
            <Search className="w-5 h-5 text-burgundy/60 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search corset tops, lehengas, sarees, gowns..."
              className="flex-1 bg-transparent text-sm md:text-base text-burgundy placeholder:text-burgundy/40 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-burgundy/40 hover:text-burgundy p-1"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-xs font-semibold uppercase tracking-wider text-burgundy/80 hover:text-burgundy px-2 py-1 rounded hover:bg-blush/40"
            >
              Close
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 overflow-y-auto flex-1">
            {!query.trim() ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-burgundy/70 mb-3">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  <span>Popular Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium bg-blush/40 hover:bg-rose/40 text-burgundy border border-burgundy/10 transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-burgundy/10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-burgundy/70 block mb-2">
                    Featured Categories
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      href="/collections/corsets"
                      onClick={onClose}
                      className="p-3 rounded-lg bg-ivory border border-burgundy/10 text-center hover:border-burgundy/30 transition"
                    >
                      <span className="text-xs font-bold text-burgundy block">Corsets</span>
                      <span className="text-[10px] text-burgundy/60">From ₹999</span>
                    </Link>
                    <Link
                      href="/collections/indo-western"
                      onClick={onClose}
                      className="p-3 rounded-lg bg-ivory border border-burgundy/10 text-center hover:border-burgundy/30 transition"
                    >
                      <span className="text-xs font-bold text-burgundy block">Indo-Western</span>
                      <span className="text-[10px] text-burgundy/60">Fusion Edits</span>
                    </Link>
                    <Link
                      href="/collections/festive-wear"
                      onClick={onClose}
                      className="p-3 rounded-lg bg-ivory border border-burgundy/10 text-center hover:border-burgundy/30 transition"
                    >
                      <span className="text-xs font-bold text-burgundy block">Festive Wear</span>
                      <span className="text-[10px] text-burgundy/60">Royal Sarees & Lehengas</span>
                    </Link>
                  </div>
                </div>
              </div>
            ) : results.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-sm font-medium text-burgundy">
                  No products found for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-burgundy/60 mt-1">
                  Try searching for &quot;corset&quot;, &quot;lehenga&quot;, &quot;saree&quot; or &quot;ivory&quot;
                </p>
              </div>
            ) : (
              <div>
                <div className="flex justify-between items-center text-xs font-semibold text-burgundy/70 mb-3">
                  <span>FOUND {results.length} RESULTS</span>
                  <Link
                    href={`/collections/sale?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-rose-600 hover:underline flex items-center gap-1 font-bold"
                  >
                    View All <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="divide-y divide-burgundy/10">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={onClose}
                      className="py-3 flex items-center gap-3 hover:bg-blush/20 px-2 rounded-md transition group"
                    >
                      <div className="relative w-12 h-16 rounded overflow-hidden bg-blush/30 shrink-0">
                        <ImageWithFallback
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] uppercase font-bold text-rose-600">
                          {product.category} · {product.subcategory}
                        </span>
                        <h4 className="text-xs md:text-sm font-semibold text-burgundy truncate group-hover:text-rose-600">
                          {product.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs font-bold text-burgundy">
                            {formatPrice(product.price)}
                          </span>
                          {product.mrp > product.price && (
                            <span className="text-[11px] text-burgundy/50 line-through">
                              {formatPrice(product.mrp)}
                            </span>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-burgundy/30 group-hover:text-burgundy transition shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

