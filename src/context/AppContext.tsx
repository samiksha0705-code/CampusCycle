import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  MarketplaceItem, 
  DonationDrive, 
  RepairPartner, 
  RepairRequest, 
  ExchangeProposal, 
  Transaction, 
  NotificationItem, 
  LeaderboardUser,
  ChatThread,
  ChatMessage,
  AIAnalysisResult,
  ListingType,
  ItemCategory,
  ItemCondition,
  SignUpData
} from '../types';
import { 
  INITIAL_USER, 
  PRIYA_USER,
  ADMIN_USER,
  GUEST_USER,
  INITIAL_MARKETPLACE_ITEMS, 
  INITIAL_DONATION_DRIVES, 
  INITIAL_REPAIR_PARTNERS, 
  INITIAL_LEADERBOARD, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_TRANSACTIONS, 
  INITIAL_EXCHANGES, 
  INITIAL_CHAT_THREADS,
  PRESET_AI_ANALYSES
} from '../data/mockData';

interface AppContextType {
  currentUser: User;
  isLoggedIn: boolean;
  isAdmin: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  marketplaceItems: MarketplaceItem[];
  donationDrives: DonationDrive[];
  repairPartners: RepairPartner[];
  repairRequests: RepairRequest[];
  exchangeProposals: ExchangeProposal[];
  transactions: Transaction[];
  notifications: NotificationItem[];
  leaderboard: LeaderboardUser[];
  chatThreads: ChatThread[];
  chatConversations: ChatThread[];
  activeChatThreadId: string | null;
  activeChatId: string | null;
  setActiveChatThreadId: (id: string | null) => void;
  setActiveChatId: (id: string | null) => void;
  
  // Selected item modal state
  selectedItem: MarketplaceItem | null;
  setSelectedItem: (item: MarketplaceItem | null) => void;
  
  // Auth & role switching
  signUpUser: (data: SignUpData) => { success: boolean; message: string; user?: User };
  loginUser: (emailOrRoll: string, password?: string) => { success: boolean; message: string; user?: User };
  requestPasswordReset: (email: string) => { success: boolean; message: string };
  loginAs: (role: 'student' | 'admin' | 'priya' | 'guest') => void;
  logout: () => void;
  
  // Actions
  addNewListing: (item: Omit<MarketplaceItem, 'id' | 'createdAt' | 'viewsCount' | 'likesCount' | 'isAvailable'>) => MarketplaceItem;
  proposeExchange: (targetItem: MarketplaceItem, offeredItemId: string, message: string, cashAdjustment?: number) => void;
  respondToExchange: (proposalId: string, accept: boolean) => void;
  donateItem: (driveId?: string, itemName?: string, category?: ItemCategory, dropOffLocation?: string) => void;
  bookRepair: (partnerId: string, itemName: string, issue: string, category: ItemCategory) => void;
  bookRepairService: (partnerId: string, partnerName: string, issue: string, preferredTime: string) => void;
  buyItem: (item: MarketplaceItem, pickupLocation: string, pickupTime: string) => Transaction;
  completeTransaction: (transactionId: string) => void;
  sendMessage: (threadId: string, text: string, extra?: { isOffer?: boolean; offerAmount?: number; isExchangeProposal?: boolean }) => void;
  sendMessageInChat: (threadId: string, text: string) => void;
  startChatWithSeller: (item: MarketplaceItem, initialMessage?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // AI Analyzer
  analyzeItem: (typeKey: keyof typeof PRESET_AI_ANALYSES | 'custom', customName?: string, customCategory?: ItemCategory) => AIAnalysisResult;
  
  // Admin functions
  verifyStudentUser: (userId: string) => void;
  approveListing: (listingId: string) => void;
  addDonationDrive: (drive: Omit<DonationDrive, 'id' | 'currentCount'>) => void;
  
  // Demo Mode
  demoStep: number;
  setDemoStep: (step: number) => void;
  isDemoTourOpen: boolean;
  setIsDemoTourOpen: (open: boolean) => void;
  runDemoCelebration: () => void;
  toastMessage: { title: string; desc: string; type?: 'success' | 'info' | 'eco' } | null;
  showToast: (title: string, desc: string, type?: 'success' | 'info' | 'eco') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('campuscycle_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [registeredUsers, setRegisteredUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('campuscycle_registered_users');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [INITIAL_USER, PRIYA_USER, ADMIN_USER];
  });

  const isLoggedIn = Boolean(currentUser && currentUser.id !== 'usr-guest-00' && currentUser.name !== 'Guest Visitor');

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [marketplaceItems, setMarketplaceItems] = useState<MarketplaceItem[]>(() => {
    const saved = localStorage.getItem('campuscycle_items');
    return saved ? JSON.parse(saved) : INITIAL_MARKETPLACE_ITEMS;
  });

  const [donationDrives, setDonationDrives] = useState<DonationDrive[]>(INITIAL_DONATION_DRIVES);
  const [repairPartners] = useState<RepairPartner[]>(INITIAL_REPAIR_PARTNERS);
  const [repairRequests, setRepairRequests] = useState<RepairRequest[]>([]);
  const [exchangeProposals, setExchangeProposals] = useState<ExchangeProposal[]>(INITIAL_EXCHANGES);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [activeChatThreadId, setActiveChatThreadId] = useState<string | null>('chat-01');
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null);

  // Demo tour state
  const [demoStep, setDemoStep] = useState<number>(0);
  const [isDemoTourOpen, setIsDemoTourOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: 'success' | 'info' | 'eco' } | null>(null);

  // Auto-sync items, user & registered users
  useEffect(() => {
    try {
      localStorage.setItem('campuscycle_user', JSON.stringify(currentUser));
    } catch {
      // ignore
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem('campuscycle_registered_users', JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      localStorage.setItem('campuscycle_items', JSON.stringify(marketplaceItems));
    } catch {
      // ignore
    }
  }, [marketplaceItems]);

  const showToast = (title: string, desc: string, type: 'success' | 'info' | 'eco' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(prev => (prev?.title === title ? null : prev));
    }, 4500);
  };

  const runDemoCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#1B4332', '#2D6A4F', '#40916C', '#B9F98C', '#95D5B2']
      });
    } catch {
      // fallback
    }
  };

  const signUpUser = (data: SignUpData): { success: boolean; message: string; user?: User } => {
    const trimmedEmail = data.email.trim().toLowerCase();
    
    // Check if email already registered
    const existing = registeredUsers.find(u => u.email.toLowerCase() === trimmedEmail);
    if (existing) {
      return { 
        success: false, 
        message: 'An account with this campus email already exists. Please sign in instead.' 
      };
    }

    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      avatar: data.idCardImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(data.name)}`,
      campus: data.campus || 'NIET Campus',
      department: data.department || 'Engineering',
      hostel: data.hostel || 'Hostel Campus',
      year: data.year || '1st Year',
      rollNumber: data.rollNumber?.trim() || `240133010${Math.floor(1000 + Math.random() * 9000)}`,
      isVerified: true,
      circularScore: 75,
      ecoPoints: 100, // Welcome bonus
      itemsReused: 0,
      itemsDonated: 0,
      itemsRepaired: 0,
      wastePreventedKg: 0,
      moneySavedInr: 0,
      joinedDate: 'August 2026',
      role: data.role || 'student',
      badges: [
        {
          id: 'b-welcome',
          title: 'Green Fresher',
          icon: '🌱',
          description: 'Joined the campus circular economy network',
          isUnlocked: true,
          unlockedAt: 'August 2026',
          category: 'starter'
        }
      ]
    };

    setRegisteredUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);
    
    // Add to leaderboard
    setLeaderboard(prev => [
      ...prev,
      {
        id: newUser.id,
        rank: prev.length + 1,
        name: newUser.name,
        avatar: newUser.avatar,
        campus: newUser.campus,
        department: newUser.department,
        circularScore: newUser.circularScore,
        points: newUser.ecoPoints,
        reusedCount: 0,
        badge: '🌱 Green Fresher'
      }
    ]);

    runDemoCelebration();
    showToast(
      `Welcome to CampusCycle, ${newUser.name.split(' ')[0]}! 🎉`, 
      '+100 Welcome Eco Points & Verified Student ID activated.', 
      'success'
    );
    
    setActiveTab(newUser.role === 'admin' ? 'admin' : 'dashboard');
    return { success: true, message: 'Account registered successfully!', user: newUser };
  };

  const loginUser = (emailOrRoll: string, password?: string): { success: boolean; message: string; user?: User } => {
    const query = emailOrRoll.trim().toLowerCase();
    
    // Check registered users
    let found = registeredUsers.find(
      u => u.email.toLowerCase() === query || (u.rollNumber && u.rollNumber.toLowerCase() === query)
    );

    // Fallback checks for predefined usernames or aliases
    if (!found) {
      if (query.includes('admin') || query.includes('ramesh')) {
        found = ADMIN_USER;
      } else if (query.includes('priya')) {
        found = PRIYA_USER;
      } else if (query.includes('alex') || query === 'alex@niet.edu.in') {
        found = INITIAL_USER;
      }
    }

    if (found) {
      setCurrentUser(found);
      runDemoCelebration();
      showToast(
        `Welcome back, ${found.name.split(' ')[0]} 👋`, 
        found.role === 'admin' ? 'Logged in with Campus Eco Admin privileges.' : `Verified ${found.campus} student session restored.`, 
        'success'
      );
      setActiveTab(found.role === 'admin' ? 'admin' : 'dashboard');
      return { success: true, message: 'Signed in successfully!', user: found };
    }

    return { 
      success: false, 
      message: 'Invalid campus email or roll number. Please check your credentials or register a new student account.' 
    };
  };

  const requestPasswordReset = (email: string): { success: boolean; message: string } => {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@')) {
      return { success: false, message: 'Please enter a valid campus email address.' };
    }
    showToast(
      'Password Reset Link Sent 📧', 
      `A secure reset link has been dispatched to ${trimmed}. Check your campus webmail inbox.`, 
      'info'
    );
    return { 
      success: true, 
      message: `Password reset verification instructions sent to ${trimmed}.` 
    };
  };

  const loginAs = (role: 'student' | 'admin' | 'priya' | 'guest') => {
    if (role === 'admin') {
      setCurrentUser(ADMIN_USER);
      setActiveTab('admin');
      showToast('Logged in as Campus Admin', 'Managing NIET Campus circular policies & verification.', 'info');
    } else if (role === 'priya') {
      setCurrentUser(PRIYA_USER);
      setActiveTab('dashboard');
      showToast('Switched to Priya Sharma', 'Exploring fellow student perspective.', 'info');
    } else if (role === 'guest') {
      setCurrentUser(GUEST_USER);
      setActiveTab('landing');
      showToast('Viewing as Guest Visitor', 'Sign in or create a student account to unlock full trading.', 'info');
    } else {
      setCurrentUser(INITIAL_USER);
      setActiveTab('dashboard');
      showToast('Welcome back, Alex 👋', 'Logged in as Verified NIET Student.', 'success');
    }
  };

  const logout = () => {
    setCurrentUser(GUEST_USER);
    setActiveTab('auth');
    showToast('Signed Out', 'You have been signed out. Please log in or sign up.', 'info');
  };

  const addNewListing = (itemData: Omit<MarketplaceItem, 'id' | 'createdAt' | 'viewsCount' | 'likesCount' | 'isAvailable'>): MarketplaceItem => {
    const newItem: MarketplaceItem = {
      ...itemData,
      id: `item-${Date.now()}`,
      createdAt: 'Just now',
      viewsCount: 1,
      likesCount: 0,
      isAvailable: true,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      sellerAvatar: currentUser.avatar,
      sellerCampus: currentUser.campus,
      sellerDepartment: currentUser.department,
      sellerVerified: currentUser.isVerified,
      sellerRating: 5.0
    };

    setMarketplaceItems(prev => [newItem, ...prev]);

    // Reward user with Eco Points and boost Circular Score
    const bonusPoints = itemData.type === 'donate' ? 150 : itemData.type === 'exchange' ? 100 : 50;
    const scoreBoost = itemData.type === 'donate' ? 3 : 2;

    setCurrentUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + bonusPoints,
      circularScore: Math.min(100, prev.circularScore + scoreBoost),
      itemsReused: prev.itemsReused + 1,
      wastePreventedKg: Number((prev.wastePreventedKg + (itemData.co2SavedKg ? itemData.co2SavedKg / 10 : 0.8)).toFixed(1))
    }));

    // Update leaderboard
    setLeaderboard(prev => prev.map(u => {
      if (u.id === currentUser.id) {
        return {
          ...u,
          points: u.points + bonusPoints,
          reusedCount: u.reusedCount + 1,
          circularScore: Math.min(100, u.circularScore + scoreBoost)
        };
      }
      return u;
    }));

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Item Listed Successfully! 🌱',
      message: `"${newItem.title}" is now active in the NIET campus circular feed. +${bonusPoints} Eco Points added!`,
      type: 'eco_points',
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'marketplace'
    };
    setNotifications(prev => [newNotif, ...prev]);

    runDemoCelebration();
    showToast('Listing Live! 🌱', `+${bonusPoints} Eco Points earned for circular listing.`, 'eco');

    return newItem;
  };

  const proposeExchange = (targetItem: MarketplaceItem, offeredItemId: string, message: string, cashAdjustment?: number) => {
    const offeredItem = marketplaceItems.find(i => i.id === offeredItemId) || {
      id: offeredItemId,
      title: 'Offered Campus Item',
      images: ['https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=80'],
      price: 0
    };

    const newProposal: ExchangeProposal = {
      id: `ex-${Date.now()}`,
      targetItemId: targetItem.id,
      targetItemTitle: targetItem.title,
      targetItemImage: targetItem.images[0],
      targetItemOwnerId: targetItem.sellerId,
      offeredItemId: offeredItem.id,
      offeredItemTitle: offeredItem.title,
      offeredItemImage: offeredItem.images[0],
      offeredItemPrice: offeredItem.price || 0,
      proposerId: currentUser.id,
      proposerName: currentUser.name,
      proposerAvatar: currentUser.avatar,
      status: 'Pending',
      message,
      createdAt: 'Just now',
      cashAdjustment
    };

    setExchangeProposals(prev => [newProposal, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Exchange Proposal Sent 🔄',
      message: `You proposed swapping "${offeredItem.title}" with ${targetItem.sellerName}'s "${targetItem.title}".`,
      type: 'exchange',
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'exchange'
    };
    setNotifications(prev => [newNotif, ...prev]);

    showToast('Exchange Proposal Sent! 🔄', `Waiting for ${targetItem.sellerName} to review.`, 'info');
  };

  const respondToExchange = (proposalId: string, accept: boolean) => {
    setExchangeProposals(prev => prev.map(p => {
      if (p.id === proposalId) {
        return {
          ...p,
          status: accept ? 'Accepted' : 'Rejected'
        };
      }
      return p;
    }));

    if (accept) {
      setCurrentUser(prev => ({
        ...prev,
        ecoPoints: prev.ecoPoints + 120,
        circularScore: Math.min(100, prev.circularScore + 3),
        itemsReused: prev.itemsReused + 1,
        wastePreventedKg: Number((prev.wastePreventedKg + 2.5).toFixed(1))
      }));
      runDemoCelebration();
      showToast('Exchange Accepted! 🤝', 'Exchange agreed. Check your scheduled pickups in Transactions.', 'eco');
    } else {
      showToast('Exchange Declined', 'Proposal has been updated.', 'info');
    }
  };

  const donateItem = (driveId?: string, itemName: string = 'Campus Supply Donation', category: ItemCategory = 'College Supplies', dropOffLocation: string = 'Central Library Drop Box') => {
    if (driveId) {
      setDonationDrives(prev => prev.map(d => {
        if (d.id === driveId) {
          return {
            ...d,
            currentCount: d.currentCount + 1
          };
        }
        return d;
      }));
    }

    setCurrentUser(prev => ({
      ...prev,
      itemsDonated: prev.itemsDonated + 1,
      ecoPoints: prev.ecoPoints + 150,
      circularScore: Math.min(100, prev.circularScore + 4),
      wastePreventedKg: Number((prev.wastePreventedKg + 3.2).toFixed(1))
    }));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Donation Drop-off Confirmed 🎁',
      message: `Thank you for donating "${itemName}" at ${dropOffLocation}! +150 Eco Points earned.`,
      type: 'eco_points',
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'donate'
    };
    setNotifications(prev => [newNotif, ...prev]);

    runDemoCelebration();
    showToast('Generous Donation! 🎁', '+150 Eco Points & +4% Circular Score boost!', 'eco');
  };

  const bookRepair = (partnerId: string, itemName: string, issue: string, category: ItemCategory) => {
    const partner = repairPartners.find(p => p.id === partnerId) || repairPartners[0];
    const newRequest: RepairRequest = {
      id: `rep-req-${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      partnerId: partner.id,
      partnerName: partner.name,
      itemName,
      issueDescription: issue,
      category,
      status: 'Requested',
      quotedPrice: 150,
      createdAt: 'Today',
      estimatedCompletion: 'Tomorrow, 5:00 PM'
    };

    setRepairRequests(prev => [newRequest, ...prev]);

    setCurrentUser(prev => ({
      ...prev,
      itemsRepaired: prev.itemsRepaired + 1,
      ecoPoints: prev.ecoPoints + 75,
      circularScore: Math.min(100, prev.circularScore + 2),
      wastePreventedKg: Number((prev.wastePreventedKg + 1.8).toFixed(1))
    }));

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Repair Booking Confirmed 🔧',
      message: `${partner.name} received your request for "${itemName}". +75 Eco Points earned for repairing instead of replacing!`,
      type: 'repair',
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'repair'
    };
    setNotifications(prev => [newNotif, ...prev]);

    runDemoCelebration();
    showToast('Repair Scheduled 🔧', `Booking sent to ${partner.name}. +75 Eco Points!`, 'eco');
  };

  const bookRepairService = (partnerId: string, partnerName: string, issue: string, preferredTime: string) => {
    bookRepair(partnerId, issue || 'Campus Repair Service', issue, 'Electronics');
  };

  const buyItem = (item: MarketplaceItem, pickupLocation: string, pickupTime: string): Transaction => {
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    const newTx: Transaction = {
      id: `tx-${Date.now().toString().slice(-4)}`,
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
      type: item.type,
      price: item.price,
      buyerId: currentUser.id,
      buyerName: currentUser.name,
      sellerId: item.sellerId,
      sellerName: item.sellerName,
      status: 'Pickup Scheduled',
      pickupLocation,
      pickupTime,
      qrCodeValue: `CC-NIET-${item.id.slice(0, 6)}-${randomCode}`,
      handoverCode: randomCode,
      ecoPointsEarned: 80,
      wastePreventedKg: item.co2SavedKg || 3.5,
      createdAt: 'Just now'
    };

    setTransactions(prev => [newTx, ...prev]);

    // Mark item as reserved
    setMarketplaceItems(prev => prev.map(i => i.id === item.id ? { ...i, isAvailable: false } : i));

    // Update student stats
    setCurrentUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + 80,
      moneySavedInr: prev.moneySavedInr + (item.originalPrice ? item.originalPrice - item.price : 400),
      circularScore: Math.min(100, prev.circularScore + 2),
      itemsReused: prev.itemsReused + 1,
      wastePreventedKg: Number((prev.wastePreventedKg + (item.co2SavedKg || 3.5) / 5).toFixed(1))
    }));

    const notif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'Order Placed! 🛒',
      message: `Pickup scheduled for "${item.title}" at ${pickupLocation}. Use Code ${randomCode} for handover verification.`,
      type: 'transaction',
      timestamp: 'Just now',
      isRead: false,
      linkTab: 'dashboard'
    };
    setNotifications(prev => [notif, ...prev]);

    runDemoCelebration();
    showToast('Pickup Scheduled! 🛒', `Code: ${randomCode}. +80 Eco Points added!`, 'eco');

    return newTx;
  };

  const completeTransaction = (transactionId: string) => {
    setTransactions(prev => prev.map(tx => {
      if (tx.id === transactionId) {
        return { ...tx, status: 'Completed' };
      }
      return tx;
    }));

    setCurrentUser(prev => ({
      ...prev,
      ecoPoints: prev.ecoPoints + 50,
      circularScore: Math.min(100, prev.circularScore + 1)
    }));

    runDemoCelebration();
    showToast('Handover Completed! 🎉', 'Item cycle completed. +50 bonus Eco Points for zero campus waste!', 'eco');
  };

  const sendMessage = (threadId: string, text: string, extra?: { isOffer?: boolean; offerAmount?: number; isExchangeProposal?: boolean }) => {
    const newMessage: ChatMessage = {
      id: `m-${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...extra
    };

    setChatThreads(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [...t.messages, newMessage]
        };
      }
      return t;
    }));

    // Simulate realistic instant campus peer response
    setTimeout(() => {
      const activeThread = chatThreads.find(t => t.id === threadId);
      const sellerName = activeThread?.participant.name || 'Seller';
      let autoReplyText = 'Sounds perfect! Let\'s meet between lectures near Central Library.';

      if (extra?.isOffer) {
        autoReplyText = `Offer of ₹${extra.offerAmount} looks fair! I can meet you at the cafeteria after 4:00 PM today.`;
      } else if (text.toLowerCase().includes('available')) {
        autoReplyText = 'Yes, it\'s still available! In great condition, ready for handoff anytime today.';
      } else if (text.toLowerCase().includes('where') || text.toLowerCase().includes('meet') || text.toLowerCase().includes('location')) {
        autoReplyText = 'I\'m usually near Tech Block 2 or Aryabhatta Hostel in the evenings. Let me know what time works best for you!';
      }

      const replyMsg: ChatMessage = {
        id: `m-reply-${Date.now()}`,
        senderId: activeThread?.participant.id || 'seller-reply',
        text: autoReplyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatThreads(curThreads => curThreads.map(t => {
        if (t.id === threadId) {
          return {
            ...t,
            lastMessage: autoReplyText,
            lastMessageTime: 'Just now',
            messages: [...t.messages, replyMsg]
          };
        }
        return t;
      }));
    }, 900);
  };

  const startChatWithSeller = (item: MarketplaceItem, initialMessage?: string) => {
    const existingThread = chatThreads.find(t => t.participant.id === item.sellerId || t.itemId === item.id);
    if (existingThread) {
      setActiveChatThreadId(existingThread.id);
      setActiveTab('messages');
      if (initialMessage) {
        sendMessage(existingThread.id, initialMessage);
      }
      return;
    }

    const newThreadId = `chat-${Date.now()}`;
    const newThread: ChatThread = {
      id: newThreadId,
      participant: {
        id: item.sellerId,
        name: item.sellerName,
        avatar: item.sellerAvatar,
        campus: item.sellerCampus,
        isOnline: true
      },
      itemId: item.id,
      itemTitle: item.title,
      itemImage: item.images[0],
      itemPrice: item.price,
      lastMessage: initialMessage || `Hi ${item.sellerName}, I am interested in your ${item.title}!`,
      lastMessageTime: 'Just now',
      unreadCount: 0,
      messages: [
        {
          id: `m-${Date.now()}`,
          senderId: currentUser.id,
          text: initialMessage || `Hi ${item.sellerName}, I am interested in your ${item.title}!`,
          timestamp: 'Just now',
          isItemCard: true,
          itemPreview: {
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.images[0]
          }
        }
      ]
    };

    setChatThreads(prev => [newThread, ...prev]);
    setActiveChatThreadId(newThreadId);
    setActiveTab('messages');
  };

  const sendMessageInChat = (threadId: string, text: string) => {
    sendMessage(threadId, text);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('Notifications Cleared', 'All marked as read.', 'info');
  };

  const analyzeItem = (typeKey: keyof typeof PRESET_AI_ANALYSES | 'custom', customName?: string, customCategory?: ItemCategory): AIAnalysisResult => {
    if (typeKey !== 'custom' && PRESET_AI_ANALYSES[typeKey]) {
      return PRESET_AI_ANALYSES[typeKey];
    }

    // Smart fallback generation for any user custom uploaded photo/item
    const category = customCategory || 'Electronics';
    const itemName = customName || 'Detected Student Gadget / Item';
    return {
      detectedItem: itemName,
      category,
      condition: 'Good',
      estimatedResaleValue: 1200,
      originalPriceEstimate: 3200,
      confidenceScore: 92,
      recommendedAction: 'SELL',
      alternativeAction: 'EXCHANGE / DONATE',
      reasoning: [
        'Recognized high campus utility and semester demand',
        'Estimated 60%+ cost savings compared to retail purchase',
        'Prevents ~12.5 kg embodied CO2 emissions from landfill'
      ],
      circularScore: 92,
      co2SavedKg: 12.5,
      reuseTips: [
        'Include all accessories and cables for maximum price',
        'Offer convenient on-campus pickup near Central Library',
        'State working condition accurately in description'
      ],
      suggestedTags: ['CampusItem', 'StudentDeal', 'CircularCampus', 'EcoChoice']
    };
  };

  const verifyStudentUser = (userId: string) => {
    showToast('Student ID Verified ✓', `University email & roll number verified for ${userId}`, 'success');
  };

  const approveListing = (listingId: string) => {
    showToast('Listing Approved ✓', `Campus listing ${listingId} is certified eco-compliant.`, 'success');
  };

  const addDonationDrive = (drive: Omit<DonationDrive, 'id' | 'currentCount'>) => {
    const newDrive: DonationDrive = {
      ...drive,
      id: `drive-${Date.now()}`,
      currentCount: 0
    };
    setDonationDrives(prev => [newDrive, ...prev]);
    showToast('Donation Drive Launched 🚀', `Campus-wide drive "${drive.title}" is now open for drops!`, 'eco');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        isAdmin: currentUser.role === 'admin',
        activeTab,
        setActiveTab,
        marketplaceItems,
        donationDrives,
        repairPartners,
        repairRequests,
        exchangeProposals,
        transactions,
        notifications,
        leaderboard,
        chatThreads,
        chatConversations: chatThreads,
        activeChatThreadId,
        activeChatId: activeChatThreadId,
        setActiveChatThreadId,
        setActiveChatId: setActiveChatThreadId,
        selectedItem,
        setSelectedItem,
        signUpUser,
        loginUser,
        requestPasswordReset,
        loginAs,
        logout,
        addNewListing,
        proposeExchange,
        respondToExchange,
        donateItem,
        bookRepair,
        bookRepairService,
        buyItem,
        completeTransaction,
        sendMessage,
        sendMessageInChat,
        startChatWithSeller,
        markNotificationRead,
        markAllNotificationsRead,
        analyzeItem,
        verifyStudentUser,
        approveListing,
        addDonationDrive,
        demoStep,
        setDemoStep,
        isDemoTourOpen,
        setIsDemoTourOpen,
        runDemoCelebration,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
