import { useState } from 'react';
import { Search, Filter, Download, Image as ImageIcon, FileText, Folder, File } from 'lucide-react';

export function MediaManager() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'files'>('gallery');
  const [selectedDevice, setSelectedDevice] = useState('all');

  const gallery = [
    {
      id: 1,
      device: 'Device A13',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?w=400&h=400&fit=crop',
      timestamp: '10:00:15 AM',
      date: 'April 6, 2026',
      captured: 'remote',
    },
    {
      id: 2,
      device: 'Device B22',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      timestamp: '09:45:30 AM',
      date: 'April 6, 2026',
      captured: 'device',
    },
    {
      id: 3,
      device: 'Device C45',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=400&fit=crop',
      timestamp: '09:30:12 AM',
      date: 'April 6, 2026',
      captured: 'remote',
    },
    {
      id: 4,
      device: 'Device D78',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop',
      timestamp: '09:15:45 AM',
      date: 'April 6, 2026',
      captured: 'device',
    },
    {
      id: 5,
      device: 'Device E91',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop',
      timestamp: '09:00:20 AM',
      date: 'April 6, 2026',
      captured: 'remote',
    },
    {
      id: 6,
      device: 'Device A13',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
      timestamp: '08:45:10 AM',
      date: 'April 6, 2026',
      captured: 'device',
    },
  ];

  const files = [
    {
      id: 1,
      device: 'Device A13',
      name: 'document.pdf',
      type: 'pdf',
      size: '2.4 MB',
      path: '/Documents/document.pdf',
      modified: '10:05:12 AM',
      activity: 'Modified',
    },
    {
      id: 2,
      device: 'Device B22',
      name: 'presentation.pptx',
      type: 'pptx',
      size: '5.7 MB',
      path: '/Documents/presentation.pptx',
      modified: '09:50:30 AM',
      activity: 'Created',
    },
    {
      id: 3,
      device: 'Device C45',
      name: 'spreadsheet.xlsx',
      type: 'xlsx',
      size: '1.2 MB',
      path: '/Documents/spreadsheet.xlsx',
      modified: '09:35:15 AM',
      activity: 'Accessed',
    },
    {
      id: 4,
      device: 'Device D78',
      name: 'notes.txt',
      type: 'txt',
      size: '24 KB',
      path: '/Documents/notes.txt',
      modified: '09:20:45 AM',
      activity: 'Modified',
    },
  ];

  const getFileIcon = (type: string) => {
    if (type === 'pdf') return '📄';
    if (type === 'pptx') return '📊';
    if (type === 'xlsx') return '📈';
    return '📝';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-50 mb-2">File & Media Access</h1>
          <p className="text-slate-400">Browse device storage and remote captures</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
          <Download className="w-4 h-4" />
          Download Selected
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-800">
        <div className="flex gap-4">
          {(['gallery', 'files'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 border-b-2 font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab === 'gallery' ? (
                <span className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" />
                  Gallery
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Files
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'gallery' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search gallery..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
              />
            </div>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Devices</option>
              <option value="A13">Device A13</option>
              <option value="B22">Device B22</option>
              <option value="C45">Device C45</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 rounded-lg transition-colors">
              <Filter className="w-4 h-4" />
              Filter by Date
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-indigo-500 transition-all cursor-pointer"
              >
                <div className="aspect-square bg-slate-800">
                  <img
                    src={item.url}
                    alt={`${item.device} capture`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-medium text-white mb-1">{item.device}</p>
                    <p className="text-xs text-slate-300">{item.timestamp}</p>
                    {item.captured === 'remote' && (
                      <span className="inline-block mt-2 px-2 py-0.5 bg-indigo-500/20 border border-indigo-500/30 rounded text-xs text-indigo-300">
                        Remote Capture
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'files' && (
        <div className="space-y-4">
          {/* Search & Filter */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search files..."
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 text-slate-200"
              />
            </div>
            <select
              value={selectedDevice}
              onChange={(e) => setSelectedDevice(e.target.value)}
              className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Devices</option>
              <option value="A13">Device A13</option>
              <option value="B22">Device B22</option>
              <option value="C45">Device C45</option>
            </select>
          </div>

          {/* Files Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50 border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Filename
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Device
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Path
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Activity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Modified
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {files.map((file) => (
                    <tr key={file.id} className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{getFileIcon(file.type)}</span>
                          <span className="text-sm font-medium text-slate-200">{file.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-300">{file.device}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs text-slate-400 uppercase">
                          {file.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{file.size}</td>
                      <td className="px-4 py-3 text-sm text-slate-500 font-mono">{file.path}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                          file.activity === 'Modified'
                            ? 'bg-amber-500/10 text-amber-400'
                            : file.activity === 'Created'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-blue-500/10 text-blue-400'
                        }`}>
                          {file.activity}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400">{file.modified}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Folder Browser */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-slate-50 mb-4">Directory Structure</h3>
            <div className="space-y-2">
              {[
                { name: 'Documents', count: 24 },
                { name: 'Downloads', count: 18 },
                { name: 'Pictures', count: 142 },
                { name: 'Videos', count: 8 },
                { name: 'Music', count: 0 },
              ].map((folder) => (
                <button
                  key={folder.name}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5 text-amber-400" />
                    <span className="text-sm font-medium text-slate-200">{folder.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{folder.count} items</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
