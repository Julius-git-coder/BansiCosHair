import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Instagram, Play } from 'lucide-react';
import { BANSI_BRAND } from '../data/bansiProducts';
import { BansiNavCategory } from './BansiNavigation';

interface BansiHeroProps {
  onSelectCategory: (cat: BansiNavCategory) => void;
  onOpenReels: () => void;
}

export const BansiHero: React.FC<BansiHeroProps> = ({ onSelectCategory, onOpenReels }) => {
  return (
    <section className="relative overflow-hidden border-b border-pink-200/80 bg-gradient-to-b from-[#fff0f4] via-[#fde4ec] to-[#fbf0f4] py-12 md:py-20 px-6">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-10 h-80 w-80 rounded-full bg-rose-400/15 blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6">
            {/* Minimalist provenance bar */}
            <div className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-pink-700 font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500 animate-pulse" />
              <span>Accra · London · Worldwide Concierge Shipping</span>
            </div>

            {/* Editorial Header */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#2c0d1e] font-serif-luxury leading-[1.12]">
              Crowning Royalty in{' '}
              <span className="italic font-serif-subtle text-pink-600">Raw Virgin Hair</span>,{' '}
              Flawless Skin &amp; Heavy Sillage.
            </h1>

            <p className="text-base sm:text-lg text-pink-900/80 font-normal leading-relaxed max-w-2xl">
              Authentic double-drawn raw human hair that lifts safely, second-skin makeup handcrafted for deep golden and rich melanin tones, and 30% concentration Extrait de Parfum flacons.
            </p>

            {/* Direct category quick jumps */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectCategory('hair')}
                className="group inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white hover:bg-pink-700 transition-all cursor-pointer shadow-lg shadow-pink-300/40"
              >
                <span>Shop Wigs &amp; Bundles</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onSelectCategory('cosmetics')}
                className="inline-flex items-center gap-2 rounded-lg border border-pink-200 bg-white/90 px-4 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-pink-900 hover:border-pink-400 hover:text-pink-950 transition-all cursor-pointer shadow-xs"
              >
                <span>Cosmetics</span>
              </button>

              <button
                onClick={() => onSelectCategory('fragrance')}
                className="inline-flex items-center gap-2 rounded-lg border border-pink-200 bg-white/90 px-4 py-3 text-xs sm:text-sm font-medium tracking-wider uppercase text-pink-900 hover:border-pink-400 hover:text-pink-950 transition-all cursor-pointer shadow-xs"
              >
                <span>Fragrance</span>
              </button>

              <button
                onClick={onOpenReels}
                className="inline-flex items-center gap-1.5 rounded-lg border border-pink-300 bg-pink-100/70 px-4 py-3 text-xs sm:text-sm font-semibold tracking-wider uppercase text-pink-700 hover:bg-pink-200 transition-all cursor-pointer shadow-xs"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Watch TikToks</span>
              </button>
            </div>

            {/* Value Pillars - unboxed text with bullets */}
            <div className="pt-6 border-t border-pink-200/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-pink-900/70">
              <div className="space-y-1">
                <p className="font-semibold text-pink-950">100% Raw Hair</p>
                <p className="text-[11px] leading-snug">Unprocessed single donor Cambodian &amp; Vietnamese cuticles</p>
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-pink-950">No Ashy Cast</p>
                <p className="text-[11px] leading-snug">Pigment formulations tested for rich warm and deep undertones</p>
              </div>
              <div className="space-y-1 col-span-2 sm:col-span-1">
                <p className="font-semibold text-pink-950">WhatsApp Concierge</p>
                <p className="text-[11px] leading-snug">Real-time cap sizing, lace tint advice &amp; direct payment assistance</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset with Social Badges */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative frame */}
              <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-pink-400/30 via-rose-300/20 to-pink-200/40 blur-sm" />

              <div className="relative rounded-2xl overflow-hidden border border-pink-200 bg-white shadow-xl shadow-pink-200/50">
                <img
                  src={BANSI_BRAND.heroImage}
                  alt="Bansi Cosmetics & Hair Model"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top transform transition-transform duration-700 hover:scale-105"
                />

                {/* Gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

                {/* Bottom Social Banner overlay */}
                <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-pink-200/50 bg-[#2d0e1e]/85 backdrop-blur-md p-3.5 flex items-center justify-between gap-3 text-white">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-pink-300">
                      <Sparkles className="h-3.5 w-3.5 text-pink-400" />
                      <span>BANSI VIRAL BEAUTY</span>
                    </div>
                    <p className="text-[11px] text-pink-100/80">
                      Featured on TikTok &amp; IG Reels · 1M+ Views
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <a
                      href={BANSI_BRAND.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-400/40 bg-pink-900/60 text-pink-200 hover:text-white transition-colors"
                      title="Follow on Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                    <a
                      href={BANSI_BRAND.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-pink-400/40 bg-pink-900/60 text-pink-200 hover:text-white transition-colors font-mono text-xs font-bold"
                      title="Follow on TikTok"
                    >
                      TT
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
