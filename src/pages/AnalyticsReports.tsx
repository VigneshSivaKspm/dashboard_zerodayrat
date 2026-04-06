import { useState, useEffect } from "react";
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
import { BarChart3, Download, TrendingUp } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function AnalyticsReports() {
  const {
    activityReport,
    trainingPerformance,
    dashboardStats,
    topDevices,
    loading,
    fetchActivityReport,
    fetchTrainingPerformance,
    fetchDashboardStats,
    fetchTopDevices,
    exportCSV,
    exportJSON,
    exportPDF,
  } = useAnalytics();

  const [reportType, setReportType] = useState("activity");
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [exportFormat, setExportFormat] = useState("csv");

  useEffect(() => {
    fetchDashboardStats();
    fetchTopDevices();
  }, [fetchDashboardStats, fetchTopDevices]);

  const handleGenerateReport = async () => {
    switch (reportType) {
      case "activity":
        await fetchActivityReport(startDate, endDate);
        break;
      case "training":
        await fetchTrainingPerformance();
        break;
      case "devices":
        await fetchTopDevices();
        break;
      default:
        break;
    }
  };

  const handleExport = async () => {
    try {
      if (exportFormat === "csv") {
        await exportCSV("analytics", startDate, endDate);
      } else if (exportFormat === "json") {
        await exportJSON("analytics", startDate, endDate);
      } else if (exportFormat === "pdf") {
        await exportPDF("analytics", startDate, endDate);
      }
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Analytics & Reports
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate and export detailed reports
          </p>
        </div>
        <Button onClick={handleExport} size="sm">
          <Download className="h-4 w-4 mr-1" />
          Export Report
        </Button>
      </div>

      {/* Report Configuration */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Report Configuration</CardTitle>
          <CardDescription className="text-xs">
            Customize your report
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid grid-cols-4 gap-2">
            <div>
              <label className="text-xs font-medium text-gray-700">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="mt-1 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activity">Activity Report</SelectItem>
                  <SelectItem value="training">Training Performance</SelectItem>
                  <SelectItem value="devices">Device Analytics</SelectItem>
                  <SelectItem value="security">Security Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">
                Start Date
              </label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
                onChange={(e) => setEndDate(e.target.value)}
                className="mt-1 text-sm h-8"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700">
                Format
              </label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger className="mt-1 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            onClick={handleGenerateReport}
            disabled={loading}
            className="w-full text-sm"
          >
            {loading ? "Generating..." : "Generate Report"}
          </Button>
        </CardContent>
      </Card>

      {/* Dashboard Statistics */}
      <div className="grid grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total Devices</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {dashboardStats?.totalDevices || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Active Devices</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {dashboardStats?.activeDevices || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total SMS</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {activityReport?.totalSMS || dashboardStats?.totalSMS || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total Notifications</p>
            <p className="text-lg font-bold text-purple-600 mt-1">
              {activityReport?.totalNotifications ||
                dashboardStats?.totalNotifications ||
                0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Report */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Activity Report</CardTitle>
          <CardDescription className="text-xs">
            {activityReport?.period || `${startDate} to ${endDate}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activityReport?.topApps ? (
            <div className="space-y-2">
              {activityReport.topApps
                .slice(0, 5)
                .map((app: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between text-xs"
                  >
                    <p className="text-gray-900">{app.name}</p>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded h-2">
                        <div
                          className="bg-blue-500 h-2 rounded"
                          style={{
                            width: `${Math.min(100, (app.count / (activityReport.topApps[0]?.count || 1)) * 100)}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-gray-600 w-8">{app.count}</span>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">
              Generate a report to view data
            </p>
          )}
        </CardContent>
      </Card>

      {/* Training Performance */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Training Performance</CardTitle>
          <CardDescription className="text-xs">
            {trainingPerformance.length} sessions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trainingPerformance.length > 0 ? (
            <div className="space-y-2">
              {trainingPerformance.slice(0, 5).map((perf, index) => (
                <div
                  key={index}
                  className="p-2 text-xs bg-gray-50 rounded flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {perf.trainingType}
                    </p>
                    <p className="text-gray-500">{perf.deviceId}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline" className="text-xs">
                      {perf.score}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">
              No training data available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Top Devices */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Top Devices by Activity
          </CardTitle>
          <CardDescription className="text-xs">
            Most active devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          {topDevices.length > 0 ? (
            <div className="space-y-2">
              {topDevices.slice(0, 5).map((device: any, index: number) => (
                <div key={index} className="p-2 text-xs bg-gray-50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{device.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {device.activityCount} activities
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded h-2">
                    <div
                      className="bg-green-500 h-2 rounded"
                      style={{
                        width: `${Math.min(100, (device.activityCount / (topDevices[0]?.activityCount || 1)) * 100)}%`,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">
              No device data available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Quick Export</CardTitle>
          <CardDescription className="text-xs">
            Download reports in your preferred format
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => {
              setExportFormat("csv");
              handleExport();
            }}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Export CSV
          </Button>
          <Button
            onClick={() => {
              setExportFormat("json");
              handleExport();
            }}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Export JSON
          </Button>
          <Button
            onClick={() => {
              setExportFormat("pdf");
              handleExport();
            }}
            variant="outline"
            size="sm"
            className="text-xs"
          >
            Export PDF
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
