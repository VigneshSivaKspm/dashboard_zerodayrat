import { useState } from 'react';
import { useNavigate } from 'react-router';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Battery,
  Wifi,
  Eye,
  EyeOff,
  CheckSquare,
  Square
} from 'lucide-react';

interface Device {
  id: string;
  label: string;
  deviceId: string;
  model: string;
  osVersion: string;
  battery: number;
  network: string;
  visibility: 'visible' | 'minimal';
  lastSync: string;
  status: 'online' | 'offline';
  checked: boolean;
}

export function DeviceFleet() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [devices, setDevices] = useState<Device[]>([
    {
      id: 'A13',
      label: 'Galaxy S21 - Warehouse',
      deviceId: 'SM-G991B-7F4A2',
      model: 'Samsung Galaxy S21',
      osVersion: 'Android 13',
      battery: 87,
      network: 'WiFi',
      visibility: 'visible',
      lastSync: '2 min ago',
      status: 'online',
      checked: false,
    },
    {
      id: 'B22',
      label: 'Pixel 6 - Office Floor 1',
      deviceId: 'GR1YH-8K3B5',
      model: 'Google Pixel 6',
      osVersion: 'Android 14',
      battery: 92,
      network: '5G',
      visibility: 'visible',
      lastSync: '1 min ago',
      status: 'online',
      checked: false,
    },
    {
      id: 'C45',
      label: 'OnePlus 9 - Delivery Van 3',
      deviceId: 'OP9P-9M4C6',
      model: 'OnePlus 9 Pro',
      osVersion: 'Android 13',
      battery: 45,
      network: '4G',
      visibility: 'minimal',
      lastSync: '5 min ago',
      status: 'online',
      checked: false,
    },
    {
      id: 'D78',
      label: 'iPhone 13 - Manager Office',
      deviceId: 'IPHONE-0N5D7',
      model: 'Apple iPhone 13',
      osVersion: 'iOS 16',
      battery: 18,
      network: 'WiFi',
      visibility: 'visible',
      lastSync: '3 min ago',
      status: 'online',
      checked: false,
    },
    {
      id: 'E91',
      label: 'Xiaomi 12 - Training Room',
      deviceId: 'MI12-1P6E8',
      model: 'Xiaomi 12',
      osVersion: 'Android 12',
      battery: 76,
      network: '5G',
      visibility: 'visible',
      lastSync: '4 min ago',
      status: 'online',
      checked: false,
    },
    {
      id: 'F32',
      label: 'Galaxy A52 - Storage Area',
      deviceId: 'SM-A525F-2Q7F9',
      model: 'Samsung Galaxy A52',
      osVersion: 'Android 12',
      battery: 0,
      network: 'Offline',
      visibility: 'visible',
      lastSync: '2 hours ago',
      status: 'offline',
      checked: false,
    },
  ]);

  const toggleCheck = (id: string) => {
    setDevices(devices.map(d => d.id === id ? { ...d, checked: !d.checked } : d));
  };

  const toggleAllChecks = () => {
    const allChecked = devices.every(d => d.checked);
    setDevices(devices.map(d => ({ ...d, checked: !allChecked })));
  };

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-emerald-400';
    if (battery > 20) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'online') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md text-xs text-emerald-400">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          Online
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-md text-xs text-rose-400">
        <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
        Offline
      </span>
    );
  };

  const allChecked = devices.every(d => d.checked);
  const someChecked = devices.some(d => d.checked) && !allChecked;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">Device Fleet Management</h1>
          <p className="text-slate-400">Monitor and manage all registered devices</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <Plus className="w-4 h-4" />
          Add New Device
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by device label or ID..."
            className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Devices</option>
            <option value="online">Online Only</option>
            <option value="offline">Offline Only</option>
            <option value="low-battery">Low Battery</option>
          </select>
        </div>
      </div>

      {/* Devices Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800/50 border-b border-slate-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <button onClick={toggleAllChecks} className="text-slate-400 hover:text-slate-200">
                    {allChecked ? (
                      <CheckSquare className="w-4 h-4" />
                    ) : someChecked ? (
                      <CheckSquare className="w-4 h-4 opacity-50" />
                    ) : (
                      <Square className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Device Label
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Device ID
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Model
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  OS Version
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Battery
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Network
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Visibility
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Last Sync
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {devices.map((device) => (
                <tr
                  key={device.id}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer"
                  onClick={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'BUTTON') {
                      navigate(`/devices/${device.id}`);
                    }
                  }}
                >
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCheck(device.id);
                      }}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      {device.checked ? (
                        <CheckSquare className="w-4 h-4 text-indigo-400" />
                      ) : (
                        <Square className="w-4 h-4" />
                      )}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-slate-200">{device.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-400 font-mono">{device.deviceId}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-300">{device.model}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-400">{device.osVersion}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                      <span className={`text-sm font-medium ${getBatteryColor(device.battery)}`}>
                        {device.battery}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-400">{device.network}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {device.visibility === 'visible' ? (
                        <>
                          <Eye className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-400">Visible</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-4 h-4 text-amber-400" />
                          <span className="text-sm text-amber-400">Minimal</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-slate-400">{device.lastSync}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(device.status)}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-1 hover:bg-slate-700 rounded transition-colors"
                    >
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
