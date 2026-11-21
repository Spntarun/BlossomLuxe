'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  Heart,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Sparkles,
  ChevronDown,
  Ruler,
  X,
  Share2,
} from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { formatPrice, calculateDiscount } from '@/lib/utils';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { useToast } from '@/components/common/Toast';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';
import { ProductCarousel } from '@/components/home/ProductCarousel';
import { ProductColor } from '@/types';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const { addItem, openCart } = useCartStore();
  const { isInWishlist, toggleWishlist } = useWishlistStore();
  const { toast } = useToast();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Accordion open states
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  const isFavorited = isInWishlist(product.id);
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
    toast(`Added "${product.title}" (${selectedSize}) to bag`, 'success');
    openCart();
  };

  const handleWishlistToggle = () => {
    toggleWishlist(product);
    if (!isFavorited) {
      toast(`Saved to wishlist`, 'success');
    } else {
      toast(`Removed from wishlist`, 'info');
    }
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeChecked(true);
    } else {
      toast('Please enter a valid 6-digit Indian pincode', 'error');
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 6);

  return (
    <div className="bg-ivory min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-burgundy/10 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-[11px] text-burgundy/60 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-burgundy">Home</Link>
          <span>/</span>
          <Link href={`/collections/${product.category}`} className="hover:text-burgundy capitalize">
            {product.category.replace(/-/g, ' ')}
          </Link>
          <span>/</span>
          <span className="text-burgundy font-semibold truncate max-w-[200px] md:max-w-md">
            {product.title}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery (Swipe on Mobile, Thumbnails + Main on Desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Desktop Thumbnails */}
            <div className="hidden md:flex flex-col gap-3 shrink-0">
              {product.images.map((imgUrl, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`relative w-20 h-28 rounded-md overflow-hidden border-2 transition-all ${
                    activeImageIndex === index
                      ? 'border-burgundy shadow-sm scale-102'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={imgUrl}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main Image Display */}
            <div className="flex-1">
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white shadow-subtle border border-burgundy/10">
                <ImageWithFallback
                  src={product.images[activeImageIndex]}
                  alt={product.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />

                {/* Badges Overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10 pointer-events-none">
                  {product.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-xs font-bold tracking-wider rounded bg-rose text-burgundy shadow-xs uppercase"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* Wishlist Heart Top Right */}
                <button
                  onClick={handleWishlistToggle}
                  aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
                  className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-burgundy shadow-sm hover:scale-105 active:scale-95 transition"
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorited ? 'fill-rose text-rose' : 'text-burgundy'}`}
                  />
                </button>

                {/* Rating Pill Bottom Left */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-semibold text-burgundy shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>{product.rating}</span>
                  <span className="text-burgundy/30">|</span>
                  <span className="text-burgundy/70">{product.reviewCount} Reviews</span>
                </div>
              </div>

              {/* Mobile Image Indicator Dots / Thumbnail Bar */}
              <div className="flex md:hidden items-center justify-center gap-2 mt-3">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View photo ${idx + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeImageIndex === idx ? 'w-6 bg-burgundy' : 'w-2 bg-burgundy/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Tagline / Subcategory */}
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-rose-600">
              {product.category} · {product.subcategory}
            </span>

            {/* Title */}
            <h1 className="text-xl md:text-2xl font-bold font-serif text-burgundy mt-1.5 leading-snug">
              {product.title}
            </h1>

            {/* Price Row */}
            <div className="flex items-baseline gap-3 mt-3 pb-4 border-b border-burgundy/10">
              <span className="text-2xl md:text-3xl font-bold text-burgundy font-serif">
                {formatPrice(product.price)}
              </span>
              {product.mrp > product.price && (
                <>
                  <span className="text-sm text-burgundy/50 line-through">
                    {formatPrice(product.mrp)}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose/40 text-burgundy text-xs font-bold uppercase tracking-wider">
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* B1G1 Promo Callout */}
            <div className="bg-blush/40 border border-rose/30 p-3 rounded-lg my-4 flex items-center gap-2.5 text-xs text-burgundy">
              <Sparkles className="w-4 h-4 text-rose-600 shrink-0" />
              <span>
                <strong>Festive Offer:</strong> Buy 1 Get 1 Free automatically applies in cart on this item!
              </span>
            </div>

            {/* Color Swatches */}
            <div className="mt-2">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
                  Color: <span className="font-normal text-burgundy/80">{selectedColor.name}</span>
                </span>
              </div>
              <div className="flex gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    aria-label={`Select color ${c.name}`}
                    className={`min-w-[44px] min-h-[44px] p-1 rounded-full border-2 transition-all flex items-center justify-center ${
                      selectedColor.name === c.name
                        ? 'border-burgundy scale-105 shadow-xs'
                        : 'border-transparent hover:border-rose/50'
                    }`}
                  >
                    <span
                      className="w-7 h-7 rounded-full border border-burgundy/20 block flex items-center justify-center"
                      style={{ backgroundColor: c.hex }}
                    >
                      {selectedColor.name === c.name && (
                        <Check className="w-4 h-4 text-burgundy stroke-[3]" />
                      )}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-burgundy">
                  Select Size
                </span>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-xs text-burgundy/70 hover:text-burgundy flex items-center gap-1 underline font-medium"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Chart</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-h-[44px] rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center border ${
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

            {/* Quantity Stepper & CTA Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-stretch gap-3">
              {/* Quantity */}
              <div className="flex items-center justify-between border border-burgundy/20 rounded-lg overflow-hidden bg-white shrink-0 min-h-[48px] px-2 sm:w-32">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-10 h-10 flex items-center justify-center text-burgundy hover:bg-blush/40 font-bold text-base"
                >
                  -
                </button>
                <span className="text-xs font-bold text-burgundy">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-10 h-10 flex items-center justify-center text-burgundy hover:bg-blush/40 font-bold text-base"
                >
                  +
                </button>
              </div>

              {/* Add to Bag CTA */}
              <button
                onClick={handleAddToCart}
                className="flex-1 min-h-[48px] bg-burgundy hover:bg-burgundy-600 active:scale-98 text-white rounded-lg font-bold text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Add to Bag · {formatPrice(product.price * quantity)}</span>
              </button>
            </div>

            {/* Pincode Delivery Estimator */}
            <div className="mt-6 p-4 rounded-xl bg-white border border-burgundy/10 shadow-2xs">
              <span className="text-xs font-bold uppercase tracking-wider text-burgundy flex items-center gap-1.5 mb-2">
                <Truck className="w-4 h-4 text-burgundy" /> Delivery Options
              </span>
              <form onSubmit={handleCheckPincode} className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => {
                    setPincode(e.target.value);
                    setPincodeChecked(false);
                  }}
                  placeholder="Enter 6-digit Pincode"
                  className="flex-1 px-3 py-2 text-xs border border-burgundy/20 rounded-md focus:outline-none focus:border-burgundy"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-burgundy/90 text-white text-xs font-bold uppercase tracking-wider rounded-md hover:bg-burgundy transition"
                >
                  Check
                </button>
              </form>

              {pincodeChecked && (
                <div className="mt-3 pt-3 border-t border-burgundy/10 text-xs text-burgundy/90 space-y-1">
                  <p className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Delivery by Friday, 24 Nov · Free Express Delivery</span>
                  </p>
                  <p className="text-[11px] text-burgundy/70">
                    Cash on Delivery (COD) available for pincode {pincode}
                  </p>
                </div>
              )}
            </div>

            {/* Accordions */}
            <div className="mt-6 divide-y divide-burgundy/10 border-t border-b border-burgundy/10">
              {/* Product Details */}
              <div className="py-3.5">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? null : 'details')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-burgundy text-left min-h-[44px]"
                >
                  <span>Product Details & Styling</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openAccordion === 'details' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === 'details' && (
                  <div className="pt-2 pb-1 text-xs text-burgundy/80 leading-relaxed space-y-2">
                    <p>{product.description}</p>
                    <p>
                      <strong>Fabric:</strong> {product.fabric}
                    </p>
                    <p>
                      <strong>Fit:</strong> True to size tailored couture fit with internal boning/structuring.
                    </p>
                  </div>
                )}
              </div>

              {/* Fabric & Care */}
              <div className="py-3.5">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? null : 'care')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-burgundy text-left min-h-[44px]"
                >
                  <span>Fabric & Care Instructions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openAccordion === 'care' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === 'care' && (
                  <div className="pt-2 pb-1 text-xs text-burgundy/80 leading-relaxed space-y-1.5">
                    <p>• Premium handloom/embroidered fabric requires Dry Clean Only.</p>
                    <p>• Store in the complimentary Blossom Luxe muslin garment bag provided.</p>
                    <p>• Steam iron inside out on low heat setting.</p>
                  </div>
                )}
              </div>

              {/* Shipping & Returns */}
              <div className="py-3.5">
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-burgundy text-left min-h-[44px]"
                >
                  <span>Shipping & Hassle-Free 7-Day Returns</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${openAccordion === 'shipping' ? 'rotate-180' : ''}`}
                  />
                </button>
                {openAccordion === 'shipping' && (
                  <div className="pt-2 pb-1 text-xs text-burgundy/80 leading-relaxed space-y-1.5">
                    <p>• Complimentary express shipping on all prepaid orders across India.</p>
                    <p>• 7-Day easy return & size exchange with automated doorstep pickup.</p>
                    <p>• 100% money-back guarantee directly to original payment mode or store credit.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Carousel */}
        <div className="mt-16">
          <ProductCarousel
            title="You May Also Like"
            subtitle="Curated pieces complementing this luxury silhouette"
            viewAllHref={`/collections/${product.category}`}
            products={relatedProducts}
          />
        </div>
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-burgundy/60 backdrop-blur-xs"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-burgundy/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-burgundy font-serif">
                Blossom Luxe Size Chart (Inches)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-burgundy hover:bg-blush/40 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-xs text-left text-burgundy">
                <thead className="bg-blush/40 font-bold uppercase">
                  <tr>
                    <th className="p-2.5">Size</th>
                    <th className="p-2.5">Bust</th>
                    <th className="p-2.5">Waist</th>
                    <th className="p-2.5">Hip</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-burgundy/10">
                  <tr><td className="p-2.5 font-bold">XS</td><td className="p-2.5">32&quot;</td><td className="p-2.5">26&quot;</td><td className="p-2.5">35&quot;</td></tr>
                  <tr><td className="p-2.5 font-bold">S</td><td className="p-2.5">34&quot;</td><td className="p-2.5">28&quot;</td><td className="p-2.5">37&quot;</td></tr>
                  <tr><td className="p-2.5 font-bold">M</td><td className="p-2.5">36&quot;</td><td className="p-2.5">30&quot;</td><td className="p-2.5">39&quot;</td></tr>
                  <tr><td className="p-2.5 font-bold">L</td><td className="p-2.5">38&quot;</td><td className="p-2.5">32&quot;</td><td className="p-2.5">41&quot;</td></tr>
                  <tr><td className="p-2.5 font-bold">XL</td><td className="p-2.5">40&quot;</td><td className="p-2.5">34&quot;</td><td className="p-2.5">43&quot;</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-burgundy/60 mt-4">
              Tip: For structured corsets, order according to your waist measurement. All our corsets have adjustable lace-up modesty panels that accommodate up to 2 inches leeway.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

