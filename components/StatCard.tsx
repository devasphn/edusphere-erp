import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon: React.ElementType;
  colorClass: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  trend, 
  trendLabel, 
  icon: Icon,
  colorClass 
}) => {
  const isPositive = trend && trend >= 0;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${colorClass}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-red-600 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-red-900">{value}</h3>
        {trendLabel && <p className="text-xs text-red-400 mt-2">{trendLabel}</p>}
      </div>
    </div>
  );
};