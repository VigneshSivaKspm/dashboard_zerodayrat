import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router";
import {
  LayoutDashboard,
  Smartphone,
  Database,
  FolderOpen,
  BarChart3,
  Settings as SettingsIcon,
  Users,
  Search,
  Bell,
  User,
  Menu,
  X,
  ChevronDown,
  Activity,
} from "lucide-react";

export function RootLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    {
      label: "DASHBOARD",
      children: [
        { icon: Activity, label: "Overview", path: "/dashboard-overview" },
        { icon: Bell, label: "Notifications", path: "/notification-logs" },
        {
          icon: Activity,
          label: "Activity Timeline",
          path: "/activity-timeline",
        },
      ],
    },
    {
      label: "DATA & LOGS",
      children: [
        { icon: Bell, label: "Notification Logs", path: "/notification-logs" },
        { icon: Database, label: "SMS Logs", path: "/sms-logs" },
        { icon: Database, label: "Data Logs", path: "/logs" },
        {
          icon: FolderOpen,
          label: "Activity Timeline",
          path: "/activity-timeline",
        },
      ],
    },
    {
      label: "CONTROL & MANAGEMENT",
      children: [
        { icon: SettingsIcon, label: "Control Panel", path: "/control-panel" },
        { icon: Smartphone, label: "Device Fleet", path: "/devices" },
        { icon: Users, label: "User Management", path: "/users" },
      ],
    },
    {
      label: "ANALYTICS & TRACKING",
      children: [
        {
          icon: BarChart3,
          label: "Analytics Reports",
          path: "/analytics-reports",
        },
        {
          icon: Activity,
          label: "Activity Timeline",
          path: "/activity-timeline",
        },
        {
          icon: Activity,
          label: "Location Tracking",
          path: "/location-tracking",
        },
      ],
    },
    {
      label: "TRAINING & MEDIA",
      children: [
        {
          icon: Activity,
          label: "Training Manager",
          path: "/training-manager",
        },
        { icon: FolderOpen, label: "Media Manager", path: "/media" },
      ],
    },
    { icon: SettingsIcon, label: "Settings", path: "/settings" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-slate-900 border-b border-slate-800 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-indigo-500" />
            <h1 className="text-xl font-semibold">MDM Control Center</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search device ID or label..."
              className="w-64 pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-indigo-500 text-sm"
            />
          </div>

          {/* Sync Status */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm text-emerald-400">All Systems Live</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 hover:bg-slate-800 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {/* Admin Profile */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <ChevronDown className="w-4 h-4" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-2">
                <div className="px-4 py-2 border-b border-slate-700">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-slate-400">admin@mdm.com</p>
                </div>
                <button className="w-full px-4 py-2 text-left text-sm hover:bg-slate-700 transition-colors">
                  Profile Settings
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full px-4 py-2 text-left text-sm text-rose-400 hover:bg-slate-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-slate-900 border-r border-slate-800 transition-transform duration-300 z-30 overflow-y-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item, idx) => {
            if ("children" in item) {
              const sectionExpanded = expandedSections.includes(item.label);
              return (
                <div key={idx}>
                  <button
                    onClick={() => {
                      setExpandedSections(
                        sectionExpanded
                          ? expandedSections.filter((s) => s !== item.label)
                          : [...expandedSections, item.label],
                      );
                    }}
                    className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${sectionExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                  {sectionExpanded && (
                    <div className="ml-2 space-y-1 mt-1">
                      {item.children.map((child: any) => {
                        const Icon = child.icon;
                        const active = isActive(child.path);
                        return (
                          <button
                            key={child.path}
                            onClick={() => navigate(child.path)}
                            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-all text-sm ${
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            } else {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            }
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
