import React, { useState, useMemo } from 'react';
import { Search, Star, Sparkles, Filter, ChevronRight, MessageSquare, ArrowUpDown } from 'lucide-react';
import { BansiProduct, BANSI_PRODUCTS } from '../data/bansiProducts';
import { BansiNavCategory } from './BansiNavigation';

interface ProductCatalogProps {
  products?: BansiProduct[];
  activeCategory: BansiNavCategory;
  onSelectCategory: (cat: BansiNavCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelectProduct: (product: BansiProduct) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products = BANSI_PRODUCTS,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onSelectProduct,
}) => {
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Subcategories derived from current products
  const availableSubCategories = useMemo(() => {
    if (activeCategory === 'all' || activeCategory === 'reels') {
      return [];
    }
    const subs = new Set<string>();
    products.filter((p) => p.category === activeCategory).forEach((p) => subs.add(p.subCategory));
    return Array.from(subs);
  }, [activeCategory, products]);

  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      // Category match
      if (activeCategory !== 'all' && activeCategory !== 'reels' && prod.category !== activeCategory) {
        return false;
      }
      // Subcategory match
      if (selectedSubCategory !== 'all' && prod.subCategory !== selectedSubCategory) {
        return false;
      }
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = prod.name.toLowerCase().includes(query);
        const matchesDesc = prod.description.toLowerCase().includes(query);
        const matchesTagline = prod.tagline.toLowerCase().includes(query);
        const matchesProv = prod.provenance.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesTagline && !matchesProv) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first, then reviews
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return b.reviewsCount - a.reviewsCount;
    });
  }, [activeCategory, selectedSubCategory, searchQuery, sortBy]);

  return (
    <section id="catalog-section" className="py-14 px-6 max-w-7xl mx-auto">
      {/* Header and Controls */}
      <div className="space-y-6 mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-200/80 pb-6">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-pink-600 font-semibold mb-1">
              Curated Royal Selection
            </div>
            <h2 className="text-3xl md:text-4xl font-normal text-[#2c0d1e] font-serif-luxury tracking-tight">
              {activeCategory === 'hair' && 'Virgin Hair & HD Lace Wigs'}
              {activeCategory === 'cosmetics' && 'High-Melanin Second-Skin Cosmetics'}
              {activeCategory === 'fragrance' && 'Niche Artisanal Extrait de Parfum'}
              {(activeCategory === 'all' || activeCategory === 'reels') && 'The Complete Bansi Atelier'}
            </h2>
          </div>

          {/* Quick Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-pink-100/70 border border-pink-200 shadow-xs">
            <button
              onClick={() => {
                onSelectCategory('all');
                setSelectedSubCategory('all');
              }}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-pink-900 hover:text-pink-950 hover:bg-white/50'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => {
                onSelectCategory('hair');
                setSelectedSubCategory('all');
              }}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === 'hair'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-pink-900 hover:text-pink-950 hover:bg-white/50'
              }`}
            >
              Hair &amp; Wigs
            </button>
            <button
              onClick={() => {
                onSelectCategory('cosmetics');
                setSelectedSubCategory('all');
              }}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === 'cosmetics'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-pink-900 hover:text-pink-950 hover:bg-white/50'
              }`}
            >
              Cosmetics
            </button>
            <button
              onClick={() => {
                onSelectCategory('fragrance');
                setSelectedSubCategory('all');
              }}
              className={`px-3.5 py-1.5 text-xs uppercase tracking-wider font-semibold rounded-lg transition-all cursor-pointer ${
                activeCategory === 'fragrance'
                  ? 'bg-pink-600 text-white shadow-xs'
                  : 'text-pink-900 hover:text-pink-950 hover:bg-white/50'
              }`}
            >
              Fragrance
            </button>
          </div>
        </div>

        {/* Search bar and Filters bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Subcategory Filter Tabs */}
          {availableSubCategories.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-pink-900/70 font-semibold mr-1">Filter:</span>
              <button
                onClick={() => setSelectedSubCategory('all')}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  selectedSubCategory === 'all'
                    ? 'border border-pink-400 bg-pink-100 text-pink-700 font-semibold shadow-xs'
                    : 'border border-pink-200 bg-white/80 text-pink-900/80 hover:text-pink-950 hover:border-pink-300'
                }`}
              >
                All {activeCategory}
              </button>
              {availableSubCategories.map((sub) => (
                <button
                  key={sub}
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    selectedSubCategory === sub
                      ? 'border border-pink-400 bg-pink-100 text-pink-700 font-semibold shadow-xs'
                      : 'border border-pink-200 bg-white/80 text-pink-900/80 hover:text-pink-950 hover:border-pink-300'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-xs text-pink-900/70 font-medium">
              Showing {filteredProducts.length} luxury beauty &amp; hair items
            </div>
          )}

          {/* Search Input & Sort Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pink-400" />
              <input
                type="text"
                placeholder="Search wigs, shades, oud..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-lg border border-pink-200 bg-white pl-9 pr-3 py-1.5 text-xs text-pink-950 placeholder-pink-400/80 focus:border-pink-500 focus:outline-none shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-pink-400 hover:text-pink-700 text-xs cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products"
                className="appearance-none rounded-lg border border-pink-200 bg-white px-3 py-1.5 pr-7 text-xs text-pink-900 focus:border-pink-500 focus:outline-none cursor-pointer shadow-xs"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-pink-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl border border-pink-200 bg-white/70 p-12 text-center shadow-sm">
          <p className="text-pink-950 font-serif-luxury text-xl mb-2">No matching products found</p>
          <p className="text-pink-800/70 text-xs mb-6">
            Try adjusting your search query or selecting a different category tab.
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
              setSelectedSubCategory('all');
            }}
            className="rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white uppercase tracking-wider hover:bg-pink-700 transition-colors cursor-pointer shadow-xs"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group flex flex-col justify-between rounded-xl border border-pink-100 bg-white transition-all duration-300 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-200/50 overflow-hidden"
            >
              <div>
                {/* Image & Badges Container */}
                <div
                  onClick={() => onSelectProduct(prod)}
                  className="relative aspect-square w-full overflow-hidden bg-pink-50 cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

                  {/* Top badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    {prod.badge ? (
                      <span className="rounded bg-pink-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-xs">
                        {prod.badge}
                      </span>
                    ) : (
                      <span />
                    )}

                    <span className="text-[10px] font-semibold tracking-wider uppercase text-pink-900 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded border border-pink-200 shadow-xs">
                      {prod.category}
                    </span>
                  </div>

                  {/* Rating & Review count */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md text-xs shadow-xs border border-pink-100">
                    <Star className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
                    <span className="font-semibold text-pink-950">{prod.rating}</span>
                    <span className="text-pink-800/70 text-[11px]">({prod.reviewsCount})</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-2.5">
                  <div className="text-[11px] uppercase tracking-wider text-pink-600 font-semibold">
                    {prod.provenance}
                  </div>

                  <h3
                    onClick={() => onSelectProduct(prod)}
                    className="text-base font-semibold text-[#2c0d1e] font-serif-luxury leading-snug group-hover:text-pink-600 transition-colors cursor-pointer"
                  >
                    {prod.name}
                  </h3>

                  <p className="text-xs text-pink-900/75 line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>

                  {/* Shades Preview if cosmetics */}
                  {prod.shades && prod.shades.length > 0 && (
                    <div className="pt-1 flex items-center gap-1.5">
                      <span className="text-[10px] text-pink-800/80 font-medium">Shades:</span>
                      <div className="flex items-center -space-x-1">
                        {prod.shades.map((shade) => (
                          <span
                            key={shade.name}
                            title={shade.name}
                            style={{ backgroundColor: shade.hex }}
                            className="inline-block h-4 w-4 rounded-full border border-white shadow-xs"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-pink-800/70 font-medium">+{prod.shades.length} shades</span>
                    </div>
                  )}

                  {/* Variants Preview if hair/fragrance */}
                  {prod.variants && prod.variants.length > 0 && (
                    <div className="pt-1 text-[11px] text-pink-900/70">
                      <span>Available in: </span>
                      <span className="text-pink-950 font-medium">
                        {prod.variants.map((v) => v.label.split(' ')[0]).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price and Action Footer */}
              <div className="border-t border-pink-100 p-5 pt-3.5 flex items-center justify-between gap-3 bg-pink-50/40">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-pink-800/70 font-medium">Starting from</div>
                  <div className="text-lg font-bold text-pink-700 font-mono">
                    ${prod.basePrice} <span className="text-xs font-normal text-pink-800/70">USD</span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectProduct(prod)}
                  className="rounded-lg border border-pink-300 bg-pink-50 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-pink-700 hover:bg-pink-600 hover:text-white transition-all cursor-pointer whitespace-nowrap shadow-xs"
                >
                  Customize &amp; Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
