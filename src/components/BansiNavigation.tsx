import React from 'react';
import { ShoppingBag, Search, Sparkles, MessageCircle, Sliders } from 'lucide-react';
import { BANSI_BRAND } from '../data/bansiProducts';

export type BansiNavCategory = 'all' | 'hair' | 'cosmetics' | 'fragrance' | 'reels';

interface NavigationProps {
  currentCategory: BansiNavCategory;
  onSelectCategory: (cat: BansiNavCategory) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  isAdminActive?: boolean;
}

export const BansiNavigation: React.FC<NavigationProps> = ({
  currentCategory,
  onSelectCategory,
  cartCount,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin,
  isAdminActive,
}) => {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-8 border-b border-pink-200/80 bg-[#fff1f5]/90 px-6 py-4 backdrop-blur-md shadow-xs">
      {/* Zone 1: Single text element wordmark in luxury serif */}
      <button
        onClick={() => onSelectCategory('all')}
        className="text-lg sm:text-xl font-normal tracking-[0.25em] text-[#2e1020] whitespace-nowrap shrink-0 font-serif-luxury uppercase transition-opacity hover:opacity-85 cursor-pointer"
      >
        <span className="text-pink-600 font-semibold">BANSI</span> COSMETICS &amp; HAIR
      </button>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="hidden lg:flex items-center gap-7 text-xs tracking-widest uppercase font-medium text-pink-900/80">
        <button
          onClick={() => onSelectCategory('all')}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
            currentCategory === 'all'
              ? 'text-pink-700 border-b-2 border-pink-600 font-semibold'
              : 'hover:text-pink-950'
          }`}
        >
          All Collections
        </button>

        <button
          onClick={() => onSelectCategory('hair')}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
            currentCategory === 'hair'
              ? 'text-pink-700 border-b-2 border-pink-600 font-semibold'
              : 'hover:text-pink-950'
          }`}
        >
          Wigs &amp; Bundles
        </button>

        <button
          onClick={() => onSelectCategory('cosmetics')}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
            currentCategory === 'cosmetics'
              ? 'text-pink-700 border-b-2 border-pink-600 font-semibold'
              : 'hover:text-pink-950'
          }`}
        >
          Cosmetics
        </button>

        <button
          onClick={() => onSelectCategory('fragrance')}
          className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
            currentCategory === 'fragrance'
              ? 'text-pink-700 border-b-2 border-pink-600 font-semibold'
              : 'hover:text-pink-950'
          }`}
        >
          Fragrance
        </button>

        <button
          onClick={() => onSelectCategory('reels')}
          className={`flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer py-1 ${
            currentCategory === 'reels'
              ? 'text-pink-700 border-b-2 border-pink-600 font-semibold'
              : 'hover:text-pink-950'
          }`}
        >
          <span>Social Reels</span>
          <span className="text-[10px] text-pink-600 font-mono font-semibold">TikTok</span>
        </button>
      </nav>

      {/* Zone 3: 1 primary action button with search & cart & admin */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSearch}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-200 bg-white/80 text-pink-800 hover:border-pink-400 hover:text-pink-950 transition-colors cursor-pointer shadow-xs"
          title="Search Collections"
        >
          <Search className="h-4 w-4" />
        </button>

        <button
          onClick={onOpenAdmin}
          className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
            isAdminActive
              ? 'border-pink-600 bg-pink-600 text-white shadow-pink-200'
              : 'border-pink-200 bg-white/90 text-pink-700 hover:border-pink-400 hover:text-pink-950'
          }`}
          title="Admin Management Console"
        >
          <Sliders className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Admin</span>
        </button>

        <button
          onClick={onOpenCart}
          className="relative flex items-center gap-2 rounded-lg border border-pink-500 bg-pink-600 px-4 py-2 text-xs font-semibold tracking-wider uppercase text-white hover:bg-pink-700 transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-pink-200"
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          <span>Bag</span>
          {cartCount > 0 && (
            <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-pink-700 font-mono">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
