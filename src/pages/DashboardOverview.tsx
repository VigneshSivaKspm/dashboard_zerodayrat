import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import {
  AlertCircle,
  Activity,
  Smartphone,
  TrendingUp,
  Clock,
} from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useControl } from "@/hooks/useControl";

export default function DashboardOverview() {
  const { dashboardStats, loading, fetchDashboardStats } = useAnalytics();
  const { deviceGroups, fetchDeviceGroups } = useControl();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchDashboardStats();
    fetchDeviceGroups();
  }, [fetchDashboardStats, fetchDeviceGroups]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchDashboardStats();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-slate-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">
            Dashboard Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time device monitoring & control
          </p>
        </div>
        <Button
          onClick={handleRefresh}
          disabled={refreshing}
          size="sm"
          variant="outline"
        >
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400">Connected Devices</p>
                <p className="text-lg font-bold text-slate-50 mt-1">
                  {dashboardStats?.totalDevices || 0}
                </p>
              </div>
              <Smartphone className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400">Active Now</p>
                <p className="text-lg font-bold text-green-600 mt-1">
                  {dashboardStats?.activeDevices || 0}
                </p>
              </div>
              <Activity className="h-5 w-5 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400">Alerts</p>
                <p className="text-lg font-bold text-red-600 mt-1">
                  {dashboardStats?.alertCount || 0}
                </p>
              </div>
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-slate-400">Device Groups</p>
                <p className="text-lg font-bold text-purple-600 mt-1">
                  {deviceGroups?.length || 0}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Connected Devices Panel */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Connected Devices Panel</CardTitle>
          <CardDescription className="text-xs">
            Real-time device status
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {dashboardStats?.devices?.slice(0, 5).map((device: any) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-2 bg-slate-800/50 rounded text-xs"
            >
              <div className="flex items-center gap-2 flex-1">
                <div
                  className={`w-2 h-2 rounded-full ${device.isOnline ? "bg-green-500" : "bg-gray-300"}`}
                ></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-slate-50 truncate">
                    {device.name}
                  </p>
                  <p className="text-slate-400">{device.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 ml-2">
                {device.battery && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                    {device.battery}%
                  </span>
                )}
                <Badge
                  variant={device.isOnline ? "default" : "secondary"}
                  className="text-xs"
                >
                  {device.isOnline ? "Online" : "Offline"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Activity Feed */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Live Activity Feed</CardTitle>
          <CardDescription className="text-xs">
            Recent device activities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {dashboardStats?.recentActivities
            ?.slice(0, 8)
            .map((activity: any) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-2 text-xs border-b last:border-0"
              >
                <Clock className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-slate-50">{activity.description}</p>
                  <p className="text-slate-400 text-xs mt-0.5">
                    {activity.device} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
        </CardContent>
      </Card>

      {/* Device Status Monitoring */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Device Status Monitoring</CardTitle>
          <CardDescription className="text-xs">
            Health & performance metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {dashboardStats?.statusMetrics?.map((metric: any) => (
              <div key={metric.id} className="p-3 bg-slate-800/50 rounded">
                <p className="text-slate-400">{metric.label}</p>
                <p className="text-lg font-bold text-slate-50 mt-1">
                  {metric.value}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                  <div
                    className="bg-blue-500 h-1 rounded-full"
                    style={{ width: `${metric.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Device Groups */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Device Groups & Labels</CardTitle>
          <CardDescription className="text-xs">
            Organized device collections
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {deviceGroups?.map((group: any) => (
              <Badge key={group.id} variant="outline" className="text-xs">
                {group.name} ({group.deviceIds?.length || 0})
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


