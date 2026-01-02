import React, { useState } from 'react';
import { MOCK_TEACHERS } from '../constants';
import { Search, Star, Clock, UserCheck } from 'lucide-react';

export const Teachers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeachers = MOCK_TEACHERS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-red-900">Faculty Directory</h2>
        <p className="text-red-600 mt-1">Manage teaching staff, schedules, and performance.</p>
      </div>

      <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-400" />
           <input 
              type="text" 
              placeholder="Find a teacher..." 
              className="w-full pl-10 pr-4 py-2 bg-red-50 border border-red-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500 text-red-900 placeholder:text-red-300"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
           />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeachers.map((teacher) => (
          <div key={teacher.id} className="bg-white rounded-2xl border border-red-100 p-6 shadow-sm hover:shadow-md transition-shadow group">
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
    </div>
  );
};