
import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  // --- NCERT / CBSE ---
  {
    id: 'n1',
    title: 'Linear Equations in One Variable',
    description: 'Master the basics of solving equations where the highest power of the variable is 1.',
    subject: 'Maths',
    level: 'Class 8',
    duration: '20 min',
    board: 'NCERT/CBSE',
    content: 'A linear equation in one variable is an equation which can be written in the form ax + b = 0, where a and b are real numbers. For example, 2x + 5 = 15. To solve, we subtract 5 from both sides (2x = 10) and then divide by 2 (x = 5).',
    videoUrl: 'https://picsum.photos/seed/mathn1/800/450',
    quiz: [
      {
        question: "Solve for x: 3x - 9 = 0",
        options: ["x=2", "x=3", "x=1", "x=0"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: 'n2',
    title: 'Periodic Classification of Elements',
    description: 'Learn how Mendeleev and Modern Periodic Table organize the 118 known elements.',
    subject: 'Science',
    level: 'Class 10',
    duration: '25 min',
    board: 'NCERT/CBSE',
    content: 'The Modern Periodic Table is based on the Atomic Number of elements. Elements are arranged in 18 vertical columns called Groups and 7 horizontal rows called Periods. Elements in the same group have the same number of valence electrons.',
    videoUrl: 'https://picsum.photos/seed/scin2/800/450'
  },

  // --- MAHARASHTRA BOARD ---
  {
    id: 'm1',
    title: 'Management of Shivaji Maharaj',
    description: 'The administrative and military brilliance of the founder of the Maratha Empire.',
    subject: 'Social Science',
    level: 'Class 7',
    duration: '18 min',
    board: 'Maharashtra State Board',
    content: 'Chhatrapati Shivaji Maharaj was known for his "Ashta Pradhan" (Council of Eight Ministers). He pioneered "Ganimi Kava" or Guerrilla Warfare. His water management in forts like Raigad and Pratapgad is still studied today for its efficiency.',
    videoUrl: 'https://picsum.photos/seed/mah1/800/450'
  },
  {
    id: 'm2',
    title: 'The Sahyadri Range: Our Pride',
    description: 'Physical geography of the Western Ghats in Maharashtra.',
    subject: 'Social Science',
    level: 'Class 9',
    duration: '15 min',
    board: 'Maharashtra State Board',
    content: 'The Western Ghats, known as Sahyadri in Maharashtra, run parallel to the coast. Kalsubai is the highest peak. These mountains are responsible for the heavy rainfall in the Konkan region and act as a water source for major rivers like Godavari and Krishna.',
    videoUrl: 'https://picsum.photos/seed/mah2/800/450'
  },

  // --- BIHAR BOARD ---
  {
    id: 'b1',
    title: 'Magadha: The Seat of Empires',
    description: 'Explore the rise of the Mauryan and Gupta empires in Ancient Bihar.',
    subject: 'Social Science',
    level: 'Class 6',
    duration: '22 min',
    board: 'Bihar Board',
    content: 'Bihar was once the center of power and learning in the world. Pataliputra (modern Patna) was the capital of the Mauryan Empire under Ashoka the Great. Nalanda University was the first residential university in the world, attracting students from across Asia.',
    videoUrl: 'https://picsum.photos/seed/bih1/800/450'
  },
  {
    id: 'b2',
    title: 'Agriculture and Water in the Ganga Plains',
    description: 'Understanding the Kharif and Rabi cycles in the fertile plains of Bihar.',
    subject: 'Science',
    level: 'Class 8',
    duration: '15 min',
    board: 'Bihar Board',
    content: 'Bihar has rich alluvial soil. Farmers grow Paddy (Rice) during the monsoon (Kharif) and Wheat/Maize during winter (Rabi). The Gandak and Kosi rivers provide irrigation, though management of floods remains a key challenge for local farmers.',
    videoUrl: 'https://picsum.photos/seed/bih2/800/450'
  },

  // --- UP BOARD ---
  {
    id: 'u1',
    title: 'The Great Plains of North India',
    description: 'Formation and significance of the Indo-Gangetic plains.',
    subject: 'EVS',
    level: 'Class 5',
    duration: '12 min',
    board: 'UP Board',
    content: 'Uttar Pradesh lies entirely in the Ganga-Yamuna Doab. This region is formed by the silt brought down by Himalayan rivers. It is one of the most densely populated and agriculturally productive regions in the world.',
    videoUrl: 'https://picsum.photos/seed/up1/800/450'
  },
  {
    id: 'u2',
    title: 'Industrial Belts: Noida to Kanpur',
    description: 'Economic geography and the role of leather and tech industries in UP.',
    subject: 'Social Science',
    level: 'Class 10',
    duration: '20 min',
    board: 'UP Board',
    content: 'Kanpur is traditionally known as the "Manchester of the East" for its textile and leather industries. In contrast, Noida and Greater Noida have emerged as major electronics and IT hubs, contributing significantly to the state\'s GDP.',
    videoUrl: 'https://picsum.photos/seed/up2/800/450'
  },

  // --- TAMIL NADU BOARD ---
  {
    id: 't1',
    title: 'The Chola Navy: Masters of the Seas',
    description: 'How the Cholas established maritime trade across South East Asia.',
    subject: 'Social Science',
    level: 'Class 9',
    duration: '25 min',
    board: 'Tamil Nadu Board',
    content: 'The Chola Empire under Rajaraja I and Rajendra I possessed the most powerful navy of its time. They used teak wood for ships and advanced mapping to navigate the Bay of Bengal, which was often called the "Chola Lake". They traded spices and textiles with China and Srivijaya.',
    videoUrl: 'https://picsum.photos/seed/tn1/800/450'
  },
  {
    id: 't2',
    title: 'Ethics in Thirukkural',
    description: 'A study of the world-famous Tamil moral code.',
    subject: 'English',
    level: 'Class 8',
    duration: '18 min',
    board: 'Tamil Nadu Board',
    content: 'Thirukkural, written by Thiruvalluvar, consists of 1330 couplets (kurals). It is divided into three sections: Aram (Virtue), Porul (Wealth), and Inbam (Love). It remains a universal guide for ethical living regardless of religion or time.',
    videoUrl: 'https://picsum.photos/seed/tn2/800/450'
  },

  // --- GENERIC / CODING ---
  {
    id: 'g1',
    title: 'Vedic Maths: Multiplication Hacks',
    description: 'Solving large calculations in seconds using ancient Indian sutras.',
    subject: 'Maths',
    level: 'Class 6',
    duration: '12 min',
    board: 'All',
    content: 'Using the "Ekadhikena Purvena" sutra, we can square numbers ending in 5 instantly. For 35^2: (3 x 4) = 12, then append 25. Answer is 1225! These tricks reduce exam pressure and build confidence.',
    videoUrl: 'https://picsum.photos/seed/gen1/800/450'
  },
  {
    id: 'g2',
    title: 'Intro to Scratch: Making a Game',
    description: 'Build your first simple game with block coding.',
    subject: 'Coding',
    level: 'Class 7',
    duration: '30 min',
    board: 'All',
    content: 'Scratch uses blocks like "When Flag Clicked" and "Move 10 steps". By combining these, you can create animations or games. Coding is about logic - once you understand the "if-then" rule, you can build anything!',
    videoUrl: 'https://picsum.photos/seed/gen2/800/450'
  }
];

export const BADGES = [
  { id: 'aryabhata', name: 'Aryabhata Award', icon: '📐', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'chanakya', name: 'Chanakya Brain', icon: '🧠', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { id: 'bose', name: 'Science Pioneer', icon: '🧪', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'gandhi', name: 'Peace Learner', icon: '🕊️', color: 'bg-blue-100 text-blue-700 border-blue-200' },
];

export const LANGUAGES = [
  { code: 'hi', name: 'हिन्दी (Hindi)' },
  { code: 'mr', name: 'मराठी (Marathi)' },
  { code: 'bn', name: 'বাংলা (Bengali)' },
  { code: 'ta', name: 'தமிழ் (Tamil)' },
  { code: 'te', name: 'తెలుగు (Telugu)' },
  { code: 'en', name: 'English' },
];

export const INDIAN_STATES = [
  'Maharashtra', 'Uttar Pradesh', 'Bihar', 'West Bengal', 'Rajasthan', 'Madhya Pradesh', 'Tamil Nadu', 'Karnataka', 'Gujarat'
];

export const BOARDS = [
  'NCERT/CBSE', 'Maharashtra State Board', 'Bihar Board', 'UP Board', 'Tamil Nadu Board'
];
