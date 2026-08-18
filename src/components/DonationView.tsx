import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  HeartHandshake, 
  MapPin, 
  Clock, 
  Phone, 
  PlusCircle, 
  Sparkles, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Download,
  Users
} from 'lucide-react';
import { ItemCategory } from '../types';

export const DonationView: React.FC = () => {
  const { 
    donationDrives, 
    donateItem, 
    marketplaceItems, 
    setSelectedItem, 
    setActiveTab, 
    currentUser 
  } = useApp();

  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [selectedDriveId, setSelectedDriveId] = useState<string>('drive-01');
  const [itemName, setItemName] = useState<string>('');
  const [itemCategory, setItemCategory] = useState<ItemCategory>('College Supplies');
  const [dropLocation, setDropLocation] = useState<string>('Central Library Ground Floor Helpdesk');
  const [showCertificate, setShowCertificate] = useState(false);

  const handleConfirmDonation = () => {
    donateItem(selectedDriveId, itemName || 'Semester Tool Kit Donation', itemCategory, dropLocation);
    setIsDonateModalOpen(false);
    setShowCertificate(true);
  };

  const freeStudentDonations = marketplaceItems.filter(i => i.type === 'donate' && i.isAvailable);

  return (
    <div id="campus-donation-hub-view" className="space-y-8 pb-20">
      
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-800 via-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-900/60 px-3 py-1 rounded-full">
            Campus Philanthropy & Zero-Waste
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] mt-3">
            Campus Donation & Redistribution Drives
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-2 leading-relaxed">
            Pass on unused drafters, lab coats, textbooks, and laptops to incoming freshmen or partner community schools. Earn maximum <strong>+150 Eco Points</strong> per donation.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsDonateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-400 text-emerald-950 font-extrabold text-xs shadow-md hover:bg-amber-300 active:scale-95 transition-all cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Donate an Item Now (+150 Pts)</span>
            </button>

            <button
              onClick={() => setActiveTab('sell')}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer"
            >
              List Free Gift in Feed
            </button>
          </div>
        </div>
      </div>

      {/* 2. DONATION PILLARS (3 MODES) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-amber-100 rounded-2xl p-5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
            🎁
          </div>
          <h3 className="text-sm font-bold text-emerald-950">1. Direct to Student</h3>
          <p className="text-xs text-emerald-800/70 mt-1 leading-relaxed">
            List lab coats, books, and mini-drafters as Free Gifts. Freshmen can claim and meet you at your hostel gate.
          </p>
        </div>

        <div className="bg-white border border-emerald-100 rounded-2xl p-5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
            🏛️
          </div>
          <h3 className="text-sm font-bold text-emerald-950">2. Campus Welfare Drives</h3>
          <p className="text-xs text-emerald-800/70 mt-1 leading-relaxed">
            Drop items at central collection boxes in the Central Library or Student Activity Center (SAC).
          </p>
        </div>

        <div className="bg-white border border-teal-100 rounded-2xl p-5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-bold mb-3">
            🤝
          </div>
          <h3 className="text-sm font-bold text-emerald-950">3. Verified NGO Partners</h3>
          <p className="text-xs text-emerald-800/70 mt-1 leading-relaxed">
            Old working laptops and gadgets are refurbished by campus tech clubs and gifted to rural village classrooms.
          </p>
        </div>
      </div>

      {/* 3. ACTIVE CAMPUS DONATION DRIVES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Active Campus Donation Drives (NIET 2026)
            </h2>
            <p className="text-xs text-emerald-700">Official drives organized by Eco Club & Student Welfare Council</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {donationDrives.map(drive => {
            const progressPercent = Math.min(100, Math.round((drive.currentCount / drive.targetCount) * 100));
            return (
              <div
                key={drive.id}
                className="bg-white border border-emerald-100 hover:border-amber-400 rounded-3xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-16/9 overflow-hidden bg-emerald-50">
                    <img src={drive.bannerImage} alt={drive.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-sm text-lime-300 text-[10px] font-extrabold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-lime-400" />
                      <span>Campus Verified</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div>
                      <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">{drive.organizer}</span>
                      <h3 className="text-sm font-extrabold text-emerald-950 mt-0.5 leading-snug">
                        {drive.title}
                      </h3>
                    </div>

                    <p className="text-xs text-emerald-800/80 line-clamp-2 leading-relaxed">
                      {drive.description}
                    </p>

                    {/* Progress Goal */}
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-xs font-bold text-emerald-950">
                        <span>Collected: {drive.currentCount} items</span>
                        <span className="text-emerald-700">{progressPercent}% of {drive.targetCount} target</span>
                      </div>
                      <div className="w-full bg-emerald-100 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                      </div>
                    </div>

                    {/* Drop off location pill */}
                    <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-1 text-xs text-emerald-900">
                      <div className="flex items-start gap-1.5 font-bold text-emerald-950">
                        <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{drive.dropOffPoints[0]?.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-emerald-700">
                        <Clock className="w-3 h-3" />
                        <span>{drive.dropOffPoints[0]?.timings}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setSelectedDriveId(drive.id);
                      setIsDonateModalOpen(true);
                    }}
                    className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4" />
                    <span>Drop Off an Item to this Drive</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CURRENT FREE GIFT LISTINGS BY STUDENTS */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
              Free Student-to-Student Gift Listings
            </h2>
            <p className="text-xs text-emerald-700">Zero-rupee semester items ready for direct student handover</p>
          </div>
          <button onClick={() => setActiveTab('marketplace')} className="text-xs font-bold text-amber-700 hover:underline">
            View in Marketplace →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {freeStudentDonations.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white border border-amber-100 hover:border-amber-300 rounded-2xl p-4 shadow-xs transition-all cursor-pointer group flex gap-3"
            >
              <img src={item.images[0]} alt="" className="w-20 h-20 rounded-xl object-cover shrink-0 bg-amber-50" />
              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">FREE GIFT</span>
                  <h4 className="text-xs font-bold text-emerald-950 line-clamp-1 mt-1 group-hover:text-amber-700">
                    {item.title}
                  </h4>
                  <p className="text-[10px] text-emerald-700 mt-0.5">By {item.sellerName} • {item.sellerCampus}</p>
                </div>

                <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                  Claim Item →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DONATE MODAL */}
      {isDonateModalOpen && (
        <div className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
                Log a Campus Donation
              </h3>
              <button onClick={() => setIsDonateModalOpen(false)} className="text-emerald-700 hover:text-emerald-950">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Target Donation Drive</label>
                <select
                  value={selectedDriveId}
                  onChange={e => setSelectedDriveId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                >
                  {donationDrives.map(d => (
                    <option key={d.id} value={d.id}>{d.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Item Title / Description</label>
                <input
                  type="text"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  placeholder="e.g. Mini Drafter Kit + Engineering Set Squares"
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Category</label>
                <select
                  value={itemCategory}
                  onChange={e => setItemCategory(e.target.value as ItemCategory)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                >
                  <option value="College Supplies">College Supplies</option>
                  <option value="Books">Books</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Furniture">Furniture</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Drop-off Point</label>
                <select
                  value={dropLocation}
                  onChange={e => setDropLocation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                >
                  <option value="Central Library Ground Floor Helpdesk">Central Library Ground Floor Helpdesk</option>
                  <option value="Aryabhatta Hostel Block B Guard Post">Aryabhatta Hostel Block B Guard Post</option>
                  <option value="Student Activity Center (SAC) Drop Box">Student Activity Center (SAC) Drop Box</option>
                  <option value="Innovation Hub Bay B">Innovation Hub Bay B</option>
                </select>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>You will earn <strong>+150 Eco Points</strong> and an official Campus Sustainability Certificate.</span>
            </div>

            <button
              onClick={handleConfirmDonation}
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Confirm Donation & Generate Certificate 🎁
            </button>
          </div>
        </div>
      )}

      {/* CERTIFICATE POPUP */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-emerald-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border-4 border-emerald-600 text-center space-y-4 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto text-2xl shadow-sm">
              🏆
            </div>

            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-700 block">
                Official Campus Sustainability Award
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif] mt-1">
                Certificate of Zero-Waste Impact
              </h2>
            </div>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
              <p>This certifies that <strong>{currentUser.name}</strong> ({currentUser.campus}) has successfully contributed to the campus circular redistribution drive.</p>
              <div className="pt-2 text-emerald-700 font-semibold">
                Impact: 3.2 kg landfill prevented • +150 Eco Points Credited
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowCertificate(false)}
                className="flex-1 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold"
              >
                Close & View Eco Points
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
