export interface Student {
  id: string;
  name: string;
  grade: string;
  attendance: number; // percentage
  feesStatus: 'Paid' | 'Pending' | 'Overdue';
  gpa: number;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  experience: string;
  availability: 'Available' | 'In Class' | 'On Leave';
  rating: number;
}

export interface Course {
  code: string;
  title: string;
  department: string;
  credits: number;
  instructorId: string;
}

export interface FinancialRecord {
  month: string;
  revenue: number;
  expenses: number;
}

export interface SchoolStats {
  totalStudents: number;
  totalTeachers: number;
  monthlyRevenue: number;
  avgAttendance: number;
}

export enum NavigationTab {
  DASHBOARD = 'DASHBOARD',
  STUDENTS = 'STUDENTS',
  TEACHERS = 'TEACHERS',
  COURSES = 'COURSES',
  FINANCE = 'FINANCE',
  AI_ADVISOR = 'AI_ADVISOR',
}

export interface AIAnalysisResult {
  analysis: string;
  recommendations: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}