import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bot, 
  Sparkles, 
  Camera, 
  Upload, 
  CheckCircle2, 
  TrendingUp, 
  Leaf, 
  ShoppingBag, 
  ArrowLeftRight, 
  HeartHandshake, 
  Wrench, 
  Zap, 
  Info,
  Layers,
  ArrowRight
} from 'lucide-react';
import { PRESET_AI_ANALYSES } from '../data/mockData';
import { AIAnalysisResult } from '../types';

export const AIAnalyzer: React.FC = () => {
  const { analyzeItem, setActiveTab, addNewListing } = useApp();

  const [selectedSampleKey, setSelectedSampleKey] = useState<string>('laptop');
  const [imagePreview, setImagePreview] = useState<string>('https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80');
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(() => PRESET_AI_ANALYSES.laptop);

  const presets = [
    { key: 'laptop', label: 'Dell / HP Laptop', icon: '💻', img: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80' },
    { key: 'cycle', label: 'Hero Mountain Cycle', icon: '🚲', img: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=700&auto=format&fit=crop&q=80' },
    { key: 'calculator', label: 'Casio ClassWiz', icon: '🔢', img: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=700&auto=format&fit=crop&q=80' },
    { key: 'books', label: 'Chemistry Book', icon: '📖', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80' },
    { key: 'drafter', label: 'Mini Drafter Kit', icon: '📐', img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&auto=format&fit=crop&q=80' },
    { key: 'clothes', label: 'Campus Lab Coat', icon: '🥼', img: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&auto=format&fit=crop&q=80' }
  ];

  const handleSelectPreset = (preset: typeof presets[0]) => {
    setSelectedSampleKey(preset.key);
    setImagePreview(preset.img);
    runAnalysis(preset.key as keyof typeof PRESET_AI_ANALYSES);
  };

  const handleCustomUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const url = uploadEvent.target?.result as string;
        setImagePreview(url);
        setSelectedSampleKey('custom');
        runAnalysis('custom', file.name.replace(/\.[^/.]+$/, ""));
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = (key: keyof typeof PRESET_AI_ANALYSES | 'custom', customName?: string) => {
    setIsScanning(true);
    setTimeout(() => {
      const analyzed = analyzeItem(key, customName);
      setResult(analyzed);
      setIsScanning(false);
    }, 1400);
  };

  const handleQuickPublishFromAI = () => {
    if (!result) return;
    addNewListing({
      title: result.detectedItem,
      description: `AI Certified ${result.detectedItem} in ${result.condition} condition.`,
      category: result.category,
      condition: result.condition,
      type: result.recommendedAction === 'DONATE' ? 'donate' : result.recommendedAction === 'EXCHANGE' ? 'exchange' : 'sell',
      price: result.recommendedAction === 'SELL' ? result.estimatedResaleValue : 0,
      originalPrice: result.originalPriceEstimate,
      images: [imagePreview],
      sellerId: '',
      sellerName: '',
      sellerAvatar: '',
      sellerCampus: '',
      sellerDepartment: '',
      sellerVerified: true,
      sellerRating: 5.0,
      circularScore: result.circularScore,
      co2SavedKg: result.co2SavedKg,
      tags: result.suggestedTags,
      pickupLocation: 'Central Library or Hostel 2 Cycle Stand'
    });
    setActiveTab('marketplace');
  };

  return (
    <div id="ai-item-analyzer-view" className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-tr from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-lime-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-700 text-lime-300 text-xs font-bold mb-3">
            <Bot className="w-3.5 h-3.5" />
            <span>Campus AI Vision & Valuation Engine</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            Instant AI Item Valuation & Action Suggester
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-2 leading-relaxed">
            Upload any college item photo to automatically determine its condition, fair campus resale price, environmental offset, and the ideal circular path (Sell vs Exchange vs Donate).
          </p>
        </div>
      </div>

      {/* 2. SAMPLE PICKER OR UPLOAD */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Select a Demo Campus Item or Upload Your Own:
            </h3>
            <p className="text-xs text-emerald-700">Click any preset to test the real-time AI recognition scanner</p>
          </div>

          <label className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-xs font-bold cursor-pointer transition-all">
            <Upload className="w-4 h-4 text-emerald-700" />
            <span>Upload My Image</span>
            <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {presets.map(preset => (
            <button
              key={preset.key}
              onClick={() => handleSelectPreset(preset)}
              className={`p-3 rounded-2xl border flex flex-col items-center text-center transition-all cursor-pointer ${
                selectedSampleKey === preset.key 
                  ? 'border-emerald-600 bg-emerald-50 ring-2 ring-emerald-500/20 shadow-xs' 
                  : 'border-emerald-100 bg-white hover:bg-emerald-50/50'
              }`}
            >
              <img src={preset.img} alt="" className="w-12 h-12 rounded-xl object-cover mb-2" />
              <span className="text-xs font-bold text-emerald-950 line-clamp-1">{preset.label}</span>
              <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">Click to Scan</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. SCANNING & RESULTS DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 5 Cols: Visual Scanner Viewport */}
        <div className="lg:col-span-5 bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-4">
          <div className="relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-emerald-200 bg-emerald-950">
            <img 
              src={imagePreview} 
              alt="Scan Target" 
              className={`w-full h-full object-cover transition-all ${isScanning ? 'brightness-75 scale-105' : ''}`} 
            />

            {/* Laser scanning effect when scanning */}
            {isScanning ? (
              <>
                <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300 shadow-[0_0_20px_#10b981] animate-scan"></div>
                <div className="absolute inset-0 bg-emerald-900/30 flex items-center justify-center">
                  <div className="px-4 py-2 bg-emerald-950/90 text-lime-300 font-mono text-xs font-bold rounded-xl border border-lime-400/40 animate-pulse">
                    ANALYZING_SURFACE_WEAR...
                  </div>
                </div>
              </>
            ) : (
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950/80 backdrop-blur-sm text-lime-300 border border-emerald-700/50">
                  STATUS: SCANNED_OK
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-950/80 backdrop-blur-sm text-white">
                  CONFIDENCE: {result?.confidenceScore || 95}%
                </span>
              </div>
            )}
          </div>

          <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">AI Multimodal Model:</span>
              <span className="font-mono text-emerald-700">Gemini 2.5 Flash Vision</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-950">Latency:</span>
              <span className="font-mono text-emerald-700">0.82s (Local Cache)</span>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Structured Results Breakdown */}
        {result && (
          <div className="lg:col-span-7 bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            
            {/* Header & Detected Name */}
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                  {result.category}
                </span>
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Match
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif] mt-1">
                {result.detectedItem}
              </h2>
            </div>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Physical Condition</span>
                <span className="text-sm font-extrabold text-emerald-950 mt-1 block">{result.condition}</span>
              </div>

              <div className="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Est. Fair Value</span>
                <span className="text-sm font-extrabold text-emerald-950 mt-1 block">₹{result.estimatedResaleValue.toLocaleString()}</span>
                <span className="text-[10px] text-emerald-600 line-through">Retail: ₹{result.originalPriceEstimate.toLocaleString()}</span>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3.5 bg-lime-50 rounded-2xl border border-lime-200">
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">CO₂ Offset</span>
                <span className="text-sm font-extrabold text-emerald-950 mt-1 block">+{result.co2SavedKg} kg</span>
                <span className="text-[10px] text-emerald-700">Circular Score {result.circularScore}</span>
              </div>
            </div>

            {/* Recommended Action Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-2 border-emerald-200 space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                    AI Recommended Action
                  </span>
                  <span className="text-base font-extrabold text-emerald-950">
                    {result.recommendedAction}
                  </span>
                </div>
                <div className="text-right text-xs text-emerald-700 font-medium">
                  Alternative: <strong className="text-emerald-950">{result.alternativeAction}</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-emerald-100">
                <p className="text-xs font-bold text-emerald-950 mb-1">Why this recommendation?</p>
                <ul className="space-y-1">
                  {result.reasoning.map((reason, i) => (
                    <li key={i} className="text-xs text-emerald-850 flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Reusability Tips */}
            <div>
              <p className="text-xs font-bold text-emerald-950 uppercase tracking-wider mb-2">
                Tips to Maximize Resale / Exchange Appeal:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {result.reuseTips.map((tip, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-emerald-50/50 border border-emerald-100 text-[11px] text-emerald-800 leading-snug">
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-emerald-100 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => setActiveTab('sell')}
                className="text-xs font-bold text-emerald-700 hover:underline"
              >
                Customize Full Listing Form →
              </button>

              <button
                onClick={handleQuickPublishFromAI}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>1-Click Publish to Marketplace 🚀</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
