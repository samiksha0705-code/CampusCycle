import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeftRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  PlusCircle, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { ExchangeProposal } from '../types';

export const ExchangeView: React.FC = () => {
  const { 
    exchangeProposals, 
    respondToExchange, 
    marketplaceItems, 
    currentUser, 
    setActiveTab, 
    setSelectedItem 
  } = useApp();

  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'incoming' | 'outgoing'>('all');

  // Filter proposals
  const filteredProposals = exchangeProposals.filter(p => {
    if (activeTabFilter === 'incoming') return p.targetItemOwnerId === currentUser.id;
    if (activeTabFilter === 'outgoing') return p.proposerId === currentUser.id;
    return true;
  });

  // Available items for exchange in marketplace
  const exchangeableItems = marketplaceItems.filter(i => i.type === 'exchange' && i.isAvailable);

  return (
    <div id="exchange-system-view" className="space-y-8 pb-20">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-300 bg-teal-800/60 px-3 py-1 rounded-full">
            Zero-Money Circular Barter
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-['Outfit',sans-serif] mt-2">
            Campus Peer-to-Peer Exchange Hub
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
            Swap textbooks, scientific calculators, mini-drafters, and lab tools directly with peers across semesters. Zero cash required.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('sell')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-400 text-emerald-950 text-xs font-extrabold hover:bg-teal-300 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>List Item for Exchange (+100 Pts)</span>
        </button>
      </div>

      {/* 2. HOW CAMPUS EXCHANGE WORKS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
        <div className="bg-white border border-teal-100 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mb-2">
            01
          </div>
          <h3 className="text-xs font-bold text-emerald-950">Find or List an Item</h3>
          <p className="text-[11px] text-emerald-800/70 mt-0.5">
            Mark any unused book or lab supply as "Exchange". State what you need in return.
          </p>
        </div>

        <div className="bg-white border border-teal-100 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mb-2">
            02
          </div>
          <h3 className="text-xs font-bold text-emerald-950">Propose Direct Swap</h3>
          <p className="text-[11px] text-emerald-800/70 mt-0.5">
            Select one of your items to offer in exchange, with optional small cash adjustment.
          </p>
        </div>

        <div className="bg-white border border-teal-100 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold text-xs mb-2">
            03
          </div>
          <h3 className="text-xs font-bold text-emerald-950">Meet & Complete Cycle</h3>
          <p className="text-[11px] text-emerald-800/70 mt-0.5">
            Meet at Central Library or Food Court. Handover items and unlock +100 Eco Points!
          </p>
        </div>
      </div>

      {/* 3. ACTIVE PROPOSALS BOARD */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Exchange Proposals & History
            </h2>
            <p className="text-xs text-emerald-700">Track and respond to incoming and outgoing swaps</p>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50 p-1 rounded-xl border border-emerald-200/80">
            {[
              { id: 'all', label: 'All Swaps' },
              { id: 'incoming', label: 'Incoming For Me' },
              { id: 'outgoing', label: 'Sent by Me' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTabFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTabFilter === tab.id 
                    ? 'bg-teal-700 text-white shadow-xs' 
                    : 'text-emerald-800 hover:text-emerald-950'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="text-center py-10 space-y-2">
            <p className="text-xs text-emerald-700">No exchange proposals found in this view.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map(proposal => {
              const isIncoming = proposal.targetItemOwnerId === currentUser.id;
              return (
                <div
                  key={proposal.id}
                  className="bg-emerald-50/40 border border-emerald-200/70 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1 w-full space-y-3">
                    
                    {/* Visual Swap Comparison */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                      {/* Left: Offered Item */}
                      <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs flex-1">
                        <img src={proposal.offeredItemImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-extrabold uppercase text-teal-700 bg-teal-50 px-1.5 py-0.2 rounded">
                            Offered by {proposal.proposerName}
                          </span>
                          <h4 className="text-xs font-bold text-emerald-950 truncate mt-0.5">
                            {proposal.offeredItemTitle}
                          </h4>
                        </div>
                      </div>

                      <div className="p-2 rounded-full bg-teal-600 text-white shrink-0 mx-auto sm:mx-0">
                        <ArrowLeftRight className="w-4 h-4" />
                      </div>

                      {/* Right: Target Item */}
                      <div className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-emerald-100 shadow-2xs flex-1">
                        <img src={proposal.targetItemImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="min-w-0">
                          <span className="text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                            Target Wanted Item
                          </span>
                          <h4 className="text-xs font-bold text-emerald-950 truncate mt-0.5">
                            {proposal.targetItemTitle}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {/* Message & Details */}
                    <div className="flex items-center justify-between text-xs text-emerald-900 bg-white/70 p-2.5 rounded-xl border border-emerald-100">
                      <p className="italic text-emerald-800">
                        "{proposal.message}"
                      </p>
                      {proposal.cashAdjustment ? (
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                          +₹{proposal.cashAdjustment} Cash Top-up
                        </span>
                      ) : null}
                    </div>

                  </div>

                  {/* Actions / Status */}
                  <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-emerald-100">
                    <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                      proposal.status === 'Accepted' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : proposal.status === 'Rejected' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {proposal.status}
                    </span>

                    {proposal.status === 'Pending' && isIncoming && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => respondToExchange(proposal.id, true)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept Swap</span>
                        </button>
                        <button
                          onClick={() => respondToExchange(proposal.id, false)}
                          className="px-3 py-1.5 bg-white border border-red-200 text-red-700 hover:bg-red-50 rounded-xl text-xs font-bold cursor-pointer"
                        >
                          Decline
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. CURRENT ITEMS AVAILABLE FOR DIRECT SWAP */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Available for Exchange on Campus Right Now
            </h2>
            <p className="text-xs text-emerald-700">Click any item to propose an instant swap</p>
          </div>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="text-xs font-bold text-teal-700 hover:underline"
          >
            See all in Marketplace →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {exchangeableItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white border border-teal-100 hover:border-teal-400 rounded-2xl p-4 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3 bg-emerald-50">
                  <img src={item.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-teal-600 text-white text-[10px] font-extrabold uppercase">
                    Swap Only
                  </span>
                </div>

                <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider">{item.category}</span>
                <h4 className="text-xs sm:text-sm font-bold text-emerald-950 line-clamp-1 mt-0.5 group-hover:text-teal-700">
                  {item.title}
                </h4>
                <p className="text-xs text-emerald-800/70 mt-1 line-clamp-2">
                  Wanted: {item.exchangePreferences || 'Any semester books / electronics'}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-emerald-50 flex items-center justify-between">
                <span className="text-[11px] text-emerald-700 font-semibold">
                  By {item.sellerName}
                </span>
                <span className="text-xs font-bold text-teal-700 group-hover:underline">
                  Propose Swap →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
