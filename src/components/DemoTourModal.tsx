import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, 
  X, 
  CheckCircle2, 
  ShoppingBag, 
  Bot, 
  PlusCircle, 
  ArrowLeftRight, 
  HeartHandshake, 
  Wrench, 
  Leaf, 
  Building2, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const DemoTourModal: React.FC = () => {
  const { setActiveTab, loginAs, currentUser } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const demoSteps = [
    {
      num: 1,
      title: 'AI Item Scanner & Valuation',
      desc: 'Test real-time vision condition grading, price estimation & circular recommendation.',
      tab: 'ai_analyzer',
      role: 'student' as const,
      icon: Bot
    },
    {
      num: 2,
      title: '5-Step Circular Listing Wizard',
      desc: 'Upload photo, get auto-suggested attributes & publish with eco point boost.',
      tab: 'sell',
      role: 'student' as const,
      icon: PlusCircle
    },
    {
      num: 3,
      title: 'Verified Student Marketplace',
      desc: 'Browse by category, filter by Buy/Swap/Donate, and schedule safe campus pickup.',
      tab: 'marketplace',
      role: 'student' as const,
      icon: ShoppingBag
    },
    {
      num: 4,
      title: 'Peer-to-Peer Barter Exchange',
      desc: 'Swap semester textbooks and tools with zero cash required.',
      tab: 'exchange',
      role: 'student' as const,
      icon: ArrowLeftRight
    },
    {
      num: 5,
      title: 'Campus Donation Drives & NGO Handover',
      desc: 'Pass on drafters & laptops to juniors and generate sustainability certificates.',
      tab: 'donate',
      role: 'student' as const,
      icon: HeartHandshake
    },
    {
      num: 6,
      title: 'Campus Repair & Upcycling Network',
      desc: 'Book verified mechanics and transform old fabrics into tech sleeves.',
      tab: 'repair',
      role: 'student' as const,
      icon: Wrench
    },
    {
      num: 7,
      title: 'Sustainability Score & Eco Rewards',
      desc: 'Track landfill diverted, carbon offsets, badges, and canteen perks.',
      tab: 'eco_score',
      role: 'student' as const,
      icon: Leaf
    },
    {
      num: 8,
      title: 'Campus Admin & Green Audit Console',
      desc: 'Switch to Dr. Ramesh Sharma: verify student IDs and export NAAC reports.',
      tab: 'admin',
      role: 'admin' as const,
      icon: Building2
    }
  ];

  const handleRunStep = (step: typeof demoSteps[0]) => {
    loginAs(step.role);
    setActiveTab(step.tab as any);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Demo Launcher Pill */}
      <div className="fixed bottom-5 right-5 z-40">
        <button
          id="demo-tour-launcher-btn"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1B4332] text-[#B9F98C] border-2 border-[#B9F98C]/60 shadow-2xl hover:scale-105 active:scale-95 transition-all text-xs font-extrabold cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-[#B9F98C] group-hover:rotate-12 transition-transform" />
          <span>Hackathon Demo Guide</span>
          <span className="w-2 h-2 rounded-full bg-[#B9F98C] animate-ping"></span>
        </button>
      </div>

      {/* Modal Guide */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#1B4332]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-[#D8F3DC] space-y-5 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-[#D8F3DC] pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-[#D8F3DC] text-[#1B4332]">
                  <Sparkles className="w-5 h-5 text-[#2D6A4F]" />
                </span>
                <div>
                  <h2 className="text-lg font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">
                    CampusCycle Hackathon Demo Guide
                  </h2>
                  <p className="text-xs text-[#40916C]">1-Click interactive walkthrough for evaluation</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#F1FAF4] text-[#2D6A4F] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#3F5B50] leading-relaxed">
              Welcome Judges! CampusCycle solves the broken linear lifecycle on college campuses. Click any feature below to instantly jump to that module with pre-loaded mock data and live interactions.
            </p>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {demoSteps.map(step => {
                const Icon = step.icon;
                return (
                  <button
                    key={step.num}
                    onClick={() => handleRunStep(step)}
                    className="p-3.5 rounded-2xl border border-[#D8F3DC] hover:border-[#40916C] bg-[#F1FAF4]/60 hover:bg-[#D8F3DC]/50 text-left transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-xl bg-white text-[#2D6A4F] border border-[#D8F3DC] shadow-xs flex items-center justify-center shrink-0 group-hover:bg-[#1B4332] group-hover:text-[#B9F98C] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase text-[#2D6A4F]">
                          Step 0{step.num} • {step.role}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#40916C] group-hover:translate-x-1 transition-transform" />
                      </div>
                      <h4 className="text-xs font-bold text-[#1B4332] mt-0.5 group-hover:text-[#2D6A4F]">
                        {step.title}
                      </h4>
                      <p className="text-[10px] text-[#6B8577] mt-0.5 line-clamp-2">
                        {step.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-center text-xs text-[#40916C] font-medium">
              💡 Tip: You can also switch roles (Student / Peer / Admin) anytime from the top navigation bar.
            </div>

          </div>
        </div>
      )}
    </>
  );
};
