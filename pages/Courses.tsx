import React from 'react';
import { MOCK_COURSES } from '../constants';
import { BookOpen, Layers, User } from 'lucide-react';

export const Courses: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-red-900">Course Curriculum</h2>
        <p className="text-red-600 mt-1">Academic programs and subject distribution.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-red-700">
            <thead className="bg-red-50 text-xs uppercase font-semibold text-red-600">
              <tr>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Course Title</th>
                <th className="px-6 py-4">Department</th>
                <th className="px-6 py-4">Credits</th>
                <th className="px-6 py-4">Instructor ID</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {MOCK_COURSES.map((course) => (
                <tr key={course.code} className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-red-400 font-bold">{course.code}</td>
                  <td className="px-6 py-4 font-medium text-red-900 flex items-center gap-2">
                     <BookOpen className="w-4 h-4 text-red-300" />
                     {course.title}
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-2 py-1 bg-red-100 rounded-md text-red-800 text-xs font-medium">{course.department}</span>
                  </td>
                  <td className="px-6 py-4 text-red-600">{course.credits} Credits</td>
                  <td className="px-6 py-4 font-mono text-xs text-red-500">{course.instructorId}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-500 hover:text-red-700 font-medium text-xs">View Syllabus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};