import { useEffect, useState } from 'react';
import { Activity, MessageSquare, Bell, Camera, FileText } from 'lucide-react';

interface ActivityEvent {
  id: string;
  device: string;
  type: 'sms' | 'notification' | 'photo' | 'file';
  message: string;
  timestamp: string;
}

export function LiveActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>([
    {
      id: '1',
      device: 'Device A13',
      type: 'notification',
      message: 'WhatsApp notification received',
      timestamp: '10:02:31 AM',
    },
    {
      id: '2',
      device: 'Device B22',
      type: 'sms',
      message: 'SMS sent to +1 555-0123',
      timestamp: '10:02:30 AM',
    },
    {
      id: '3',
      device: 'Device C45',
      type: 'photo',
      message: 'Photo captured via remote command',
      timestamp: '10:02:28 AM',
    },
    {
      id: '4',
      device: 'Device D78',
      type: 'notification',
      message: 'Instagram notification received',
      timestamp: '10:02:25 AM',
    },
    {
      id: '5',
      device: 'Device E91',
      type: 'file',
      message: 'File modified: document.pdf',
      timestamp: '10:02:20 AM',
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newEvent: ActivityEvent = {
        id: Date.now().toString(),
        device: `Device ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 100)}`,
        type: ['sms', 'notification', 'photo', 'file'][Math.floor(Math.random() * 4)] as any,
        message: [
          'New notification received',
          'SMS sent successfully',
          'Photo captured',
          'File accessed',
        ][Math.floor(Math.random() * 4)],
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      };
      setEvents((prev) => [newEvent, ...prev].slice(0, 10));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return <MessageSquare className="w-4 h-4" />;
      case 'notification':
        return <Bell className="w-4 h-4" />;
      case 'photo':
        return <Camera className="w-4 h-4" />;
      case 'file':
        return <FileText className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'sms':
        return 'text-blue-400 bg-blue-500/10';
      case 'notification':
        return 'text-purple-400 bg-purple-500/10';
      case 'photo':
        return 'text-pink-400 bg-pink-500/10';
      case 'file':
        return 'text-amber-400 bg-amber-500/10';
      default:
        return 'text-slate-400 bg-slate-500/10';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-50">Live Activity Feed</h2>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs text-emerald-400">Syncing...</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex items-start gap-3 p-3 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-slate-600 transition-colors"
          >
            <div className={`p-2 rounded-lg ${getColor(event.type)}`}>
              {getIcon(event.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-medium text-slate-200 text-sm">{event.device}</span>
                <span className="text-xs text-slate-500 whitespace-nowrap">{event.timestamp}</span>
              </div>
              <p className="text-sm text-slate-400 truncate">{event.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
