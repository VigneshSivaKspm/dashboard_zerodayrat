import { useState, useEffect, ChangeEvent } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Activity, Download } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Input } from "@/app/components/ui/input";

export default function ActivityTimeline() {
  const { activityReport, loading, fetchActivityReport } = useAnalytics();
  const [selectedDevice, setSelectedDevice] = useState("all");
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  useEffect(() => {
    fetchActivityReport(startDate, endDate, "day");
  }, [startDate, endDate, fetchActivityReport]);

  const handleExport = () => {
    const csv = [
      ["Time", "Activity", "Device", "Type", "Status"],
      ...(activityReport?.timelineData || []).map((item: any) => [
        item.time,
        item.description || "Activity",
        item.device || "N/A",
        item.type || "N/A",
        item.status || "N/A",
      ]),
    ]
      .map((row: any) => row.map((cell: any) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `activity-timeline-${startDate}-to-${endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 space-y-4 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <Activity className="h-6 w-6" />
            Activity Timeline
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track all device activities over time
          </p>
        </div>
        <Button onClick={handleExport} size="sm" variant="outline">
          <Download className="h-4 w-4 mr-1" />
          Export
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-3 space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-700">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setStartDate(e.target.value)
                }
                className="mt-1 text-sm h-8"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">
                End Date
              </label>
              <Input
                type="date"
                value={endDate}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEndDate(e.target.value)
                }
                className="mt-1 text-sm h-8"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">
                Device
              </label>
              <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                <SelectTrigger className="mt-1 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Devices</SelectItem>
                  <SelectItem value="device1">Device 1</SelectItem>
                  <SelectItem value="device2">Device 2</SelectItem>
                  <SelectItem value="device3">Device 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total Activities</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {activityReport?.timelineData?.reduce(
                (sum: number, item: any) => sum + (item.count || 0),
                0,
              ) || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Notifications</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {activityReport?.totalNotifications || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">SMS Messages</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {activityReport?.totalSMS || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Media Access</p>
            <p className="text-lg font-bold text-purple-600 mt-1">
              {activityReport?.totalPhotos || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Activity Timeline</CardTitle>
          <CardDescription className="text-xs">
            {activityReport?.period || "Loading..."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-6 w-6 border-b-2 border-blue-500 rounded-full"></div>
            </div>
          ) : activityReport?.timelineData &&
            activityReport.timelineData.length > 0 ? (
            <div className="space-y-3">
              {activityReport.timelineData.map((item: any, index: number) => (
                <div key={index} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-2 h-2 rounded-full ${item.count > 5 ? "bg-red-500" : item.count > 2 ? "bg-yellow-500" : "bg-blue-500"}`}
                    ></div>
                    {index < activityReport.timelineData.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{item.time}</p>
                      <Badge variant="outline" className="text-xs">
                        {item.count} activities
                      </Badge>
                    </div>
                    <p className="text-gray-600 mt-1">
                      {item.description || "Device activity recorded"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-gray-500">
              No activities found for the selected period
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Apps */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Top Active Apps</CardTitle>
          <CardDescription className="text-xs">
            Most accessed applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activityReport?.topApps && activityReport.topApps.length > 0 ? (
            <div className="space-y-2">
              {activityReport.topApps.map((app: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 text-xs bg-gray-50 rounded"
                >
                  <p className="font-medium text-gray-900">{app.name}</p>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${(app.count / Math.max(...activityReport.topApps.map((a: any) => a.count), 1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="font-bold text-gray-700 w-6">
                      {app.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-xs text-gray-500">
              No app data available
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
