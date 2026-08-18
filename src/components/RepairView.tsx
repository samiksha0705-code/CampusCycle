import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Wrench, 
  Scissors, 
  MapPin, 
  Star, 
  Clock, 
  Percent, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2,
  Phone,
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { RepairPartner } from '../types';

export const RepairView: React.FC = () => {
  const { repairPartners, bookRepairService, currentUser } = useApp();

  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<RepairPartner | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [deviceDescription, setDeviceDescription] = useState('');
  const [pickupRequested, setPickupRequested] = useState(false);
  const [serviceDate, setServiceDate] = useState('Tomorrow, 11:00 AM');

  const filteredPartners = repairPartners.filter(p => {
    if (selectedCategoryFilter === 'all') return true;
    return p.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
  });

  const handleOpenBooking = (partner: RepairPartner) => {
    setSelectedPartner(partner);
    setIsBookingModalOpen(true);
  };

  const handleConfirmBooking = () => {
    if (!selectedPartner) return;
    bookRepairService(selectedPartner.id, selectedPartner.name, deviceDescription || 'Standard Checkup & Service', serviceDate);
    setIsBookingModalOpen(false);
    setDeviceDescription('');
  };

  return (
    <div id="repair-and-upcycle-view" className="space-y-8 pb-20">
      
      {/* 1. HEADER */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-lime-300 bg-emerald-800/80 px-3 py-1 rounded-full">
            Right to Repair & Extend Life
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] mt-3">
            Campus Repair & Upcycle Network
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200/90 mt-2 leading-relaxed">
            Don't throw away a cycle with a flat tire or a laptop with a loose hinge. Verified campus technicians and creative upcycling artists help you repair at subsidized student rates.
          </p>
        </div>
      </div>

      {/* 2. CATEGORY PILLS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Partners', icon: '🛠️' },
          { id: 'Cycle', label: 'Cycles & Mobility', icon: '🚲' },
          { id: 'Laptop', label: 'Laptops & Computers', icon: '💻' },
          { id: 'Phone', label: 'Phones & Gadgets', icon: '📱' },
          { id: 'Upcycling', label: 'Clothes & Upcycling', icon: '🧵' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategoryFilter(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategoryFilter === cat.id
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white border border-emerald-200 text-emerald-900 hover:bg-emerald-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* 3. PARTNERS DIRECTORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredPartners.map(partner => (
          <div
            key={partner.id}
            className="bg-white border border-emerald-100 hover:border-emerald-400 rounded-3xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              
              {/* Partner Avatar & Verification */}
              <div className="flex items-start justify-between">
                <img
                  src={partner.avatar}
                  alt={partner.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-200 shadow-2xs"
                />
                <div className="flex flex-col items-end">
                  <span className="flex items-center gap-1 text-xs font-extrabold text-emerald-950 bg-emerald-50 px-2 py-1 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{partner.rating}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold mt-1">
                    {partner.reviewsCount} verified jobs
                  </span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <h3 className="text-sm font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
                    {partner.name}
                  </h3>
                  {partner.isCampusVerified && (
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Campus Admin Verified" />
                  )}
                </div>
                <p className="text-xs font-semibold text-emerald-700">{partner.serviceTitle}</p>
              </div>

              {/* Location & Turnaround */}
              <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-semibold">{partner.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-[11px]">{partner.turnaroundTime}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Specialties:
                </span>
                <div className="flex flex-wrap gap-1">
                  {partner.specialties.map(spec => (
                    <span key={spec} className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Student Discount Badge */}
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-700 bg-lime-50 border border-lime-200 p-2 rounded-xl">
                <Percent className="w-3.5 h-3.5 text-emerald-600" />
                <span>{partner.studentDiscount}</span>
              </div>

            </div>

            {/* Book Service Action */}
            <div className="pt-4 border-t border-emerald-50 mt-4">
              <button
                onClick={() => handleOpenBooking(partner)}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Book Service (+75 Pts)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. CREATIVE UPCYCLING SPOTLIGHT */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md">
              Student Creative Upcycling
            </span>
            <h2 className="text-lg font-extrabold text-emerald-950 font-['Outfit',sans-serif] mt-1">
              Transform Old Fabric & Electronics into Custom Tech Gear
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-950">Denim to Laptop Sleeves</h4>
            <p className="text-[11px] text-emerald-800/80 mt-1">
              Give old hostel jeans to Campus Upcycle Stitch for waterproof custom padded sleeves.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 mt-2 block">Cost: ₹150 Only</span>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-950">Dead Cycle Parts to Study Lamps</h4>
            <p className="text-[11px] text-emerald-800/80 mt-1">
              Makerspace Club transforms bicycle gears and chains into desk ambient lamps.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 mt-2 block">Cost: Free with Old Cycle</span>
          </div>

          <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100">
            <h4 className="text-xs font-bold text-emerald-950">Banner Totes & Tote Bags</h4>
            <p className="text-[11px] text-emerald-800/80 mt-1">
              Old hackathon and college fest flex banners upcycled into heavy-duty grocery bags.
            </p>
            <span className="text-[10px] font-bold text-emerald-700 mt-2 block">Cost: ₹40 Only</span>
          </div>
        </div>
      </div>

      {/* BOOKING MODAL */}
      {isBookingModalOpen && selectedPartner && (
        <div className="fixed inset-0 z-50 bg-emerald-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-emerald-100 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <div>
                <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
                  Book Repair with {selectedPartner.name}
                </h3>
                <p className="text-xs text-emerald-700">{selectedPartner.serviceTitle}</p>
              </div>
              <button onClick={() => setIsBookingModalOpen(false)} className="text-emerald-700 hover:text-emerald-950">
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Issue / Service Required</label>
                <textarea
                  rows={2}
                  value={deviceDescription}
                  onChange={e => setDeviceDescription(e.target.value)}
                  placeholder="e.g. Brake cable replacement + chain oiling for mountain bike"
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-950 block mb-1">Preferred Time / Slot</label>
                <input
                  type="text"
                  value={serviceDate}
                  onChange={e => setServiceDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-emerald-200 text-xs text-emerald-950 bg-white"
                />
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-950 block">Campus Pickup from Hostel</span>
                  <span className="text-[10px] text-emerald-700">Technician collects item from gate</span>
                </div>
                <input
                  type="checkbox"
                  checked={pickupRequested}
                  onChange={e => setPickupRequested(e.target.checked)}
                  className="w-4 h-4 accent-emerald-600 rounded"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-lime-50 border border-lime-200 text-xs text-emerald-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>You earn <strong>+75 Eco Points</strong> for extending product lifespan!</span>
            </div>

            <button
              onClick={handleConfirmBooking}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Confirm Booking & Notify Technician
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
