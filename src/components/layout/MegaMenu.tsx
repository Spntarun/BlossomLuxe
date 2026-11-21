'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '@/components/common/ImageWithFallback';

interface MegaMenuProps {
  category: string;
  onClose: () => void;
}

export function MegaMenu({ category, onClose }: MegaMenuProps) {
  if (category === 'Indo-Western') {
    return (
      <div className="absolute top-full left-0 w-full bg-white border-b border-burgundy/15 shadow-xl py-6 px-8 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3 font-serif">
              Fusion Styles
            </h4>
            <ul className="space-y-2 text-xs text-burgundy/80">
              <li><Link href="/collections/indo-western?sub=Draped+Sets" onClick={onClose} className="hover:text-rose-600 transition">Draped Kurta Sets</Link></li>
              <li><Link href="/collections/indo-western?sub=Ready-to-Wear+Sarees" onClick={onClose} className="hover:text-rose-600 transition">1-Minute Pre-Draped Sarees</Link></li>
              <li><Link href="/collections/indo-western?sub=Sharara+Sets" onClick={onClose} className="hover:text-rose-600 transition">Peplum Sharara Ensembles</Link></li>
              <li><Link href="/collections/indo-western?sub=Jumpsuits" onClick={onClose} className="hover:text-rose-600 transition">Cape Sleeve Jumpsuits</Link></li>
              <li><Link href="/collections/indo-western?sub=Co-ords" onClick={onClose} className="hover:text-rose-600 transition">Dhoti Pants & Crop Sets</Link></li>
              <li><Link href="/collections/indo-western?sub=Gowns" onClick={onClose} className="hover:text-rose-600 transition">Accordion Pleated Gowns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3 font-serif">
              Shop by Vibe
            </h4>
            <ul className="space-y-2 text-xs text-burgundy/80">
              <li><Link href="/collections/indo-western" onClick={onClose} className="hover:text-rose-600 transition">Cocktail Soiree</Link></li>
              <li><Link href="/collections/indo-western" onClick={onClose} className="hover:text-rose-600 transition">Modern Reception</Link></li>
              <li><Link href="/collections/indo-western" onClick={onClose} className="hover:text-rose-600 transition">Sangeet Beats</Link></li>
              <li><Link href="/collections/indo-western" onClick={onClose} className="hover:text-rose-600 transition">Bridesmaid Coordinates</Link></li>
            </ul>
          </div>

          {/* Featured Card 1 */}
          <Link
            href="/collections/indo-western"
            onClick={onClose}
            className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-blush/20 block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
              alt="Pre-draped Sarees"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose">Spotlight</span>
              <p className="text-sm font-serif font-bold">1-Minute Pre-Draped Sarees</p>
              <span className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                Shop The Edit <ArrowRight className="w-3 h-3 text-rose" />
              </span>
            </div>
          </Link>

          {/* Featured Card 2 */}
          <Link
            href="/collections/indo-western"
            onClick={onClose}
            className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-blush/20 block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80"
              alt="Draped Skirt Sets"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose">New Launch</span>
              <p className="text-sm font-serif font-bold">Asymmetrical Draped Sets</p>
              <span className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                Explore Now <ArrowRight className="w-3 h-3 text-rose" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === 'Corsets') {
    return (
      <div className="absolute top-full left-0 w-full bg-white border-b border-burgundy/15 shadow-xl py-6 px-8 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3 font-serif">
              Corset Silhouettes
            </h4>
            <ul className="space-y-2 text-xs text-burgundy/80">
              <li><Link href="/collections/corsets?sub=Satin+Corsets" onClick={onClose} className="hover:text-rose-600 transition">Duchess Satin Boned Tops</Link></li>
              <li><Link href="/collections/corsets?sub=Ethnic+Corsets" onClick={onClose} className="hover:text-rose-600 transition">Banarasi Brocade Blouse Corsets</Link></li>
              <li><Link href="/collections/corsets?sub=Lace+%26+Mesh" onClick={onClose} className="hover:text-rose-600 transition">Floral Sheer Mesh & Lace</Link></li>
              <li><Link href="/collections/corsets?sub=Velvet+Corsets" onClick={onClose} className="hover:text-rose-600 transition">Plush Micro-Velvet Corsets</Link></li>
              <li><Link href="/collections/corsets?sub=Embellished+Corsets" onClick={onClose} className="hover:text-rose-600 transition">Pearl & Glass Bead Encrusted</Link></li>
              <li><Link href="/collections/corsets?sub=Crop+Corsets" onClick={onClose} className="hover:text-rose-600 transition">Cutout Ribbed Crop Corsets</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3 font-serif">
              Special Edits
            </h4>
            <ul className="space-y-2 text-xs text-burgundy/80">
              <li><Link href="/collections/corsets" onClick={onClose} className="hover:text-rose-600 transition">Under ₹1,499 Steals</Link></li>
              <li><Link href="/collections/corsets" onClick={onClose} className="hover:text-rose-600 transition">12-Steel Bone Shaping</Link></li>
              <li><Link href="/collections/corsets" onClick={onClose} className="hover:text-rose-600 transition">Bridal Ivory Bustiers</Link></li>
              <li><Link href="/collections/corsets" onClick={onClose} className="hover:text-rose-600 transition">Lace-up Modesty Backs</Link></li>
            </ul>
          </div>

          <Link
            href="/collections/corsets"
            onClick={onClose}
            className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-blush/20 block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=800&q=80"
              alt="Satin Corset"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose">Signature</span>
              <p className="text-sm font-serif font-bold">12-Bone Duchess Satin</p>
              <span className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                Explore Best Seller <ArrowRight className="w-3 h-3 text-rose" />
              </span>
            </div>
          </Link>

          <Link
            href="/collections/corsets"
            onClick={onClose}
            className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-blush/20 block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&w=800&q=80"
              alt="Banarasi Corset"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose">Crossover</span>
              <p className="text-sm font-serif font-bold">Woven Banarasi Corset Blouse</p>
              <span className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                Shop Fusion <ArrowRight className="w-3 h-3 text-rose" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  if (category === 'Festive Wear') {
    return (
      <div className="absolute top-full left-0 w-full bg-white border-b border-burgundy/15 shadow-xl py-6 px-8 z-40 animate-in fade-in slide-in-from-top-1 duration-150">
        <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3 font-serif">
              Royal Festive
            </h4>
            <ul className="space-y-2 text-xs text-burgundy/80">
              <li><Link href="/collections/festive-wear?sub=Lehengas" onClick={onClose} className="hover:text-rose-600 transition">Kalidar Bridal & Party Lehengas</Link></li>
              <li><Link href="/collections/festive-wear?sub=Sarees" onClick={onClose} className="hover:text-rose-600 transition">Hand-Sequinned Glam Sarees</Link></li>
              <li><Link href="/collections/festive-wear?sub=Anarkalis" onClick={onClose} className="hover:text-rose-600 transition">Flared Gota Patti Anarkalis</Link></li>
              <li><Link href="/collections/festive-wear?sub=Kurta+Sets" onClick={onClose} className="hover:text-rose-600 transition">Mirror-Work Garara Sets</Link></li>
              <li><Link href="/collections/festive-wear?sub=Gowns" onClick={onClose} className="hover:text-rose-600 transition">Plush Velvet Evening Gowns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-burgundy mb-3 font-serif">
              Occasions
            </h4>
            <ul className="space-y-2 text-xs text-burgundy/80">
              <li><Link href="/collections/festive-wear" onClick={onClose} className="hover:text-rose-600 transition">Wedding Guest Glam</Link></li>
              <li><Link href="/collections/festive-wear" onClick={onClose} className="hover:text-rose-600 transition">Sangeet Twirl Edits</Link></li>
              <li><Link href="/collections/festive-wear" onClick={onClose} className="hover:text-rose-600 transition">Diwali Light Luxe</Link></li>
              <li><Link href="/collections/festive-wear" onClick={onClose} className="hover:text-rose-600 transition">Intimate Mehendi Pastels</Link></li>
            </ul>
          </div>

          <Link
            href="/collections/festive-wear"
            onClick={onClose}
            className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-blush/20 block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80"
              alt="Rani Pink Lehenga"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose">Royal Heritage</span>
              <p className="text-sm font-serif font-bold">Zari Work Rani Pink Lehenga</p>
              <span className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                View Collection <ArrowRight className="w-3 h-3 text-rose" />
              </span>
            </div>
          </Link>

          <Link
            href="/collections/festive-wear"
            onClick={onClose}
            className="group relative rounded-lg overflow-hidden aspect-[4/3] bg-blush/20 block"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80"
              alt="Velvet Gown"
              fill
              sizes="300px"
              className="object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/30 to-transparent p-4 flex flex-col justify-end text-white">
              <span className="text-[10px] uppercase font-bold tracking-widest text-rose">Festive Velvet</span>
              <p className="text-sm font-serif font-bold">High Slit Evening Gowns</p>
              <span className="text-[11px] text-white/80 flex items-center gap-1 mt-0.5">
                Shop Velvet <ArrowRight className="w-3 h-3 text-rose" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return null;
}

