import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  Trash2,
  Edit3,
  Search,
  Sparkles,
  Video,
  ShoppingBag,
  ExternalLink,
  Upload,
  Check,
  X,
  RefreshCw,
  Phone,
  Instagram,
  Eye,
  Sliders,
  DollarSign,
  PackageCheck,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  BansiProduct,
  SocialReel,
  BANSI_PRODUCTS,
  BANSI_REELS,
  BANSI_BRAND,
  ProductVariant
} from '../data/bansiProducts';

export interface ConciergeOrderLog {
  id: string;
  customerName: string;
  phone: string;
  deliveryCity: string;
  deliveryAddress: string;
  itemsSummary: string;
  totalAmount: number;
  paymentPreference: string;
  createdAt: string;
  status: 'Pending' | 'Confirmed' | 'Delivered';
}

interface AdminDashboardProps {
  products: BansiProduct[];
  onUpdateProducts: (newProducts: BansiProduct[]) => void;
  reels: SocialReel[];
  onUpdateReels: (newReels: SocialReel[]) => void;
  onCloseAdmin: () => void;
  onPreviewProduct: (product: BansiProduct) => void;
  orderLogs: ConciergeOrderLog[];
  onUpdateOrderLogs: (logs: ConciergeOrderLog[]) => void;
  brandSettings: typeof BANSI_BRAND;
  onUpdateBrandSettings: (settings: typeof BANSI_BRAND) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  onUpdateProducts,
  reels,
  onUpdateReels,
  onCloseAdmin,
  onPreviewProduct,
  orderLogs,
  onUpdateOrderLogs,
  brandSettings,
  onUpdateBrandSettings,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'products' | 'videos' | 'orders' | 'settings'>('products');
  const [productCategoryFilter, setProductCategoryFilter] = useState<'all' | 'hair' | 'cosmetics' | 'fragrance'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Product Add / Edit Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  
  // Product Form Fields
  const [formName, setFormName] = useState<string>('');
  const [formCategory, setFormCategory] = useState<'hair' | 'cosmetics' | 'fragrance'>('hair');
  const [formSubCategory, setFormSubCategory] = useState<string>('');
  const [formBasePrice, setFormBasePrice] = useState<number>(100);
  const [formTagline, setFormTagline] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formProvenance, setFormProvenance] = useState<string>('');
  const [formBadge, setFormBadge] = useState<string>('');
  const [formImageUrl, setFormImageUrl] = useState<string>('/src/assets/images/bansi_wig_product_1794407864446.jpg');
  const [formVariants, setFormVariants] = useState<ProductVariant[]>([]);
  const [formShades, setFormShades] = useState<Array<{ name: string; hex: string }>>([]);

  // Video Add Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);
  const [videoPlatform, setVideoPlatform] = useState<'tiktok' | 'instagram'>('tiktok');
  const [videoCaption, setVideoCaption] = useState<string>('');
  const [videoDirectUrl, setVideoDirectUrl] = useState<string>('');
  const [videoFeaturedProdId, setVideoFeaturedProdId] = useState<string>(products[0]?.id || '');
  const [videoFilePreview, setVideoFilePreview] = useState<string | null>(null);
  const [videoFileType, setVideoFileType] = useState<'video' | 'image'>('video');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const prodImageInputRef = useRef<HTMLInputElement>(null);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    if (productCategoryFilter !== 'all' && p.category !== productCategoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.subCategory.toLowerCase().includes(q);
    }
    return true;
  });

  // Open Create Product Modal
  const handleOpenCreateProduct = () => {
    setEditingProductId(null);
    setFormName('');
    setFormCategory('hair');
    setFormSubCategory('HD Lace Units');
    setFormBasePrice(150);
    setFormTagline('');
    setFormDescription('');
    setFormProvenance('100% Raw Virgin Hair');
    setFormBadge('New Arrival');
    setFormImageUrl('/src/assets/images/bansi_wig_product_1794407864446.jpg');
    setFormVariants([
      { id: 'v_1', label: '20 Inches', priceModifier: 0, inStock: true },
      { id: 'v_2', label: '24 Inches', priceModifier: 40, inStock: true },
      { id: 'v_3', label: '28 Inches', priceModifier: 80, inStock: true },
    ]);
    setFormShades([]);
    setIsProductModalOpen(true);
  };

  // Open Edit Product Modal
  const handleOpenEditProduct = (prod: BansiProduct) => {
    setEditingProductId(prod.id);
    setFormName(prod.name);
    setFormCategory(prod.category);
    setFormSubCategory(prod.subCategory);
    setFormBasePrice(prod.basePrice);
    setFormTagline(prod.tagline);
    setFormDescription(prod.description);
    setFormProvenance(prod.provenance);
    setFormBadge(prod.badge || '');
    setFormImageUrl(prod.imageUrl);
    setFormVariants(prod.variants ? [...prod.variants] : []);
    setFormShades(prod.shades ? [...prod.shades] : []);
    setIsProductModalOpen(true);
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Product name is required.');
      return;
    }

    if (editingProductId) {
      // Update
      const updated = products.map((p) => {
        if (p.id === editingProductId) {
          return {
            ...p,
            name: formName.trim(),
            category: formCategory,
            subCategory: formSubCategory.trim() || 'General',
            basePrice: Number(formBasePrice),
            tagline: formTagline.trim() || formName.trim(),
            description: formDescription.trim(),
            provenance: formProvenance.trim(),
            badge: formBadge.trim() || undefined,
            imageUrl: formImageUrl,
            variants: formVariants.length > 0 ? formVariants : undefined,
            shades: formShades.length > 0 ? formShades : undefined,
          };
        }
        return p;
      });
      onUpdateProducts(updated);
    } else {
      // Create new
      const newProd: BansiProduct = {
        id: `prod_${Date.now()}`,
        name: formName.trim(),
        category: formCategory,
        subCategory: formSubCategory.trim() || 'Exclusive Collection',
        basePrice: Number(formBasePrice),
        tagline: formTagline.trim() || formName.trim(),
        description: formDescription.trim(),
        provenance: formProvenance.trim() || 'Handcrafted Luxury',
        specs: {
          'Origin': formProvenance.trim() || 'Authentic Origin',
          'Quality Grade': 'Royal Atelier Grade',
          'Availability': 'In Stock & Hand-inspected',
        },
        badge: formBadge.trim() || 'New Arrival',
        imageUrl: formImageUrl,
        rating: 5.0,
        reviewsCount: 1,
        featured: true,
        variants: formVariants.length > 0 ? formVariants : undefined,
        shades: formShades.length > 0 ? formShades : undefined,
      };
      onUpdateProducts([newProd, ...products]);
    }

    setIsProductModalOpen(false);
  };

  // Delete Product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}" from the store catalog?`)) {
      onUpdateProducts(products.filter((p) => p.id !== id));
    }
  };

  // Delete Video Reel
  const handleDeleteReel = (id: string) => {
    if (confirm('Delete this social transformation video from the showcase?')) {
      onUpdateReels(reels.filter((r) => r.id !== id));
    }
  };

  // Save New Video
  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const linkedProd = products.find((p) => p.id === videoFeaturedProdId) || products[0];

    const newReel: SocialReel = {
      id: `reel_${Date.now()}`,
      platform: videoPlatform,
      creatorName: 'Bansi Official Atelier',
      handle: videoPlatform === 'tiktok' ? brandSettings.tiktokHandle : brandSettings.instagramHandle,
      caption: videoCaption.trim() || `Live look featuring ${linkedProd?.name || 'Bansi Beauty'}`,
      views: '54.2K',
      likes: '8.4K',
      featuredProductId: linkedProd?.id || '',
      featuredProductName: linkedProd?.name || 'Bansi Product',
      featuredProductPrice: linkedProd?.basePrice || 100,
      videoDuration: '0:30',
      thumbnailUrl: videoFileType === 'image' && videoFilePreview ? videoFilePreview : (linkedProd?.imageUrl || '/src/assets/images/bansi_wig_product_1794407864446.jpg'),
      videoUrl: videoFileType === 'video' && videoFilePreview ? videoFilePreview : undefined,
      directPostUrl: videoDirectUrl.trim() || (videoPlatform === 'tiktok' ? brandSettings.tiktokUrl : brandSettings.instagramUrl),
    };

    onUpdateReels([newReel, ...reels]);
    setIsVideoModalOpen(false);
    setVideoFilePreview(null);
    setVideoCaption('');
    setVideoDirectUrl('');
  };

  // Reset to original demo catalog
  const handleResetCatalog = () => {
    if (confirm('Reset store catalog and reels back to default initial items? Any custom creations will be removed.')) {
      onUpdateProducts(BANSI_PRODUCTS);
      onUpdateReels(BANSI_REELS);
      localStorage.removeItem('bansi_custom_products');
      localStorage.removeItem('bansi_custom_reels');
      alert('Storefront reset successfully to original luxury catalog.');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf2f4] text-[#2c0d1e] font-sans pb-16">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#fff0f4] border-b border-pink-200 px-6 py-4 backdrop-blur-md shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onCloseAdmin}
              className="flex items-center gap-1.5 rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-xs font-semibold text-pink-700 hover:text-pink-950 hover:border-pink-400 transition-colors cursor-pointer shadow-xs"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Storefront</span>
            </button>

            <div className="h-4 w-px bg-pink-200" />

            <div>
              <div className="text-base font-normal font-serif-luxury tracking-wide text-pink-950 flex items-center gap-1.5">
                <span className="font-semibold text-pink-600">BANSI</span> MANAGEMENT CONSOLE
              </div>
              <p className="text-[11px] text-pink-800/70 font-medium">
                Live Storefront Sync · Manage Products, Videos &amp; Concierge Orders
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleResetCatalog}
              className="flex items-center gap-1.5 rounded-lg border border-pink-200 bg-white px-3 py-1.5 text-xs text-pink-700 hover:bg-pink-50 transition-colors cursor-pointer shadow-xs"
              title="Reset to default catalog items"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset Demo Catalog</span>
            </button>

            <button
              onClick={handleOpenCreateProduct}
              className="flex items-center gap-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm shadow-pink-300"
            >
              <Plus className="h-4 w-4" />
              <span>Add New Product</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <div className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        {/* KPI Counter Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-pink-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-medium text-pink-800/70 uppercase tracking-wider">Total Products</div>
            <div className="text-2xl font-bold font-mono text-pink-700 mt-1">{products.length}</div>
            <div className="text-[11px] text-pink-600 mt-0.5">Live in Store</div>
          </div>

          <div className="rounded-xl border border-pink-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-medium text-pink-800/70 uppercase tracking-wider">Wigs &amp; Bundles</div>
            <div className="text-2xl font-bold font-mono text-pink-700 mt-1">
              {products.filter((p) => p.category === 'hair').length}
            </div>
            <div className="text-[11px] text-pink-600 mt-0.5">Raw Hair Units</div>
          </div>

          <div className="rounded-xl border border-pink-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-medium text-pink-800/70 uppercase tracking-wider">Video Reels</div>
            <div className="text-2xl font-bold font-mono text-pink-700 mt-1">{reels.length}</div>
            <div className="text-[11px] text-pink-600 mt-0.5">TikTok &amp; Instagram</div>
          </div>

          <div className="rounded-xl border border-pink-200 bg-white p-4 shadow-xs">
            <div className="text-xs font-medium text-pink-800/70 uppercase tracking-wider">Concierge Orders</div>
            <div className="text-2xl font-bold font-mono text-pink-700 mt-1">{orderLogs.length}</div>
            <div className="text-[11px] text-pink-600 mt-0.5">Logged Inquiries</div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-pink-200 pb-3">
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'products'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            Manage Products ({products.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('videos')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'videos'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            Manage Videos &amp; Reels ({reels.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'orders'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            Concierge Orders ({orderLogs.length})
          </button>

          <button
            onClick={() => setActiveAdminTab('settings')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeAdminTab === 'settings'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            Brand &amp; Social Links
          </button>
        </div>

        {/* --- TAB 1: PRODUCT MANAGEMENT --- */}
        {activeAdminTab === 'products' && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-pink-100/70 border border-pink-200">
                <button
                  onClick={() => setProductCategoryFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    productCategoryFilter === 'all'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-pink-900 hover:bg-white/50'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                <button
                  onClick={() => setProductCategoryFilter('hair')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    productCategoryFilter === 'hair'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-pink-900 hover:bg-white/50'
                  }`}
                >
                  Hair &amp; Wigs ({products.filter((p) => p.category === 'hair').length})
                </button>
                <button
                  onClick={() => setProductCategoryFilter('cosmetics')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    productCategoryFilter === 'cosmetics'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-pink-900 hover:bg-white/50'
                  }`}
                >
                  Cosmetics ({products.filter((p) => p.category === 'cosmetics').length})
                </button>
                <button
                  onClick={() => setProductCategoryFilter('fragrance')}
                  className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                    productCategoryFilter === 'fragrance'
                      ? 'bg-pink-600 text-white shadow-xs'
                      : 'text-pink-900 hover:bg-white/50'
                  }`}
                >
                  Fragrance ({products.filter((p) => p.category === 'fragrance').length})
                </button>
              </div>

              <div className="relative sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-pink-400" />
                <input
                  type="text"
                  placeholder="Filter by name, subcategory..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 bg-white pl-9 pr-3 py-1.5 text-xs text-pink-950 placeholder-pink-400 focus:border-pink-500 focus:outline-none shadow-xs"
                />
              </div>
            </div>

            {/* Products Table / Cards */}
            <div className="rounded-2xl border border-pink-200 bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#fff0f4] border-b border-pink-200 text-pink-950 font-semibold uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Base Price</th>
                      <th className="py-3 px-4">Options / Variants</th>
                      <th className="py-3 px-4">Badge</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-100">
                    {filteredProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-pink-50/40 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={prod.imageUrl}
                              alt={prod.name}
                              className="h-12 w-12 rounded-lg object-cover border border-pink-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <div className="font-semibold text-pink-950 truncate max-w-xs">
                                {prod.name}
                              </div>
                              <div className="text-[11px] text-pink-700">{prod.subCategory}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4">
                          <span className="capitalize font-medium text-pink-900 bg-pink-100/60 px-2 py-0.5 rounded border border-pink-200">
                            {prod.category}
                          </span>
                        </td>

                        <td className="py-3 px-4 font-mono font-bold text-pink-700">
                          ${prod.basePrice} USD
                        </td>

                        <td className="py-3 px-4 text-pink-800">
                          {prod.variants && prod.variants.length > 0 && (
                            <span>{prod.variants.length} lengths/sizes</span>
                          )}
                          {prod.shades && prod.shades.length > 0 && (
                            <span>{prod.shades.length} shades</span>
                          )}
                          {!prod.variants && !prod.shades && <span className="text-pink-400">Standard</span>}
                        </td>

                        <td className="py-3 px-4">
                          {prod.badge ? (
                            <span className="bg-pink-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                              {prod.badge}
                            </span>
                          ) : (
                            <span className="text-pink-400 text-[11px]">None</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onPreviewProduct(prod)}
                              className="p-1.5 rounded-lg border border-pink-200 text-pink-700 hover:bg-pink-100 transition-colors"
                              title="Preview in Store Modal"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => handleOpenEditProduct(prod)}
                              className="p-1.5 rounded-lg border border-pink-200 text-pink-700 hover:bg-pink-100 transition-colors"
                              title="Edit Product"
                            >
                              <Edit3 className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(prod.id, prod.name)}
                              className="p-1.5 rounded-lg border border-pink-200 text-pink-400 hover:text-red-600 hover:border-red-300 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: VIDEOS & REELS MANAGEMENT --- */}
        {activeAdminTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-pink-950 font-serif-luxury">
                  Manage Shoppable Transformation Reels
                </h3>
                <p className="text-xs text-pink-800/80">
                  Feature customer installations, TikTok clips, and Instagram swatches directly in the storefront player.
                </p>
              </div>

              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="flex items-center gap-1.5 rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs"
              >
                <Plus className="h-4 w-4" />
                <span>Upload / Add New Reel</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  className="rounded-2xl border border-pink-200 bg-white overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative aspect-[3/4] bg-black">
                    {reel.videoUrl ? (
                      <video src={reel.videoUrl} className="h-full w-full object-cover" muted loop autoPlay />
                    ) : (
                      <img src={reel.thumbnailUrl} alt={reel.caption} className="h-full w-full object-cover" />
                    )}
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-white">
                      {reel.platform.toUpperCase()}
                    </span>
                    <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-pink-300">
                      {reel.views} views
                    </span>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-xs text-pink-950 font-medium line-clamp-2 leading-relaxed">
                      {reel.caption}
                    </p>
                    <div className="text-[11px] text-pink-600">
                      Linked: <span className="font-semibold">{reel.featuredProductName}</span>
                    </div>

                    <div className="pt-2 border-t border-pink-100 flex items-center justify-between">
                      <a
                        href={reel.directPostUrl || brandSettings.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-pink-700 hover:underline flex items-center gap-1"
                      >
                        <span>Open Link</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <button
                        onClick={() => handleDeleteReel(reel.id)}
                        className="text-pink-400 hover:text-red-600 transition-colors p-1"
                        title="Delete Reel"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- TAB 3: CONCIERGE ORDERS LOG --- */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-pink-950 font-serif-luxury">
                  Concierge Orders &amp; Inquiries Log
                </h3>
                <p className="text-xs text-pink-800/80">
                  Every order initiated via WhatsApp Concierge is tracked here with customer contact details and cap sizing instructions.
                </p>
              </div>

              {orderLogs.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all logged order records?')) {
                      onUpdateOrderLogs([]);
                    }
                  }}
                  className="text-xs text-pink-600 hover:text-red-600"
                >
                  Clear Order History
                </button>
              )}
            </div>

            {orderLogs.length === 0 ? (
              <div className="rounded-2xl border border-pink-200 bg-white p-12 text-center shadow-xs">
                <ShoppingBag className="h-10 w-10 text-pink-400 mx-auto mb-3" />
                <p className="text-base font-semibold text-pink-950">No orders logged yet</p>
                <p className="text-xs text-pink-800/70 max-w-sm mx-auto mt-1">
                  When a customer adds products to their bag and clicks &quot;Checkout on WhatsApp Concierge&quot;, their order and contact information will appear here automatically.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-pink-200 bg-white overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#fff0f4] border-b border-pink-200 text-pink-950 font-semibold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="py-3 px-4">Date / ID</th>
                        <th className="py-3 px-4">Customer</th>
                        <th className="py-3 px-4">Phone / City</th>
                        <th className="py-3 px-4">Order Summary</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-100">
                      {orderLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-pink-50/40 transition-colors">
                          <td className="py-3 px-4 font-mono text-[11px] text-pink-800">
                            <div>{log.createdAt}</div>
                            <div className="text-pink-400 text-[10px]">{log.id}</div>
                          </td>

                          <td className="py-3 px-4 font-semibold text-pink-950">
                            {log.customerName}
                          </td>

                          <td className="py-3 px-4">
                            <div className="font-mono text-pink-900">{log.phone}</div>
                            <div className="text-[11px] text-pink-600">{log.deliveryCity}</div>
                          </td>

                          <td className="py-3 px-4 max-w-xs text-pink-900 leading-snug">
                            {log.itemsSummary}
                          </td>

                          <td className="py-3 px-4 font-mono font-bold text-pink-700">
                            ${log.totalAmount} USD
                          </td>

                          <td className="py-3 px-4">
                            <select
                              value={log.status}
                              onChange={(e) => {
                                const newStatus = e.target.value as any;
                                onUpdateOrderLogs(
                                  orderLogs.map((o) => (o.id === log.id ? { ...o, status: newStatus } : o))
                                );
                              }}
                              className="rounded-lg border border-pink-200 bg-pink-50 px-2 py-1 text-xs text-pink-950 font-semibold cursor-pointer"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Confirmed">Confirmed</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* --- TAB 4: BRAND SETTINGS & SOCIAL LINKS --- */}
        {activeAdminTab === 'settings' && (
          <div className="rounded-2xl border border-pink-200 bg-white p-6 sm:p-8 space-y-6 shadow-xs max-w-3xl">
            <div>
              <h3 className="text-lg font-bold text-pink-950 font-serif-luxury">
                Storefront &amp; Concierge Settings
              </h3>
              <p className="text-xs text-pink-800/80">
                Update the official WhatsApp contact number where customer orders are routed, plus social links.
              </p>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-pink-950 block mb-1">
                  WhatsApp Concierge Phone Number (International format)
                </label>
                <input
                  type="text"
                  value={brandSettings.whatsappNumber}
                  onChange={(e) =>
                    onUpdateBrandSettings({ ...brandSettings, whatsappNumber: e.target.value })
                  }
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 font-mono focus:border-pink-500 focus:outline-none"
                  placeholder="+233550000000"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-pink-950 block mb-1">
                    TikTok Official Profile URL
                  </label>
                  <input
                    type="url"
                    value={brandSettings.tiktokUrl}
                    onChange={(e) =>
                      onUpdateBrandSettings({ ...brandSettings, tiktokUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-pink-950 block mb-1">
                    TikTok Handle
                  </label>
                  <input
                    type="text"
                    value={brandSettings.tiktokHandle}
                    onChange={(e) =>
                      onUpdateBrandSettings({ ...brandSettings, tiktokHandle: e.target.value })
                    }
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-pink-950 block mb-1">
                    Instagram Official Profile URL
                  </label>
                  <input
                    type="url"
                    value={brandSettings.instagramUrl}
                    onChange={(e) =>
                      onUpdateBrandSettings({ ...brandSettings, instagramUrl: e.target.value })
                    }
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-pink-950 block mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={brandSettings.instagramHandle}
                    onChange={(e) =>
                      onUpdateBrandSettings({ ...brandSettings, instagramHandle: e.target.value })
                    }
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => alert('Brand & concierge settings saved successfully!')}
                  className="rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider shadow-xs"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL: ADD / EDIT PRODUCT --- */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl my-8 rounded-2xl border border-pink-200 bg-white p-6 shadow-2xl text-[#2c0d1e] space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <h3 className="text-lg font-bold text-pink-950 font-serif-luxury">
                {editingProductId ? 'Edit Product Post' : 'Add New Product to Catalog'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-pink-400 hover:text-pink-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-pink-950 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Raw Bone Straight 13x6 Frontal Unit"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-pink-950 block mb-1">Main Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none cursor-pointer"
                  >
                    <option value="hair">Wigs &amp; Bundles (Hair)</option>
                    <option value="cosmetics">Cosmetics (Lip, Face, Glow)</option>
                    <option value="fragrance">Fragrance (Extrait de Parfum, Mist)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-semibold text-pink-950 block mb-1">Sub-Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. HD Frontal Wigs"
                    value={formSubCategory}
                    onChange={(e) => setFormSubCategory(e.target.value)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-pink-950 block mb-1">Base Price ($ USD) *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formBasePrice}
                    onChange={(e) => setFormBasePrice(Number(e.target.value))}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 font-mono focus:border-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-pink-950 block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. Best Seller / Viral"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-pink-950 block mb-1">Provenance / Material Origin</label>
                <input
                  type="text"
                  placeholder="e.g. 100% Single Donor Cambodian Hair"
                  value={formProvenance}
                  onChange={(e) => setFormProvenance(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-pink-950 block mb-1">Short Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Silky glass hair with an undetectable melt hairline and 200% fullness."
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-pink-950 block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  placeholder="Detailed specifications, texture behavior, lace construction, scent notes..."
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Image URL & Quick Preset Selector */}
              <div className="space-y-1.5">
                <label className="font-semibold text-pink-950 block">Product Visual Asset</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    className="flex-1 rounded-lg border border-pink-200 p-2 text-pink-950 text-xs focus:border-pink-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => prodImageInputRef.current?.click()}
                    className="rounded-lg border border-pink-200 bg-pink-50 px-3 py-2 text-xs font-semibold text-pink-700 hover:bg-pink-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload</span>
                  </button>
                  <input
                    ref={prodImageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setFormImageUrl(URL.createObjectURL(file));
                    }}
                    className="hidden"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex items-center gap-2 pt-1 text-[11px] text-pink-800">
                  <span>Presets:</span>
                  <button
                    type="button"
                    onClick={() => setFormImageUrl('/src/assets/images/bansi_wig_product_1794407864446.jpg')}
                    className="underline hover:text-pink-950 cursor-pointer"
                  >
                    HD Lace Wig
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setFormImageUrl('/src/assets/images/bansi_curls_bundles_1794407866045.jpg')}
                    className="underline hover:text-pink-950 cursor-pointer"
                  >
                    Deep Wave
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setFormImageUrl('/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg')}
                    className="underline hover:text-pink-950 cursor-pointer"
                  >
                    Cosmetics
                  </button>
                  <span>·</span>
                  <button
                    type="button"
                    onClick={() => setFormImageUrl('/src/assets/images/bansi_perfume_bottle_1794407866806.jpg')}
                    className="underline hover:text-pink-950 cursor-pointer"
                  >
                    Perfume
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-pink-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="rounded-lg border border-pink-200 px-4 py-2 text-xs text-pink-800 hover:bg-pink-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  {editingProductId ? 'Save Product Changes' : 'Publish Product to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: ADD VIDEO REEL --- */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-pink-200 bg-white p-6 shadow-2xl text-[#2c0d1e] space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <Video className="h-5 w-5 text-pink-600" />
                <h3 className="text-lg font-bold text-pink-950">Add Transformation Video Reel</h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="text-pink-400 hover:text-pink-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-pink-950 block">Select Video File (.mp4, .mov, .webm)</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-xl p-4 text-center cursor-pointer bg-pink-50/50"
                >
                  {videoFilePreview ? (
                    <p className="text-pink-700 font-semibold">Video file selected! Ready to stream.</p>
                  ) : (
                    <div className="space-y-1">
                      <Upload className="h-6 w-6 text-pink-400 mx-auto" />
                      <p className="text-pink-950 font-medium">Click to select MP4 from device</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setVideoFilePreview(URL.createObjectURL(file));
                        setVideoFileType(file.type.startsWith('video') ? 'video' : 'image');
                      }
                    }}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-pink-950 block">Or Direct TikTok / Instagram URL</label>
                <input
                  type="url"
                  placeholder="https://www.tiktok.com/@bansicosmetics_hair/video/..."
                  value={videoDirectUrl}
                  onChange={(e) => setVideoDirectUrl(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-pink-950 block">Video Caption / Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 30 inch Raw Bone Straight install on our bride!"
                  value={videoCaption}
                  onChange={(e) => setVideoCaption(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-pink-950 block">Platform</label>
                  <select
                    value={videoPlatform}
                    onChange={(e) => setVideoPlatform(e.target.value as any)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  >
                    <option value="tiktok">TikTok (@bansicosmetics_hair)</option>
                    <option value="instagram">Instagram (@bansicosmetics_n_hair)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-pink-950 block">Featured Product</label>
                  <select
                    value={videoFeaturedProdId}
                    onChange={(e) => setVideoFeaturedProdId(e.target.value)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name.slice(0, 24)}... (${p.basePrice})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="rounded-lg border border-pink-200 px-4 py-2 text-xs text-pink-800 hover:bg-pink-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Publish Reel to Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
