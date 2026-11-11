import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Heart,
  Share2,
  Sparkles,
  ExternalLink,
  ShoppingBag,
  Eye,
  Instagram,
  Upload,
  Link as LinkIcon,
  Volume2,
  VolumeX,
  X,
  Check,
  Video,
  Plus
} from 'lucide-react';
import {
  BANSI_BRAND,
  BANSI_REELS,
  SocialReel,
  BansiProduct,
  BANSI_PRODUCTS
} from '../data/bansiProducts';

interface ShoppableReelsProps {
  onSelectProduct: (product: BansiProduct) => void;
  reels?: SocialReel[];
  onUpdateReels?: (reels: SocialReel[]) => void;
}

export const ShoppableReels: React.FC<ShoppableReelsProps> = ({
  onSelectProduct,
  reels: externalReels,
  onUpdateReels,
}) => {
  const [activeTab, setActiveTab] = useState<'shoppable' | 'tiktok-feed' | 'instagram-feed'>('shoppable');
  
  // Custom user reels state with fallback
  const [internalReels, setInternalReels] = useState<SocialReel[]>(BANSI_REELS);
  const reelsList = externalReels || internalReels;
  const setReelsList = onUpdateReels || setInternalReels;

  const [activeReelId, setActiveReelId] = useState<string>(reelsList[0]?.id || BANSI_REELS[0].id);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [likedReels, setLikedReels] = useState<{ [id: string]: boolean }>({});
  
  // Uploader Modal State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [newReelCaption, setNewReelCaption] = useState<string>('');
  const [newReelPlatform, setNewReelPlatform] = useState<'tiktok' | 'instagram'>('tiktok');
  const [newReelDirectUrl, setNewReelDirectUrl] = useState<string>('');
  const [newReelProductId, setNewReelProductId] = useState<string>(BANSI_PRODUCTS[0].id);
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string | null>(null);
  const [uploadedFileType, setUploadedFileType] = useState<'video' | 'image'>('image');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoElemRef = useRef<HTMLVideoElement>(null);

  const activeReel = reelsList.find((r) => r.id === activeReelId) || reelsList[0] || BANSI_REELS[0];
  const featuredProduct = BANSI_PRODUCTS.find((p) => p.id === activeReel.featuredProductId);

  // Reload TikTok official embed script when switching to TikTok tab
  useEffect(() => {
    if (activeTab === 'tiktok-feed') {
      const existingScript = document.getElementById('tiktok-embed-script');
      if (existingScript) {
        existingScript.remove();
      }
      const script = document.createElement('script');
      script.id = 'tiktok-embed-script';
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [activeTab]);

  const toggleLike = (id: string) => {
    setLikedReels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShopNow = () => {
    if (featuredProduct) {
      onSelectProduct(featuredProduct);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setUploadedFilePreview(objectUrl);
      setUploadedFileType(file.type.startsWith('video') ? 'video' : 'image');
    }
  };

  const handleCreateCustomReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFilePreview && !newReelDirectUrl.trim()) {
      alert('Please upload a video/photo file or paste a TikTok/Instagram URL.');
      return;
    }

    const linkedProduct = BANSI_PRODUCTS.find((p) => p.id === newReelProductId) || BANSI_PRODUCTS[0];

    const newReel: SocialReel = {
      id: `custom_reel_${Date.now()}`,
      platform: newReelPlatform,
      creatorName: 'BANSI OFFICIAL',
      handle: newReelPlatform === 'tiktok' ? BANSI_BRAND.tiktokHandle : BANSI_BRAND.instagramHandle,
      caption: newReelCaption.trim() || `Real beauty transformation with ${linkedProduct.name}`,
      views: '12.4K',
      likes: '1.8K',
      featuredProductId: linkedProduct.id,
      featuredProductName: linkedProduct.name,
      featuredProductPrice: linkedProduct.basePrice,
      videoDuration: '0:30',
      thumbnailUrl: uploadedFileType === 'image' && uploadedFilePreview ? uploadedFilePreview : linkedProduct.imageUrl,
      videoUrl: uploadedFileType === 'video' && uploadedFilePreview ? uploadedFilePreview : undefined,
      directPostUrl: newReelDirectUrl.trim() || (newReelPlatform === 'tiktok' ? BANSI_BRAND.tiktokUrl : BANSI_BRAND.instagramUrl),
    };

    const updated = [newReel, ...reelsList];
    setReelsList(updated);
    setActiveReelId(newReel.id);

    // Save custom reels to localStorage
    try {
      const onlyCustom = updated.filter((r) => r.id.startsWith('custom_'));
      localStorage.setItem('bansi_custom_reels', JSON.stringify(onlyCustom));
    } catch {
      // Ignore
    }

    // Reset and close
    setUploadedFilePreview(null);
    setNewReelCaption('');
    setNewReelDirectUrl('');
    setIsUploadModalOpen(false);
  };

  return (
    <section id="social-reels-section" className="py-16 px-6 bg-gradient-to-b from-[#fff0f4] via-[#fce4eb] to-[#fff0f4] border-t border-b border-pink-200">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header section with verified social handles */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-pink-600 font-semibold">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span>Real Social Feed · Direct from TikTok &amp; Instagram</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-normal text-[#2c0d1e] font-serif-luxury tracking-tight">
              Watch Real Client Transformations &amp; Melts
            </h2>
            <p className="text-pink-900/80 text-xs sm:text-sm max-w-xl">
              Verified media from <span className="font-semibold text-pink-950">{BANSI_BRAND.tiktokHandle}</span> and <span className="font-semibold text-pink-950">{BANSI_BRAND.instagramHandle}</span>. Inspect actual hair bounce, lace tint melts, and cosmetic swatches.
            </p>
          </div>

          {/* Social Profiles Badges & Upload Trigger */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={BANSI_BRAND.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-xs text-pink-950 hover:border-pink-400 transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-100 font-mono font-bold text-[10px] text-pink-700">
                TT
              </div>
              <div>
                <div className="font-semibold">{BANSI_BRAND.tiktokHandle}</div>
                <div className="text-[10px] text-pink-600 group-hover:text-pink-700">Open TikTok Profile</div>
              </div>
              <ExternalLink className="h-3 w-3 text-pink-400 group-hover:text-pink-600 ml-1" />
            </a>

            <a
              href={BANSI_BRAND.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 rounded-xl border border-pink-200 bg-white px-3.5 py-2 text-xs text-pink-950 hover:border-pink-400 transition-all shadow-xs group cursor-pointer"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white shadow-xs">
                <Instagram className="h-3 w-3" />
              </div>
              <div>
                <div className="font-semibold">{BANSI_BRAND.instagramHandle}</div>
                <div className="text-[10px] text-pink-600 group-hover:text-pink-700">Open Instagram Profile</div>
              </div>
              <ExternalLink className="h-3 w-3 text-pink-400 group-hover:text-pink-600 ml-1" />
            </a>

            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add / Upload Video</span>
            </button>
          </div>
        </div>

        {/* View Mode Switcher Tabs */}
        <div className="flex items-center gap-2 border-b border-pink-200 pb-3">
          <button
            onClick={() => setActiveTab('shoppable')}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === 'shoppable'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white/80 text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            Shoppable Reels Player
          </button>

          <button
            onClick={() => setActiveTab('tiktok-feed')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === 'tiktok-feed'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white/80 text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            <span className="font-mono text-[10px] font-bold">TT</span>
            <span>Live TikTok Feed</span>
          </button>

          <button
            onClick={() => setActiveTab('instagram-feed')}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
              activeTab === 'instagram-feed'
                ? 'bg-pink-600 text-white shadow-xs'
                : 'bg-white/80 text-pink-900 hover:bg-pink-100 border border-pink-200'
            }`}
          >
            <Instagram className="h-3.5 w-3.5" />
            <span>Live Instagram Atelier</span>
          </button>
        </div>

        {/* --- TAB 1: SHOPPABLE REELS PLAYER --- */}
        {activeTab === 'shoppable' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Phone Viewport */}
            <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[360px] aspect-[9/16] rounded-3xl overflow-hidden border-4 border-pink-300/90 bg-black shadow-2xl shadow-pink-300/40">
                {/* Real video playback or cinematic media preview */}
                {activeReel.videoUrl ? (
                  <video
                    ref={videoElemRef}
                    src={activeReel.videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={activeReel.thumbnailUrl}
                    alt={activeReel.caption}
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isPlaying ? 'scale-105' : 'scale-100'
                    }`}
                  />
                )}

                {/* Dark gradient scrims */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />

                {/* Top Bar: Platform & Controls */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="flex items-center gap-1.5 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-pink-400/30">
                    <span className="h-2 w-2 rounded-full bg-pink-500 animate-ping" />
                    <span>{activeReel.platform.toUpperCase()} REEL</span>
                  </span>

                  <div className="flex items-center gap-1.5">
                    {activeReel.videoUrl && (
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-pink-400/30 hover:text-pink-300 cursor-pointer"
                        title={isMuted ? 'Unmute' : 'Mute'}
                      >
                        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (activeReel.videoUrl && videoElemRef.current) {
                          if (isPlaying) videoElemRef.current.pause();
                          else videoElemRef.current.play();
                        }
                        setIsPlaying(!isPlaying);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-pink-400/30 hover:text-pink-300 cursor-pointer"
                    >
                      {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-white" />}
                    </button>
                  </div>
                </div>

                {/* Right Side Social Actions */}
                <div className="absolute right-3 bottom-24 flex flex-col items-center gap-4 z-10">
                  <button
                    onClick={() => toggleLike(activeReel.id)}
                    className="flex flex-col items-center gap-1 text-white group cursor-pointer"
                  >
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition-colors ${
                        likedReels[activeReel.id]
                          ? 'bg-pink-600 text-white'
                          : 'bg-black/60 text-pink-100 group-hover:text-pink-300'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${likedReels[activeReel.id] ? 'fill-white' : ''}`} />
                    </div>
                    <span className="text-[10px] font-mono font-medium drop-shadow">
                      {activeReel.likes}
                    </span>
                  </button>

                  <div className="flex flex-col items-center gap-1 text-white">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-pink-100">
                      <Eye className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono font-medium drop-shadow">
                      {activeReel.views}
                    </span>
                  </div>

                  <a
                    href={activeReel.directPostUrl || BANSI_BRAND.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1 text-white hover:text-pink-300"
                    title="Open on official account"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-pink-100">
                      <Share2 className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-mono">Original</span>
                  </a>
                </div>

                {/* Bottom Reel Details & Shoppable Card */}
                <div className="absolute bottom-3 left-3 right-16 z-10 space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <a
                        href={activeReel.directPostUrl || BANSI_BRAND.tiktokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-pink-300 drop-shadow hover:underline flex items-center gap-1"
                      >
                        <span>{activeReel.handle}</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                      <span className="text-[10px] text-pink-100 bg-pink-900/80 px-1.5 py-0.5 rounded">
                        Verified
                      </span>
                    </div>
                    <p className="text-xs text-white leading-snug drop-shadow line-clamp-2">
                      {activeReel.caption}
                    </p>
                  </div>

                  {/* Shoppable Tag Card */}
                  {featuredProduct && (
                    <div
                      onClick={handleShopNow}
                      className="flex items-center gap-2.5 rounded-xl border border-pink-400 bg-black/85 backdrop-blur-md p-2 hover:bg-black transition-all cursor-pointer shadow-lg"
                    >
                      <img
                        src={featuredProduct.imageUrl}
                        alt={featuredProduct.name}
                        className="h-10 w-10 rounded-lg object-cover shrink-0 border border-pink-400/40"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] uppercase tracking-wider text-pink-300 font-semibold truncate">
                          Shop Featured Look
                        </div>
                        <div className="text-xs font-semibold text-white truncate">
                          {featuredProduct.name}
                        </div>
                        <div className="text-xs font-mono font-bold text-pink-400">
                          ${featuredProduct.basePrice} USD
                        </div>
                      </div>
                      <div className="rounded-lg bg-pink-600 p-2 text-white hover:bg-pink-700">
                        <ShoppingBag className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-stone-800">
                  <div className={`h-full bg-pink-500 ${isPlaying ? 'animate-pulse w-4/5' : 'w-1/3'}`} />
                </div>
              </div>
            </div>

            {/* Right Column: Carousel Thumbnails & Details */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-semibold text-[#2c0d1e] uppercase tracking-wider font-serif-luxury">
                    Select Transformation Video ({reelsList.length})
                  </h3>
                  <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="text-xs text-pink-700 font-semibold hover:text-pink-900 flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    <span>Upload Your Own</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {reelsList.map((reel) => {
                    const isCurrent = reel.id === activeReel.id;
                    return (
                      <button
                        key={reel.id}
                        onClick={() => {
                          setActiveReelId(reel.id);
                          setIsPlaying(true);
                        }}
                        className={`group relative rounded-xl overflow-hidden aspect-[3/4] border text-left transition-all cursor-pointer shadow-xs ${
                          isCurrent
                            ? 'border-pink-500 ring-2 ring-pink-400/40'
                            : 'border-pink-200 hover:border-pink-400 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={reel.thumbnailUrl}
                          alt={reel.caption}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                        <div className="absolute top-2 left-2 flex items-center gap-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-mono text-white">
                          <Play className="h-2 w-2 fill-white" />
                          <span>{reel.views}</span>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="text-[10px] font-semibold text-white truncate">
                            {reel.featuredProductName}
                          </div>
                          <div className="text-[9px] text-pink-300 font-mono font-semibold">
                            ${reel.featuredProductPrice} USD
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Shoppable Look Deep-Dive Details */}
              {featuredProduct && (
                <div className="rounded-2xl border border-pink-200 bg-white p-6 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-pink-500" />
                      <span className="text-xs uppercase tracking-wider font-semibold text-pink-700">
                        Product Featured in this Clip
                      </span>
                    </div>
                    <a
                      href={activeReel.directPostUrl || BANSI_BRAND.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-pink-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <span>View on {activeReel.platform === 'tiktok' ? 'TikTok' : 'Instagram'}</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-normal text-[#2c0d1e] font-serif-luxury">
                        {featuredProduct.name}
                      </h4>
                      <p className="text-xs text-pink-900/80 mt-1 max-w-lg">
                        {featuredProduct.tagline}
                      </p>
                    </div>

                    <button
                      onClick={handleShopNow}
                      className="rounded-lg bg-pink-600 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-pink-700 transition-all cursor-pointer whitespace-nowrap shadow-md shadow-pink-300/40"
                    >
                      Customize This Unit
                    </button>
                  </div>
                </div>
              )}

              {/* Official Social Links Card */}
              <div className="rounded-2xl border border-pink-200 bg-white/90 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-pink-950 uppercase tracking-wider">
                    Official Social Channels
                  </div>
                  <p className="text-xs text-pink-900/80">
                    Follow both accounts for daily restocks, lace-tint tutorials, and discount codes.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={BANSI_BRAND.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-800 px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>TikTok</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <a
                    href={BANSI_BRAND.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-pink-100 hover:bg-pink-200 text-pink-800 px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Instagram</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 2: OFFICIAL TIKTOK FEED (@bansicosmetics_hair) --- */}
        {activeTab === 'tiktok-feed' && (
          <div className="rounded-2xl border border-pink-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-white font-mono text-[10px] font-bold">
                    TT
                  </span>
                  <h3 className="text-lg font-bold text-pink-950">
                    BANSI COSMETICSandHAIR on TikTok
                  </h3>
                </div>
                <p className="text-xs text-pink-800/80 mt-1">
                  Official live TikTok creator profile &amp; videos at <span className="font-semibold text-pink-950">@bansicosmetics_hair</span>
                </p>
              </div>

              <a
                href={BANSI_BRAND.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-pink-700 transition-all shadow-xs"
              >
                <span>Open in TikTok App</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Official TikTok Embed Container */}
            <div className="flex justify-center py-4">
              <div className="w-full max-w-xl">
                <blockquote
                  className="tiktok-embed"
                  cite="https://www.tiktok.com/@bansicosmetics_hair"
                  data-unique-id="bansicosmetics_hair"
                  data-embed-type="creator"
                  style={{ width: '100%', minHeight: '400px' }}
                >
                  <section className="text-center p-8 bg-pink-50 rounded-2xl border border-pink-200">
                    <p className="text-sm font-semibold text-pink-950 mb-2">
                      Loading @bansicosmetics_hair directly from TikTok...
                    </p>
                    <p className="text-xs text-pink-800/80 mb-4">
                      If your browser restricts third-party social iframes, click below to view the official profile and video catalog:
                    </p>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://www.tiktok.com/@bansicosmetics_hair"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-pink-600 text-white px-4 py-2 text-xs font-semibold"
                    >
                      <span>Visit @bansicosmetics_hair on TikTok</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </section>
                </blockquote>
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: OFFICIAL INSTAGRAM ATELIER (@bansicosmetics_n_hair) --- */}
        {activeTab === 'instagram-feed' && (
          <div className="rounded-2xl border border-pink-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-pink-600 to-rose-400 text-white shadow-xs">
                    <Instagram className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="text-lg font-bold text-pink-950">
                    BANSI COSMETICS &amp; HAIR on Instagram
                  </h3>
                </div>
                <p className="text-xs text-pink-800/80 mt-1">
                  Official Instagram Atelier profile at <span className="font-semibold text-pink-950">@bansicosmetics_n_hair</span>
                </p>
              </div>

              <a
                href={BANSI_BRAND.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-pink-600 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-pink-700 transition-all shadow-xs"
              >
                <span>Open in Instagram App</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Instagram Live Showcase Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-4">
              <div className="rounded-xl border border-pink-200 bg-pink-50/50 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-950">HD Lace &amp; Wigs</span>
                  <span className="text-[10px] text-pink-600 font-mono">Reels</span>
                </div>
                <img
                  src="/src/assets/images/bansi_wig_product_1794407864446.jpg"
                  alt="Wig Reel"
                  className="rounded-lg aspect-square object-cover w-full border border-pink-200"
                />
                <p className="text-xs text-pink-900/80">
                  Flawless HD film lace installations, pre-plucked hair line illusion, and Cambodian single donor hair.
                </p>
                <a
                  href={BANSI_BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-lg bg-white border border-pink-200 text-pink-700 py-1.5 text-xs font-semibold hover:border-pink-400"
                >
                  View on Instagram
                </a>
              </div>

              <div className="rounded-xl border border-pink-200 bg-pink-50/50 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-950">Melanin Lip Kits</span>
                  <span className="text-[10px] text-pink-600 font-mono">Swatches</span>
                </div>
                <img
                  src="/src/assets/images/bansi_cosmetics_flatlay_1794407865133.jpg"
                  alt="Cosmetics Swatch"
                  className="rounded-lg aspect-square object-cover w-full border border-pink-200"
                />
                <p className="text-xs text-pink-900/80">
                  Transfer-proof Velvet Matte liquid lipsticks tested on deep golden and rich cocoa complexions.
                </p>
                <a
                  href={BANSI_BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-lg bg-white border border-pink-200 text-pink-700 py-1.5 text-xs font-semibold hover:border-pink-400"
                >
                  View on Instagram
                </a>
              </div>

              <div className="rounded-xl border border-pink-200 bg-pink-50/50 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-pink-950">Artisanal Oud</span>
                  <span className="text-[10px] text-pink-600 font-mono">Fragrance</span>
                </div>
                <img
                  src="/src/assets/images/bansi_perfume_bottle_1794407866806.jpg"
                  alt="Perfume Flacon"
                  className="rounded-lg aspect-square object-cover w-full border border-pink-200"
                />
                <p className="text-xs text-pink-900/80">
                  30% Extrait de Parfum flacons and hydrating hair mists infused with Moroccan argan gloss.
                </p>
                <a
                  href={BANSI_BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center rounded-lg bg-white border border-pink-200 text-pink-700 py-1.5 text-xs font-semibold hover:border-pink-400"
                >
                  View on Instagram
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* --- ADD / UPLOAD YOUR REAL REEL MODAL --- */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-pink-200 bg-white p-6 shadow-2xl text-[#2c0d1e] space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-pink-600" />
                <h3 className="text-lg font-bold text-pink-950">
                  Add Your Real Video or Picture
                </h3>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-pink-400 hover:text-pink-700 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomReel} className="space-y-4 text-xs">
              {/* Option A: File Upload */}
              <div className="space-y-1.5">
                <label className="font-semibold text-pink-950 block">
                  Select Video (.mp4, .mov, .webm) or Picture
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-pink-300 hover:border-pink-500 rounded-xl p-4 text-center cursor-pointer bg-pink-50/50 transition-colors"
                >
                  {uploadedFilePreview ? (
                    <div className="space-y-2">
                      {uploadedFileType === 'video' ? (
                        <video
                          src={uploadedFilePreview}
                          className="h-28 mx-auto rounded-lg object-cover"
                          autoPlay
                          muted
                          loop
                        />
                      ) : (
                        <img
                          src={uploadedFilePreview}
                          alt="Uploaded Preview"
                          className="h-28 mx-auto rounded-lg object-cover"
                        />
                      )}
                      <p className="text-pink-700 font-semibold">
                        File selected! Click to change
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      <Video className="h-8 w-8 text-pink-400 mx-auto" />
                      <p className="text-pink-950 font-medium">
                        Click to browse local video or photo from your phone / computer
                      </p>
                      <p className="text-[11px] text-pink-600">
                        Supports MP4, MOV, WEBM, JPG, PNG
                      </p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*,image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Option B: Direct Post URL */}
              <div className="space-y-1">
                <label className="font-semibold text-pink-950 block">
                  Or Paste TikTok / Instagram Video Link
                </label>
                <input
                  type="url"
                  placeholder="e.g. https://www.tiktok.com/@bansicosmetics_hair/video/..."
                  value={newReelDirectUrl}
                  onChange={(e) => setNewReelDirectUrl(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 placeholder-pink-300 focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Caption */}
              <div className="space-y-1">
                <label className="font-semibold text-pink-950 block">Caption / Headline</label>
                <input
                  type="text"
                  placeholder="e.g. 30 inch Raw Bone Straight install on our bride!"
                  value={newReelCaption}
                  onChange={(e) => setNewReelCaption(e.target.value)}
                  className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 placeholder-pink-300 focus:border-pink-500 focus:outline-none"
                />
              </div>

              {/* Link to Product */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-pink-950 block">Platform Badge</label>
                  <select
                    value={newReelPlatform}
                    onChange={(e) => setNewReelPlatform(e.target.value as any)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  >
                    <option value="tiktok">TikTok (@bansicosmetics_hair)</option>
                    <option value="instagram">Instagram (@bansicosmetics_n_hair)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-pink-950 block">Feature Product</label>
                  <select
                    value={newReelProductId}
                    onChange={(e) => setNewReelProductId(e.target.value)}
                    className="w-full rounded-lg border border-pink-200 p-2 text-pink-950 focus:border-pink-500 focus:outline-none"
                  >
                    {BANSI_PRODUCTS.map((p) => (
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
                  onClick={() => setIsUploadModalOpen(false)}
                  className="rounded-lg border border-pink-200 px-4 py-2 text-xs text-pink-800 hover:bg-pink-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Publish to Store Reels
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
