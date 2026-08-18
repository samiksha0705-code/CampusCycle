export type ListingType = 'sell' | 'exchange' | 'donate';
export type ItemCategory = 
  | 'Books' 
  | 'Electronics' 
  | 'Clothes' 
  | 'Cycles' 
  | 'Furniture' 
  | 'College Supplies' 
  | 'Accessories';

export type ItemCondition = 'Brand New' | 'Like New' | 'Good' | 'Fair' | 'Needs Minor Repair';

export interface SignUpData {
  name: string;
  email: string;
  password?: string;
  rollNumber?: string;
  campus: string;
  department: string;
  hostel?: string;
  year: string;
  idCardImage?: string;
  role?: 'student' | 'admin';
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  campus: string;
  department: string;
  hostel?: string;
  year: string;
  rollNumber?: string;
  isVerified: boolean;
  circularScore: number; // 0 to 100
  ecoPoints: number;
  itemsReused: number;
  itemsDonated: number;
  itemsRepaired: number;
  wastePreventedKg: number;
  moneySavedInr: number;
  joinedDate: string;
  badges: Badge[];
  role: 'student' | 'admin';
}

export interface Badge {
  id: string;
  title: string;
  icon: string;
  description: string;
  unlockedAt?: string;
  isUnlocked: boolean;
  category: 'starter' | 'repair' | 'champion' | 'leader';
}

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: ItemCategory;
  condition: ItemCondition;
  type: ListingType;
  price: number; // 0 if donate or exchange
  originalPrice?: number;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerCampus: string;
  sellerDepartment: string;
  sellerVerified: boolean;
  sellerRating: number;
  circularScore: number; // 0-100 score for how eco-friendly / reusable it is
  co2SavedKg: number;
  viewsCount: number;
  likesCount: number;
  isAvailable: boolean;
  createdAt: string;
  exchangePreferences?: string;
  tags: string[];
  pickupLocation: string;
}

export interface ExchangeProposal {
  id: string;
  targetItemId: string;
  targetItemTitle: string;
  targetItemImage: string;
  targetItemOwnerId: string;
  offeredItemId: string;
  offeredItemTitle: string;
  offeredItemImage: string;
  offeredItemPrice: number;
  proposerId: string;
  proposerName: string;
  proposerAvatar: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
  message: string;
  createdAt: string;
  cashAdjustment?: number; // e.g. offered item + ₹200
}

export interface DonationDrive {
  id: string;
  title: string;
  organizer: string;
  description: string;
  targetItems: string[];
  targetCount: number;
  currentCount: number;
  dropOffPoints: {
    location: string;
    timings: string;
    incharge: string;
    contact: string;
  }[];
  deadline: string;
  bannerImage: string;
  partnerNgo?: string;
  verifiedByCampus: boolean;
}

export interface RepairPartner {
  id: string;
  name: string;
  service: string;
  specialty: string;
  rating: number;
  reviewsCount: number;
  distance: string;
  location: string;
  phone: string;
  isVerified: boolean;
  avatar: string;
  turnaroundTime: string;
  estimatedPriceRange: string;
  discountForStudents: string;
}

export interface RepairRequest {
  id: string;
  userId: string;
  userName: string;
  partnerId: string;
  partnerName: string;
  itemName: string;
  issueDescription: string;
  category: ItemCategory;
  status: 'Requested' | 'In Inspection' | 'Repairing' | 'Ready for Pickup' | 'Completed';
  quotedPrice: number;
  createdAt: string;
  estimatedCompletion: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isItemCard?: boolean;
  itemPreview?: {
    id: string;
    title: string;
    price: number;
    image: string;
  };
  isOffer?: boolean;
  offerAmount?: number;
  isExchangeProposal?: boolean;
  exchangeItemId?: string;
}

export interface ChatThread {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
    campus: string;
    isOnline: boolean;
  };
  itemId?: string;
  itemTitle?: string;
  itemImage?: string;
  itemPrice?: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface Transaction {
  id: string;
  itemId: string;
  itemTitle: string;
  itemImage: string;
  type: ListingType;
  price: number;
  buyerId: string;
  buyerName: string;
  sellerId: string;
  sellerName: string;
  status: 'Pending' | 'Confirmed' | 'Pickup Scheduled' | 'Completed';
  pickupLocation: string;
  pickupTime: string;
  qrCodeValue: string;
  handoverCode: string;
  ecoPointsEarned: number;
  wastePreventedKg: number;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'exchange' | 'eco_points' | 'transaction' | 'repair' | 'listing' | 'general';
  timestamp: string;
  isRead: boolean;
  linkTab?: string;
}

export interface LeaderboardUser {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  campus: string;
  department: string;
  hostel?: string;
  points: number;
  reusedCount: number;
  circularScore: number;
  badge: string;
}

export interface AIAnalysisResult {
  detectedItem: string;
  category: ItemCategory;
  condition: ItemCondition;
  estimatedResaleValue: number;
  originalPriceEstimate: number;
  confidenceScore: number;
  recommendedAction: 'SELL' | 'EXCHANGE' | 'DONATE' | 'REPAIR' | 'UPCYCLE';
  alternativeAction: string;
  reasoning: string[];
  circularScore: number;
  co2SavedKg: number;
  reuseTips: string[];
  suggestedTags: string[];
}
