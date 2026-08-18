import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  ArrowLeftRight, 
  HeartHandshake, 
  Wrench, 
  Scissors, 
  ShieldCheck, 
  Leaf, 
  TrendingUp, 
  Users, 
  Award,
  Zap,
  ShoppingBag,
  Bot,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

export const LandingPage: React.FC = () => {
  const { setActiveTab, marketplaceItems, setSelectedItem, setIsDemoTourOpen } = useApp();

  const circularSteps = [
    { title: 'SELL', icon: ShoppingBag, color: 'bg-[#1B4332]', desc: 'Pass on used books, gadgets & cycles to juniors at student-friendly prices' },
    { title: 'EXCHANGE', icon: ArrowLeftRight, color: 'bg-[#2D6A4F]', desc: 'Swap semester textbooks, drafters & components with zero cash needed' },
    { title: 'DONATE', icon: HeartHandshake, color: 'bg-[#40916C]', desc: 'Support first-year freshers & community drives with surplus supplies' },
    { title: 'REPAIR', icon: Wrench, color: 'bg-[#1B4332]', desc: 'Book verified campus mechanics, laptop clinics & screen repairs easily' },
    { title: 'UPCYCLE', icon: Scissors, color: 'bg-[#2D6A4F]', desc: 'Transform denim, old jerseys & hostel furniture into custom campus gear' }
  ];

  const featuredItems = marketplaceItems.slice(0, 4);

  return (
    <div id="landing-page-view" className="space-y-16 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 sm:pt-14 pb-12 bg-gradient-to-b from-[#F1FAF4] via-white to-[#F1FAF4] border-b border-[#D8F3DC] rounded-b-3xl">
        {/* Subtle background circular halos */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-24 left-1/4 w-96 h-96 rounded-full bg-[#D8F3DC]/60 blur-3xl"></div>
          <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-[#95D5B2]/30 blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D8F3DC] border border-[#95D5B2] text-[#1B4332] text-xs font-bold mb-6 shadow-xs"
          >
            <Leaf className="w-3.5 h-3.5 text-[#2D6A4F] animate-pulse" />
            <span>National Hackathon Winner Edition — Campus Circular Economy</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#40916C]"></span>
            <span className="text-[#2D6A4F]">NIET Campus Live</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-['Outfit',sans-serif] text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#1B4332] tracking-tight leading-[1.1]"
          >
            Give Every Item a <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#40916C] underline decoration-[#B9F98C] decoration-wavy decoration-2">
              Second Life.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-[#3F5B50] max-w-2xl mx-auto font-medium leading-relaxed"
          >
            A circular marketplace built exclusively for college campuses. Buy, sell, exchange, donate, repair, and upcycle with verified student peers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          >
            <button
              id="hero-explore-marketplace-btn"
              onClick={() => setActiveTab('marketplace')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#1B4332] text-white font-bold text-sm shadow-md shadow-[#1B4332]/25 hover:bg-[#2D6A4F] active:scale-95 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#B9F98C]" />
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-auth-btn"
              onClick={() => setActiveTab('auth')}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border-2 border-[#2D6A4F]/30 text-[#1B4332] font-bold text-sm hover:border-[#1B4332] hover:bg-[#F1FAF4] active:scale-95 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>Sign In / Register</span>
            </button>

            <button
              id="hero-judge-demo-btn"
              onClick={() => setIsDemoTourOpen(true)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-[#2D6A4F] text-[#B9F98C] border border-[#40916C]/50 font-bold text-sm shadow-sm hover:bg-[#1B4332] active:scale-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#B9F98C]" />
              <span>Judge Quick Tour ⚡</span>
            </button>
          </motion.div>

          {/* Real-time Campus Micro-Metrics Banner */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto"
          >
            <div className="bg-white/90 backdrop-blur-sm border border-[#D8F3DC] rounded-2xl p-3.5 shadow-xs text-left">
              <span className="text-[11px] font-semibold text-[#6B8577] uppercase tracking-wider block">Items Circulated</span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#1B4332] mt-0.5">840+ <span className="text-xs text-[#40916C] font-bold">this sem</span></div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-[#D8F3DC] rounded-2xl p-3.5 shadow-xs text-left">
              <span className="text-[11px] font-semibold text-[#6B8577] uppercase tracking-wider block">Waste Diverted</span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#1B4332] mt-0.5">412.5 kg <span className="text-xs text-[#40916C] font-bold">landfill</span></div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-[#D8F3DC] rounded-2xl p-3.5 shadow-xs text-left">
              <span className="text-[11px] font-semibold text-[#6B8577] uppercase tracking-wider block">Student Savings</span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#1B4332] mt-0.5">₹1.85 Lakhs</div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm border border-[#D8F3DC] rounded-2xl p-3.5 shadow-xs text-left">
              <span className="text-[11px] font-semibold text-[#6B8577] uppercase tracking-wider block">Verified Students</span>
              <div className="text-xl sm:text-2xl font-extrabold text-[#1B4332] mt-0.5">1,420+ <span className="text-xs text-[#40916C] font-bold">active</span></div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. THE CIRCULAR FLOW BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] bg-[#D8F3DC] px-3 py-1 rounded-full">
            Zero-Waste Campus Framework
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] mt-2 font-['Outfit',sans-serif]">
            The 5 Pillars of Campus Circularity
          </h2>
          <p className="text-xs sm:text-sm text-[#3F5B50] mt-1 max-w-lg mx-auto">
            Unlike generic marketplaces, CampusCycle closes the product loop completely within your campus walls.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {circularSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                whileHover={{ y: -4 }}
                onClick={() => {
                  if (step.title === 'SELL') setActiveTab('sell');
                  else if (step.title === 'EXCHANGE') setActiveTab('exchange');
                  else if (step.title === 'DONATE') setActiveTab('donate');
                  else if (step.title === 'REPAIR' || step.title === 'UPCYCLE') setActiveTab('repair');
                }}
                className="bg-white border border-[#D8F3DC] hover:border-[#95D5B2] rounded-2xl p-4 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${step.color} text-[#B9F98C] flex items-center justify-center shadow-sm`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#1B4332]/60 bg-[#F1FAF4] px-2 py-0.5 rounded-md">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-[#1B4332] group-hover:text-[#2D6A4F] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#3F5B50] mt-1 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-[#D8F3DC] flex items-center text-[11px] font-bold text-[#2D6A4F] group-hover:translate-x-1 transition-transform">
                  <span>Explore {step.title.toLowerCase()}</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED CAMPUS LISTINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] bg-[#D8F3DC] px-3 py-1 rounded-full">
              Live On Campus
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] mt-2 font-['Outfit',sans-serif]">
              Trending Student Listings
            </h2>
            <p className="text-xs sm:text-sm text-[#3F5B50] mt-0.5">
              Available right now for instant handover at NIET Campus.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('marketplace')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#1B4332] hover:text-[#2D6A4F] bg-[#D8F3DC] hover:bg-[#95D5B2]/50 px-3.5 py-2 rounded-xl transition-all cursor-pointer self-start sm:self-auto"
          >
            <span>View all {marketplaceItems.length} items</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="bg-white border border-[#D8F3DC] hover:border-[#95D5B2] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 overflow-hidden bg-[#F1FAF4]">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wide text-white ${
                      item.type === 'donate' ? 'bg-[#40916C]' : item.type === 'exchange' ? 'bg-[#2D6A4F]' : 'bg-[#1B4332]'
                    }`}>
                      {item.type}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 backdrop-blur-sm text-[#1B4332]">
                      {item.condition}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#1B4332]/90 backdrop-blur-sm text-[#B9F98C] flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-[#B9F98C]" />
                    <span>Score {item.circularScore}</span>
                  </div>
                </div>

                <div className="p-3.5">
                  <div className="flex items-center justify-between text-[11px] text-[#2D6A4F] font-semibold mb-1">
                    <span>{item.category}</span>
                    <span>{item.co2SavedKg}kg CO₂ saved</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#1B4332] line-clamp-2 leading-snug group-hover:text-[#2D6A4F]">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-3.5 pt-0 border-t border-[#D8F3DC] mt-2 flex items-center justify-between">
                <div>
                  {item.type === 'donate' ? (
                    <span className="text-sm font-extrabold text-[#40916C]">FREE GIFT</span>
                  ) : item.type === 'exchange' ? (
                    <span className="text-xs font-extrabold text-[#2D6A4F]">SWAP ONLY</span>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-extrabold text-[#1B4332]">₹{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-xs text-[#6B8577] line-through">₹{item.originalPrice}</span>
                      )}
                    </div>
                  )}
                </div>

                <span className="text-[11px] font-bold text-[#2D6A4F] group-hover:underline">
                  Details →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CAMPUSCYCLE (DIFFERENTIATION VS GENERIC OLX) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-tr from-[#1B4332] via-[#2D6A4F] to-[#1B4332] text-white rounded-3xl p-6 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Subtle leaves pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="40" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] bg-[#B9F98C] px-3 py-1 rounded-full">
              Why CampusCycle is Different
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-3 font-['Outfit',sans-serif] leading-tight">
              A True Closed-Loop Campus Ecosystem. <br />
              <span className="text-[#B9F98C]">Not Just Another Classifieds Board.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#D8F3DC] mt-3 leading-relaxed">
              Generic classified platforms create scam risks, require long-distance shipping, and focus only on one-time sales. CampusCycle is an institutionally integrated sustainability engine built around college community trust.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <ShieldCheck className="w-6 h-6 text-[#B9F98C] mb-2.5" />
              <h3 className="text-sm font-bold text-white">100% Verified Campus Peers</h3>
              <p className="text-xs text-[#D8F3DC] mt-1">
                Zero fake accounts or strangers. College roll numbers and official .edu email verification ensure complete physical handover safety.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <Bot className="w-6 h-6 text-[#B9F98C] mb-2.5" />
              <h3 className="text-sm font-bold text-white">AI Multimodal Valuation</h3>
              <p className="text-xs text-[#D8F3DC] mt-1">
                Snap an image of any book or gadget: our AI detects item condition, suggests fair student pricing, and advises whether to sell, exchange, or donate.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4">
              <Flame className="w-6 h-6 text-[#B9F98C] mb-2.5" />
              <h3 className="text-sm font-bold text-white">Gamified Eco Scoring</h3>
              <p className="text-xs text-[#D8F3DC] mt-1">
                Every reused book, swapped calculator, or repaired cycle earns Eco Points and boosts your campus Circular Score, unlocking green badges.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#40916C]/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs text-[#D8F3DC]">
              <CheckCircle2 className="w-4 h-4 text-[#B9F98C]" />
              <span>Zero Packaging Waste</span>
              <span className="text-[#95D5B2]">•</span>
              <CheckCircle2 className="w-4 h-4 text-[#B9F98C]" />
              <span>Zero Freight Carbon</span>
              <span className="text-[#95D5B2]">•</span>
              <CheckCircle2 className="w-4 h-4 text-[#B9F98C]" />
              <span>Hostel-to-Hostel Handover</span>
            </div>

            <button
              onClick={() => setActiveTab('ai_analyzer')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#B9F98C] text-[#1B4332] text-xs font-bold hover:bg-white transition-colors cursor-pointer"
            >
              <span>Try AI Item Analyzer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1B4332] bg-[#D8F3DC] px-3 py-1 rounded-full">
            Simple 4-Step Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1B4332] mt-2 font-['Outfit',sans-serif]">
            How CampusCycle Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-[#D8F3DC] rounded-2xl p-5 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center text-xs font-extrabold mb-3">
              1
            </div>
            <h3 className="text-sm font-bold text-[#1B4332]">AI Item Scan</h3>
            <p className="text-xs text-[#3F5B50] mt-1 leading-relaxed">
              Snap a picture of your unused semester supplies. AI suggests tags, condition, and fair resale or exchange value.
            </p>
          </div>

          <div className="bg-white border border-[#D8F3DC] rounded-2xl p-5 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center text-xs font-extrabold mb-3">
              2
            </div>
            <h3 className="text-sm font-bold text-[#1B4332]">Choose Action</h3>
            <p className="text-xs text-[#3F5B50] mt-1 leading-relaxed">
              Sell for cash, exchange for needed subject books, donate to incoming freshers, or route to on-campus repair clinics.
            </p>
          </div>

          <div className="bg-white border border-[#D8F3DC] rounded-2xl p-5 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center text-xs font-extrabold mb-3">
              3
            </div>
            <h3 className="text-sm font-bold text-[#1B4332]">Campus Meetup</h3>
            <p className="text-xs text-[#3F5B50] mt-1 leading-relaxed">
              Chat safely on-platform. Meet up at Central Library or your hostel gate. Verify handoff with our 4-digit code.
            </p>
          </div>

          <div className="bg-white border border-[#D8F3DC] rounded-2xl p-5 shadow-xs relative">
            <div className="w-8 h-8 rounded-full bg-[#D8F3DC] text-[#1B4332] flex items-center justify-center text-xs font-extrabold mb-3">
              4
            </div>
            <h3 className="text-sm font-bold text-[#1B4332]">Earn Eco Impact</h3>
            <p className="text-xs text-[#3F5B50] mt-1 leading-relaxed">
              Collect Eco Points, climb the hostel leaderboard, and add verifiable ESG sustainability credits to your student profile.
            </p>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1B4332] via-[#2D6A4F] to-[#40916C] rounded-3xl p-8 sm:p-12 text-center text-white shadow-lg">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif]">
            Ready to Zero Out Campus Landfill Waste?
          </h2>
          <p className="text-xs sm:text-base text-[#D8F3DC] mt-2 max-w-xl mx-auto">
            Join 1,400+ students and faculty transforming NIET into India's first 100% circular green campus.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="px-6 py-3 rounded-2xl bg-white text-[#1B4332] font-extrabold text-sm shadow-md hover:bg-[#F1FAF4] transition-all cursor-pointer"
            >
              Open Student Dashboard
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className="px-6 py-3 rounded-2xl bg-[#1B4332] text-[#B9F98C] border border-[#B9F98C]/40 font-bold text-sm hover:bg-[#2D6A4F] transition-all cursor-pointer"
            >
              List First Item (+50 Eco Points)
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

