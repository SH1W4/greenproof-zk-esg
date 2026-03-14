import React from 'react';
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  subvalue?: string;
  icon: LucideIcon;
  trend?: string;
  trendType?: 'up' | 'down';
  trendLabel?: string;
  isRisk?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  subvalue, 
  icon: Icon, 
  trend, 
  trendType, 
  trendLabel,
  isRisk 
}) => {
  return (
    <div className="bg-alt border border-glass-border rounded-xl p-6 flex flex-col justify-between hover:border-accent/40 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <p className="text-slate-400 text-sm font-medium">{title}</p>
        <Icon className={isRisk ? "text-slate-400" : "text-brand-primary"} size={20} />
      </div>
      <div>
        <p className={`text-3xl font-bold ${isRisk ? 'text-brand-primary' : 'text-slate-100'}`}>
          {value}
          {subvalue && <span className="text-lg text-slate-500 font-normal">{subvalue}</span>}
        </p>
        {trend && (
          <div className="flex items-center gap-1.5 mt-2">
            {trendType === 'up' ? (
              <TrendingUp className="text-brand-primary size-3" />
            ) : (
              <TrendingDown className="text-orange-500 size-3" />
            )}
            <span className={`${trendType === 'up' ? 'text-brand-primary' : 'text-orange-500'} text-xs font-bold`}>
              {trend}
            </span>
            <span className="text-slate-600 text-[10px] font-medium uppercase ml-1">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
