import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Leaf, 
  RotateCcw, 
  ShoppingBag, 
  ArrowLeftRight, 
  HeartHandshake, 
  Wrench, 
  Scissors, 
  Users, 
  Building2, 
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';

export const CircularEcosystemView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [activeNode, setActiveNode] = useState<string>('marketplace');

  const nodes = [
    {
      id: 'student_donor',
      title: '1. Graduating Student / Seller',
      role: 'Item Originator',
      icon: Users,
      desc: 'Has unused semester books, calculator, bicycle, or lab supplies after completing a semester.',
      action: 'AI Scanner identifies resale value and circular score.',
      tab: 'ai_analyzer'
    },
    {
      id: 'marketplace',
      title: '2. CampusCycle Engine',
      role: 'Smart Matching Hub',
      icon: RotateCcw,
      desc: 'Connects peers with zero commissions and verified campus-only student ID security.',
      action: 'Offers 4 circular paths: Sell, Barter Swap, Donate, or Repair.',
      tab: 'marketplace'
    },
    {
      id: 'repair',
      title: '3. Campus Repair & Upcyclers',
      role: 'Life Extension Partner',
      icon: Wrench,
      desc: 'Campus cycle mechanics, electronics technicians, and makerspace tailor shops.',
      action: 'Refurbishes broken chains, screens, and denim into high-value campus gear.',
      tab: 'repair'
    },
    {
      id: 'next_student',
      title: '4. Incoming Student / Freshmen',
      role: 'Second Life Beneficiary',
      icon: HeartHandshake,
      desc: 'Receives affordable or free semester supplies at a safe meetup spot inside campus.',
      action: 'Saves money, prevents landfill waste, and earns Eco Points.',
      tab: 'exchange'
    },
    {
      id: 'campus_admin',
      title: '5. College Admin & Green Audits',
      role: 'Institution & NAAC Impact',
      icon: Building2,
      desc: 'Real-time monitoring of campus CO2 offsets and zero-waste accreditation points.',
      action: 'Generates official Green Audit certificates for the university.',
      tab: 'admin'
    }
  ];

  const selectedNodeData = nodes.find(n => n.id === activeNode) || nodes[0];

  return (
    <div id="circular-ecosystem-view" className="space-y-8 pb-20 max-w-5xl mx-auto">
      
      {/* 1. HERO HEADER */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-400/20 text-lime-300 text-xs font-bold border border-lime-400/30">
          <RotateCcw className="w-4 h-4 text-lime-400" />
          <span>Interactive Circular Flow Simulation</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] tracking-tight">
          How CampusCycle Closes the Campus Loop
        </h1>
        <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl mx-auto leading-relaxed">
          Unlike traditional linear marketplaces where items end up discarded after semester finals, CampusCycle ensures continuous circular reuse inside the campus ecosystem.
        </p>
      </div>

      {/* 2. INTERACTIVE CIRCULAR FLOW TIMELINE */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = activeNode === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`p-4 rounded-3xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected 
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md scale-102 ring-2 ring-lime-400' 
                  : 'bg-white border-emerald-100 hover:border-emerald-300 text-emerald-950'
              }`}
            >
              <div>
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-3 ${
                  isSelected ? 'bg-white/20 text-lime-300' : 'bg-emerald-50 text-emerald-700'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${
                  isSelected ? 'text-lime-300' : 'text-emerald-700'
                }`}>
                  Step 0{index + 1}
                </span>
                <h4 className="text-xs font-bold mt-1 line-clamp-2">
                  {node.title.split('. ')[1]}
                </h4>
              </div>

              <span className={`text-[10px] font-semibold mt-3 ${
                isSelected ? 'text-emerald-100' : 'text-emerald-600'
              }`}>
                {node.role}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. ACTIVE NODE DEEP-DIVE CARD */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-100 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              {selectedNodeData.role}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-emerald-950 font-['Outfit',sans-serif] mt-2">
              {selectedNodeData.title}
            </h2>
          </div>

          <button
            onClick={() => setActiveTab(selectedNodeData.tab as any)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all self-start sm:self-auto cursor-pointer"
          >
            <span>Explore this Feature Module</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Ecosystem Role:
            </h4>
            <p className="text-xs text-emerald-850 leading-relaxed">
              {selectedNodeData.desc}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-lime-50/60 border border-lime-200 space-y-2">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              Circular Economy Action:
            </h4>
            <p className="text-xs text-emerald-850 leading-relaxed">
              {selectedNodeData.action}
            </p>
          </div>
        </div>
      </div>

      {/* 4. IMPACT COMPARISON: LINEAR VS CIRCULAR */}
      <div className="bg-white border border-emerald-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-base font-extrabold text-emerald-950 font-['Outfit',sans-serif]">
          Linear Campus Model vs. CampusCycle Circular Model
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Traditional Linear */}
          <div className="p-5 rounded-2xl border border-red-200 bg-red-50/30 space-y-3">
            <div className="flex items-center gap-2 text-red-800 font-extrabold text-xs uppercase">
              <span>❌ Traditional Linear Campus Flow</span>
            </div>
            <ul className="space-y-2 text-xs text-red-950">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Students buy brand-new textbooks and supplies every semester at full retail.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>At semester end, items accumulate in hostel closets and are eventually dumped in trash.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Unverified generic marketplaces attract external strangers onto campus premises.</span>
              </li>
            </ul>
          </div>

          {/* CampusCycle Circular */}
          <div className="p-5 rounded-2xl border border-emerald-300 bg-emerald-50/50 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-xs uppercase">
              <span>✅ CampusCycle Circular Ecosystem</span>
            </div>
            <ul className="space-y-2 text-xs text-emerald-950">
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>AI vision estimates condition and recommends Sell, Barter Swap, or Donation.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>Items circulate for 4–6 consecutive student generations across semesters.</span>
              </li>
              <li className="flex items-start gap-2">
                <span>•</span>
                <span>100% verified student IDs, safe campus pickup points, and verified repair partners.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};
