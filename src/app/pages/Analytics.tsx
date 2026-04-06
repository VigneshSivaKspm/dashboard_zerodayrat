import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, TrendingUp, Activity as ActivityIcon, Database } from 'lucide-react';

export function Analytics() {
  const activityData = [
    { date: 'Mar 31', sms: 420, notifications: 1240, photos: 65 },
    { date: 'Apr 1', sms: 380, notifications: 1180, photos: 72 },
    { date: 'Apr 2', sms: 450, notifications: 1320, photos: 58 },
    { date: 'Apr 3', sms: 520, notifications: 1450, photos: 89 },
    { date: 'Apr 4', sms: 490, notifications: 1380, photos: 76 },
    { date: 'Apr 5', sms: 540, notifications: 1520, photos: 94 },
    { date: 'Apr 6', sms: 510, notifications: 1470, photos: 82 },
  ];

  const deviceUsageData = [
    { device: 'Device A13', active: 89, idle: 11 },
    { device: 'Device B22', active: 92, idle: 8 },
    { device: 'Device C45', active: 76, idle: 24 },
    { device: 'Device D78', active: 84, idle: 16 },
    { device: 'Device E91', active: 78, idle: 22 },
  ];

  const statsCards = [
    {
      title: 'Total Activity',
      value: '48,392',
      change: '+12.5%',
      trend: 'up',
      icon: ActivityIcon,
      color: 'indigo',
    },
    {
      title: 'SMS Messages',
      value: '3,560',
      change: '+8.2%',
      trend: 'up',
      icon: Database,
      color: 'blue',
    },
    {
      title: 'Notifications',
      value: '9,860',
      change: '+15.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'emerald',
    },
    {
      title: 'Photos Captured',
      value: '536',
      change: '+22.1%',
      trend: 'up',
      icon: TrendingUp,
      color: 'pink',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Analytics & Reports</h1>
          <p className="text-slate-400">Fleet activity trends and performance metrics</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${stat.color}-500/10`}>
                  <Icon className={`w-5 h-5 text-${stat.color}-400`} />
                </div>
                <span className="text-xs text-emerald-400 flex items-center gap-1">
                  ↑ {stat.change}
                </span>
              </div>
              <h3 className="text-sm text-slate-400 mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-slate-50">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* Activity Trends Chart */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-50 mb-1">Activity Trends</h2>
            <p className="text-sm text-slate-400">Last 7 days fleet activity overview</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded-lg">
              7 Days
            </button>
            <button className="px-3 py-1.5 bg-slate-800 text-slate-400 text-sm rounded-lg hover:bg-slate-700 transition-colors">
              30 Days
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={activityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#e2e8f0',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="sms"
              stroke="#3b82f6"
              strokeWidth={2}
              name="SMS"
              dot={{ fill: '#3b82f6' }}
            />
            <Line
              type="monotone"
              dataKey="notifications"
              stroke="#8b5cf6"
              strokeWidth={2}
              name="Notifications"
              dot={{ fill: '#8b5cf6' }}
            />
            <Line
              type="monotone"
              dataKey="photos"
              stroke="#ec4899"
              strokeWidth={2}
              name="Photos"
              dot={{ fill: '#ec4899' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Device Usage & Export Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Device Usage */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-50 mb-6">Device Usage Statistics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deviceUsageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="device" stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#e2e8f0',
                }}
              />
              <Legend />
              <Bar dataKey="active" fill="#10b981" name="Active %" radius={[8, 8, 0, 0]} />
              <Bar dataKey="idle" fill="#6b7280" name="Idle %" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Hub */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-50 mb-4">Export Hub</h2>
          <p className="text-sm text-slate-400 mb-6">
            Select data types and export format
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                  defaultChecked
                />
                <span className="text-sm text-slate-200">SMS Logs</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                  defaultChecked
                />
                <span className="text-sm text-slate-200">Notifications</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                />
                <span className="text-sm text-slate-200">Activity Logs</span>
              </label>
              <label className="flex items-center gap-2 p-3 bg-slate-800/50 border border-slate-700 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-slate-700 border-slate-600"
                />
                <span className="text-sm text-slate-200">Device Info</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Export Format
              </label>
              <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500">
                <option value="csv">CSV</option>
                <option value="json">JSON</option>
                <option value="xlsx">Excel (XLSX)</option>
              </select>
            </div>

            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Training Performance */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-slate-50 mb-4">Training Performance Tracking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm text-slate-400 mb-2">Sessions Completed</h3>
            <p className="text-3xl font-bold text-slate-50">24</p>
            <p className="text-xs text-emerald-400 mt-1">+4 this week</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm text-slate-400 mb-2">Average Duration</h3>
            <p className="text-3xl font-bold text-slate-50">42m</p>
            <p className="text-xs text-slate-400 mt-1">Per session</p>
          </div>
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
            <h3 className="text-sm text-slate-400 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-slate-50">87%</p>
            <p className="text-xs text-emerald-400 mt-1">+5% improvement</p>
          </div>
        </div>
      </div>
    </div>
  );
}
