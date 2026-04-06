import { useState } from 'react';
import { Search, Filter, Download, MessageSquare, Send, Bell } from 'lucide-react';

export function DataLogs() {
  const [activeTab, setActiveTab] = useState<'notifications' | 'sms' | 'timeline'>('notifications');
  const [smsType, setSmsType] = useState<'incoming' | 'outgoing'>('incoming');
  const [showSendModal, setShowSendModal] = useState(false);

  const notifications = [
    {
      id: 1,
      timestamp: '10:02:31 AM',
      device: 'Device A13',
      app: 'WhatsApp',
      icon: '💬',
      title: 'New Message',
      body: 'Hey, are you available for a meeting?',
    },
    {
      id: 2,
      timestamp: '10:01:45 AM',
      device: 'Device B22',
      app: 'Instagram',
      icon: '📷',
      title: 'john_doe liked your photo',
      body: 'Someone liked your recent post',
    },
    {
      id: 3,
      timestamp: '09:58:20 AM',
      device: 'Device C45',
      app: 'Gmail',
      icon: '📧',
      title: 'New Email',
      body: 'Your order has been shipped',
    },
    {
      id: 4,
      timestamp: '09:55:10 AM',
      device: 'Device D78',
      app: 'Slack',
      icon: '💼',
      title: 'Message from @sarah',
      body: 'Can you review the document?',
    },
  ];

  const smsIncoming = [
    {
      id: 1,
      timestamp: '10:05:12 AM',
      device: 'Device A13',
      sender: '+1 555-0123',
      body: 'Meeting confirmed for 3 PM today',
    },
    {
      id: 2,
      timestamp: '09:50:30 AM',
      device: 'Device B22',
      sender: '+1 555-0456',
      body: 'Thanks for the update!',
    },
    {
      id: 3,
      timestamp: '09:30:15 AM',
      device: 'Device C45',
      sender: '+1 555-0789',
      body: 'Your verification code is 123456',
    },
  ];

  const smsOutgoing = [
    {
      id: 1,
      timestamp: '10:02:30 AM',
      device: 'Device B22',
      recipient: '+1 555-0123',
      body: 'See you at the meeting',
    },
    {
      id: 2,
      timestamp: '09:45:20 AM',
      device: 'Device A13',
      recipient: '+1 555-0456',
      body: 'Thanks for your help',
    },
  ];

  const timeline = [
    {
      id: 1,
      timestamp: '10:05:12 AM',
      device: 'Device A13',
      type: 'sms',
      description: 'SMS received from +1 555-0123',
    },
    {
      id: 2,
      timestamp: '10:02:31 AM',
      device: 'Device A13',
      type: 'notification',
      description: 'WhatsApp notification: New Message',
    },
    {
      id: 3,
      timestamp: '10:00:15 AM',
      device: 'Device C45',
      type: 'photo',
      description: 'Photo captured via remote command',
    },
    {
      id: 4,
      timestamp: '09:58:20 AM',
      device: 'Device C45',
      type: 'notification',
      description: 'Gmail notification: New Email',
    },
    {
      id: 5,
      timestamp: '09:55:10 AM',
      device: 'Device D78',
      type: 'app',
      description: 'Opened: Instagram',
    },
    {
      id: 6,
      timestamp: '09:50:30 AM',
      device: 'Device B22',
      type: 'sms',
      description: 'SMS received from +1 555-0456',
    },
  ];

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'sms':
        return 'bg-blue-500/10 text-blue-400';
      case 'notification':
        return 'bg-purple-500/10 text-purple-400';
      case 'photo':
        return 'bg-pink-500/10 text-pink-400';
      case 'app':
        return 'bg-emerald-500/10 text-emerald-400';
      case 'file':
        return 'bg-amber-500/10 text-amber-400';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Data Monitoring Logs</h1>
          <p className="text-slate-400">Track all device activities and communications</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Export Logs
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800">
        <div className="flex gap-4">
          {(['notifications', 'sms', 'timeline'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 border-b-2 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'notifications' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Notifications Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      App
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Body
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {notifications.map((notif) => (
                    <tr key={notif.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-400">{notif.timestamp}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-200">{notif.device}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{notif.icon}</span>
                          <span className="text-sm text-slate-300">{notif.app}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{notif.title}</td>
                      <td className="px-4 py-3 text-sm text-slate-400">{notif.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'sms' && (
        <div className="space-y-4">
          {/* SMS Type Toggle & Send Button */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setSmsType('incoming')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  smsType === 'incoming'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Incoming SMS
              </button>
              <button
                onClick={() => setSmsType('outgoing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  smsType === 'outgoing'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                Outgoing SMS
              </button>
            </div>
            <button
              onClick={() => setShowSendModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              <Send className="w-4 h-4" />
              Send SMS
            </button>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search SMS..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* SMS Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      {smsType === 'incoming' ? 'Sender' : 'Recipient'}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {(smsType === 'incoming' ? smsIncoming : smsOutgoing).map((sms) => (
                    <tr key={sms.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-4 py-3 text-sm text-slate-400">{sms.timestamp}</td>
                      <td className="px-4 py-3 text-sm font-medium text-slate-200">{sms.device}</td>
                      <td className="px-4 py-3 text-sm text-slate-300 font-mono">
                        {'sender' in sms ? sms.sender : sms.recipient}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{sms.body}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'timeline' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search activity timeline..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
              />
            </div>
            <select className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500">
              <option value="all">All Devices</option>
              <option value="A13">Device A13</option>
              <option value="B22">Device B22</option>
              <option value="C45">Device C45</option>
            </select>
          </div>

          {/* Timeline */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="space-y-4">
              {timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-4">
                  {/* Timeline Line */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTimelineIcon(event.type)}`}>
                      {event.type === 'sms' && <MessageSquare className="w-4 h-4" />}
                      {event.type === 'notification' && <Bell className="w-4 h-4" />}
                      {event.type === 'photo' && <span className="text-sm">📷</span>}
                      {event.type === 'app' && <span className="text-sm">📱</span>}
                    </div>
                    {idx < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-800 mt-2" />
                    )}
                  </div>

                  {/* Event Content */}
                  <div className="flex-1 pb-8">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-slate-200">{event.device}</span>
                        <span className="text-xs text-slate-500">{event.timestamp}</span>
                      </div>
                      <p className="text-sm text-slate-400">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Send SMS Modal */}
      {showSendModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold text-slate-50 mb-4">Send SMS</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('SMS sent successfully!');
                setShowSendModal(false);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Select Device
                </label>
                <select className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500">
                  <option>Device A13</option>
                  <option>Device B22</option>
                  <option>Device C45</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Recipient Number
                </label>
                <input
                  type="tel"
                  placeholder="+1 555-0123"
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Message
                </label>
                <textarea
                  placeholder="Type your message..."
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSendModal(false)}
                  className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                >
                  Send SMS
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
