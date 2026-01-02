import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Search, Star, Clock, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { Teacher } from '../types';

export const Teachers: React.FC = () => {
  const { teachers, stats, addTeacher } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Grid layout (2x3 or 3x2)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: '',
    subject: '',
    experience: '1 Year',
    availability: 'Available',
    rating: 5.0
  });

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTeacher.name && newTeacher.subject) {
      addTeacher(newTeacher as Omit<Teacher, 'id'>);
      setIsModalOpen(false);
      setNewTeacher({ name: '', subject: '', experience: '1 Year', availability: 'Available', rating: 5.0 });
      setCurrentPage(1);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-red-900">Faculty Directory</h2>
          <p className="text-red-600 mt-1">Manage teaching staff, schedules, and performance.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-red-500/20"
        >
          <Plus className="w-5 h-5" />
          Add Faculty
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
           <input 
              type="text" 
              placeholder="Find a teacher..." 
              className="w-full pl-10 pr-4 py-2 bg-red-50 border border-red-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-red-900 placeholder:text-red-300"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm hover:shadow-md transition-shadow group animate-fade-in-up">
             <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold text-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                  {teacher.name.charAt(0)}
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium border ${
                   teacher.availability === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                   teacher.availability === 'In Class' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'
                }`}>
                   {teacher.availability}
                </div>
             </div>
             
             <h3 className="text-lg font-bold text-red-900 mb-1">{teacher.name}</h3>
             <p className="text-red-500 text-sm mb-4">{teacher.subject}</p>

             <div className="space-y-2 border-t border-red-50 pt-4">
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-red-400">
                      <Clock className="w-4 h-4" />
                      <span>Experience</span>
                   </div>
                   <span className="font-medium text-red-800">{teacher.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                   <div className="flex items-center gap-2 text-red-400">
                      <Star className="w-4 h-4" />
                      <span>Rating</span>
                   </div>
                   <span className="font-medium text-red-800">{teacher.rating}/5.0</span>
                </div>
             </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-red-100/50">
        <p className="text-sm text-red-500">
           Showing <span className="font-medium text-red-900">
             {filteredTeachers.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
           </span> to <span className="font-medium text-red-900">
             {Math.min(currentPage * itemsPerPage, filteredTeachers.length)}
           </span> of <span className="font-medium text-red-900">{filteredTeachers.length}</span> faculty members
        </p>
        <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <div className="flex gap-1">
               {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(page => (
                 <button 
                   key={page}
                   onClick={() => setCurrentPage(page)}
                   className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                     currentPage === page ? 'bg-red-600 text-white' : 'hover:bg-red-50 text-red-600'
                   }`}
                 >
                   {page}
                 </button>
               ))}
               {totalPages > 3 && <span className="w-8 h-8 flex items-center justify-center text-red-300">...</span>}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-3 py-1 border border-red-200 rounded-lg text-red-600 hover:bg-red-50 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
        </div>
      </div>

       {/* Add Teacher Modal */}
       {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl border border-red-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-red-100 flex justify-between items-center bg-red-50">
              <h3 className="font-bold text-red-900">Add New Faculty</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-red-400 hover:text-red-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-red-700 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({...newTeacher, name: e.target.value})}
                  placeholder="e.g. Dr. Emily Stone"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-red-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                  value={newTeacher.subject}
                  onChange={(e) => setNewTeacher({...newTeacher, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-medium text-red-700 mb-1">Experience</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                      value={newTeacher.experience}
                      onChange={(e) => setNewTeacher({...newTeacher, experience: e.target.value})}
                      placeholder="e.g. 5 Years"
                    />
                 </div>
                 <div>
                    <label className="block text-xs font-medium text-red-700 mb-1">Availability</label>
                    <select 
                      className="w-full px-4 py-2 bg-red-50 border border-red-200 rounded-lg focus:ring-2 focus:ring-red-500 outline-none text-red-900"
                      value={newTeacher.availability}
                      onChange={(e) => setNewTeacher({...newTeacher, availability: e.target.value as any})}
                    >
                      <option value="Available">Available</option>
                      <option value="In Class">In Class</option>
                      <option value="On Leave">On Leave</option>
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
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};