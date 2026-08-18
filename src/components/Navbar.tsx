import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CampusLogo } from './CampusLogo';
import { 
  Sparkles, 
  Bell, 
  MessageSquare, 
  User as UserIcon, 
  ShieldCheck, 
  ChevronDown, 
  Flame, 
  Layers, 
  Wrench, 
  HeartHandshake, 
  ArrowLeftRight, 
  ShoppingBag, 
  LayoutDashboard, 
  Award, 
  Bot, 
  PlusCircle,
  Menu,
  X,
  ExternalLink,
  Check
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    activeTab, 
    setActiveTab, 
    notifications, 
    markNotificationRead,
    markAllNotificationsRead,
    chatThreads,
    loginAs,
    setIsDemoTourOpen
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.isRead);
  const unreadChats = chatThreads.reduce((acc, t) => acc + (t.unreadCount || 0), 0);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag },
    { id: 'sell', label: 'List Item', icon: PlusCircle, isHighlight: true },
    { id: 'exchange', label: 'Exchange', icon: ArrowLeftRight },
    { id: 'donate', label: 'Donate', icon: HeartHandshake },
    { id: 'repair', label: 'Repair & Upcycle', icon: Wrench },
    { id: 'ai-analyzer', label: 'AI Analyzer', icon: Bot },
    { id: 'eco', label: 'Eco Impact', icon: Flame },
    { id: 'leaderboard', label: 'Leaderboard', icon: Award },
    { id: 'ecosystem', label: 'Ecosystem', icon: Layers }
  ];

  return (
    <header id="campuscycle-navbar" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D8F3DC] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <div onClick={() => setActiveTab('landing')} role="button" tabIndex={0}>
              <CampusLogo size="md" />
            </div>

            {/* Campus badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#F1FAF4] border border-[#D8F3DC] text-xs font-semibold text-[#1B4332]">
              <span className="w-2 h-2 rounded-full bg-[#40916C] animate-pulse"></span>
              <span>{currentUser.campus}</span>
              {currentUser.isVerified && (
                <span className="flex items-center text-[10px] text-[#2D6A4F] ml-1 bg-[#D8F3DC] px-1.5 py-0.5 rounded font-bold">
                  <ShieldCheck className="w-3 h-3 mr-0.5 text-[#2D6A4F]" /> Verified Hub
                </span>
              )}
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    item.isHighlight 
                      ? 'bg-[#1B4332] text-white shadow-xs hover:bg-[#2D6A4F] shadow-[#1B4332]/20' 
                      : isActive 
                      ? 'bg-[#D8F3DC] text-[#1B4332] font-bold' 
                      : 'text-[#3F5B50] hover:text-[#1B4332] hover:bg-[#F1FAF4]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.isHighlight ? 'text-[#B9F98C]' : isActive ? 'text-[#1B4332]' : 'text-[#40916C]'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2.5">
            
            {/* Quick Demo Tour Walkthrough Pill */}
            <button
              id="btn-judge-demo-tour"
              onClick={() => setIsDemoTourOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#1B4332] to-[#2D6A4F] text-[#B9F98C] border border-[#40916C]/40 text-xs font-bold shadow-xs hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              title="Step-by-step Judge Demo Walkthrough"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B9F98C]" />
              <span className="hidden sm:inline">Judge Demo Flow</span>
              <span className="sm:hidden font-extrabold">Demo</span>
            </button>

            {/* Eco Points Chip */}
            <button
              id="navbar-eco-score-btn"
              onClick={() => setActiveTab('eco')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#F1FAF4] border border-[#D8F3DC] hover:border-[#95D5B2] transition-all cursor-pointer"
            >
              <div className="w-5 h-5 rounded-full bg-[#1B4332] text-[#B9F98C] flex items-center justify-center text-[10px] font-bold">
                🌱
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[10px] font-semibold text-[#6B8577] uppercase tracking-wider">Score</span>
                <span className="text-xs font-extrabold text-[#1B4332]">{currentUser.circularScore}<span className="text-[10px] text-[#40916C]">/100</span></span>
              </div>
            </button>

            {/* Messages Icon */}
            <button
              id="navbar-messages-btn"
              onClick={() => setActiveTab('messages')}
              className={`relative p-2 rounded-xl border transition-all cursor-pointer ${
                activeTab === 'messages' 
                  ? 'bg-[#D8F3DC] border-[#95D5B2] text-[#1B4332]' 
                  : 'bg-white border-[#D8F3DC] text-[#3F5B50] hover:bg-[#F1FAF4]'
              }`}
              title="Campus Messages"
            >
              <MessageSquare className="w-4 h-4" />
              {unreadChats > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#1B4332] text-[#B9F98C] text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadChats}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                id="navbar-notifications-btn"
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className={`relative p-2 rounded-xl border transition-all cursor-pointer ${
                  isNotifOpen 
                    ? 'bg-[#D8F3DC] border-[#95D5B2] text-[#1B4332]' 
                    : 'bg-white border-[#D8F3DC] text-[#3F5B50] hover:bg-[#F1FAF4]'
                }`}
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2D6A4F] text-[#B9F98C] text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <div id="notifications-popover" className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#D8F3DC] rounded-2xl shadow-xl shadow-[#1B4332]/10 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between pb-3 border-b border-[#D8F3DC]">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#2D6A4F]" />
                      <h4 className="text-sm font-bold text-[#1B4332]">Campus Activity</h4>
                    </div>
                    {unreadNotifs.length > 0 && (
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[11px] font-semibold text-[#40916C] hover:text-[#1B4332] cursor-pointer"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="divide-y divide-[#F1FAF4] max-h-72 overflow-y-auto mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#6B8577] py-6 text-center">No notifications yet.</p>
                    ) : (
                      notifications.map(notif => (
                        <div
                          key={notif.id}
                          onClick={() => {
                            markNotificationRead(notif.id);
                            if (notif.linkTab) setActiveTab(notif.linkTab);
                            setIsNotifOpen(false);
                          }}
                          className={`py-3 px-2 flex items-start gap-3 rounded-xl transition-colors cursor-pointer ${
                            notif.isRead ? 'hover:bg-[#F1FAF4] opacity-80' : 'bg-[#F1FAF4] hover:bg-[#D8F3DC]/70'
                          }`}
                        >
                          <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-[#40916C]"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#1B4332]">{notif.title}</p>
                            <p className="text-xs text-[#3F5B50] mt-0.5 leading-snug">{notif.message}</p>
                            <span className="text-[10px] text-[#6B8577] mt-1 block">{notif.timestamp}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* User Account / Role Switcher Menu */}
            <div className="relative">
              <button
                id="navbar-profile-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl border border-[#D8F3DC] bg-white hover:bg-[#F1FAF4] transition-all cursor-pointer"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-[#2D6A4F]"
                />
                <span className="hidden md:inline text-xs font-bold text-[#1B4332] max-w-[90px] truncate">
                  {currentUser.name.split(' ')[0]}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#40916C]" />
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div id="user-menu-popover" className="absolute right-0 mt-2 w-64 bg-white border border-[#D8F3DC] rounded-2xl shadow-xl shadow-[#1B4332]/10 p-3 z-50">
                  <div className="pb-3 border-b border-[#D8F3DC]">
                    <p className="text-xs font-bold text-[#1B4332]">{currentUser.name}</p>
                    <p className="text-[11px] text-[#6B8577] truncate">{currentUser.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-semibold text-[#1B4332] bg-[#D8F3DC] px-2 py-1 rounded-md">
                      <ShieldCheck className="w-3 h-3 text-[#2D6A4F]" />
                      <span>{currentUser.role === 'admin' ? 'Campus Eco Admin' : 'Verified Student ID'}</span>
                    </div>
                  </div>

                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#1B4332] hover:bg-[#F1FAF4] rounded-lg cursor-pointer text-left"
                    >
                      <UserIcon className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      My Student Profile & Badges
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('auth');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#1B4332] hover:bg-[#F1FAF4] rounded-lg cursor-pointer text-left"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      Student Auth & Registration
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#1B4332] hover:bg-[#F1FAF4] rounded-lg cursor-pointer text-left"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-[#2D6A4F]" />
                      Campus Admin Dashboard
                    </button>
                  </div>

                  {/* Switch Demo Accounts */}
                  <div className="pt-2 border-t border-[#D8F3DC]">
                    <span className="text-[10px] font-bold text-[#40916C] uppercase tracking-wider block px-2 mb-1.5">
                      Switch Demo Role
                    </span>
                    <button
                      onClick={() => {
                        loginAs('student');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer text-left ${
                        currentUser.id === 'usr-alex-01' ? 'bg-[#D8F3DC] font-bold text-[#1B4332]' : 'text-[#3F5B50] hover:bg-[#F1FAF4]'
                      }`}
                    >
                      <span>Alex Rivera (Student)</span>
                      {currentUser.id === 'usr-alex-01' && <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />}
                    </button>

                    <button
                      onClick={() => {
                        loginAs('priya');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer text-left ${
                        currentUser.id === 'usr-priya-02' ? 'bg-[#D8F3DC] font-bold text-[#1B4332]' : 'text-[#3F5B50] hover:bg-[#F1FAF4]'
                      }`}
                    >
                      <span>Priya Sharma (Fellow Student)</span>
                      {currentUser.id === 'usr-priya-02' && <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />}
                    </button>

                    <button
                      onClick={() => {
                        loginAs('admin');
                        setIsUserMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer text-left ${
                        currentUser.id === 'usr-admin-01' ? 'bg-[#D8F3DC] font-bold text-[#1B4332]' : 'text-[#3F5B50] hover:bg-[#F1FAF4]'
                      }`}
                    >
                      <span>Dr. Ramesh (Campus Admin)</span>
                      {currentUser.id === 'usr-admin-01' && <Check className="w-3.5 h-3.5 text-[#2D6A4F]" />}
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('auth');
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-2.5 py-1.5 text-xs rounded-lg cursor-pointer text-left text-rose-700 hover:bg-rose-50 mt-1"
                    >
                      <span>Sign In / Create Account</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Hamburger */}
            <button
              id="navbar-mobile-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl border border-[#D8F3DC] bg-white text-[#1B4332] cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div id="mobile-nav-drawer" className="xl:hidden bg-white border-b border-[#D8F3DC] px-4 pt-2 pb-6 space-y-1 shadow-lg">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold cursor-pointer ${
                    isActive 
                      ? 'bg-[#1B4332] text-white' 
                      : 'bg-[#F1FAF4] text-[#1B4332] hover:bg-[#D8F3DC]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-[#D8F3DC] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src={currentUser.avatar} className="w-8 h-8 rounded-lg object-cover" alt="" />
              <div>
                <p className="text-xs font-bold text-[#1B4332]">{currentUser.name}</p>
                <p className="text-[10px] text-[#6B8577]">{currentUser.campus}</p>
              </div>
            </div>
            <button
              onClick={() => {
                setActiveTab('profile');
                setIsMobileMenuOpen(false);
              }}
              className="px-3 py-1.5 bg-[#D8F3DC] text-[#1B4332] text-xs font-bold rounded-lg cursor-pointer"
            >
              Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
