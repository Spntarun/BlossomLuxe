'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Filter, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

function CollectionContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = (params.slug as string) || 'all';

  // State for filters
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(() => {
    const sub = searchParams.get('sub');
    return sub ? [sub] : [];
  });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = searchParams.get('min') ? Number(searchParams.get('min')) : 0;
    const max = searchParams.get('max') ? Number(searchParams.get('max')) : 15000;
    return [min, max];
  });
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Determine base products for this collection slug
  const baseProducts = useMemo(() => {
    if (slug === 'indo-western') return PRODUCTS.filter((p) => p.category === 'indo-western');
    if (slug === 'corsets') return PRODUCTS.filter((p) => p.category === 'corsets');
    if (slug === 'festive-wear') return PRODUCTS.filter((p) => p.category === 'festive-wear');
    if (slug === 'new-arrivals') return PRODUCTS.filter((p) => p.isNew || p.badges.includes('NEW'));
    if (slug === 'best-sellers') return PRODUCTS.filter((p) => p.bestseller || p.badges.includes('BESTSELLER'));
    if (slug === 'sale') return PRODUCTS.filter((p) => p.mrp > p.price || p.badges.includes('B1G1'));
    return PRODUCTS;
  }, [slug]);

  // Extract all available subcategories, sizes, and colors for current base products
  const availableSubcategories = useMemo(() => {
    return Array.from(new Set(baseProducts.map((p) => p.subcategory)));
  }, [baseProducts]);

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Free Size'];
  const availableColors = useMemo(() => {
    const map = new Map<string, string>();
    baseProducts.forEach((p) => {
      p.colors.forEach((c) => map.set(c.name, c.hex));
    });
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, [baseProducts]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    return baseProducts
      .filter((p) => {
        // Subcategory
        if (selectedSubcategories.length > 0 && !selectedSubcategories.includes(p.subcategory)) {
          return false;
        }
        // Size
        if (selectedSizes.length > 0 && !p.sizes.some((s) => selectedSizes.includes(s))) {
          return false;
        }
        // Color
        if (selectedColors.length > 0 && !p.colors.some((c) => selectedColors.includes(c.name))) {
          return false;
        }
        // Price
        if (p.price < priceRange[0] || p.price > priceRange[1]) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') {
          const discA = ((a.mrp - a.price) / a.mrp) * 100;
          const discB = ((b.mrp - b.price) / b.mrp) * 100;
          return discB - discA;
        }
        return 0; // featured default
      });
  }, [baseProducts, selectedSubcategories, selectedSizes, selectedColors, priceRange, sortBy]);

  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setPriceRange([0, 15000]);
  };

  const hasActiveFilters =
    selectedSubcategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    priceRange[0] > 0 ||
    priceRange[1] < 15000;

  // Title formatting
  const collectionTitles: Record<string, { title: string; desc: string }> = {
    'indo-western': {
      title: 'Indo-Western Collection',
      desc: 'Seamlessly fusing traditional Indian heritage embroidery with contemporary draped cuts and asymmetrical silhouettes.',
    },
    corsets: {
      title: 'Couture Corsets',
      desc: '12-steel bone boned corsets, Banarasi brocade blouse corsets, and plush micro-velvet bustiers that sculpt like a dream.',
    },
    'festive-wear': {
      title: 'Royal Festive Wear',
      desc: 'Kalidar bridal lehengas, hand-sequinned cocktail sarees, and mirror-work garara sets for memorable celebrations.',
    },
    'new-arrivals': {
      title: 'New Arrivals Drop',
      desc: 'The latest couture designs fresh from our master craftsmen in Varanasi and Jaipur.',
    },
    'best-sellers': {
      title: 'Best Sellers',
      desc: 'Most-coveted viral outfits that our customers rave about. Over 10,000+ 5-star ratings.',
    },
    sale: {
      title: 'B1G1 Festive Sale',
      desc: 'Buy 1 Get 1 Free on all eligible fusion styles and corsets. Limited festive stock only.',
    },
    all: {
      title: 'All Collections',
      desc: 'Browse our complete catalog of luxury Indo-Western silhouettes, corsets, and festive edits.',
    },
  };

  const currentMeta = collectionTitles[slug] || {
    title: slug.replace(/-/g, ' ').toUpperCase(),
    desc: 'Explore luxury silhouettes by Blossom Luxe.',
  };

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb & Header */}
      <div className="bg-white border-b border-burgundy/10 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-1.5 text-[11px] text-burgundy/60 mb-2">
            <Link href="/" className="hover:text-burgundy">Home</Link>
            <span>/</span>
            <Link href="/collections/all" className="hover:text-burgundy">Collections</Link>
            <span>/</span>
            <span className="text-burgundy font-semibold capitalize">{slug.replace(/-/g, ' ')}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-burgundy font-serif">
                {currentMeta.title}
              </h1>
              <p className="text-xs text-burgundy/70 max-w-2xl mt-1 leading-relaxed">
                {currentMeta.desc}
              </p>
            </div>
            <span className="text-xs font-semibold text-burgundy/80 whitespace-nowrap bg-blush/40 px-3 py-1 rounded-full border border-burgundy/10 self-start md:self-auto">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Design' : 'Designs'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Mobile Filter & Sort Bar */}
        <div className="lg:hidden flex items-center justify-between gap-3 mb-5 pb-3 border-b border-burgundy/10">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2 bg-white border border-burgundy/20 rounded-md text-xs font-bold uppercase tracking-wider text-burgundy shadow-2xs"
          >
            <SlidersHorizontal className="w-4 h-4 text-burgundy" />
            <span>Filter {hasActiveFilters && `(${selectedSubcategories.length + selectedSizes.length + selectedColors.length})`}</span>
          </button>

          <div className="relative flex-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full min-h-[44px] appearance-none bg-white border border-burgundy/20 rounded-md px-3 py-2 text-xs font-bold uppercase tracking-wider text-burgundy focus:outline-none pr-8 shadow-2xs"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="discount">Biggest Discount</option>
            </select>
            <ChevronDown className="w-4 h-4 text-burgundy/60 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Main Layout: Desktop Sidebar Filter + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-lg border border-burgundy/10 shadow-2xs space-y-6 h-fit sticky top-28">
            <div className="flex items-center justify-between pb-3 border-b border-burgundy/10">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy flex items-center gap-1.5 font-serif">
                <Filter className="w-4 h-4 text-rose-600" /> Filters
              </span>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-rose-600 hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Subcategories */}
            {availableSubcategories.length > 0 && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                  Category Style
                </h4>
                <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                  {availableSubcategories.map((sub) => {
                    const checked = selectedSubcategories.includes(sub);
                    return (
                      <label
                        key={sub}
                        onClick={() => toggleSubcategory(sub)}
                        className="flex items-center gap-2.5 text-xs text-burgundy/80 hover:text-burgundy cursor-pointer py-1"
                      >
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                            checked ? 'bg-burgundy border-burgundy text-white' : 'border-burgundy/30 bg-white'
                          }`}
                        >
                          {checked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{sub}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Price Range Filter */}
            <div className="pt-4 border-t border-burgundy/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                Price Range
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setPriceRange([0, 1999])}
                  className={`py-1.5 px-2 rounded border text-center transition ${
                    priceRange[1] === 1999 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20 hover:border-burgundy'
                  }`}
                >
                  Under ₹1,999
                </button>
                <button
                  onClick={() => setPriceRange([1999, 3999])}
                  className={`py-1.5 px-2 rounded border text-center transition ${
                    priceRange[0] === 1999 && priceRange[1] === 3999 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20 hover:border-burgundy'
                  }`}
                >
                  ₹1,999 - ₹3,999
                </button>
                <button
                  onClick={() => setPriceRange([3999, 15000])}
                  className={`py-1.5 px-2 rounded border text-center transition ${
                    priceRange[0] === 3999 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20 hover:border-burgundy'
                  }`}
                >
                  ₹3,999 & Above
                </button>
                <button
                  onClick={() => setPriceRange([0, 15000])}
                  className={`py-1.5 px-2 rounded border text-center transition ${
                    priceRange[0] === 0 && priceRange[1] === 15000 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20 hover:border-burgundy'
                  }`}
                >
                  All Prices
                </button>
              </div>
            </div>

            {/* Size Filter */}
            <div className="pt-4 border-t border-burgundy/10">
              <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                Size
              </h4>
              <div className="grid grid-cols-4 gap-1.5">
                {availableSizes.map((size) => {
                  const active = selectedSizes.includes(size);
                  return (
                    <button
                      key={size}
                      onClick={() => toggleSize(size)}
                      className={`py-1.5 text-xs font-semibold rounded border transition ${
                        active
                          ? 'bg-burgundy text-white border-burgundy'
                          : 'border-burgundy/20 bg-white hover:border-burgundy text-burgundy'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            {availableColors.length > 0 && (
              <div className="pt-4 border-t border-burgundy/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2.5">
                  Color
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const active = selectedColors.includes(color.name);
                    return (
                      <button
                        key={color.name}
                        onClick={() => toggleColor(color.name)}
                        title={color.name}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          active ? 'border-burgundy scale-110 shadow-xs' : 'border-burgundy/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                      >
                        {active && <Check className="w-3.5 h-3.5 text-burgundy stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </aside>

          {/* Product Listing Area */}
          <div className="lg:col-span-3">
            {/* Desktop Sorting & Active Filter Tags Bar */}
            <div className="hidden lg:flex items-center justify-between pb-4 mb-4 border-b border-burgundy/10">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedSubcategories.map((sub) => (
                  <span
                    key={sub}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blush/60 text-burgundy border border-burgundy/10"
                  >
                    {sub}
                    <button onClick={() => toggleSubcategory(sub)} aria-label="Remove filter">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {selectedSizes.map((size) => (
                  <span
                    key={size}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blush/60 text-burgundy border border-burgundy/10"
                  >
                    Size: {size}
                    <button onClick={() => toggleSize(size)} aria-label="Remove filter">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-rose-600 hover:underline font-semibold ml-2"
                  >
                    Reset All
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-burgundy/70 uppercase tracking-wider">
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-burgundy/20 rounded-md px-3 py-1.5 text-xs font-semibold text-burgundy focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center border border-burgundy/10 shadow-2xs">
                <h3 className="text-base font-serif font-bold text-burgundy mb-2">
                  No products match your selected filters
                </h3>
                <p className="text-xs text-burgundy/70 mb-5">
                  Try clearing some filter criteria to see more designs.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-burgundy text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-burgundy-600 transition"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-3 md:gap-5">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-burgundy/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-2xl flex flex-col">
            <div className="p-4 border-b border-burgundy/10 flex items-center justify-between bg-ivory">
              <span className="text-sm font-bold uppercase tracking-wider text-burgundy font-serif">
                Filter Styles
              </span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-burgundy"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto flex-1 space-y-6">
              {/* Subcategories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2">
                  Category
                </h4>
                <div className="space-y-1">
                  {availableSubcategories.map((sub) => {
                    const checked = selectedSubcategories.includes(sub);
                    return (
                      <button
                        key={sub}
                        onClick={() => toggleSubcategory(sub)}
                        className={`w-full text-left px-3 py-2 rounded text-xs font-medium flex items-center justify-between ${
                          checked ? 'bg-burgundy text-white' : 'hover:bg-blush/30 text-burgundy'
                        }`}
                      >
                        <span>{sub}</span>
                        {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-4 border-t border-burgundy/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2">
                  Size
                </h4>
                <div className="grid grid-cols-4 gap-2">
                  {availableSizes.map((size) => {
                    const active = selectedSizes.includes(size);
                    return (
                      <button
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`min-h-[44px] rounded border text-xs font-semibold ${
                          active
                            ? 'bg-burgundy text-white border-burgundy'
                            : 'bg-white text-burgundy border-burgundy/20'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-burgundy/10">
                <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-2">
                  Price
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPriceRange([0, 1999])}
                    className={`min-h-[44px] rounded border text-xs font-semibold ${
                      priceRange[1] === 1999 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20'
                    }`}
                  >
                    Under ₹1,999
                  </button>
                  <button
                    onClick={() => setPriceRange([1999, 3999])}
                    className={`min-h-[44px] rounded border text-xs font-semibold ${
                      priceRange[0] === 1999 && priceRange[1] === 3999 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20'
                    }`}
                  >
                    ₹1,999 - ₹3,999
                  </button>
                  <button
                    onClick={() => setPriceRange([3999, 15000])}
                    className={`min-h-[44px] rounded border text-xs font-semibold ${
                      priceRange[0] === 3999 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20'
                    }`}
                  >
                    ₹3,999+
                  </button>
                  <button
                    onClick={() => setPriceRange([0, 15000])}
                    className={`min-h-[44px] rounded border text-xs font-semibold ${
                      priceRange[0] === 0 && priceRange[1] === 15000 ? 'bg-burgundy text-white border-burgundy' : 'border-burgundy/20'
                    }`}
                  >
                    All
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-burgundy/10 bg-ivory flex gap-3">
              <button
                onClick={clearAllFilters}
                className="flex-1 min-h-[44px] rounded-md border border-burgundy/30 text-xs font-bold uppercase tracking-wider text-burgundy"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-1 min-h-[44px] rounded-md bg-burgundy text-white text-xs font-bold uppercase tracking-wider"
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CollectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-ivory">
          <div className="w-8 h-8 rounded-full border-2 border-burgundy border-t-transparent animate-spin" />
        </div>
      }
    >
      <CollectionContent />
    </Suspense>
  );
}
