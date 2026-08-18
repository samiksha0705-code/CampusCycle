import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  PlusCircle, 
  ArrowLeftRight, 
  HeartHandshake, 
  Wrench, 
  TrendingUp, 
  ShieldCheck, 
  ShoppingBag, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Flame, 
  Leaf, 
  Eye, 
  ExternalLink,
  Award,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const Dashboard: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    marketplaceItems, 
    transactions, 
    completeTransaction,
    setSelectedItem,
    setIsDemoTourOpen
  } = useApp();

  const [activeQrModal, setActiveQrModal] = useState<any>(null);

  // Active listings by current user
  const myListings = marketplaceItems.filter(item => item.sellerId === currentUser.id);
  // Recommended items for current user (different department/years)
  const recommendedItems = marketplaceItems.filter(item => item.sellerId !== currentUser.id).slice(0, 4);

  // Greeting based on time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good morning';
    if (hours < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div id="student-dashboard-view" className="space-y-8 pb-16">
      
      {/* 1. TOP HEADER & GREETING */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute right-0 top-0 w-64 h-64 rounded-full bg-emerald-500/10 blur-2xl pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-lime-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Student ID
            </span>
            <span className="text-xs text-emerald-200/80 font-medium">
              {currentUser.campus} • {currentUser.department}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            {getGreeting()}, {currentUser.name.split(' ')[0]} 👋
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
            You have prevented <span className="font-bold text-lime-300">{currentUser.wastePreventedKg} kg</span> of campus landfill waste and saved <span className="font-bold text-lime-300">₹{currentUser.moneySavedInr.toLocaleString()}</span> this semester.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => setActiveTab('sell')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-lime-400 text-emerald-950 font-extrabold text-xs shadow-sm hover:bg-lime-300 active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>List Item (+50 Pts)</span>
          </button>

          <button
            onClick={() => setIsDemoTourOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs active:scale-95 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Tour Demo Flow</span>
          </button>
        </div>
      </div>

      {/* 2. STATS KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Card 1: Circular Score */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('eco')}
          className="bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl p-4 shadow-xs flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Circular Score</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
              🌱
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">{currentUser.circularScore}</span>
              <span className="text-xs font-bold text-emerald-600">/100</span>
            </div>
            {/* Mini Progress Bar */}
            <div className="w-full bg-emerald-100 rounded-full h-1.5 mt-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-lime-500 h-full rounded-full transition-all duration-500" 
                style={{ width: `${currentUser.circularScore}%` }}
              ></div>
            </div>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 group-hover:underline flex items-center justify-between">
            <span>Top 5% of Campus</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Card 2: Eco Points */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('eco')}
          className="bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl p-4 shadow-xs flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Eco Points</span>
            <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs">
              ⭐
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              {currentUser.ecoPoints.toLocaleString()}
            </div>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              +130 pts this week
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 group-hover:underline flex items-center justify-between">
            <span>Redeem Rewards</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Card 3: Items Reused */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('marketplace')}
          className="bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl p-4 shadow-xs flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Items Reused</span>
            <div className="w-6 h-6 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center text-xs">
              🔄
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              {currentUser.itemsReused}
            </div>
            <span className="text-[10px] text-teal-700 font-semibold">
              {currentUser.itemsDonated} donated • {currentUser.itemsRepaired} repaired
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 group-hover:underline flex items-center justify-between">
            <span>View Lifecycle</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Card 4: Waste Prevented */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('eco')}
          className="bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl p-4 shadow-xs flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Waste Prevented</span>
            <div className="w-6 h-6 rounded-lg bg-lime-100 text-lime-700 flex items-center justify-center text-xs">
              ♻️
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-950">{currentUser.wastePreventedKg}</span>
              <span className="text-xs font-bold text-emerald-600">kg</span>
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              ≈ 124 kg CO₂ offset
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 group-hover:underline flex items-center justify-between">
            <span>Carbon Metrics</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

        {/* Card 5: Money Saved */}
        <motion.div 
          whileHover={{ y: -2 }}
          onClick={() => setActiveTab('marketplace')}
          className="col-span-2 sm:col-span-1 bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl p-4 shadow-xs flex flex-col justify-between cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Money Saved</span>
            <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
              💰
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-950">
              ₹{currentUser.moneySavedInr.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              vs campus retail prices
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-2 group-hover:underline flex items-center justify-between">
            <span>Explore Deals</span>
            <ChevronRight className="w-3 h-3" />
          </span>
        </motion.div>

      </div>

      {/* 3. QUICK ACTION BUTTONS (4 CIRCULAR ACTIONS) */}
      <div>
        <h2 className="text-base font-extrabold text-emerald-950 mb-3 flex items-center gap-2">
          <span>Quick Campus Actions</span>
          <span className="text-xs font-normal text-emerald-700">Choose a circular path</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <button
            id="quick-action-sell"
            onClick={() => setActiveTab('sell')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-emerald-200/80 hover:border-emerald-500 hover:bg-emerald-50/50 shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950 group-hover:text-emerald-700">Sell Item</h3>
              <p className="text-[11px] text-emerald-700/80">List with AI valuation</p>
            </div>
          </button>

          <button
            id="quick-action-exchange"
            onClick={() => setActiveTab('exchange')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-emerald-200/80 hover:border-teal-500 hover:bg-teal-50/50 shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <ArrowLeftRight className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950 group-hover:text-teal-700">Exchange</h3>
              <p className="text-[11px] text-emerald-700/80">Swap semester supplies</p>
            </div>
          </button>

          <button
            id="quick-action-donate"
            onClick={() => setActiveTab('donate')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-emerald-200/80 hover:border-amber-500 hover:bg-amber-50/50 shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950 group-hover:text-amber-700">Donate</h3>
              <p className="text-[11px] text-emerald-700/80">Give to freshers or drives</p>
            </div>
          </button>

          <button
            id="quick-action-repair"
            onClick={() => setActiveTab('repair')}
            className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-emerald-200/80 hover:border-blue-500 hover:bg-blue-50/50 shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-emerald-950 group-hover:text-blue-700">Find Repairer</h3>
              <p className="text-[11px] text-emerald-700/80">Cycle, laptop & tailors</p>
            </div>
          </button>
        </div>
      </div>

      {/* 4. ACTIVE TRANSACTIONS & HANDOVER QR CARDS */}
      {transactions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-extrabold text-emerald-950 flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>Campus Handover & Scheduled Pickups</span>
            </h2>
            <span className="text-xs text-emerald-700 font-semibold">
              {transactions.length} active pickup{transactions.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {transactions.map(tx => (
              <div 
                key={tx.id} 
                className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={tx.itemImage} alt="" className="w-12 h-12 rounded-xl object-cover border border-emerald-100 shrink-0" />
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                          tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tx.status}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-950 mt-1 line-clamp-1">
                          {tx.itemTitle}
                        </h4>
                        <p className="text-[11px] text-emerald-700">
                          Seller: {tx.sellerName} • {tx.price > 0 ? `₹${tx.price}` : 'Exchange / Gift'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveQrModal(tx)}
                      className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-200 transition-colors cursor-pointer shrink-0"
                      title="Show Handover QR & Code"
                    >
                      <QrCode className="w-5 h-5 text-emerald-700" />
                    </button>
                  </div>

                  <div className="mt-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-xs text-emerald-900 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-700 font-medium">Pickup Spot:</span>
                      <span className="font-bold text-right truncate max-w-[180px]">{tx.pickupLocation}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-700 font-medium">Verification Code:</span>
                      <span className="font-mono font-extrabold tracking-widest text-emerald-950 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        {tx.handoverCode}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-emerald-50 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-600 font-medium">
                    +{tx.ecoPointsEarned} Eco Points on handoff
                  </span>

                  {tx.status !== 'Completed' ? (
                    <button
                      onClick={() => completeTransaction(tx.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Confirm Received</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Transferred
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. RECOMMENDED FOR YOU & ACTIVE LISTINGS (2 COLUMNS) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Recommended Campus Items */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-emerald-950">
                Recommended For You
              </h2>
              <p className="text-xs text-emerald-700">
                Based on your department (CSE) & 3rd Year semester coursework
              </p>
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
            >
              Browse all →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {recommendedItems.map(item => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white border border-emerald-100 hover:border-emerald-300 rounded-2xl p-3 shadow-xs hover:shadow-sm transition-all cursor-pointer flex gap-3 group"
              >
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-20 h-20 rounded-xl object-cover bg-emerald-50 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] text-emerald-700 font-semibold mb-0.5">
                      <span>{item.category}</span>
                      <span className="text-emerald-900 font-bold bg-emerald-50 px-1.5 py-0.2 rounded">
                        Score {item.circularScore}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-emerald-950 line-clamp-1 group-hover:text-emerald-700">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-emerald-800/70 mt-0.5">
                      Seller: {item.sellerName}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {item.type === 'donate' ? (
                      <span className="text-xs font-extrabold text-amber-600">FREE GIFT</span>
                    ) : item.type === 'exchange' ? (
                      <span className="text-xs font-extrabold text-teal-700">EXCHANGE</span>
                    ) : (
                      <span className="text-xs font-extrabold text-emerald-950">₹{item.price}</span>
                    )}
                    <span className="text-[10px] font-bold text-emerald-600 group-hover:underline">
                      View →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: My Active Listings & Badges */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-emerald-950">
              My Active Listings
            </h2>
            <button
              onClick={() => setActiveTab('sell')}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-800"
            >
              + Add New
            </button>
          </div>

          <div className="bg-white border border-emerald-100 rounded-2xl p-4 shadow-xs space-y-3">
            {myListings.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-xs text-emerald-700">You have no active listings.</p>
                <button
                  onClick={() => setActiveTab('sell')}
                  className="mt-2 text-xs font-bold text-emerald-600 underline"
                >
                  List your first item now
                </button>
              </div>
            ) : (
              myListings.map(item => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className="flex items-center justify-between gap-2 p-2 rounded-xl hover:bg-emerald-50/70 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={item.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-emerald-950 truncate">{item.title}</h4>
                      <p className="text-[10px] text-emerald-700">
                        {item.type.toUpperCase()} • {item.price > 0 ? `₹${item.price}` : 'Free'}
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full shrink-0">
                    Live
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Student Badges Showcase */}
          <div className="bg-gradient-to-br from-emerald-50 to-lime-50/50 border border-emerald-200/80 rounded-2xl p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Earned Badges</span>
              </h3>
              <button
                onClick={() => setActiveTab('eco')}
                className="text-[11px] font-bold text-emerald-700 hover:underline"
              >
                View all
              </button>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              {currentUser.badges.map(b => (
                <div 
                  key={b.id} 
                  className={`p-2 rounded-xl border flex flex-col items-center ${
                    b.isUnlocked 
                      ? 'bg-white border-emerald-200 shadow-xs' 
                      : 'bg-emerald-50/50 border-dashed border-emerald-200/50 opacity-40'
                  }`}
                  title={b.description}
                >
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[9px] font-bold text-emerald-950 mt-1 line-clamp-1">
                    {b.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* QR MODAL POPUP */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 bg-emerald-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-emerald-100 text-center animate-in zoom-in-95">
            <h3 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Campus Handover Code
            </h3>
            <p className="text-xs text-emerald-700 mt-1">
              Show this QR code to the seller/buyer when meeting at {activeQrModal.pickupLocation}.
            </p>

            <div className="my-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 inline-block">
              {/* Simulated QR Pattern */}
              <div className="w-44 h-44 bg-white p-2 rounded-xl shadow-xs flex flex-col items-center justify-center border border-emerald-100 relative">
                <QrCode className="w-36 h-36 text-emerald-950" />
                <span className="text-[10px] font-mono font-bold text-emerald-800 mt-1">
                  {activeQrModal.qrCodeValue}
                </span>
              </div>
            </div>

            <div className="bg-emerald-100/70 p-3 rounded-xl border border-emerald-200 mb-6">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                4-Digit Instant Passcode
              </span>
              <span className="font-mono text-2xl font-extrabold tracking-widest text-emerald-950 mt-0.5 block">
                {activeQrModal.handoverCode}
              </span>
            </div>

            <button
              onClick={() => setActiveQrModal(null)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              Close Handover Pass
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
