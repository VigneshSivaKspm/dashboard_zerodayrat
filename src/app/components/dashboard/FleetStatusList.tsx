import { useNavigate } from 'react-router';
import { Battery, Wifi, Smartphone } from 'lucide-react';

export function FleetStatusList() {
  const navigate = useNavigate();

  const devices = [
    { id: 'A13', label: 'Galaxy S21 - Warehouse', model: 'Samsung Galaxy S21', battery: 87, network: 'WiFi', status: 'online' },
    { id: 'B22', label: 'Pixel 6 - Office Floor 1', model: 'Google Pixel 6', battery: 92, network: '5G', status: 'online' },
    { id: 'C45', label: 'OnePlus 9 - Delivery Van 3', model: 'OnePlus 9 Pro', battery: 45, network: '4G', status: 'online' },
    { id: 'D78', label: 'iPhone 13 - Manager Office', model: 'Apple iPhone 13', battery: 18, network: 'WiFi', status: 'online' },
    { id: 'E91', label: 'Xiaomi 12 - Training Room', model: 'Xiaomi 12', battery: 76, network: '5G', status: 'online' },
    { id: 'F32', label: 'Galaxy A52 - Storage Area', model: 'Samsung Galaxy A52', battery: 0, network: 'Offline', status: 'offline' },
  ];

  const getBatteryColor = (battery: number) => {
    if (battery > 50) return 'text-emerald-400';
    if (battery > 20) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getStatusColor = (status: string) => {
    if (status === 'online') return 'bg-emerald-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-slate-50">Fleet Status</h2>
        <button
          onClick={() => navigate('/devices')}
          className="text-sm text-indigo-400 hover:text-indigo-300"
        >
          View All →
        </button>
      </div>

      <div className="space-y-3">
        {devices.map((device) => (
          <button
            key={device.id}
            onClick={() => navigate(`/devices/${device.id}`)}
            className="w-full flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg hover:border-slate-600 hover:bg-slate-800 transition-all text-left"
          >
            <div className="p-3 bg-indigo-500/10 rounded-lg">
              <Smartphone className="w-5 h-5 text-indigo-400" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-slate-200">{device.label}</span>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(device.status)}`} />
              </div>
              <p className="text-sm text-slate-400">{device.model}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Battery className={`w-4 h-4 ${getBatteryColor(device.battery)}`} />
                <span className={`text-sm font-medium ${getBatteryColor(device.battery)}`}>
                  {device.battery}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-400">{device.network}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
