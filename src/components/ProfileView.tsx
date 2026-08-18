import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  Leaf, 
  Award, 
  QrCode, 
  Package, 
  History, 
  CheckCircle2, 
  MapPin, 
  Building, 
  GraduationCap, 
  Edit3,
  Sparkles
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { currentUser, marketplaceItems, transactions, setSelectedItem, setActiveTab } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'listings' | 'transactions' | 'badges'>('listings');

  const myListings = marketplaceItems.filter(i => i.sellerId === currentUser.id);

  return (
    <div id="user-profile-view" className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* 1. PROFILE BANNER & CARD */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 rounded-full object-cover ring-4 ring-emerald-500 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
                  {currentUser.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                  Verified Student
                </span>
              </div>

              <p className="text-xs text-emerald-700 font-medium">
                {currentUser.department} • Roll No: {currentUser.rollNumber}
              </p>
              <p className="text-[11px] text-emerald-800/70 flex items-center gap-1">
                <Building className="w-3 h-3" />
                <span>{currentUser.hostelBlock} • {currentUser.campus}</span>
              </p>
            </div>
          </div>

          {/* Quick Circular KPI Pill */}
          <div className="flex items-center gap-3 bg-emerald-50 p-3 px-4 rounded-2xl border border-emerald-200 self-stretch sm:self-auto justify-around">
            <div className="text-center">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Circular Index</span>
              <p className="text-xl font-extrabold text-emerald-950">{currentUser.circularScore}/100</p>
            </div>
            <div className="w-px h-8 bg-emerald-200"></div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-emerald-700 uppercase">Eco Points</span>
              <p className="text-xl font-extrabold text-emerald-950">{currentUser.ecoPoints}</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2. STUDENT VERIFICATION ID & HANDOVER QR PASSPORT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left: Campus Identity Card */}
        <div className="md:col-span-6 bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-lime-400" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-lime-300">NIET Digital Student ID</span>
            </div>
            <span className="text-[10px] font-bold bg-emerald-800 px-2 py-0.5 rounded text-emerald-200">Active (2026)</span>
          </div>

          <div className="flex items-center gap-4">
            <img src={currentUser.avatar} alt="" className="w-14 h-14 rounded-2xl object-cover ring-2 ring-lime-400" />
            <div className="text-xs space-y-0.5">
              <p className="font-extrabold text-sm text-white">{currentUser.name}</p>
              <p className="text-emerald-200">{currentUser.rollNumber}</p>
              <p className="text-emerald-300 text-[11px]">{currentUser.department}</p>
              <p className="text-emerald-400 text-[10px]">Campus Trust Score: ★ {currentUser.rating} (100% Peer Verified)</p>
            </div>
          </div>

          <div className="p-2.5 bg-emerald-950/60 rounded-xl text-[10px] text-emerald-200 flex items-center justify-between border border-emerald-800">
            <span>Official Identity Token: NIET-CYC-2026-9812</span>
            <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
          </div>
        </div>

        {/* Right: Personal Handover QR Code */}
        <div className="md:col-span-6 bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs flex items-center gap-5">
          <div className="w-24 h-24 rounded-2xl bg-emerald-50 border-2 border-dashed border-emerald-300 p-2 flex flex-col items-center justify-center shrink-0">
            <QrCode className="w-14 h-14 text-emerald-800" />
            <span className="text-[8px] font-mono font-bold text-emerald-700 mt-1">PEER_SCAN</span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Fast Handover Pass
            </span>
            <h3 className="text-sm font-extrabold text-emerald-950">
              Show QR for Instant Item Handoff
            </h3>
            <p className="text-[11px] text-emerald-800/80 leading-relaxed">
              When meeting at Central Library or Hostels, let the buyer scan this code to confirm physical condition and release eco points instantly.
            </p>
          </div>
        </div>

      </div>

      {/* 3. TABS: MY LISTINGS | TRANSACTION HISTORY | BADGES */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-emerald-100 pb-3">
          {[
            { id: 'listings', label: `My Listings (${myListings.length})`, icon: Package },
            { id: 'transactions', label: `Transaction History (${transactions.length})`, icon: History },
            { id: 'badges', label: `Eco Badges (${currentUser.badges.length})`, icon: Award }
          ].map(tab => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-600 text-white shadow-xs' 
                    : 'text-emerald-800 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: My Listings */}
        {activeSubTab === 'listings' && (
          <div>
            {myListings.length === 0 ? (
              <div className="text-center py-8 space-y-2">
                <p className="text-xs text-emerald-700">You have no active listings right now.</p>
                <button
                  onClick={() => setActiveTab('sell')}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  List an Item Now (+50 Pts)
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myListings.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className="p-3.5 rounded-2xl border border-emerald-100 hover:border-emerald-400 bg-emerald-50/20 flex gap-3 cursor-pointer transition-all"
                  >
                    <img src={item.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="min-w-0 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          {item.type}
                        </span>
                        <h4 className="text-xs font-bold text-emerald-950 truncate mt-1">{item.title}</h4>
                      </div>
                      <span className="text-xs font-extrabold text-emerald-950">
                        {item.type === 'donate' ? 'Free Gift' : item.type === 'exchange' ? 'Swap' : `₹${item.price}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Transaction History */}
        {activeSubTab === 'transactions' && (
          <div className="divide-y divide-emerald-50">
            {transactions.map(tx => (
              <div key={tx.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={tx.itemImage} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-emerald-950">{tx.itemTitle}</h4>
                    <p className="text-[11px] text-emerald-700">
                      With {tx.sellerName} • {tx.pickupLocation} • {tx.createdAt}
                    </p>
                    {tx.verificationCode && (
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded">
                        Pickup Code: {tx.verificationCode}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {tx.status}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-950">
                    {tx.price > 0 ? `₹${tx.price}` : 'Free Handover'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Badges */}
        {activeSubTab === 'badges' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {currentUser.badges.map(b => (
              <div key={b.id} className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40 text-center space-y-1">
                <span className="text-3xl block mb-1">{b.icon}</span>
                <h4 className="text-xs font-extrabold text-emerald-950">{b.title}</h4>
                <p className="text-[10px] text-emerald-700">{b.description}</p>
                <span className="text-[9px] font-bold text-emerald-600 block mt-2">Unlocked ✓</span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
