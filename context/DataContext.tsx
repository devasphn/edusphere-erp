import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, Teacher, SchoolStats, FinancialRecord } from '../types';
import { db } from '../services/database';

interface DataContextType {
  students: Student[];
  teachers: Teacher[];
  stats: SchoolStats;
  financials: FinancialRecord[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(db.getStudents());
  const [teachers, setTeachers] = useState<Teacher[]>(db.getTeachers());
  const [financials] = useState<FinancialRecord[]>(db.getFinancials());
  const [stats, setStats] = useState<SchoolStats>(db.getStats());

  // Helper to refresh local state from DB
  const refreshData = () => {
    setStudents([...db.getStudents()]);
    setTeachers([...db.getTeachers()]);
    setStats(db.getStats());
  };

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `S${(students.length + 1000).toString()}`, // Simple ID generation
    };
    db.addStudent(newStudent);
    refreshData();
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `T${(teachers.length + 1000).toString()}`,
    };
    db.addTeacher(newTeacher);
    refreshData();
  };

  return (
    <DataContext.Provider value={{ students, teachers, stats, financials, addStudent, addTeacher }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};