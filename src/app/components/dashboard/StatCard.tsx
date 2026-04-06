import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  status?: 'success' | 'warning' | 'error';
}

export function StatCard({ title, value, change, icon: Icon, trend = 'neutral', status }: StatCardProps) {
  const statusColors = {
    success: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    warning: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    error: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${status ? statusColors[status] : 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-400'}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend !== 'neutral' && (
          <span className={`text-xs ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>
            {trend === 'up' ? '↑' : '↓'}
          </span>
        )}
      </div>
      <h3 className="text-sm text-slate-400 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-slate-50 mb-2">{value}</p>
      <p className="text-xs text-slate-500">{change}</p>
    </div>
  );
}
