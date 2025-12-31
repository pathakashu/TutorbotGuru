
import { Lesson } from './types';

export const MOCK_LESSONS: Lesson[] = [
  {
    id: '1',
    title: 'Vedic Maths: Fast Multiplication',
    description: 'Ancient Indian techniques for solving maths problems in seconds.',
    subject: 'Maths',
    level: 'Class 6',
    duration: '12 min',
    content: 'Vedic Mathematics is a collection of Techniques/Sutras to solve mathematical arithmetic in easy and faster way. One of the most famous sutras is "Ekadhikena Purvena" which helps in squaring numbers ending in 5. For example, to square 25: (2 x 3) and (5 x 5) = 625!',
    videoUrl: 'https://picsum.photos/seed/math1/800/450',
    quiz: [
      {
        question: "What does Vedic Maths help with?",
        options: ["Drawing", "Faster Calculation", "History", "Swimming"],
        correctAnswer: 1
      }
    ]
  },
  {
    id: '2',
    title: 'Our Environment: Local Ecosystems',
    description: 'Understanding the biotic and abiotic components in our villages.',
    subject: 'EVS',
    level: 'Class 4',
    duration: '15 min',
    content: 'Our environment consists of biotic (living) and abiotic (non-living) components. Plants, animals, and humans are biotic, while soil, air, and water are abiotic. In our village, the pond is a small ecosystem where fish, frogs, and plants live together.',
    videoUrl: 'https://picsum.photos/seed/evs1/800/450'
  },
  {
    id: '3',
    title: 'Dandi March & Salt Satyagraha',
    description: 'The story of Mahatma Gandhi and the path to independence.',
    subject: 'Social Science',
    level: 'Class 8',
    duration: '25 min',
    content: 'The Dandi March, also known as the Salt March, was an act of nonviolent civil disobedience in colonial India led by Mahatma Gandhi. It was a 24-day march to protest the British salt monopoly.',
    videoUrl: 'https://picsum.photos/seed/history1/800/450'
  },
  {
    id: '4',
    title: 'Maharashtra: Physical Geography',
    description: 'Study of the Sahyadri mountains and coastal Konkan region.',
    subject: 'Social Science',
    level: 'Class 9',
    duration: '20 min',
    content: 'The geography of Maharashtra is defined by the Sahyadri Range (Western Ghats). The coastal strip to the west is Konkan, while the vast plateau to the east is the Desh region.',
    videoUrl: 'https://picsum.photos/seed/geo1/800/450'
  },
  {
    id: '5',
    title: 'Tamil Nadu: Sangam Literature',
    description: 'Introduction to the ancient Tamil literary heritage.',
    subject: 'English',
    level: 'Class 10',
    duration: '18 min',
    content: 'Sangam literature is the earliest known Tamil literature, produced in the three Sangams (academies) of Madurai. It deals with themes of love (aham) and war (puram).',
    videoUrl: 'https://picsum.photos/seed/lit1/800/450'
  },
  {
    id: '6',
    title: 'Bihar Board: Agriculture in Ganga Plains',
    description: 'Understanding crops like paddy and maize grown in Bihar.',
    subject: 'Science',
    level: 'Class 7',
    duration: '15 min',
    content: 'Bihar lies in the fertile Ganga plains. Agriculture is the backbone of its economy. Major crops include Rice (Paddy), Maize, and Wheat. The floodplains provide rich alluvial soil.',
    videoUrl: 'https://picsum.photos/seed/agri1/800/450'
  },
  {
    id: '7',
    title: 'UP Board: River Systems of Uttar Pradesh',
    description: 'The journey of Ganga, Yamuna and Gomti rivers.',
    subject: 'EVS',
    level: 'Class 5',
    duration: '12 min',
    content: 'Uttar Pradesh is blessed with major rivers. The Ganga and Yamuna meet at Prayagraj (Sangam). These rivers are crucial for irrigation and transport in the state.',
    videoUrl: 'https://picsum.photos/seed/river1/800/450'
  },
  {
    id: '8',
    title: 'NCERT: Algebra Fundamentals',
    description: 'Introduction to variables and constants for beginners.',
    subject: 'Maths',
    level: 'Class 6',
    duration: '20 min',
    content: 'Algebra is a branch of mathematics where letters represent numbers. If x = 2, then x + 3 = 5. It helps us find unknown values in real-life problems.',
    videoUrl: 'https://picsum.photos/seed/algebra1/800/450'
  },
  {
    id: '9',
    title: 'Coding: Introduction to Scratch',
    description: 'Learn logic by building simple stories and games.',
    subject: 'Coding',
    level: 'Class 7',
    duration: '30 min',
    content: 'Scratch is a block-based visual programming language. You drag and drop blocks like "Move 10 steps" to control characters. It teaches you logical thinking!',
    videoUrl: 'https://picsum.photos/seed/code1/800/450'
  },
  {
    id: '10',
    title: 'Science: Forces and Motion',
    description: 'Push, pull, and how things move around us.',
    subject: 'Science',
    level: 'Class 8',
    duration: '15 min',
    content: 'A force is a push or a pull. When you kick a football, you apply force. Friction is a force that slows down moving objects when they rub against each other.',
    videoUrl: 'https://picsum.photos/seed/physics1/800/450'
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
