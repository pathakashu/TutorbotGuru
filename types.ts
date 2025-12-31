
export type Subject = 'Maths' | 'Science' | 'EVS' | 'Social Science' | 'English' | 'Coding';
export type Board = 'NCERT/CBSE' | 'Maharashtra State Board' | 'Bihar Board' | 'UP Board' | 'Tamil Nadu Board';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  subject: Subject;
  level: string; // e.g., "Class 6"
  duration: string;
  content: string;
  board?: Board | 'All';
  videoUrl?: string;
  quiz?: QuizQuestion[];
}

export interface UserProfile {
  name: string;
  grade: string;
  learningGoal: string;
  preferredLanguage: string;
  board: Board;
  state: string;
  completedLessons: string[];
  points: number;
  badges: string[];
  streak: number;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum AppTab {
  DASHBOARD = 'dashboard',
  LIBRARY = 'library',
  CHAT = 'chat',
  OFFLINE = 'offline',
  ONBOARDING = 'onboarding'
}
