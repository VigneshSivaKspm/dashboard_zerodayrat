import { 
  Smartphone, 
  Activity, 
  Battery, 
  Wifi, 
  MessageSquare, 
  Bell,
  Camera,
  AlertTriangle
} from 'lucide-react';
import { StatCard } from '../components/dashboard/StatCard';
import { LiveActivityFeed } from '../components/dashboard/LiveActivityFeed';
import { FleetStatusList } from '../components/dashboard/FleetStatusList';

export function Dashboard() {
  const stats = [
    {
      title: 'Total Devices',
      value: '248',
      change: '+12 this week',
      icon: Smartphone,
      trend: 'up' as const,
    },
    {
      title: 'Online Devices',
      value: '231',
      change: '93% uptime',
      icon: Activity,
      trend: 'neutral' as const,
      status: 'success' as const,
    },
    {
      title: 'Offline Devices',
      value: '17',
      change: '7% downtime',
      icon: AlertTriangle,
      trend: 'down' as const,
      status: 'warning' as const,
    },
    {
      title: 'Low Battery',
      value: '8',
      change: '<20% charge',
      icon: Battery,
      trend: 'neutral' as const,
      status: 'error' as const,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-50 mb-2">
          Global Overview
        </h1>
        <p className="text-slate-400">
          Real-time monitoring and fleet management dashboard
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Activity Feed */}
        <div className="lg:col-span-2">
          <LiveActivityFeed />
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">
              Network Status
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-slate-300">WiFi</span>
                </div>
                <span className="text-sm font-medium text-slate-50">189</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-slate-300">4G/5G</span>
                </div>
                <span className="text-sm font-medium text-slate-50">42</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-300">Offline</span>
                </div>
                <span className="text-sm font-medium text-slate-50">17</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">
              Today's Activity
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-slate-300">SMS</span>
                </div>
                <span className="text-sm font-medium text-slate-50">1,247</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-slate-300">Notifications</span>
                </div>
                <span className="text-sm font-medium text-slate-50">3,892</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-pink-500" />
                  <span className="text-sm text-slate-300">Photos</span>
                </div>
                <span className="text-sm font-medium text-slate-50">156</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fleet Status List */}
      <FleetStatusList />
    </div>
  );
}
