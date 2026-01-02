import { Student, Teacher, Course, FinancialRecord, SchoolStats } from './types';

export const MOCK_STATS: SchoolStats = {
  totalStudents: 1240,
  totalTeachers: 85,
  monthlyRevenue: 450000,
  avgAttendance: 94.2,
};

export const MOCK_STUDENTS: Student[] = [
  { id: 'S001', name: 'Alice Johnson', grade: '10-A', attendance: 98, feesStatus: 'Paid', gpa: 3.9 },
  { id: 'S002', name: 'Bob Smith', grade: '10-A', attendance: 85, feesStatus: 'Pending', gpa: 3.2 },
  { id: 'S003', name: 'Charlie Brown', grade: '11-B', attendance: 92, feesStatus: 'Paid', gpa: 3.5 },
  { id: 'S004', name: 'Daisy Miller', grade: '11-B', attendance: 76, feesStatus: 'Overdue', gpa: 2.8 },
  { id: 'S005', name: 'Ethan Hunt', grade: '12-A', attendance: 95, feesStatus: 'Paid', gpa: 4.0 },
  { id: 'S006', name: 'Fiona Gallagher', grade: '12-A', attendance: 88, feesStatus: 'Pending', gpa: 3.1 },
  { id: 'S007', name: 'George Martin', grade: '09-C', attendance: 91, feesStatus: 'Paid', gpa: 3.4 },
  { id: 'S008', name: 'Hannah Abbot', grade: '09-C', attendance: 99, feesStatus: 'Paid', gpa: 3.95 },
  { id: 'S009', name: 'Ian Wright', grade: '10-A', attendance: 82, feesStatus: 'Overdue', gpa: 2.9 },
  { id: 'S010', name: 'Julia Stiles', grade: '11-B', attendance: 94, feesStatus: 'Paid', gpa: 3.7 },
];

export const MOCK_TEACHERS: Teacher[] = [
  { id: 'T001', name: 'Dr. Sarah Connor', subject: 'Physics', experience: '12 Years', availability: 'Available', rating: 4.8 },
  { id: 'T002', name: 'Mr. John Keating', subject: 'English Literature', experience: '8 Years', availability: 'In Class', rating: 4.9 },
  { id: 'T003', name: 'Mrs. Frizzle', subject: 'Science', experience: '15 Years', availability: 'On Leave', rating: 5.0 },
  { id: 'T004', name: 'Prof. Snape', subject: 'Chemistry', experience: '20 Years', availability: 'In Class', rating: 3.5 },
  { id: 'T005', name: 'Mr. Miyagi', subject: 'Physical Education', experience: '30 Years', availability: 'Available', rating: 4.7 },
];

export const MOCK_COURSES: Course[] = [
  { code: 'PHY101', title: 'Fundamentals of Physics', department: 'Science', credits: 4, instructorId: 'T001' },
  { code: 'ENG201', title: 'Modern Poetry', department: 'Arts', credits: 3, instructorId: 'T002' },
  { code: 'SCI102', title: 'Field Biology', department: 'Science', credits: 4, instructorId: 'T003' },
  { code: 'CHE301', title: 'Advanced Potions', department: 'Science', credits: 5, instructorId: 'T004' },
  { code: 'PED101', title: 'Martial Arts Basics', department: 'Physical Ed', credits: 2, instructorId: 'T005' },
];

export const MOCK_FINANCIALS: FinancialRecord[] = [
  { month: 'Jan', revenue: 420000, expenses: 350000 },
  { month: 'Feb', revenue: 435000, expenses: 340000 },
  { month: 'Mar', revenue: 410000, expenses: 360000 },
  { month: 'Apr', revenue: 450000, expenses: 355000 },
  { month: 'May', revenue: 460000, expenses: 345000 },
  { month: 'Jun', revenue: 400000, expenses: 330000 },
];

export const SYSTEM_CONTEXT = `
You are the Strategic AI Advisor for "EduSphere Academy", a high-end educational institution.
Current Data Snapshot:
- Total Students: 1240
- Average Attendance: 94.2%
- Monthly Revenue: $450,000 (approx)
- Recent Issues: Slight dip in Grade 11 Math scores, Rising utility costs in Block C.
- Goals: Improve student retention, Optimize budget allocation, Enhance STEM curriculum.
`;

export const CHATBOT_CONTEXT = `
You are EduBot, a helpful assistant for the EduSphere ERP system.
Your goal is to help users navigate the application.
The available modules (tabs) are:
1. Dashboard (Overview, stats) -> key: DASHBOARD
2. Students (Directory, admissions) -> key: STUDENTS
3. Teachers (Faculty, staff) -> key: TEACHERS
4. Courses (Curriculum, subjects) -> key: COURSES
5. Finance (Revenue, expenses) -> key: FINANCE
6. Strategic Advisor (AI Analysis) -> key: AI_ADVISOR

If a user asks where to find something or how to go somewhere, explain briefly and THEN append a navigation tag in this exact format: [[NAV:KEY]].
Example: "You can manage student records in the directory. [[NAV:STUDENTS]]"
Example: "Check the latest revenue charts here. [[NAV:FINANCE]]"

Keep responses short, friendly, and helpful.
`;
