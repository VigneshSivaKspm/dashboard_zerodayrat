import { useState, useEffect, ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Bell, Download, Search } from "lucide-react";
import { useNotificationsAndSMS } from "@/hooks/useNotificationsAndSMS";

export default function NotificationLogs() {
  const [selectedDevice] = useState("all");
  const { notifications, loading, refetch } =
    useNotificationsAndSMS(selectedDevice);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filteredNotifications, setFilteredNotifications] =
    useState(notifications);

  useEffect(() => {
    refetch();
  }, [selectedDevice, refetch]);

  useEffect(() => {
    let filtered = notifications;

    if (searchTerm) {
      filtered = filtered.filter(
        (n: any) =>
          n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.app?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((n: any) => n.app === filterType);
    }

    setFilteredNotifications(filtered);
  }, [notifications, searchTerm, filterType]);

  const handleExport = () => {
    const csv = [
      ["Device", "App", "Title", "Type", "Timestamp"],
      ...filteredNotifications.map((n: any) => [
        n.deviceId,
        n.app || "System",
        n.title || "N/A",
        n.packageName || "notification",
        new Date(n.timestamp).toLocaleString(),
      ]),
    ]
      .map((row: any) => row.map((cell: any) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `notification-logs-${new Date().toISOString().split("T")[0]}.csv`;
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
            <Bell className="h-6 w-6" />
            Notification Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track all device notifications
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
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search app or title..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-8 text-sm h-8"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="system">System</SelectItem>
                <SelectItem value="app">App</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">
            {filteredNotifications.length} Notifications
          </CardTitle>
          <CardDescription className="text-xs">
            Total: {notifications.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-6 w-6 border-b-2 border-blue-500 rounded-full"></div>
            </div>
          ) : filteredNotifications.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No notifications found
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredNotifications.map((notification: any, index: number) => (
                <div
                  key={index}
                  className="p-2 border rounded text-xs bg-slate-900 hover:bg-slate-800/50"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-slate-50">
                          {notification.app || "System"}
                        </p>
                        <Badge variant="outline" className="text-xs capitalize">
                          {notification.packageName || "notification"}
                        </Badge>
                      </div>
                      <p className="text-slate-300 line-clamp-2">
                        {notification.title || "No title"}
                      </p>
                      {notification.body && (
                        <p className="text-slate-400 line-clamp-1 mt-1">
                          {notification.body}
                        </p>
                      )}
                    </div>
                    <span className="text-gray-400 whitespace-nowrap">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-slate-400">Today</p>
            <p className="text-lg font-bold text-slate-50 mt-1">
              {
                filteredNotifications.filter(
                  (n: any) =>
                    new Date(n.timestamp).toDateString() ===
                    new Date().toDateString(),
                ).length
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-slate-400">This Week</p>
            <p className="text-lg font-bold text-slate-50 mt-1">
              {
                filteredNotifications.filter(
                  (n: any) =>
                    new Date(n.timestamp).getTime() >
                    new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
                ).length
              }
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-slate-400">Total Devices</p>
            <p className="text-lg font-bold text-slate-50 mt-1">
              {new Set(filteredNotifications.map((n: any) => n.deviceId)).size}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


