import React from 'react';
import { Instagram, MessageSquare, ShieldCheck, Sparkles, Heart, ArrowUp } from 'lucide-react';
import { BANSI_BRAND } from '../data/bansiProducts';
import { BansiNavCategory } from './BansiNavigation';

interface BansiFooterProps {
  onSelectCategory: (cat: BansiNavCategory) => void;
  onOpenCart: () => void;
}

export const BansiFooter: React.FC<BansiFooterProps> = ({ onSelectCategory, onOpenCart }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-pink-200 bg-[#240b18] text-pink-200/90 text-xs">
      {/* Guarantees Ribbon */}
      <div className="border-b border-pink-900/40 bg-[#2d0e20] py-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BANSI_BRAND.guarantees.map((guarantee, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-pink-500/15 text-pink-400 border border-pink-400/30 shrink-0">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <p className="text-pink-100 font-medium leading-snug">{guarantee}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="text-xl font-normal text-white font-serif-luxury tracking-[0.2em] uppercase">
            <span className="text-pink-400 font-semibold">BANSI</span> COSMETICS &amp; HAIR
          </div>

          <p className="text-pink-200/80 max-w-sm leading-relaxed text-xs">
            {BANSI_BRAND.description}
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={BANSI_BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-700/60 bg-pink-950/70 text-pink-200 hover:text-white hover:border-pink-400 transition-colors"
              title="Follow Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>

            <a
              href={BANSI_BRAND.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-700/60 bg-pink-950/70 text-pink-200 hover:text-white hover:border-pink-400 transition-colors font-mono text-xs font-bold"
              title="Follow TikTok"
            >
              TT
            </a>

            <a
              href={`https://wa.me/${BANSI_BRAND.whatsappNumber.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-pink-700/60 bg-pink-950/70 text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/60 transition-colors"
              title="Direct WhatsApp"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Collections Navigation */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-pink-300">
            Collections
          </div>
          <ul className="space-y-2 text-pink-200/70">
            <li>
              <button
                onClick={() => onSelectCategory('hair')}
                className="hover:text-pink-300 transition-colors cursor-pointer"
              >
                HD Frontal Wigs
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('hair')}
                className="hover:text-pink-300 transition-colors cursor-pointer"
              >
                Raw Human Bundles
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('cosmetics')}
                className="hover:text-pink-300 transition-colors cursor-pointer"
              >
                Liquid Lip Kits
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('cosmetics')}
                className="hover:text-pink-300 transition-colors cursor-pointer"
              >
                Filter Foundations
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('fragrance')}
                className="hover:text-pink-300 transition-colors cursor-pointer"
              >
                Extrait de Parfum
              </button>
            </li>
          </ul>
        </div>

        {/* Social Atelier Links */}
        <div className="md:col-span-2 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-pink-300">
            Social Studio
          </div>
          <ul className="space-y-2 text-pink-200/70">
            <li>
              <a
                href={BANSI_BRAND.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition-colors block"
              >
                TikTok: @bansicosmetics_hair
              </a>
            </li>
            <li>
              <a
                href={BANSI_BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-pink-300 transition-colors block"
              >
                Instagram: @bansicosmetics_n_hair
              </a>
            </li>
            <li>
              <button
                onClick={() => onSelectCategory('reels')}
                className="hover:text-pink-300 transition-colors cursor-pointer"
              >
                Watch Transformation Reels
              </button>
            </li>
          </ul>
        </div>

        {/* Concierge Desk */}
        <div className="md:col-span-3 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-pink-300">
            Concierge &amp; Orders
          </div>
          <p className="text-pink-200/80 leading-relaxed text-xs">
            Direct personal styling assistance, cap sizing questions, and payment verification via WhatsApp.
          </p>
          <div className="text-pink-100 font-mono text-xs font-semibold">
            {BANSI_BRAND.whatsappFormatted}
          </div>
          <p className="text-[11px] text-pink-300/60">
            Mon – Sat: 8:00 AM – 10:00 PM GMT
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-900/40 py-6 px-6 bg-[#1f0914]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-pink-300/60">
          <div>
            &copy; {new Date().getFullYear()} BANSI COSMETICS &amp; HAIR. All rights reserved. Handcrafted luxury for the modern queen.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-pink-300 hover:text-white transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
