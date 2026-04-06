import { useState, useCallback } from "react";
import analyticsService, {
  ActivityReport,
  TrainingPerformance,
} from "../services/analytics";

export function useAnalytics() {
  const [activityReport, setActivityReport] = useState<ActivityReport | null>(
    null,
  );
  const [trainingPerformance, setTrainingPerformance] = useState<
    TrainingPerformance[]
  >([]);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [topDevices, setTopDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch activity report
  const fetchActivityReport = useCallback(
    async (
      startDate: string,
      endDate: string,
      groupBy: "day" | "week" | "month" = "day",
    ) => {
      setLoading(true);
      setError(null);
      try {
        const report = await analyticsService.getActivityReport(
          startDate,
          endDate,
          groupBy,
        );
        setActivityReport(report);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Fetch training performance
  const fetchTrainingPerformance = useCallback(async (deviceId?: string) => {
    setLoading(true);
    setError(null);
    try {
      const performance =
        await analyticsService.getTrainingPerformance(deviceId);
      setTrainingPerformance(performance);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch dashboard stats
  const fetchDashboardStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stats = await analyticsService.getDashboardStats();
      setDashboardStats(stats);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch top devices
  const fetchTopDevices = useCallback(
    async (limit: number = 10, period: string = "week") => {
      setLoading(true);
      setError(null);
      try {
        const devices = await analyticsService.getTopDevices(limit, period);
        setTopDevices(devices);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Export to CSV
  const exportCSV = useCallback(
    async (
      dataType: string,
      startDate: string,
      endDate: string,
      filters?: Record<string, any>,
    ) => {
      try {
        const blob = await analyticsService.exportLogsCSV(
          dataType,
          startDate,
          endDate,
          filters,
        );
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${dataType}-${startDate}-to-${endDate}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      }
    },
    [],
  );

  // Export to JSON
  const exportJSON = useCallback(
    async (
      dataType: string,
      startDate: string,
      endDate: string,
      filters?: Record<string, any>,
    ) => {
      try {
        const data = await analyticsService.exportLogsJSON(
          dataType,
          startDate,
          endDate,
          filters,
        );
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${dataType}-${startDate}-to-${endDate}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      }
    },
    [],
  );

  // Export to PDF
  const exportPDF = useCallback(
    async (
      dataType: string,
      startDate: string,
      endDate: string,
      filters?: Record<string, any>,
    ) => {
      try {
        const blob = await analyticsService.exportLogsPDF(
          dataType,
          startDate,
          endDate,
          filters,
        );
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${dataType}-${startDate}-to-${endDate}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      }
    },
    [],
  );

  return {
    activityReport,
    trainingPerformance,
    dashboardStats,
    topDevices,
    loading,
    error,
    fetchActivityReport,
    fetchTrainingPerformance,
    fetchDashboardStats,
    fetchTopDevices,
    exportCSV,
    exportJSON,
    exportPDF,
  };
}
