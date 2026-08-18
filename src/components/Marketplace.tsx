import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ArrowLeftRight, 
  HeartHandshake, 
  ShoppingBag, 
  ShieldCheck, 
  Leaf, 
  ArrowUpDown, 
  PlusCircle,
  X,
  Check,
  RotateCcw
} from 'lucide-react';
import { ItemCategory, ListingType, ItemCondition } from '../types';

export const Marketplace: React.FC = () => {
  const { 
    marketplaceItems, 
    setSelectedItem, 
    setActiveTab 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all'); // all, sell, exchange, donate
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(30000);
  const [sortBy, setSortBy] = useState<'latest' | 'price_low' | 'price_high' | 'eco_score'>('latest');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories: { label: string; value: string; icon: string }[] = [
    { label: 'All Items', value: 'all', icon: '✨' },
    { label: 'Books', value: 'Books', icon: '📚' },
    { label: 'Electronics', value: 'Electronics', icon: '💻' },
    { label: 'Cycles', value: 'Cycles', icon: '🚲' },
    { label: 'Furniture', value: 'Furniture', icon: '🪑' },
    { label: 'College Supplies', value: 'College Supplies', icon: '📐' },
    { label: 'Clothes', value: 'Clothes', icon: '👕' },
    { label: 'Accessories', value: 'Accessories', icon: '🎒' }
  ];

  const conditions: ItemCondition[] = [
    'Brand New', 
    'Like New', 
    'Good', 
    'Fair', 
    'Needs Minor Repair'
  ];

  // Filtered and sorted listings
  const filteredItems = useMemo(() => {
    return marketplaceItems.filter(item => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(q));
        const matchesSeller = item.sellerName.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesTags && !matchesSeller) {
          return false;
        }
      }

      // Type filter (sell / exchange / donate)
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Condition filter
      if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
        return false;
      }

      // Price filter (only applies to sell items)
      if (item.type === 'sell' && item.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      if (sortBy === 'eco_score') return b.circularScore - a.circularScore;
      return 0; // default latest order
    });
  }, [marketplaceItems, searchQuery, selectedType, selectedCategory, selectedCondition, maxPrice, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setMaxPrice(30000);
    setSortBy('latest');
  };

  return (
    <div id="marketplace-view" className="space-y-6 pb-20">
      
      {/* 1. HEADER BANNER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-full">
            Verified NIET Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 mt-2 font-['Outfit',sans-serif]">
            Campus Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-emerald-800/80 mt-0.5">
            Peer-to-peer second life exchange. 100% verified student sellers with zero shipping fees.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('sell')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Item (+50 Pts)</span>
          </button>
        </div>
      </div>

      {/* 2. SEARCH & MAIN FILTER BAR */}
      <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
            <input
              id="marketplace-search-input"
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search books, calculators, cycles, lab coats, furniture…"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-emerald-50/50 border border-emerald-200/80 text-xs sm:text-sm text-emerald-950 placeholder:text-emerald-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-700 hover:text-emerald-950"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Type Toggle Pills: All | Buy | Exchange | Donate */}
          <div className="flex items-center bg-emerald-50 p-1 rounded-xl border border-emerald-200/80 shrink-0">
            {[
              { id: 'all', label: 'All', icon: null },
              { id: 'sell', label: 'Buy', icon: ShoppingBag },
              { id: 'exchange', label: 'Exchange', icon: ArrowLeftRight },
              { id: 'donate', label: 'Donate', icon: HeartHandshake }
            ].map(type => {
              const Icon = type.icon;
              const isSelected = selectedType === type.id;
              return (
                <button
                  key={type.id}
                  id={`filter-type-${type.id}`}
                  onClick={() => setSelectedType(type.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'text-emerald-800 hover:text-emerald-950 hover:bg-emerald-100/50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-emerald-50/50 border border-emerald-200/80 px-3 py-2 rounded-xl shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-700" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-emerald-950 focus:outline-none cursor-pointer"
            >
              <option value="latest">Latest Listed</option>
              <option value="eco_score">Highest Eco Score</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Categories Carousel / Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          {categories.map(cat => {
            const isSelected = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                id={`cat-chip-${cat.value.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-800 text-white shadow-xs' 
                    : 'bg-white border border-emerald-200/80 text-emerald-850 hover:bg-emerald-50'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* 3. ACTIVE FILTERS SUMMARY & COUNT */}
      <div className="flex items-center justify-between text-xs text-emerald-800 font-semibold px-1">
        <span>
          Showing <strong className="text-emerald-950 font-extrabold">{filteredItems.length}</strong> items at NIET Campus
        </span>

        {(selectedCategory !== 'all' || selectedType !== 'all' || searchQuery || selectedCondition !== 'all') && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-1 text-emerald-600 hover:text-emerald-800 font-bold underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* 4. PRODUCT GRID */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border border-emerald-100 rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
            🔍
          </div>
          <h3 className="text-base font-bold text-emerald-950 font-['Outfit',sans-serif]">
            No items matched your filters
          </h3>
          <p className="text-xs text-emerald-700 leading-relaxed">
            Try adjusting your search terms or view items in other campus categories.
          </p>
          <button
            onClick={clearAllFilters}
            className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              id={`marketplace-card-${item.id}`}
              onClick={() => setSelectedItem(item)}
              className="bg-white border border-emerald-100 hover:border-emerald-400 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges */}
                <div className="relative aspect-4/3 overflow-hidden bg-emerald-50">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Type Tag */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide text-white shadow-xs ${
                      item.type === 'donate' 
                        ? 'bg-amber-600' 
                        : item.type === 'exchange' 
                        ? 'bg-teal-600' 
                        : 'bg-emerald-600'
                    }`}>
                      {item.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-sm text-emerald-950 shadow-2xs">
                      {item.condition}
                    </span>
                  </div>

                  {/* Circular Score Pill */}
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-950/85 backdrop-blur-sm text-lime-300 flex items-center gap-1 shadow-2xs">
                    <Leaf className="w-3 h-3 text-lime-400" />
                    <span>Eco Score {item.circularScore}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-emerald-700 font-semibold">
                    <span>{item.category}</span>
                    <span>{item.co2SavedKg}kg CO₂ saved</span>
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-emerald-950 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-emerald-800/70 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Card Footer: Seller info & Price */}
              <div className="p-4 pt-2 border-t border-emerald-50 flex items-center justify-between bg-emerald-50/20">
                <div className="flex items-center gap-2 min-w-0">
                  <img
                    src={item.sellerAvatar}
                    alt={item.sellerName}
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-emerald-300 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-emerald-950 truncate flex items-center gap-1">
                      <span>{item.sellerName.split(' ')[0]}</span>
                      {item.sellerVerified && <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />}
                    </p>
                    <p className="text-[9px] text-emerald-700 truncate">{item.sellerDepartment.split(' ')[0]}</p>
                  </div>
                </div>

                {/* Price Display */}
                <div className="text-right shrink-0">
                  {item.type === 'donate' ? (
                    <span className="text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md">
                      FREE GIFT
                    </span>
                  ) : item.type === 'exchange' ? (
                    <span className="text-xs font-extrabold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      SWAP
                    </span>
                  ) : (
                    <div className="flex flex-col items-end leading-none">
                      <span className="text-sm font-extrabold text-emerald-950">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-[10px] text-emerald-800/50 line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
