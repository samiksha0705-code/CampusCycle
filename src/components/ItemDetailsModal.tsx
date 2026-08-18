import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  Leaf, 
  MapPin, 
  MessageSquare, 
  ShoppingBag, 
  ArrowLeftRight, 
  HeartHandshake, 
  CheckCircle2, 
  AlertCircle,
  Share2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';

export const ItemDetailsModal: React.FC = () => {
  const { 
    selectedItem, 
    setSelectedItem, 
    currentUser, 
    buyItem, 
    startChatWithSeller, 
    proposeExchange,
    marketplaceItems,
    setActiveTab,
    showToast
  } = useApp();

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number>(selectedItem?.price ? Math.round(selectedItem.price * 0.85) : 0);
  const [selectedMyItemForSwap, setSelectedMyItemForSwap] = useState<string>('');
  const [pickupSpot, setPickupSpot] = useState<string>('Central Library Ground Floor Entrance');
  const [pickupTime, setPickupTime] = useState<string>('Today at 4:30 PM');

  if (!selectedItem) return null;

  const isMyItem = selectedItem.sellerId === currentUser.id;
  const myItems = marketplaceItems.filter(i => i.sellerId === currentUser.id && i.id !== selectedItem.id);

  const handleBuyNow = () => {
    buyItem(selectedItem, pickupSpot, pickupTime);
    setIsBuyModalOpen(false);
    setSelectedItem(null);
    setActiveTab('dashboard');
  };

  const handleSendOffer = () => {
    startChatWithSeller(selectedItem, `Hi ${selectedItem.sellerName}, I would like to offer ₹${offerAmount} for your ${selectedItem.title}. Let me know if that works!`);
    setIsOfferModalOpen(false);
    setSelectedItem(null);
    showToast('Offer Sent to Chat', `Offered ₹${offerAmount} to ${selectedItem.sellerName}.`, 'info');
  };

  const handleProposeExchange = () => {
    if (!selectedMyItemForSwap && myItems.length > 0) {
      proposeExchange(selectedItem, myItems[0].id, 'Hey! I would love to exchange my item with yours on campus.');
    } else if (selectedMyItemForSwap) {
      proposeExchange(selectedItem, selectedMyItemForSwap, 'Hey! I would love to exchange my item with yours on campus.');
    } else {
      showToast('Listing Required', 'Please list an item first to propose a direct swap!', 'info');
      setActiveTab('sell');
    }
    setIsExchangeModalOpen(false);
    setSelectedItem(null);
    setActiveTab('exchange');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B4332]/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-[#D8F3DC] overflow-hidden my-auto"
      >
        
        {/* Modal Top Close Bar */}
        <div className="p-4 border-b border-[#D8F3DC] flex items-center justify-between bg-[#F1FAF4]">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold uppercase tracking-wider text-white ${
              selectedItem.type === 'donate' ? 'bg-[#40916C]' : selectedItem.type === 'exchange' ? 'bg-[#2D6A4F]' : 'bg-[#1B4332]'
            }`}>
              {selectedItem.type}
            </span>
            <span className="text-xs font-semibold text-[#2D6A4F]">
              Listed {selectedItem.createdAt}
            </span>
          </div>

          <button
            onClick={() => setSelectedItem(null)}
            className="p-1.5 rounded-full hover:bg-[#D8F3DC] text-[#1B4332] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            {/* Left: Product Image Gallery */}
            <div className="space-y-3">
              <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F1FAF4] border border-[#D8F3DC] shadow-xs">
                <img
                  src={selectedItem.images[0]}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-[#1B4332]/90 backdrop-blur-md text-[#B9F98C] text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-[#B9F98C]" />
                  <span>Circular Score {selectedItem.circularScore}/100</span>
                </div>
              </div>

              {/* Eco Impact Footprint Card */}
              <div className="bg-gradient-to-br from-[#F1FAF4] to-[#D8F3DC]/60 border border-[#D8F3DC] rounded-2xl p-3.5 text-xs text-[#1B4332] space-y-1.5">
                <span className="font-extrabold text-[11px] text-[#2D6A4F] uppercase tracking-wider block">
                  Campus Sustainability Offset
                </span>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-white p-2 rounded-xl border border-[#D8F3DC]">
                    <span className="text-[10px] text-[#6B8577]">CO₂ Avoided</span>
                    <p className="font-extrabold text-sm text-[#1B4332]">{selectedItem.co2SavedKg} kg</p>
                  </div>
                  <div className="bg-white p-2 rounded-xl border border-[#D8F3DC]">
                    <span className="text-[10px] text-[#6B8577]">Landfill Saved</span>
                    <p className="font-extrabold text-sm text-[#1B4332]">100% Circular</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Product Details & Pricing */}
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
                  {selectedItem.category} • {selectedItem.condition} Condition
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B4332] font-['Outfit',sans-serif] leading-snug mt-1">
                  {selectedItem.title}
                </h2>
              </div>

              {/* Price / Type Highlight */}
              <div className="p-3.5 bg-[#F1FAF4] rounded-2xl border border-[#D8F3DC] flex items-baseline justify-between">
                <div>
                  {selectedItem.type === 'donate' ? (
                    <div>
                      <span className="text-lg font-extrabold text-[#40916C]">FREE GIFT / DONATION</span>
                      <p className="text-[11px] text-[#6B8577]">Zero cost for fellow student or fresher</p>
                    </div>
                  ) : selectedItem.type === 'exchange' ? (
                    <div>
                      <span className="text-lg font-extrabold text-[#2D6A4F]">DIRECT PEER SWAP</span>
                      <p className="text-[11px] text-[#6B8577]">{selectedItem.exchangePreferences || 'Open to semester tool swap'}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-[#1B4332]">₹{selectedItem.price}</span>
                        {selectedItem.originalPrice && (
                          <span className="text-xs text-[#6B8577] line-through">₹{selectedItem.originalPrice}</span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#2D6A4F]">
                        Saves ₹{(selectedItem.originalPrice || selectedItem.price + 500) - selectedItem.price} vs brand new retail
                      </p>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold text-[#1B4332] bg-[#D8F3DC] px-2 py-1 rounded-md">
                    +{selectedItem.type === 'donate' ? '150' : '80'} Eco Pts
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-1">
                  Description
                </h4>
                <p className="text-xs sm:text-sm text-[#3F5B50] leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Pickup Location */}
              <div className="flex items-center gap-2 text-xs text-[#3F5B50] bg-[#F1FAF4] p-2.5 rounded-xl border border-[#D8F3DC]">
                <MapPin className="w-4 h-4 text-[#2D6A4F] shrink-0" />
                <span><strong>Suggested Meetup:</strong> {selectedItem.pickupLocation}</span>
              </div>

              {/* Seller Profile Card */}
              <div className="p-3 bg-white rounded-2xl border border-[#D8F3DC] flex items-center justify-between shadow-2xs">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedItem.sellerAvatar}
                    alt={selectedItem.sellerName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#2D6A4F]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-[#1B4332]">{selectedItem.sellerName}</span>
                      {selectedItem.sellerVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" title="Verified Student" />
                      )}
                    </div>
                    <p className="text-[10px] text-[#6B8577]">
                      {selectedItem.sellerCampus} • {selectedItem.sellerDepartment}
                    </p>
                  </div>
                </div>

                <span className="text-[11px] font-bold text-[#1B4332] bg-[#F1FAF4] border border-[#D8F3DC] px-2 py-1 rounded-lg">
                  ★ {selectedItem.sellerRating} Rating
                </span>
              </div>

            </div>

          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            {selectedItem.tags.map(tag => (
              <span key={tag} className="text-[11px] font-semibold text-[#1B4332] bg-[#F1FAF4] px-2.5 py-0.5 rounded-full border border-[#D8F3DC]">
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#D8F3DC] flex flex-wrap items-center gap-2.5">
            {!isMyItem ? (
              <>
                {selectedItem.type === 'sell' && (
                  <>
                    <button
                      id="item-details-buy-btn"
                      onClick={() => setIsBuyModalOpen(true)}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#B9F98C]" />
                      <span>Buy Now (₹{selectedItem.price})</span>
                    </button>

                    <button
                      onClick={() => setIsOfferModalOpen(true)}
                      className="py-3 px-4 rounded-xl bg-[#F1FAF4] hover:bg-[#D8F3DC] text-[#1B4332] font-bold text-xs sm:text-sm border border-[#D8F3DC] active:scale-95 transition-all cursor-pointer"
                    >
                      Make Offer
                    </button>
                  </>
                )}

                {selectedItem.type === 'exchange' && (
                  <button
                    onClick={() => setIsExchangeModalOpen(true)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#2D6A4F] hover:bg-[#1B4332] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <ArrowLeftRight className="w-4 h-4 text-[#B9F98C]" />
                    <span>Propose Exchange</span>
                  </button>
                )}

                {selectedItem.type === 'donate' && (
                  <button
                    onClick={() => setIsBuyModalOpen(true)}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#40916C] hover:bg-[#2D6A4F] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer"
                  >
                    <HeartHandshake className="w-4 h-4 text-[#B9F98C]" />
                    <span>Claim Free Donation</span>
                  </button>
                )}

                <button
                  id="item-details-message-seller-btn"
                  onClick={() => {
                    startChatWithSeller(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="py-3 px-4 rounded-xl bg-white border border-[#D8F3DC] text-[#1B4332] font-bold text-xs sm:text-sm hover:bg-[#F1FAF4] active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-[#2D6A4F]" />
                  <span>Message Seller</span>
                </button>
              </>
            ) : (
              <div className="w-full text-center py-2 bg-[#F1FAF4] border border-[#D8F3DC] rounded-xl text-xs font-bold text-[#1B4332]">
                This is your active listing on CampusCycle.
              </div>
            )}
          </div>

        </div>

      </motion.div>

      {/* SUB-MODAL: BUY NOW / SCHEDULE PICKUP */}
      {isBuyModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#1B4332]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#D8F3DC] space-y-4">
            <div className="flex items-center justify-between border-b border-[#D8F3DC] pb-3">
              <h3 className="text-base font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
                Confirm Campus Pickup
              </h3>
              <button onClick={() => setIsBuyModalOpen(false)} className="text-[#6B8577] hover:text-[#1B4332] cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-[#F1FAF4] rounded-2xl flex items-center gap-3 border border-[#D8F3DC]">
              <img src={selectedItem.images[0]} className="w-12 h-12 rounded-xl object-cover" alt="" />
              <div>
                <h4 className="text-xs font-bold text-[#1B4332] line-clamp-1">{selectedItem.title}</h4>
                <p className="text-[11px] text-[#2D6A4F] font-medium">
                  {selectedItem.price > 0 ? `Total: ₹${selectedItem.price}` : 'Free Campus Gift'}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-[#1B4332] block mb-1">Meetup / Pickup Spot</label>
                <select
                  value={pickupSpot}
                  onChange={e => setPickupSpot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                >
                  <option value="Central Library Ground Floor Entrance">Central Library Ground Floor Entrance</option>
                  <option value="Main Cafeteria / Food Court">Main Cafeteria / Food Court</option>
                  <option value="Aryabhatta Hostel Block B Gate">Aryabhatta Hostel Block B Gate</option>
                  <option value="Tech Block 2 Reception">Tech Block 2 Reception</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1B4332] block mb-1">Proposed Time</label>
                <input
                  type="text"
                  value={pickupTime}
                  onChange={e => setPickupTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#D8F3DC] text-xs text-[#1B4332] bg-white focus:outline-none focus:ring-1 focus:ring-[#2D6A4F]"
                  placeholder="e.g. Today at 4:30 PM"
                />
              </div>
            </div>

            <div className="bg-[#D8F3DC]/60 border border-[#95D5B2] p-3 rounded-xl text-xs text-[#1B4332] flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#2D6A4F] shrink-0 mt-0.5" />
              <span>You will receive a 4-digit verification code and earn <strong>+80 Eco Points</strong> upon completion.</span>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full py-3 bg-[#1B4332] hover:bg-[#2D6A4F] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Confirm & Generate Pickup Code
            </button>
          </div>
        </div>
      )}

      {/* SUB-MODAL: MAKE OFFER */}
      {isOfferModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#1B4332]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-[#D8F3DC] space-y-4 text-center">
            <h3 className="text-base font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
              Make an Offer to {selectedItem.sellerName}
            </h3>
            <p className="text-xs text-[#6B8577]">
              Listed Price: <strong>₹{selectedItem.price}</strong>
            </p>

            <div className="my-4">
              <span className="text-3xl font-extrabold text-[#1B4332]">₹{offerAmount}</span>
              <input
                type="range"
                min={Math.round(selectedItem.price * 0.5)}
                max={selectedItem.price}
                step={50}
                value={offerAmount}
                onChange={e => setOfferAmount(Number(e.target.value))}
                className="w-full mt-3 accent-[#1B4332]"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setIsOfferModalOpen(false)}
                className="flex-1 py-2.5 bg-[#F1FAF4] text-[#1B4332] rounded-xl text-xs font-bold border border-[#D8F3DC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSendOffer}
                className="flex-1 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Send Offer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL: PROPOSE EXCHANGE */}
      {isExchangeModalOpen && (
        <div className="fixed inset-0 z-60 bg-[#1B4332]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-[#D8F3DC] space-y-4">
            <h3 className="text-base font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
              Select Your Item to Swap
            </h3>
            <p className="text-xs text-[#6B8577]">
              Choose one of your listed items to offer {selectedItem.sellerName} in exchange for "{selectedItem.title}".
            </p>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {myItems.length === 0 ? (
                <div className="p-4 bg-[#F1FAF4] rounded-xl text-center text-xs text-[#1B4332] border border-[#D8F3DC]">
                  <p>You haven't listed any items yet.</p>
                  <button onClick={() => setActiveTab('sell')} className="mt-1 font-bold text-[#2D6A4F] underline cursor-pointer">
                    List an item now
                  </button>
                </div>
              ) : (
                myItems.map(myItem => (
                  <div
                    key={myItem.id}
                    onClick={() => setSelectedMyItemForSwap(myItem.id)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      selectedMyItemForSwap === myItem.id ? 'border-[#1B4332] bg-[#D8F3DC] ring-1 ring-[#1B4332]' : 'border-[#D8F3DC] hover:bg-[#F1FAF4]'
                    }`}
                  >
                    <img src={myItem.images[0]} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[#1B4332] truncate">{myItem.title}</p>
                      <p className="text-[10px] text-[#6B8577]">{myItem.category} • {myItem.condition}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setIsExchangeModalOpen(false)}
                className="flex-1 py-2.5 bg-[#F1FAF4] text-[#1B4332] rounded-xl text-xs font-bold border border-[#D8F3DC] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleProposeExchange}
                className="flex-1 py-2.5 bg-[#2D6A4F] hover:bg-[#1B4332] text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Send Proposal (+100 Pts)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
