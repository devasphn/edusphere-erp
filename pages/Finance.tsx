import React from 'react';
import { MOCK_FINANCIALS } from '../constants';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { StatCard } from '../components/StatCard';

export const Finance: React.FC = () => {
  const currentMonth = MOCK_FINANCIALS[MOCK_FINANCIALS.length - 1];
  const previousMonth = MOCK_FINANCIALS[MOCK_FINANCIALS.length - 2];
  
  const revenueGrowth = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100;
  const netIncome = currentMonth.revenue - currentMonth.expenses;

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-red-900">Financial Overview</h2>
        <p className="text-red-600 mt-2">Track revenue, expenses, and fiscal health.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Revenue (Jun)" 
          value={`$${(currentMonth.revenue / 1000).toFixed(0)}k`} 
          trend={revenueGrowth} 
          trendLabel="vs last month"
          icon={DollarSign}
          colorClass="bg-emerald-500"
        />
        <StatCard 
          title="Total Expenses (Jun)" 
          value={`$${(currentMonth.expenses / 1000).toFixed(0)}k`} 
          trend={-4.2} 
          trendLabel="Reduced operations costs"
          icon={Wallet}
          colorClass="bg-rose-500"
        />
        <StatCard 
          title="Net Income (Jun)" 
          value={`$${(netIncome / 1000).toFixed(0)}k`} 
          trend={12.5} 
          trendLabel="Profit Margin"
          icon={TrendingUp}
          colorClass="bg-red-600"
        />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
        <h3 className="text-lg font-bold text-red-900 mb-6">Revenue vs Expenses (6 Months)</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_FINANCIALS} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#dc2626" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#dc2626" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#b91c1c'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#b91c1c'}} tickFormatter={(val) => `$${val/1000}k`} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#fee2e2" />
              <Tooltip 
                 contentStyle={{borderRadius: '8px', border: '1px solid #fee2e2', color: '#7f1d1d'}}
                 formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#dc2626" fillOpacity={1} fill="url(#colorRev)" name="Revenue" strokeWidth={2} />
              <Area type="monotone" dataKey="expenses" stroke="#f87171" fillOpacity={1} fill="url(#colorExp)" name="Expenses" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};