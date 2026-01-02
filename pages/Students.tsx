import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../constants';
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';

export const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = MOCK_STUDENTS.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-red-900">Student Directory</h2>
          <p className="text-red-600 mt-1">Manage enrollments, fees, and academic records.</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20">
          <Plus className="w-5 h-5" />
          Add Student
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-red-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
            <input 
              type="text" 
              placeholder="Search by name or grade..." 
              className="w-full pl-10 pr-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm placeholder:text-red-300 text-red-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-red-200 rounded-lg text-red-700 text-sm hover:bg-red-50 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-red-700">
            <thead className="bg-red-50 text-xs uppercase font-semibold text-red-600">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Student Name</th>
                <th className="px-6 py-4">Grade</th>
                <th className="px-6 py-4">Attendance</th>
                <th className="px-6 py-4">GPA</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-red-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs text-red-400">{student.id}</td>
                  <td className="px-6 py-4 font-medium text-red-900">{student.name}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-red-100 rounded text-red-700 text-xs font-semibold">{student.grade}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-red-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${student.attendance >= 90 ? 'bg-emerald-500' : student.attendance >= 75 ? 'bg-amber-500' : 'bg-red-500'}`} 
                          style={{width: `${student.attendance}%`}}
                        />
                      </div>
                      <span className="text-xs">{student.attendance}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold">{student.gpa}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      student.feesStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 
                      student.feesStatus === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.feesStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-400 hover:text-red-600 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredStudents.length === 0 && (
          <div className="p-8 text-center text-red-500">
            No students found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};