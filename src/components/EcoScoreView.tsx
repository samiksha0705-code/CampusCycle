import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Leaf, 
  Award, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  Gift, 
  Coffee, 
  FileText, 
  ShoppingBag, 
  Wrench,
  TreeDeciduous,
  Flame,
  ArrowRight
} from 'lucide-react';

export const EcoScoreView: React.FC = () => {
  const { currentUser, showToast } = useApp();

  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const rewards = [
    { id: 'rew-1', title: 'Canteen Fresh Filter Coffee', points: 300, icon: Coffee, desc: 'Valid at Central Food Court counter 2' },
    { id: 'rew-2', title: 'Campus Stationery ₹100 Coupon', points: 600, icon: FileText, desc: 'Usable at SAC Stationery store for notebooks & pens' },
    { id: 'rew-3', title: 'CampusCycle Organic Canvas Tote', points: 800, icon: ShoppingBag, desc: 'Heavy duty upcycled banner bag' },
    { id: 'rew-4', title: 'Free Cycle Service & Oiling Voucher', points: 1000, icon: Wrench, desc: 'At Campus Cycle Care near Hostel Gate 2' }
  ];

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (currentUser.ecoPoints < reward.points) {
      showToast('Insufficient Eco Points', `You need ${reward.points - currentUser.ecoPoints} more points to unlock this reward.`, 'error');
      return;
    }
    setRedeemedRewards(prev => [...prev, reward.id]);
    showToast('Reward Claimed! 🎉', `Coupon for "${reward.title}" generated. Show at checkout.`, 'success');
  };

  return (
    <div id="eco-sustainability-dashboard" className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* 1. HERO CIRCULAR SCORE CARD */}
      <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-lime-500/10 blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left info */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-lime-300 bg-emerald-800/80 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Leaf className="w-3.5 h-3.5" />
              <span>Campus Sustainability Rating</span>
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
              Your Circular Impact Score: {currentUser.circularScore}/100
            </h1>

            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              Every textbook reused, cycle repaired, or drafter donated directly prevents campus landfill waste and reduces the carbon footprint of your department.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <span className="text-xs font-extrabold text-white bg-white/10 px-3 py-1.5 rounded-xl border border-white/20">
                Top 5% of NIET Eco Contributors
              </span>
            </div>
          </div>

          {/* Right Circular Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 text-center">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" className="stroke-emerald-800/60" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="40" 
                  className="stroke-lime-400" 
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="251.2" 
                  strokeDashoffset={251.2 * (1 - currentUser.circularScore / 100)} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-extrabold text-white font-['Outfit',sans-serif]">{currentUser.circularScore}</span>
                <span className="text-[10px] font-bold text-lime-300 uppercase tracking-wider">Circular Index</span>
              </div>
            </div>

            <p className="text-xs font-bold text-emerald-200 mt-2">
              🌱 {currentUser.ecoPoints} Total Eco Points Accumulated
            </p>
          </div>

        </div>
      </div>

      {/* 2. CORE METRICS TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Items Reused</span>
            <span className="text-base">📦</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">{currentUser.itemsReused}</p>
          <p className="text-[11px] text-emerald-700">Second-life circulation</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Landfill Prevented</span>
            <span className="text-base">🛡️</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">{currentUser.wastePreventedKg} kg</p>
          <p className="text-[11px] text-emerald-700">Solid e-waste & plastics</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">Student Money Saved</span>
            <span className="text-base">💰</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">₹{currentUser.moneySavedRs.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-700">Vs retail buying</p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-3xl p-5 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-emerald-700">
            <span className="text-[10px] font-extrabold uppercase tracking-wider">CO₂ Offset</span>
            <span className="text-base">🌲</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">{currentUser.co2SavedKg} kg</p>
          <p className="text-[11px] text-emerald-700">≈ 1.4 Tree-years absorbed</p>
        </div>

      </div>

      {/* 3. ACHIEVEMENTS & BADGES */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
            Sustainability Badges & Milestones
          </h2>
          <p className="text-xs text-emerald-700">Earn badges through campus circular activities</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentUser.badges.map(badge => (
            <div
              key={badge.id}
              className={`rounded-2xl p-4 border transition-all ${
                badge.unlocked 
                  ? 'bg-emerald-50/50 border-emerald-300 shadow-2xs' 
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="text-3xl">{badge.icon}</span>
                {badge.unlocked && (
                  <span className="text-[9px] font-extrabold uppercase bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                    Earned
                  </span>
                )}
              </div>

              <h4 className="text-xs font-bold text-emerald-950 mt-3 font-['Outfit',sans-serif]">
                {badge.title}
              </h4>
              <p className="text-[11px] text-emerald-800/80 mt-1 leading-snug">
                {badge.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. REDEEM ECO POINTS REWARDS */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Campus Eco Rewards Store
            </h2>
            <p className="text-xs text-emerald-700">Redeem points for cafeteria discounts and stationery supplies</p>
          </div>

          <span className="text-xs font-extrabold text-emerald-950 bg-emerald-100 px-3 py-1.5 rounded-xl self-start sm:self-auto">
            Available Points: {currentUser.ecoPoints}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {rewards.map(reward => {
            const isRedeemed = redeemedRewards.includes(reward.id);
            const canAfford = currentUser.ecoPoints >= reward.points;
            const Icon = reward.icon;

            return (
              <div
                key={reward.id}
                className="p-4 rounded-2xl border border-emerald-100 bg-emerald-50/30 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white shadow-2xs text-emerald-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">{reward.title}</h4>
                    <p className="text-[10px] text-emerald-700 mt-0.5">{reward.desc}</p>
                    <span className="text-[10px] font-extrabold text-emerald-800 mt-1 block">
                      Cost: {reward.points} Eco Points
                    </span>
                  </div>
                </div>

                <button
                  disabled={isRedeemed}
                  onClick={() => handleRedeem(reward)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isRedeemed
                      ? 'bg-emerald-100 text-emerald-800 cursor-default'
                      : canAfford
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs active:scale-95'
                      : 'bg-emerald-50 text-emerald-900/40 border border-emerald-200'
                  }`}
                >
                  {isRedeemed ? 'Claimed ✓' : 'Redeem'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
