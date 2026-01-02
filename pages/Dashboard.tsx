import React from 'react';
import { useData } from '../context/DataContext';
import { StatCard } from '../components/StatCard';
import { Users, GraduationCap, DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const Dashboard: React.FC = () => {
  const { stats, financials, students } = useData();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-red-900">Dashboard Overview</h2>
        <p className="text-red-600 mt-2">Welcome back, Administrator. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Students" 
          value={stats.totalStudents} 
          trend={2.5} 
          trendLabel="vs last month"
          icon={Users}
          colorClass="bg-red-500"
        />
        <StatCard 
          title="Avg. Attendance" 
          value={`${stats.avgAttendance}%`} 
          trend={-0.8} 
          trendLabel="vs last week"
          icon={Calendar}
          colorClass="bg-red-400"
        />
        <StatCard 
          title="Revenue (Monthly)" 
          value={`$${(stats.monthlyRevenue / 1000).toFixed(0)}k`} 
          trend={5.2} 
          trendLabel="vs last month"
          icon={DollarSign}
          colorClass="bg-red-600"
        />
        <StatCard 
          title="Academic Performance" 
          value="3.4 GPA" 
          trend={1.2} 
          trendLabel="Average across grades"
          icon={GraduationCap}
          colorClass="bg-red-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-red-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-red-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-red-500" />
              Financial Overview
            </h3>
            <select className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg p-2 outline-none focus:ring-2 focus:ring-red-500">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financials}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#b91c1c'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#b91c1c'}} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  cursor={{fill: '#fef2f2'}}
                  contentStyle={{borderRadius: '8px', border: '1px solid #fee2e2', color: '#7f1d1d', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="revenue" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} name="Revenue" />
                <Bar dataKey="expenses" fill="#fca5a5" radius={[4, 4, 0, 0]} barSize={20} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity / Quick List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
          <h3 className="text-lg font-bold text-red-900 mb-6">Recent Enrollees</h3>
          <div className="space-y-4">
            {students.slice(0, 5).map((student) => (
              <div key={student.id} className="flex items-center gap-4 p-3 hover:bg-red-50 rounded-xl transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                  {student.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-red-900 text-sm">{student.name}</h4>
                  <p className="text-xs text-red-600">{student.grade}</p>
                </div>
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  student.feesStatus === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                  student.feesStatus === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                }`}>
                  {student.feesStatus}
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm text-red-600 font-medium hover:bg-red-50 rounded-lg transition-colors">
            View All Students
          </button>
        </div>
      </div>
    </div>
  );
};