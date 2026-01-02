import { MOCK_STUDENTS, MOCK_TEACHERS, MOCK_FINANCIALS } from '../constants';
import { Student, Teacher, SchoolStats, FinancialRecord } from '../types';

// Helper to generate random data for the demo
const generateDummyData = () => {
  const firstNames = ['James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda', 'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'];
  const grades = ['09-A', '09-B', '10-A', '10-B', '11-A', '11-B', '12-A', '12-B'];
  const statuses: ('Paid' | 'Pending' | 'Overdue')[] = ['Paid', 'Paid', 'Paid', 'Pending', 'Overdue'];
  
  const subjects = ['Mathematics', 'History', 'Geography', 'Computer Science', 'Art', 'Music', 'Biology', 'Chemistry'];
  const availability: ('Available' | 'In Class' | 'On Leave')[] = ['Available', 'Available', 'In Class', 'In Class', 'On Leave'];

  const extraStudents: Student[] = Array.from({ length: 65 }).map((_, i) => ({
    id: `S${1011 + i}`,
    name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    grade: grades[Math.floor(Math.random() * grades.length)],
    attendance: Math.floor(Math.random() * (100 - 60) + 60),
    feesStatus: statuses[Math.floor(Math.random() * statuses.length)],
    gpa: parseFloat((Math.random() * (4.0 - 2.0) + 2.0).toFixed(2)),
  }));

  const extraTeachers: Teacher[] = Array.from({ length: 25 }).map((_, i) => ({
    id: `T${1006 + i}`,
    name: `Dr. ${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
    subject: subjects[Math.floor(Math.random() * subjects.length)],
    experience: `${Math.floor(Math.random() * 20 + 1)} Years`,
    availability: availability[Math.floor(Math.random() * availability.length)],
    rating: parseFloat((Math.random() * (5.0 - 3.5) + 3.5).toFixed(1)),
  }));

  return { extraStudents, extraTeachers };
};

class DatabaseService {
  private students: Student[];
  private teachers: Teacher[];
  private financials: FinancialRecord[];
  
  constructor() {
    const { extraStudents, extraTeachers } = generateDummyData();
    // Combine manual mocks with generated data
    this.students = [...MOCK_STUDENTS, ...extraStudents];
    this.teachers = [...MOCK_TEACHERS, ...extraTeachers];
    this.financials = [...MOCK_FINANCIALS];
  }

  getStudents() {
    return this.students;
  }

  getTeachers() {
    return this.teachers;
  }

  getFinancials() {
    return this.financials;
  }

  getStats(): SchoolStats {
    return {
      totalStudents: this.students.length, // Dynamic count
      totalTeachers: this.teachers.length, // Dynamic count
      monthlyRevenue: this.financials[this.financials.length - 1].revenue,
      avgAttendance: Math.round(this.students.reduce((acc, curr) => acc + curr.attendance, 0) / this.students.length * 10) / 10,
    };
  }

  addStudent(student: Student) {
    this.students = [student, ...this.students]; // Add to top
  }

  addTeacher(teacher: Teacher) {
    this.teachers = [teacher, ...this.teachers]; // Add to top
  }
}

// Export a singleton instance
export const db = new DatabaseService();