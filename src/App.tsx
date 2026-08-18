import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Toast } from './components/Toast';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Marketplace } from './components/Marketplace';
import { ItemDetailsModal } from './components/ItemDetailsModal';
import { ListAnItem } from './components/ListAnItem';
import { AIAnalyzer } from './components/AIAnalyzer';
import { ExchangeView } from './components/ExchangeView';
import { DonationView } from './components/DonationView';
import { RepairView } from './components/RepairView';
import { ChatView } from './components/ChatView';
import { EcoScoreView } from './components/EcoScoreView';
import { LeaderboardView } from './components/LeaderboardView';
import { AdminDashboard } from './components/AdminDashboard';
import { ProfileView } from './components/ProfileView';
import { CircularEcosystemView } from './components/CircularEcosystemView';
import { DemoTourModal } from './components/DemoTourModal';
import { AuthView } from './components/AuthView';
import { CampusLogo } from './components/CampusLogo';
import { Leaf, Heart, ShieldCheck, Github, ExternalLink } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
      case 'landing':
        return <LandingPage />;
      case 'auth':
      case 'login':
        return <AuthView initialMode="signin" />;
      case 'signup':
        return <AuthView initialMode="signup" />;
      case 'dashboard':
        return <Dashboard />;
      case 'marketplace':
        return <Marketplace />;
      case 'ai_analyzer':
        return <AIAnalyzer />;
      case 'sell':
        return <ListAnItem />;
      case 'exchange':
        return <ExchangeView />;
      case 'donate':
        return <DonationView />;
      case 'repair':
        return <RepairView />;
      case 'messages':
        return <ChatView />;
      case 'eco_score':
        return <EcoScoreView />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'ecosystem':
        return <CircularEcosystemView />;
      case 'admin':
        return <AdminDashboard />;
      case 'profile':
        return <ProfileView />;
      default:
        return <Marketplace />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F1FAF4] text-[#3F5B50] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Global Notifications */}
      <Toast />

      {/* Persistent Navigation Bar */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActiveView()}
      </main>

      {/* Modals */}
      <ItemDetailsModal />
      <DemoTourModal />

      {/* Footer */}
      <footer className="bg-white border-t border-[#D8F3DC] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            <div className="flex items-center gap-3">
              <CampusLogo size="sm" />
              <div>
                <p className="text-xs font-extrabold text-[#1B4332] font-['Outfit',sans-serif]">CampusCycle™</p>
                <p className="text-[11px] text-[#6B8577]">Circular Economy Platform for College Campuses</p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#2D6A4F]">
              <button onClick={() => setActiveTab('marketplace')} className="hover:text-[#1B4332] cursor-pointer transition-colors">Marketplace</button>
              <button onClick={() => setActiveTab('ai_analyzer')} className="hover:text-[#1B4332] cursor-pointer transition-colors">AI Valuation</button>
              <button onClick={() => setActiveTab('exchange')} className="hover:text-[#1B4332] cursor-pointer transition-colors">Barter Hub</button>
              <button onClick={() => setActiveTab('donate')} className="hover:text-[#1B4332] cursor-pointer transition-colors">Donations</button>
              <button onClick={() => setActiveTab('repair')} className="hover:text-[#1B4332] cursor-pointer transition-colors">Repair Network</button>
              <button onClick={() => setActiveTab('ecosystem')} className="hover:text-[#1B4332] cursor-pointer transition-colors">Ecosystem</button>
              <button onClick={() => setActiveTab('admin')} className="hover:text-[#1B4332] cursor-pointer transition-colors">Admin Console</button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#40916C]">
              <ShieldCheck className="w-4 h-4 text-[#2D6A4F]" />
              <span>Verified for NIET Greater Noida Campus</span>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-[#D8F3DC] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#6B8577]">
            <p>© 2026 CampusCycle. Built for National Hackathon Circular Economy Track.</p>
            <p className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#40916C] fill-[#40916C]" />
              <span>for zero-waste sustainable university campuses</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
