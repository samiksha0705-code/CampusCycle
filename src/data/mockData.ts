import { 
  MarketplaceItem, 
  User, 
  DonationDrive, 
  RepairPartner, 
  ExchangeProposal, 
  Transaction, 
  NotificationItem, 
  LeaderboardUser,
  Badge,
  ChatThread
} from '../types';

export const INITIAL_USER: User = {
  id: 'usr-alex-01',
  name: 'Alex Rivera',
  email: 'alex.rivera@niet.edu.in',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  campus: 'NIET Campus',
  department: 'Computer Science & Engineering',
  hostel: 'Aryabhatta Hostel (Block B)',
  year: '3rd Year',
  isVerified: true,
  circularScore: 82,
  ecoPoints: 1240,
  itemsReused: 12,
  itemsDonated: 4,
  itemsRepaired: 3,
  wastePreventedKg: 8.4,
  moneySavedInr: 4850,
  joinedDate: 'August 2025',
  role: 'student',
  badges: [
    {
      id: 'b1',
      title: 'Green Starter',
      icon: '🌱',
      description: 'Listed your first 3 items on CampusCycle',
      isUnlocked: true,
      unlockedAt: 'Sep 2025',
      category: 'starter'
    },
    {
      id: 'b2',
      title: 'Repair Hero',
      icon: '🔧',
      description: 'Restored 3 campus items instead of throwing them away',
      isUnlocked: true,
      unlockedAt: 'Nov 2025',
      category: 'repair'
    },
    {
      id: 'b3',
      title: 'Circular Champion',
      icon: '♻️',
      description: 'Saved over 50kg of carbon emissions on campus',
      isUnlocked: true,
      unlockedAt: 'Jan 2026',
      category: 'champion'
    },
    {
      id: 'b4',
      title: 'Campus Leader',
      icon: '🏆',
      description: 'Reached top 5 in campus circular score rankings',
      isUnlocked: false,
      category: 'leader'
    }
  ]
};

export const PRIYA_USER: User = {
  id: 'usr-priya-02',
  name: 'Priya Sharma',
  email: 'priya.sharma@niet.edu.in',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
  campus: 'NIET Campus',
  department: 'Biotech Engg',
  hostel: 'Kalpana Chawla Block A',
  year: '3rd Year',
  rollNumber: '2201330540028',
  isVerified: true,
  circularScore: 92,
  ecoPoints: 2120,
  itemsReused: 19,
  itemsDonated: 6,
  itemsRepaired: 2,
  wastePreventedKg: 14.8,
  moneySavedInr: 9400,
  joinedDate: 'August 2025',
  role: 'student',
  badges: INITIAL_USER.badges
};

export const ADMIN_USER: User = {
  id: 'usr-admin-01',
  name: 'Dr. Ramesh Sharma',
  email: 'sustainability.chair@niet.edu.in',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
  campus: 'NIET Campus',
  department: 'Dean of Student Welfare & Eco Council',
  year: 'Faculty Lead',
  rollNumber: 'FAC-ECO-2024',
  isVerified: true,
  circularScore: 96,
  ecoPoints: 5400,
  itemsReused: 148,
  itemsDonated: 62,
  itemsRepaired: 34,
  wastePreventedKg: 412.5,
  moneySavedInr: 185000,
  joinedDate: 'July 2024',
  role: 'admin',
  badges: []
};

export const GUEST_USER: User = {
  id: 'usr-guest-00',
  name: 'Guest Visitor',
  email: 'guest@niet.edu.in',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
  campus: 'NIET Campus',
  department: 'Visitor / Prospective Student',
  year: 'Guest',
  isVerified: false,
  circularScore: 0,
  ecoPoints: 0,
  itemsReused: 0,
  itemsDonated: 0,
  itemsRepaired: 0,
  wastePreventedKg: 0,
  moneySavedInr: 0,
  joinedDate: 'Just now',
  role: 'student',
  badges: []
};

export const INITIAL_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'item-01',
    title: 'Organic Chemistry — 3rd Edition (Paula Bruice)',
    description: 'Crisp copy with no pencil markings. Complete with reaction mechanism charts and solved problem bank. Ideal for 2nd/3rd semester Biotech & Chemical students.',
    category: 'Books',
    condition: 'Like New',
    type: 'sell',
    price: 350,
    originalPrice: 990,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532012164546-f432f2e37273?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-priya-02',
    sellerName: 'Priya Sharma',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Biotech Engg (3rd Year)',
    sellerVerified: true,
    sellerRating: 4.9,
    circularScore: 94,
    co2SavedKg: 4.2,
    viewsCount: 64,
    likesCount: 14,
    isAvailable: true,
    createdAt: '2 hours ago',
    tags: ['Chemistry', 'Textbook', 'Engineering', 'ExamPrep'],
    pickupLocation: 'Central Library Stairs or Girls Hostel Gate'
  },
  {
    id: 'item-02',
    title: 'HP Pavilion Gaming Laptop 15.6" (Ryzen 5 / 16GB / GTX)',
    description: 'Well-maintained laptop used for CAD and Python coding. Clean keyboard, replaced battery 4 months ago with genuine HP part. Comes with original 150W charger and cooling pad.',
    category: 'Electronics',
    condition: 'Good',
    type: 'sell',
    price: 22000,
    originalPrice: 62000,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-rahul-03',
    sellerName: 'Rahul Verma',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'CSE (4th Year)',
    sellerVerified: true,
    sellerRating: 4.8,
    circularScore: 91,
    co2SavedKg: 185.0,
    viewsCount: 142,
    likesCount: 29,
    isAvailable: true,
    createdAt: '4 hours ago',
    tags: ['Laptop', 'Gaming', 'Coding', 'Electronics'],
    pickupLocation: 'Tech Block 3 Ground Floor Lab'
  },
  {
    id: 'item-03',
    title: 'Hero Sprint Pro Cycle with Dual Suspension & Basket',
    description: 'Single-hand used 21-speed campus bicycle. Recently tuned brakes and new tire tubes installed at Campus Cycle Care. Perfect for commuting between Ramanujan Hostel and Main Block.',
    category: 'Cycles',
    condition: 'Good',
    type: 'sell',
    price: 3200,
    originalPrice: 8500,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=700&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-karan-04',
    sellerName: 'Karan Mehra',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Mechanical Engg (Final Year)',
    sellerVerified: true,
    sellerRating: 5.0,
    circularScore: 98,
    co2SavedKg: 68.0,
    viewsCount: 98,
    likesCount: 22,
    isAvailable: true,
    createdAt: 'Yesterday',
    tags: ['Cycle', 'Bicycle', 'Hero', 'CampusCommute'],
    pickupLocation: 'Hostel 2 Cycle Stand'
  },
  {
    id: 'item-04',
    title: 'Ergonomic Wooden Study Table + Mesh Back Chair',
    description: 'Solid engineered wood desk with drawer and bookshelf tier. Paired with breathable mesh swivel chair. Selling as graduating senior vacating hostel.',
    category: 'Furniture',
    condition: 'Good',
    type: 'sell',
    price: 1500,
    originalPrice: 4200,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-sneha-05',
    sellerName: 'Sneha Roy',
    sellerAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Civil Engg (4th Year)',
    sellerVerified: true,
    sellerRating: 4.7,
    circularScore: 89,
    co2SavedKg: 24.5,
    viewsCount: 77,
    likesCount: 16,
    isAvailable: true,
    createdAt: '1 day ago',
    tags: ['Furniture', 'StudyTable', 'Chair', 'HostelLife'],
    pickupLocation: 'Sarojini Hostel Block C Room 304'
  },
  {
    id: 'item-05',
    title: 'Casio fx-991EX ClassWiz Non-Programmable Calculator',
    description: 'The golden standard scientific calculator for Engineering Math and Matrix computations. 552 functions with solar dual power backup. Fully working with slipcase.',
    category: 'Electronics',
    condition: 'Like New',
    type: 'exchange',
    price: 0,
    originalPrice: 1400,
    images: [
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-rohit-06',
    sellerName: 'Rohit Gupta',
    sellerAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Electrical Engg (2nd Year)',
    sellerVerified: true,
    sellerRating: 4.9,
    circularScore: 96,
    co2SavedKg: 2.1,
    viewsCount: 110,
    likesCount: 31,
    isAvailable: true,
    createdAt: '3 hours ago',
    exchangePreferences: 'Looking to exchange for 3rd Sem Signals & Systems book OR USB-C Arduino Board',
    tags: ['Calculator', 'Casio', 'ClassWiz', 'Exchange'],
    pickupLocation: 'Main Canteen / Food Court'
  },
  {
    id: 'item-06',
    title: 'Waterproof Laptop Backpack 15.6" (American Tourister)',
    description: 'Padded laptop compartment, dedicated bottle holders and umbrella slot. No tears or broken zippers. Clean and freshly washed.',
    category: 'Accessories',
    condition: 'Good',
    type: 'sell',
    price: 400,
    originalPrice: 1699,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-ananya-07',
    sellerName: 'Ananya Das',
    sellerAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'IT (3rd Year)',
    sellerVerified: true,
    sellerRating: 4.8,
    circularScore: 88,
    co2SavedKg: 3.8,
    viewsCount: 45,
    likesCount: 9,
    isAvailable: true,
    createdAt: '5 hours ago',
    tags: ['Backpack', 'Bag', 'Accessories', 'Laptop'],
    pickupLocation: 'Admin Block Reception'
  },
  {
    id: 'item-07',
    title: 'Engineering Drawing Mini Drafter + Set Squares + Sheet Holder',
    description: 'Complete 1st year engineering drawing toolkit. Scale arms tighten securely with zero zero-error. Save 1st year juniors ₹1500!',
    category: 'College Supplies',
    condition: 'Good',
    type: 'donate',
    price: 0,
    originalPrice: 1350,
    images: [
      'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-alex-01',
    sellerName: 'Alex Rivera (You)',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'CSE (3rd Year)',
    sellerVerified: true,
    sellerRating: 5.0,
    circularScore: 100,
    co2SavedKg: 5.4,
    viewsCount: 88,
    likesCount: 19,
    isAvailable: true,
    createdAt: '1 day ago',
    tags: ['Drafter', 'EngineeringGraphics', 'FreeDonation', 'Supplies'],
    pickupLocation: 'Aryabhatta Hostel Common Hall'
  },
  {
    id: 'item-08',
    title: 'White Cotton Unisex Lab Coat (Medium / 38) + Safety Goggles',
    description: 'Clean washed 100% thick cotton lab coat required for Chemistry & Physics labs. Free for any fresh batch junior.',
    category: 'Clothes',
    condition: 'Like New',
    type: 'donate',
    price: 0,
    originalPrice: 650,
    images: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-priya-02',
    sellerName: 'Priya Sharma',
    sellerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Biotech (3rd Year)',
    sellerVerified: true,
    sellerRating: 4.9,
    circularScore: 98,
    co2SavedKg: 6.1,
    viewsCount: 52,
    likesCount: 15,
    isAvailable: true,
    createdAt: '6 hours ago',
    tags: ['LabCoat', 'Free', 'Donation', 'ChemistryLab'],
    pickupLocation: 'Biotech Department Porch'
  },
  {
    id: 'item-09',
    title: 'Arduino Uno R3 Starter Kit with 30+ Sensors & Breadboard',
    description: 'Full hardware kit for IoT, robotics or capstone projects. Includes ultrasonic, DHT11, servo motors, LCD screen and jumper wires.',
    category: 'Electronics',
    condition: 'Like New',
    type: 'sell',
    price: 950,
    originalPrice: 2200,
    images: [
      'https://images.unsplash.com/photo-1553406830-ef2513450d76?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-tanya-08',
    sellerName: 'Tanya Saxena',
    sellerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'ECE (4th Year)',
    sellerVerified: true,
    sellerRating: 4.9,
    circularScore: 93,
    co2SavedKg: 8.5,
    viewsCount: 94,
    likesCount: 26,
    isAvailable: true,
    createdAt: 'Yesterday',
    tags: ['Arduino', 'IoT', 'Robotics', 'Sensors'],
    pickupLocation: 'Robotics Club Room, Innovation Hub'
  },
  {
    id: 'item-10',
    title: 'Redux Acoustic Guitar (Cutaway) with Padded Gig Bag & Tuner',
    description: 'Rich warm tone, newly strung with D\'Addario bronze strings. Straight neck and low action comfortable for beginner fingers.',
    category: 'Accessories',
    condition: 'Good',
    type: 'sell',
    price: 3500,
    originalPrice: 7800,
    images: [
      'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-varun-09',
    sellerName: 'Varun Kapoor',
    sellerAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Mechanical (3rd Year)',
    sellerVerified: true,
    sellerRating: 4.8,
    circularScore: 92,
    co2SavedKg: 14.0,
    viewsCount: 130,
    likesCount: 38,
    isAvailable: true,
    createdAt: '2 days ago',
    tags: ['Guitar', 'Music', 'Acoustic', 'HostelJam'],
    pickupLocation: 'Music Club Room / Amphitheater'
  },
  {
    id: 'item-11',
    title: 'Python Crash Course + Data Structures in C++ (2 Book Bundle)',
    description: 'Standard textbook combo for placement preparation and coding interviews. Clean notes inside with LeetCode bookmark cheat sheet.',
    category: 'Books',
    condition: 'Good',
    type: 'exchange',
    price: 0,
    originalPrice: 1600,
    images: [
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-kavya-10',
    sellerName: 'Kavya Nair',
    sellerAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'CSE (2nd Year)',
    sellerVerified: true,
    sellerRating: 4.9,
    circularScore: 95,
    co2SavedKg: 5.2,
    viewsCount: 81,
    likesCount: 18,
    isAvailable: true,
    createdAt: '1 day ago',
    exchangePreferences: 'Want to exchange for Operating Systems book (Galvin) OR Discrete Mathematics',
    tags: ['Python', 'DataStructures', 'Coding', 'Books'],
    pickupLocation: 'Computer Center Lobby'
  },
  {
    id: 'item-12',
    title: 'Rechargeable LED Desk Lamp with 3 Color Modes & Phone Stand',
    description: '4000mAh battery lamp for late-night hostel exams. Touch dimming and flexible gooseneck arm.',
    category: 'Furniture',
    condition: 'Like New',
    type: 'sell',
    price: 350,
    originalPrice: 899,
    images: [
      'https://images.unsplash.com/photo-1534972195531-a756b1126f24?w=700&auto=format&fit=crop&q=80'
    ],
    sellerId: 'usr-dev-11',
    sellerName: 'Devansh Joshi',
    sellerAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    sellerCampus: 'NIET Campus',
    sellerDepartment: 'Civil (3rd Year)',
    sellerVerified: true,
    sellerRating: 4.7,
    circularScore: 89,
    co2SavedKg: 3.2,
    viewsCount: 38,
    likesCount: 7,
    isAvailable: true,
    createdAt: '3 days ago',
    tags: ['Lamp', 'Desk', 'Study', 'Hostel'],
    pickupLocation: 'Kalam Hostel Mess Area'
  }
];

export const INITIAL_DONATION_DRIVES: DonationDrive[] = [
  {
    id: 'drive-01',
    title: 'Monsoon Drafter & Engineering Tool Kit Drive',
    organizer: 'NIET Eco Club & Student Welfare Council',
    description: 'Passing on mini-drafters, lab coats, and calculation toolkits to incoming 1st-year freshers. Help reduce freshman expenses while zeroing campus plastic waste.',
    targetItems: ['Mini Drafters', 'Lab Coats', 'T-Squares', 'Set Squares', 'Sheet Holders'],
    targetCount: 150,
    currentCount: 112,
    dropOffPoints: [
      {
        location: 'Central Library Ground Floor Helpdesk',
        timings: '9:00 AM - 6:00 PM',
        incharge: 'Prof. Anjali Saxena',
        contact: '+91 98112 34567'
      },
      {
        location: 'Aryabhatta Hostel Block B Guard Post',
        timings: '5:00 PM - 9:00 PM',
        incharge: 'Amit (Eco Ambassador)',
        contact: '+91 97188 12345'
      }
    ],
    deadline: 'Aug 30, 2026',
    bannerImage: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
    partnerNgo: 'Udaan Youth Foundation',
    verifiedByCampus: true
  },
  {
    id: 'drive-02',
    title: 'Refurbished Laptops & Gadgets for Rural Schools',
    organizer: 'NIET CSR Wing in association with TeachIndia',
    description: 'Old working laptops, tablets, and chargers collected, wiped securely, serviced by campus repair team, and gifted to nearby government schools.',
    targetItems: ['Old Laptops', 'Tablets', 'USB Mice', 'Chargers', 'Keyboards'],
    targetCount: 40,
    currentCount: 28,
    dropOffPoints: [
      {
        location: 'Innovation Hub / Incubation Center Room 102',
        timings: '10:00 AM - 5:00 PM',
        incharge: 'Dr. Ramesh Sharma',
        contact: '+91 98990 01122'
      }
    ],
    deadline: 'Sep 15, 2026',
    bannerImage: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80',
    partnerNgo: 'TeachIndia Digital Literacy Project',
    verifiedByCampus: true
  },
  {
    id: 'drive-03',
    title: 'Hostel Winter Blanket & Warm Wear Circulation',
    organizer: 'Campus Rotary Youth Club',
    description: 'Pass down extra jackets, blankets, hoodies, and woolens to support night security guards and community shelter homes before semester break.',
    targetItems: ['Jackets', 'Blankets', 'Hoodies', 'Sweaters'],
    targetCount: 200,
    currentCount: 145,
    dropOffPoints: [
      {
        location: 'Student Activity Center (SAC) Drop Box',
        timings: '24x7 Drop Box',
        incharge: 'Student Council President',
        contact: '+91 96541 23456'
      }
    ],
    deadline: 'Oct 10, 2026',
    bannerImage: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=800&auto=format&fit=crop&q=80',
    verifiedByCampus: true
  }
];

export const INITIAL_REPAIR_PARTNERS: RepairPartner[] = [
  {
    id: 'rep-01',
    name: 'Campus Cycle Care & Spares',
    service: 'Bicycle Overhaul, Brakes, Gears & Tubeless Conversions',
    specialty: 'Hero, Hercules, Firefox & Gear tuning',
    rating: 4.9,
    reviewsCount: 184,
    distance: '0.2 km (Gate 1 Opposite)',
    location: 'Shop 4, Campus Commercial Complex',
    phone: '+91 98102 99112',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1528629297340-d1d461b55f91?w=200&auto=format&fit=crop&q=80',
    turnaroundTime: 'Same day (2-4 hours)',
    estimatedPriceRange: '₹50 - ₹400',
    discountForStudents: '20% OFF on labor with Student ID'
  },
  {
    id: 'rep-02',
    name: 'TechDoc Laptop & Chip-level Lab',
    service: 'Screen Replacement, Thermal Paste, SSD Upgrades & Hinge Fixes',
    specialty: 'Dell, HP, Lenovo, MacBook & Asus',
    rating: 4.8,
    reviewsCount: 240,
    distance: '0.4 km (Near Tech Block 2)',
    location: 'Incubation Bay B-3, Tech Tower',
    phone: '+91 99118 77654',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=200&auto=format&fit=crop&q=80',
    turnaroundTime: '24-48 hours',
    estimatedPriceRange: '₹200 - ₹2500',
    discountForStudents: 'Free Diagnostic & 15% OFF repairs'
  },
  {
    id: 'rep-03',
    name: 'QuickFix Phone & Screen Clinic',
    service: 'OLED/LCD Display, Charging Ports & Battery Replacement',
    specialty: 'iPhone, OnePlus, Samsung & Redmi',
    rating: 4.7,
    reviewsCount: 160,
    distance: '0.3 km (Near Cafeteria)',
    location: 'Kiosk 2, Student Mart Hub',
    phone: '+91 97115 44332',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&auto=format&fit=crop&q=80',
    turnaroundTime: '1-2 hours for screens',
    estimatedPriceRange: '₹150 - ₹1800',
    discountForStudents: 'Complimentary Tempered Glass on repairs'
  },
  {
    id: 'rep-04',
    name: 'Upcycle Stitch & Denim Tailors',
    service: 'Bag Zippers, Denim Jackets Customization & Bag Patching',
    specialty: 'Sustainable Upcycling & Custom Patches',
    rating: 4.9,
    reviewsCount: 95,
    distance: '0.1 km (Hostel Lane 1)',
    location: 'Hostel Plaza Stall #7',
    phone: '+91 98711 00987',
    isVerified: true,
    avatar: 'https://images.unsplash.com/photo-1520004434532-668416a08753?w=200&auto=format&fit=crop&q=80',
    turnaroundTime: '24 hours',
    estimatedPriceRange: '₹40 - ₹250',
    discountForStudents: 'Buy 1 Alteration Get 1 Free'
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    id: 'usr-rahul-03',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    campus: 'NIET Campus',
    department: 'CSE (4th Year)',
    hostel: 'Ramanujan Hostel',
    points: 2450,
    reusedCount: 24,
    circularScore: 95,
    badge: '🏆 Campus Sustainability Leader'
  },
  {
    rank: 2,
    id: 'usr-priya-02',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    campus: 'NIET Campus',
    department: 'Biotech (3rd Year)',
    hostel: 'Kalpana Chawla Block A',
    points: 2120,
    reusedCount: 19,
    circularScore: 92,
    badge: '♻️ Circular Champion'
  },
  {
    rank: 3,
    id: 'usr-alex-01',
    name: 'Alex Rivera (You)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    campus: 'NIET Campus',
    department: 'CSE (3rd Year)',
    hostel: 'Aryabhatta Hostel',
    points: 1240,
    reusedCount: 12,
    circularScore: 82,
    badge: '🔧 Repair Hero'
  },
  {
    rank: 4,
    id: 'usr-karan-04',
    name: 'Karan Mehra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    campus: 'NIET Campus',
    department: 'Mechanical (Final Year)',
    hostel: 'Bhabha Hostel',
    points: 1180,
    reusedCount: 11,
    circularScore: 80,
    badge: '🌱 Green Starter'
  },
  {
    rank: 5,
    id: 'usr-sneha-05',
    name: 'Sneha Roy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    campus: 'NIET Campus',
    department: 'Civil (4th Year)',
    hostel: 'Sarojini Hostel',
    points: 950,
    reusedCount: 8,
    circularScore: 78,
    badge: '🌱 Green Starter'
  },
  {
    rank: 6,
    id: 'usr-rohit-06',
    name: 'Rohit Gupta',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
    campus: 'NIET Campus',
    department: 'Electrical (2nd Year)',
    hostel: 'Aryabhatta Hostel',
    points: 820,
    reusedCount: 7,
    circularScore: 75,
    badge: '🌱 Green Starter'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Exchange Request Accepted! 🔄',
    message: 'Rohit Gupta accepted your exchange proposal for the Casio Scientific Calculator.',
    type: 'exchange',
    timestamp: '10 mins ago',
    isRead: false,
    linkTab: 'exchange'
  },
  {
    id: 'notif-2',
    title: '+50 Eco Points Earned! 🌱',
    message: 'Your Mini Drafter donation listing was verified by Campus Eco Ambassadors.',
    type: 'eco_points',
    timestamp: '1 hour ago',
    isRead: false,
    linkTab: 'eco'
  },
  {
    id: 'notif-3',
    title: 'Listing Trending 🔥',
    message: 'Your Engineering Drawing Mini Drafter has been viewed 88 times by 1st year students.',
    type: 'listing',
    timestamp: '3 hours ago',
    isRead: true,
    linkTab: 'marketplace'
  },
  {
    id: 'notif-4',
    title: 'Repair Completed 🔧',
    message: 'Campus Cycle Care has serviced your cycle brake assembly. Ready for pickup at Gate 1.',
    type: 'repair',
    timestamp: 'Yesterday',
    isRead: true,
    linkTab: 'repair'
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-8041',
    itemId: 'item-01',
    itemTitle: 'Organic Chemistry — 3rd Edition',
    itemImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    type: 'sell',
    price: 350,
    buyerId: 'usr-alex-01',
    buyerName: 'Alex Rivera',
    sellerId: 'usr-priya-02',
    sellerName: 'Priya Sharma',
    status: 'Pickup Scheduled',
    pickupLocation: 'Central Library Ground Floor Staircase',
    pickupTime: 'Today at 4:30 PM',
    qrCodeValue: 'CC-NIET-8041-ALEX-PRIYA',
    handoverCode: '6824',
    ecoPointsEarned: 80,
    wastePreventedKg: 4.2,
    createdAt: 'Today, 11:20 AM'
  },
  {
    id: 'tx-7712',
    itemId: 'item-05',
    itemTitle: 'Casio fx-991EX ClassWiz Calculator',
    itemImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&auto=format&fit=crop&q=80',
    type: 'exchange',
    price: 0,
    buyerId: 'usr-alex-01',
    buyerName: 'Alex Rivera',
    sellerId: 'usr-rohit-06',
    sellerName: 'Rohit Gupta',
    status: 'Confirmed',
    pickupLocation: 'Main Food Court Table #12',
    pickupTime: 'Tomorrow at 1:15 PM',
    qrCodeValue: 'CC-NIET-7712-EXCHANGE',
    handoverCode: '4190',
    ecoPointsEarned: 100,
    wastePreventedKg: 2.1,
    createdAt: 'Yesterday'
  }
];

export const INITIAL_EXCHANGES: ExchangeProposal[] = [
  {
    id: 'ex-01',
    targetItemId: 'item-05',
    targetItemTitle: 'Casio fx-991EX ClassWiz Calculator',
    targetItemImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=500&auto=format&fit=crop&q=80',
    targetItemOwnerId: 'usr-rohit-06',
    offeredItemId: 'item-07',
    offeredItemTitle: 'Engineering Drawing Mini Drafter Toolkit',
    offeredItemImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=80',
    offeredItemPrice: 0,
    proposerId: 'usr-alex-01',
    proposerName: 'Alex Rivera',
    proposerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    status: 'Accepted',
    message: 'Hey Rohit, I have this Drafter kit in perfect condition that I used in 1st year. Happy to swap for your Casio calculator!',
    createdAt: 'Yesterday'
  },
  {
    id: 'ex-02',
    targetItemId: 'item-11',
    targetItemTitle: 'Python Crash Course + Data Structures Bundle',
    targetItemImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500&auto=format&fit=crop&q=80',
    targetItemOwnerId: 'usr-kavya-10',
    offeredItemId: 'item-01',
    offeredItemTitle: 'Organic Chemistry Book (Paula Bruice)',
    offeredItemImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500&auto=format&fit=crop&q=80',
    offeredItemPrice: 350,
    proposerId: 'usr-priya-02',
    proposerName: 'Priya Sharma',
    proposerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    status: 'Pending',
    message: 'Would you be interested in swapping for my chemistry textbook plus ₹100 cash adjustment?',
    createdAt: '3 hours ago',
    cashAdjustment: 100
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'chat-01',
    participant: {
      id: 'usr-priya-02',
      name: 'Priya Sharma',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      campus: 'NIET Campus',
      isOnline: true
    },
    itemId: 'item-01',
    itemTitle: 'Organic Chemistry — 3rd Edition',
    itemImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    itemPrice: 350,
    lastMessage: 'Great! See you at Central Library stairs at 4:30 PM with the QR code.',
    lastMessageTime: '11:24 AM',
    unreadCount: 0,
    messages: [
      {
        id: 'm-1',
        senderId: 'usr-alex-01',
        text: 'Hi Priya! Is this Organic Chemistry textbook still available?',
        timestamp: '11:15 AM'
      },
      {
        id: 'm-2',
        senderId: 'usr-priya-02',
        text: 'Hey Alex, yes it is! The pages are super clean with all reaction mechanism foldouts intact.',
        timestamp: '11:18 AM'
      },
      {
        id: 'm-3',
        senderId: 'usr-alex-01',
        text: 'Awesome, can we meet near Central Library ground floor stairs today around 4:30 PM?',
        timestamp: '11:21 AM'
      },
      {
        id: 'm-4',
        senderId: 'usr-priya-02',
        text: 'Great! See you at Central Library stairs at 4:30 PM with the QR code.',
        timestamp: '11:24 AM'
      }
    ]
  },
  {
    id: 'chat-02',
    participant: {
      id: 'usr-rohit-06',
      name: 'Rohit Gupta',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80',
      campus: 'NIET Campus',
      isOnline: true
    },
    itemId: 'item-05',
    itemTitle: 'Casio fx-991EX ClassWiz Calculator',
    itemImage: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?w=400&auto=format&fit=crop&q=80',
    itemPrice: 0,
    lastMessage: 'Accepted the exchange! Let\'s do the swap tomorrow during lunch break.',
    lastMessageTime: 'Yesterday',
    unreadCount: 1,
    messages: [
      {
        id: 'm-10',
        senderId: 'usr-alex-01',
        text: 'Sent an exchange proposal with my Mini Drafter kit for your Casio calculator.',
        timestamp: 'Yesterday 3:00 PM'
      },
      {
        id: 'm-11',
        senderId: 'usr-rohit-06',
        text: 'Accepted the exchange! Let\'s do the swap tomorrow during lunch break.',
        timestamp: 'Yesterday 3:45 PM'
      }
    ]
  }
];

export const PRESET_AI_ANALYSES = {
  laptop: {
    detectedItem: 'Dell Inspiron 15 / HP Pavilion Laptop',
    category: 'Electronics' as const,
    condition: 'Good' as const,
    estimatedResaleValue: 14500,
    originalPriceEstimate: 45000,
    confidenceScore: 94,
    recommendedAction: 'SELL' as const,
    alternativeAction: 'DONATE / REPAIR',
    reasoning: [
      'High student demand on campus for coding and project work',
      'Solid resale value retention (~32% of original price)',
      'High carbon offset: Reusing prevents ~180kg of e-waste CO2'
    ],
    circularScore: 91,
    co2SavedKg: 182.5,
    reuseTips: [
      'Wipe personal student data before handover',
      'Include power adapter and charger cable for +₹800 value',
      'Offer a 3-day campus testing warranty for quick buyer trust'
    ],
    suggestedTags: ['DellLaptop', 'Electronics', 'StudentDeal', 'CodingReady']
  },
  cycle: {
    detectedItem: 'Hero Sprint / Firefox Mountain Bicycle with Gear Shifters',
    category: 'Cycles' as const,
    condition: 'Good' as const,
    estimatedResaleValue: 2800,
    originalPriceEstimate: 7500,
    confidenceScore: 96,
    recommendedAction: 'SELL' as const,
    alternativeAction: 'EXCHANGE / REPAIR',
    reasoning: [
      'Top searched item for hostel-to-class commutes',
      'High durability with easily replaceable tires and chain',
      'Saves approx 65kg CO2 compared to motorized transport'
    ],
    circularScore: 98,
    co2SavedKg: 65.0,
    reuseTips: [
      'Clean frame and lubricate chain for maximum appeal',
      'Mention free lock or bottle cage if including',
      'Recommend pickup at hostel cycle stand'
    ],
    suggestedTags: ['CampusCycle', 'HeroBicycle', 'EcoCommute', 'HostelLife']
  },
  books: {
    detectedItem: 'Engineering Core Textbook & Problem Solver Set',
    category: 'Books' as const,
    condition: 'Like New' as const,
    estimatedResaleValue: 400,
    originalPriceEstimate: 1100,
    confidenceScore: 98,
    recommendedAction: 'EXCHANGE' as const,
    alternativeAction: 'DONATE / SELL',
    reasoning: [
      'Syllabus matching next semester coursework',
      'Direct peer-to-peer semester book swap saves 100% textbook cost',
      'Conserves wood pulp and fresh printing energy'
    ],
    circularScore: 96,
    co2SavedKg: 4.8,
    reuseTips: [
      'List chapters and edition year prominently',
      'Propose exchange for your upcoming semester subject',
      'Offer to pass handwritten notes as bonus'
    ],
    suggestedTags: ['Textbook', 'SyllabusBook', 'ZeroCostExchange', 'SemesterPrep']
  },
  calculator: {
    detectedItem: 'Casio Scientific Calculator fx-991 series',
    category: 'Electronics' as const,
    condition: 'Good' as const,
    estimatedResaleValue: 600,
    originalPriceEstimate: 1450,
    confidenceScore: 97,
    recommendedAction: 'EXCHANGE' as const,
    alternativeAction: 'SELL',
    reasoning: [
      'Mandatory for all 1st and 2nd year engineering & science students',
      'Zero obsolescence factor — works for 5+ years without degradation',
      'Eliminates unnecessary e-waste production'
    ],
    circularScore: 99,
    co2SavedKg: 2.3,
    reuseTips: [
      'Test solar cell and battery before handing over',
      'Keep the sliding protective case on',
      'Great candidate for instant 1:1 book exchange'
    ],
    suggestedTags: ['ScientificCalculator', 'CasioClasswiz', 'ExamApproved', 'CampusEssential']
  },
  drafter: {
    detectedItem: 'Engineering Drawing Mini-Drafter with Set Square Kit',
    category: 'College Supplies' as const,
    condition: 'Good' as const,
    estimatedResaleValue: 350,
    originalPriceEstimate: 1200,
    confidenceScore: 95,
    recommendedAction: 'DONATE' as const,
    alternativeAction: 'SELL / EXCHANGE',
    reasoning: [
      'Used only for 1 semester in 1st year Graphics course',
      'Huge social impact if donated to incoming underprivileged freshmen',
      'Earns maximum +150 Eco Points & Campus Hero badge'
    ],
    circularScore: 100,
    co2SavedKg: 5.4,
    reuseTips: [
      'Ensure clamping screw tightens smoothly',
      'Drop off at Central Library Donation Drive for instant recognition',
      'Include set squares and scale'
    ],
    suggestedTags: ['MiniDrafter', 'EngineeringGraphics', 'FreshmanPassOn', 'CampusDonation']
  },
  clothes: {
    detectedItem: 'Campus Hoodie / University Lab Coat',
    category: 'Clothes' as const,
    condition: 'Good' as const,
    estimatedResaleValue: 250,
    originalPriceEstimate: 800,
    confidenceScore: 91,
    recommendedAction: 'UPCYCLE' as const,
    alternativeAction: 'DONATE / SELL',
    reasoning: [
      'High cotton quality suitable for customized patches or thrift swap',
      'Clothing upcycling partner on campus can resize or personalize it',
      'Saves ~2,700 liters of water vs manufacturing a new garment'
    ],
    circularScore: 94,
    co2SavedKg: 7.8,
    reuseTips: [
      'Freshly wash and iron before photography',
      'Partner with Campus Upcycle Stitch for custom alterations',
      'State size (S/M/L/XL) clearly in description'
    ],
    suggestedTags: ['CampusThrift', 'UpcycleFashion', 'EcoApparel', 'ZeroWaste']
  }
};

export const MOCK_ADMIN_METRICS = {
  totalStudentsRegistered: 4280,
  verifiedStudentsPercent: 94,
  totalItemsReused: 3420,
  totalLandfillPreventedKg: 1420.8,
  totalMoneySavedRs: 425000,
  activeDonationDrivesCount: 3,
  repairJobsCompleted: 412
};

export const MOCK_LEADERBOARD_STUDENTS = [
  {
    rank: 1,
    id: 'usr-rahul-03',
    name: 'Rahul Verma',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    department: 'CSE 4th Year',
    points: 2450,
    itemsReused: 24,
    co2SavedKg: 94.2
  },
  {
    rank: 2,
    id: 'usr-priya-02',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    department: 'Biotech 3rd Year',
    points: 2120,
    itemsReused: 19,
    co2SavedKg: 78.5
  },
  {
    rank: 3,
    id: 'usr-alex-01',
    name: 'Alex Rivera',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    department: 'CSE 3rd Year',
    points: 1240,
    itemsReused: 12,
    co2SavedKg: 52.8
  },
  {
    rank: 4,
    id: 'usr-karan-04',
    name: 'Karan Mehra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    department: 'Mechanical 4th Year',
    points: 980,
    itemsReused: 9,
    co2SavedKg: 38.0
  },
  {
    rank: 5,
    id: 'usr-sneha-05',
    name: 'Sneha Patel',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    department: 'ECE 2nd Year',
    points: 840,
    itemsReused: 8,
    co2SavedKg: 31.4
  }
];

