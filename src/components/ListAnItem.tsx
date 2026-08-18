import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  ShoppingBag, 
  ArrowLeftRight, 
  HeartHandshake, 
  Wrench, 
  Scissors, 
  Leaf, 
  Tag, 
  MapPin, 
  ArrowRight, 
  RotateCcw,
  Bot
} from 'lucide-react';
import { ItemCategory, ItemCondition, ListingType, AIAnalysisResult } from '../types';
import { PRESET_AI_ANALYSES } from '../data/mockData';

export const ListAnItem: React.FC = () => {
  const { addNewListing, setActiveTab, analyzeItem } = useApp();

  const [step, setStep] = useState<number>(1);
  const [imagePreview, setImagePreview] = useState<string>('https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  // Form fields (pre-populated by AI, fully editable by student)
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [category, setCategory] = useState<ItemCategory>('Electronics');
  const [condition, setCondition] = useState<ItemCondition>('Good');
  const [listingType, setListingType] = useState<ListingType>('sell');
  const [price, setPrice] = useState<number>(1200);
  const [originalPrice, setOriginalPrice] = useState<number>(3500);
  const [exchangePreferences, setExchangePreferences] = useState<string>('');
  const [pickupLocation, setPickupLocation] = useState<string>('Aryabhatta Hostel Block B Gate or Central Library');
  const [tags, setTags] = useState<string[]>(['CampusItem', 'StudentDeal']);

  // Quick preset sample loaders for effortless judge testing
  const sampleItems = [
    { label: 'HP / Dell Laptop', key: 'laptop', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80' },
    { label: 'Hero Mountain Cycle', key: 'cycle', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=700&auto=format&fit=crop&q=80' },
    { label: 'Paula Bruice Chemistry', key: 'books', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80' },
    { label: 'Casio ClassWiz fx-991', key: 'calculator', img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=700&auto=format&fit=crop&q=80' },
    { label: 'Mini Drafter Kit', key: 'drafter', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&auto=format&fit=crop&q=80' }
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const resultUrl = uploadEvent.target?.result as string;
        setImagePreview(resultUrl);
        triggerAiScan('custom', file.name.replace(/\.[^/.]+$/, ""));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSample = (sample: typeof sampleItems[0]) => {
    setImagePreview(sample.img);
    triggerAiScan(sample.key as keyof typeof PRESET_AI_ANALYSES);
  };

  const triggerAiScan = (key: keyof typeof PRESET_AI_ANALYSES | 'custom', customName?: string) => {
    setIsScanning(true);
    setStep(2);

    setTimeout(() => {
      const result = analyzeItem(key, customName);
      setAnalysisResult(result);
      setTitle(result.detectedItem);
      setCategory(result.category);
      setCondition(result.condition);
      setPrice(result.estimatedResaleValue);
      setOriginalPrice(result.originalPriceEstimate);
      setDescription(`Well maintained ${result.detectedItem}. In ${result.condition.toLowerCase()} condition with full student functionality.`);
      setTags(result.suggestedTags);
      
      if (result.recommendedAction === 'DONATE') {
        setListingType('donate');
        setPrice(0);
      } else if (result.recommendedAction === 'EXCHANGE') {
        setListingType('exchange');
        setPrice(0);
        setExchangePreferences('Open to swapping for semester textbooks or electronics');
      } else {
        setListingType('sell');
      }

      setIsScanning(false);
      setStep(3);
    }, 1800);
  };

  const handlePublish = () => {
    addNewListing({
      title: title || 'Campus Listed Item',
      description: description || 'Available for verified student handoff on campus.',
      category,
      condition,
      type: listingType,
      price: listingType === 'sell' ? Number(price) : 0,
      originalPrice: Number(originalPrice) || undefined,
      images: [imagePreview],
      sellerId: '',
      sellerName: '',
      sellerAvatar: '',
      sellerCampus: '',
      sellerDepartment: '',
      sellerVerified: true,
      sellerRating: 5.0,
      circularScore: analysisResult?.circularScore || 90,
      co2SavedKg: analysisResult?.co2SavedKg || 6.5,
      exchangePreferences: listingType === 'exchange' ? exchangePreferences : undefined,
      tags: tags.length > 0 ? tags : ['CampusCycle', category],
      pickupLocation
    });

    setStep(5);
  };

  return (
    <div id="list-an-item-wizard" className="max-w-3xl mx-auto space-y-6 pb-20">
      
      {/* Header & Steps Indicator */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs text-center">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-3 py-1 rounded-full">
          Circular Listing Engine
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2 font-['Outfit',sans-serif]">
          List an Item on CampusCycle
        </h1>
        <p className="text-xs sm:text-sm text-emerald-800/80 mt-1">
          Our AI scans condition, estimates student resale price, and computes carbon offset.
        </p>

        {/* 5-Step Progress Pills */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-3 mt-6">
          {[
            { num: 1, label: 'Upload Photo' },
            { num: 2, label: 'AI Scan' },
            { num: 3, label: 'AI Insights' },
            { num: 4, label: 'Action & Price' },
            { num: 5, label: 'Publish' }
          ].map(s => (
            <div key={s.num} className="flex items-center gap-1">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step === s.num 
                  ? 'bg-emerald-600 text-white shadow-xs scale-105' 
                  : step > s.num 
                  ? 'bg-emerald-100 text-emerald-800 font-bold' 
                  : 'bg-emerald-50 text-emerald-900/40'
              }`}>
                {step > s.num ? '✓' : s.num}
              </div>
              <span className="hidden md:inline text-[11px] font-semibold text-emerald-900/80">
                {s.label}
              </span>
              {s.num < 5 && <div className="w-3 sm:w-6 h-0.5 bg-emerald-100"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: UPLOAD PHOTO */}
      {step === 1 && (
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Step 1: Upload or Snap Item Photo
            </h3>
            <p className="text-xs text-emerald-700 mt-0.5">
              Choose a sample campus item below or upload your own photo for automated AI vision analysis.
            </p>
          </div>

          {/* Drag and drop upload box */}
          <div className="relative border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-8 text-center bg-emerald-50/40 hover:bg-emerald-50/80 transition-all group cursor-pointer">
            <input
              id="file-upload-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-14 h-14 rounded-2xl bg-white shadow-xs text-emerald-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-7 h-7" />
            </div>
            <p className="text-sm font-bold text-emerald-950">
              Drag and drop item photo or <span className="text-emerald-600 underline">Browse files</span>
            </p>
            <p className="text-xs text-emerald-700/80 mt-1">
              Supports JPG, PNG, WEBP from mobile camera or desktop
            </p>
          </div>

          {/* Quick Demo Samples for Judges */}
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
              ⚡ Or Click a Demo Sample for Instant AI Analysis:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {sampleItems.map(sample => (
                <button
                  key={sample.key}
                  onClick={() => selectSample(sample)}
                  className="p-2 bg-emerald-50/70 hover:bg-emerald-100 border border-emerald-200/80 rounded-2xl text-left transition-all hover:scale-102 cursor-pointer flex flex-col items-center text-center group"
                >
                  <img src={sample.img} alt="" className="w-full aspect-square rounded-xl object-cover mb-2 group-hover:brightness-95" />
                  <span className="text-[11px] font-bold text-emerald-950 line-clamp-1">{sample.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: AI SCANNING ANIMATION */}
      {step === 2 && (
        <div className="bg-white border border-emerald-100 rounded-3xl p-10 shadow-xs text-center space-y-6 animate-in fade-in">
          <div className="relative max-w-xs mx-auto aspect-4/3 rounded-2xl overflow-hidden shadow-lg border border-emerald-200">
            <img src={imagePreview} alt="Scanning" className="w-full h-full object-cover brightness-90" />
            
            {/* Laser scanning line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 shadow-[0_0_15px_#10b981] animate-scan"></div>
            
            {/* Scanning grid overlay */}
            <div className="absolute inset-0 bg-emerald-900/20 backdrop-blur-2xs flex flex-col justify-between p-3 text-left">
              <span className="text-[10px] font-mono font-bold text-lime-300 bg-emerald-950/80 px-2 py-0.5 rounded">
                AI Vision Model: DETECTING_OBJECT
              </span>
              <span className="text-[10px] font-mono font-bold text-lime-300 bg-emerald-950/80 px-2 py-0.5 rounded self-end">
                CONFIDENCE: 96.4%
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold animate-pulse">
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Campus AI Vision Scanning Item Attributes...</span>
            </div>
            <p className="text-xs text-emerald-700">
              Evaluating physical condition, campus syllabus demand, and circular action recommendation.
            </p>
          </div>
        </div>
      )}

      {/* STEP 3: AI INSIGHTS & AUTO-SUGGESTIONS */}
      {step === 3 && analysisResult && (
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> AI Analysis Completed (Confidence {analysisResult.confidenceScore}%)
              </span>
              <h3 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif] mt-0.5">
                Item Recognized: {analysisResult.detectedItem}
              </h3>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-emerald-700 hover:text-emerald-950 font-semibold underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> Rescan
            </button>
          </div>

          {/* AI Result KPI Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Category</span>
              <span className="text-xs font-extrabold text-emerald-950 mt-0.5 block">{analysisResult.category}</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Condition</span>
              <span className="text-xs font-extrabold text-emerald-950 mt-0.5 block">{analysisResult.condition}</span>
            </div>

            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-left">
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Est. Fair Value</span>
              <span className="text-xs font-extrabold text-emerald-950 mt-0.5 block">₹{analysisResult.estimatedResaleValue}</span>
            </div>

            <div className="p-3 bg-lime-50 rounded-2xl border border-lime-200 text-left">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Carbon Offset</span>
              <span className="text-xs font-extrabold text-emerald-950 mt-0.5 block">+{analysisResult.co2SavedKg}kg CO₂</span>
            </div>
          </div>

          {/* Recommended Action Pill */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800">
                Recommended Circular Action: <strong className="text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-200">{analysisResult.recommendedAction}</strong>
              </span>
              <span className="text-xs text-emerald-700 font-medium">
                Alternative: {analysisResult.alternativeAction}
              </span>
            </div>

            <div className="text-xs text-emerald-900/80 space-y-1">
              <p className="font-bold text-emerald-950">Why this recommendation?</p>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-emerald-800">
                {analysisResult.reasoning.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <span>Continue to Action & Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: ACTION & PRICING CUSTOMIZATION */}
      {step === 4 && (
        <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 animate-in fade-in">
          <div>
            <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Step 4: Choose Circular Mode & Publish Details
            </h3>
            <p className="text-xs text-emerald-700 mt-0.5">
              Select whether to sell, exchange, donate, or list for campus repair.
            </p>
          </div>

          {/* Action Choice Tabs */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {[
              { id: 'sell', label: 'Sell', icon: ShoppingBag, points: '+50 Pts' },
              { id: 'exchange', label: 'Exchange', icon: ArrowLeftRight, points: '+100 Pts' },
              { id: 'donate', label: 'Donate', icon: HeartHandshake, points: '+150 Pts' },
              { id: 'repair', label: 'Repair', icon: Wrench, points: '+75 Pts' },
              { id: 'upcycle', label: 'Upcycle', icon: Scissors, points: '+75 Pts' }
            ].map(tab => {
              const Icon = tab.icon;
              const isSelected = listingType === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setListingType(tab.id as any)}
                  className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm' 
                      : 'border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 text-emerald-950'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-bold">{tab.label}</span>
                  <span className={`text-[9px] mt-0.5 font-bold ${isSelected ? 'text-lime-300' : 'text-emerald-700'}`}>
                    {tab.points}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-emerald-950 block mb-1">Listing Title</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 bg-white"
                placeholder="e.g. Hero Sprint Mountain Bicycle"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value as ItemCategory)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 bg-white"
                >
                  <option value="Books">Books</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Cycles">Cycles</option>
                  <option value="Furniture">Furniture</option>
                  <option value="College Supplies">College Supplies</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Physical Condition</label>
                <select
                  value={condition}
                  onChange={e => setCondition(e.target.value as ItemCondition)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 bg-white"
                >
                  <option value="Brand New">Brand New</option>
                  <option value="Like New">Like New</option>
                  <option value="Good">Good</option>
                  <option value="Fair">Fair</option>
                  <option value="Needs Minor Repair">Needs Minor Repair</option>
                </select>
              </div>
            </div>

            {/* Price Inputs (only for sell) */}
            {listingType === 'sell' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-emerald-950 block mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 bg-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-emerald-950 block mb-1">Original Retail Price (₹)</label>
                  <input
                    type="number"
                    value={originalPrice}
                    onChange={e => setOriginalPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-emerald-950 bg-white"
                  />
                </div>
              </div>
            )}

            {listingType === 'exchange' && (
              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">What would you like in exchange?</label>
                <input
                  type="text"
                  value={exchangePreferences}
                  onChange={e => setExchangePreferences(e.target.value)}
                  placeholder="e.g. 4th Sem Operating Systems Book OR USB-C Multiport Hub"
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                />
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-emerald-950 block mb-1">Description & Specs</label>
              <textarea
                rows={3}
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-emerald-950 block mb-1">Campus Handover Location</label>
              <input
                type="text"
                value={pickupLocation}
                onChange={e => setPickupLocation(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-emerald-100">
            <button
              onClick={() => setStep(3)}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-950 underline"
            >
              Back to Insights
            </button>

            <button
              id="btn-publish-listing"
              onClick={handlePublish}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md active:scale-95 transition-all cursor-pointer"
            >
              Publish to Campus Feed 🚀
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS CELEBRATION */}
      {step === 5 && (
        <div className="bg-white border border-emerald-100 rounded-3xl p-8 sm:p-12 shadow-md text-center space-y-5 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-3xl shadow-xs">
            🎉
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            Item Listed Successfully!
          </h2>

          <p className="text-xs sm:text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
            Your listing for <strong>"{title}"</strong> is now live on the NIET Campus circular marketplace.
          </p>

          <div className="inline-flex items-center gap-2 p-3 bg-lime-50 border border-lime-200 rounded-2xl text-xs font-bold text-emerald-950">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <span>Earned +{listingType === 'donate' ? '150' : listingType === 'exchange' ? '100' : '50'} Eco Points</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              View in Marketplace
            </button>
            <button
              onClick={() => {
                setStep(1);
                setTitle('');
              }}
              className="px-6 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-200 cursor-pointer"
            >
              List Another Item
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
