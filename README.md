# Blossom Luxe (BLOSSOM LUXE) Storefront

> *"Unfolding the Art of Luxury"*

A luxury demo e-commerce storefront for **Blossom Luxe**, featuring **Indo-Western fusion silhouettes**, **structured corsets**, and **royal festive wear** for women.

The UI and UX closely mirrors the clean, dense, app-like, mobile-first experience of **littleboxindia.com**, elevated with Blossom Luxe's regal aesthetic, high-contrast typography, and floral emblem branding.

---

## 🌸 Brand Design System & Tokens

- **Rose (`#EBA5B8`)**: Badges, countdown strips, button accents, promotional callouts.
- **Blush (`#F8DDE5`)**: Soft section backdrops, subtle button active states, icon pill backgrounds.
- **Ivory (`#FFF8F9`)**: Primary canvas background for high-end editorial contrast.
- **Burgundy (`#4A1A2C`)**: Primary brand typography, main CTAs, luxury borders, dark accents.
- **Gold (`#C9A36B`)**: Star rating highlights, metallic accents, luxury badges.
- **Typography**:
  - Headings & Logo: `Playfair Display` (next/font)
  - UI Text & Product Info: `Inter` (next/font)
- **Emblem**: Original *Blossom Luxe Floral Emblem* line-art insignia.

---

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript (`tsc --noEmit` verified, 0 errors)
- **Styling**: Tailwind CSS + custom brand palette
- **State Management**: Zustand with `persist` middleware (Cart and Wishlist stored in `localStorage`, hydration-safe)
- **Form Validation**: `react-hook-form` + `zod` + `@hookform/resolvers`
- **Animations**: Framer Motion (subtle spring sheets, slide-over drawer, fade modals) + `canvas-confetti`
- **Icons**: `lucide-react`
- **Image Optimization**: `next/image` with remote patterns configured for `images.unsplash.com` and custom fallback error handling.

---

## 📱 Layout & Features (Mirroring Littlebox Architecture)

1. **Top Strip**:
   - Burgundy announcement bar: `"Get special discount inside app · ★ 4.8 · 1M+ Downloads"` with `"Get App"` action.
2. **Sticky Header**:
   - Mobile hamburger drawer + Blossom Luxe emblem logo + search trigger pill (`"Search corset tops, lehengas..."`) + wishlist counter + user profile + shopping bag counter badge.
   - Horizontally scrollable category row: New Arrivals, Indo-Western, Corsets, Festive Wear, Best Sellers, Sale.
   - Desktop hover **Mega-Menu** with featured category highlights, style spotlights, and direct links.
3. **Live B1G1 Promo Banner**:
   - Rose background with `"BUY 1 GET 1 sale is live!"`, live ticking countdown (`Day : Hour : Mins : Secs`), and `"Shop Now"` CTA.
4. **"SHOP BY CATEGORY"**:
   - Horizontally scrollable circular category avatars with snap-scrolling and hidden scrollbars: Indo-Western, Corsets, Festive Wear, Lehengas, Sarees, Gowns, Co-ords, Kurta Sets, Blouses.
5. **Product Carousels**:
   - Three dedicated horizontal scroll rows: `"New Arrivals"`, `"Best Sellers"`, and `"Festive Edit"`.
   - Card peek on mobile, desktop navigation arrows, and `"View All"` collection deep-links.
6. **"SHOP BY COLLECTION" (Editorial Cards)**:
   - 4 editorial tiles: *Wedding Guest*, *Sangeet & Mehendi*, *Diwali Glam*, and *Party Night*.
7. **"SHOP BY BUDGET"**:
   - Direct budget filter chips: *Under ₹999*, *₹999–₹1,999*, *₹1,999–₹3,999*, *₹3,999+*.
8. **ALL PRODUCTS Grid**:
   - Dense responsive grid: 2 columns on mobile, 3 on tablet, 4 on desktop.
   - 12 products per page with infinite-feel `"Load More Styles"` button and animated skeleton placeholders.
9. **Customer Reviews Strip**:
   - `"★ 4.8 · 10,000+ verified reviews"` with verified buyer testimonials from Mumbai, Bengaluru, and New Delhi.
10. **Trust Badges**:
    - *Fast Delivery Pan-India* · *Easy 7-Day Return & Exchange* · *100% Secure Checkout* · *Proudly Made in India*.
11. **Mobile Bottom Navigation**:
    - Fixed bottom navigation bar (*Home*, *Explore*, *Wishlist*, *Cart*, *Account*) with active indicator, live badges, and iOS safe-area support.
12. **Cart Slide-Over Drawer**:
    - Slide-over drawer with item cards, quantity modifiers (`+`/`-`), removal, free express shipping meter (unlocked at ₹1,999+), free silk gift meter (at ₹2,999+), coupon input (`BLOSSOM10` for 10% off), bill summary, and direct checkout link.
13. **Product Detail Page (`/product/[slug]`)**:
    - 3:4 gallery with mobile swipe and desktop thumbnail selection.
    - Size selector with interactive **Size Guide Chart modal** (inches & bust/waist/hip measurements).
    - Color swatch selector with checkmarks.
    - Pincode delivery estimator with instant validation and delivery date calculation.
    - Expandable accordions for *Product Details*, *Fabric & Care Instructions*, and *Shipping & Returns*.
    - *"You May Also Like"* recommendations carousel.
14. **Collection Page (`/collections/[slug]`)**:
    - Desktop filter sidebar & mobile bottom sheet: Filter by subcategory, price range, size, and color swatches.
    - Sorting dropdown (*Featured*, *Price: Low to High*, *Price: High to Low*, *Top Rated*, *Biggest Discount*).
    - Active filter chips with one-click reset.
15. **Checkout Page (`/checkout`)**:
    - Full address form validated with Zod schema (Name, Email, 10-digit Indian Mobile, 6-digit Pincode, Address, City).
    - Payment options: UPI (Instant GPay/PhonePe), Credit/Debit Cards, Cash on Delivery (COD).
    - Order summary sidebar with price breakdown and coupon deductions.
16. **Order Success Page (`/order-success`)**:
    - Celebratory confetti animation (`canvas-confetti`).
    - Auto-generated Order ID (e.g. `BL-892415`), estimated delivery date, step-by-step shipment timeline, and printable receipt preview.

---

## 📦 What Is Mocked vs Live

| Feature | Status | Implementation Details |
|---|---|---|
| **Products & Catalog** | Mocked Data | 24 products in `src/data/products.ts` with real, verified HTTP 200 Unsplash fashion photos. |
| **Cart & Wishlist State** | Client Persistent | Zustand persisted in `localStorage`, client-only hydration guards to eliminate SSR mismatch. |
| **Coupons** | Mocked Rules | `BLOSSOM10` (10% discount) and `LUXE20` (20% discount). |
| **Pincode Delivery Check** | Mocked Engine | Checks 6-digit valid format and returns estimated delivery date + COD availability. |
| **Payment Gateway** | Demo Simulation | Radio selector for UPI, Cards, and COD without live payment gateway redirection. |
| **Search Engine** | Real-Time Client Search | Live substring search across product title, category, subcategory, fabric, and color names. |
| **Order Placement** | Session Storage | Simulates order submission, clears the cart, and redirects to `/order-success` with persistent order receipt in `sessionStorage`. |

---

## 🛠️ Local Development & Build Commands

```bash
# Install dependencies
npm install

# Start local development server (port 3000)
npm run dev

# Run TypeScript type check
npx tsc --noEmit

# Production build
npm run build

# Start production server
npm start
```

