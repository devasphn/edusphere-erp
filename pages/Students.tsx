import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Filter, Plus, MoreHorizontal, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Student } from '../types';

export const Students: React.FC = () => {
  const { students, stats, addStudent } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Reduced to 5 so pagination is visible immediately

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    grade: '',
    attendance: 100,
    feesStatus: 'Paid',
    gpa: 4.0
  });

  // Filter Logic
  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newStudent.name && newStudent.grade) {
      addStudent(newStudent as Omit<Student, 'id'>);
      setIsModalOpen(false);
      setNewStudent({ name: '', grade: '', attendance: 100, feesStatus: 'Paid', gpa: 4.0 });
      // Go to first page to see new entry (since we unshift to top)
      setCurrentPage(1); 
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-red-900">Student Directory</h2>
          <p className="text-red-600 mt-1">Manage enrollments, fees, and academic records.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20"
        >
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
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
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
              {paginatedStudents.map((student) => (
                <tr key={student.id} className="hover:bg-red-50 transition-colors animate-fade-in">
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
        
        {/* Pagination Footer */}
        <div className="px-6 py-4 border-t border-red-100 flex items-center justify-between bg-red-50/50">
          <p className="text-sm text-red-500">
            Showing <span className="font-medium text-red-900">
              {filteredStudents.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
            </span> to <span className="font-medium text-red-900">
              {Math.min(currentPage * itemsPerPage, filteredStudents.length)}
            </span> of <span className="font-medium text-red-900">{filteredStudents.length}</span> students
          </p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Student Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-red-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-100 flex justify-between items-center bg-red-50">
              <h3 className="font-bold text-red-900">Add New Student</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-red-400 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-red-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                  placeholder="e.g. Emily Clark"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-red-700 mb-1">Grade / Class</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                  value={newStudent.grade}
                  onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                  placeholder="e.g. 11-A"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-red-700 mb-1">GPA</label>
                  <input 
                    type="number" 
                    step="0.1"
                    max="4.0"
                    className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                    value={newStudent.gpa}
                    onChange={(e) => setNewStudent({...newStudent, gpa: parseFloat(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-red-700 mb-1">Fee Status</label>
                  <select 
                    className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                    value={newStudent.feesStatus}
                    onChange={(e) => setNewStudent({...newStudent, feesStatus: e.target.value as any})}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Pending">Pending</option>
                    <option value="Overdue">Overdue</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-red-200 text-red-700 rounded-xl hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/20 transition-colors font-medium"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};