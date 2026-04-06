// Analytics and reporting service
import apiClient from "./api";

export interface ActivityReport {
  id: string;
  period: string;
  totalDevices: number;
  activeDevices: number;
  totalSMS: number;
  totalNotifications: number;
  totalPhotos: number;
  topApps: Array<{ name: string; count: number }>;
  timelineData: Array<{ time: string; count: number }>;
}

export interface TrainingPerformance {
  sessionId: string;
  deviceId: string;
  trainingType: string;
  startTime: string;
  endTime: string;
  duration: number;
  score: number;
  level: "beginner" | "intermediate" | "advanced";
  completed: boolean;
}

export interface ExportData {
  format: "csv" | "json" | "pdf";
  dataType: string;
  startDate: string;
  endDate: string;
  filters?: Record<string, any>;
}

class AnalyticsService {
  // Get activity report
  async getActivityReport(
    startDate: string,
    endDate: string,
    groupBy: "day" | "week" | "month" = "day",
  ): Promise<ActivityReport> {
    try {
      const response = await apiClient.get("/analytics/activity-report", {
        params: { startDate, endDate, groupBy },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching activity report:", error);
      throw error;
    }
  }

  // Get device activity report
  async getDeviceActivityReport(
    deviceId: string,
    startDate: string,
    endDate: string,
  ): Promise<ActivityReport> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/analytics/activity`,
        {
          params: { startDate, endDate },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching device activity report:", error);
      throw error;
    }
  }

  // Get training performance
  async getTrainingPerformance(
    deviceId?: string,
    limit: number = 100,
  ): Promise<TrainingPerformance[]> {
    try {
      const endpoint = deviceId
        ? `/devices/${deviceId}/analytics/training-performance`
        : "/analytics/training-performance";

      const response = await apiClient.get(endpoint, {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching training performance:", error);
      throw error;
    }
  }

  // Get dashboard statistics
  async getDashboardStats(): Promise<any> {
    try {
      const response = await apiClient.get("/analytics/dashboard-stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      throw error;
    }
  }

  // Get top devices by activity
  async getTopDevices(
    limit: number = 10,
    period: string = "week",
  ): Promise<any[]> {
    try {
      const response = await apiClient.get("/analytics/top-devices", {
        params: { limit, period },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching top devices:", error);
      throw error;
    }
  }

  // Get user activity analytics
  async getUserActivityAnalytics(userId: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/analytics/users/${userId}/activity`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user activity analytics:", error);
      throw error;
    }
  }

  // Export logs to CSV
  async exportLogsCSV(
    dataType: string,
    startDate: string,
    endDate: string,
    filters?: Record<string, any>,
  ): Promise<Blob> {
    try {
      const response = await apiClient.get("/analytics/export/csv", {
        params: {
          dataType,
          startDate,
          endDate,
          filters: JSON.stringify(filters),
        },
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting CSV:", error);
      throw error;
    }
  }

  // Export logs to JSON
  async exportLogsJSON(
    dataType: string,
    startDate: string,
    endDate: string,
    filters?: Record<string, any>,
  ): Promise<any> {
    try {
      const response = await apiClient.get("/analytics/export/json", {
        params: {
          dataType,
          startDate,
          endDate,
          filters: JSON.stringify(filters),
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting JSON:", error);
      throw error;
    }
  }

  // Export logs to PDF
  async exportLogsPDF(
    dataType: string,
    startDate: string,
    endDate: string,
    filters?: Record<string, any>,
  ): Promise<Blob> {
    try {
      const response = await apiClient.get("/analytics/export/pdf", {
        params: {
          dataType,
          startDate,
          endDate,
          filters: JSON.stringify(filters),
        },
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Error exporting PDF:", error);
      throw error;
    }
  }

  // Generate custom report
  async generateCustomReport(
    title: string,
    metrics: string[],
    startDate: string,
    endDate: string,
    deviceIds?: string[],
  ): Promise<any> {
    try {
      const response = await apiClient.post("/analytics/custom-report", {
        title,
        metrics,
        startDate,
        endDate,
        deviceIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error generating custom report:", error);
      throw error;
    }
  }

  // Schedule report
  async scheduleReport(
    title: string,
    metrics: string[],
    frequency: "daily" | "weekly" | "monthly",
    sendTo: string[],
    startDate: string,
  ): Promise<any> {
    try {
      const response = await apiClient.post("/analytics/schedule-report", {
        title,
        metrics,
        frequency,
        sendTo,
        startDate,
      });
      return response.data;
    } catch (error) {
      console.error("Error scheduling report:", error);
      throw error;
    }
  }

  // Get report history
  async getReportHistory(limit: number = 50): Promise<any[]> {
    try {
      const response = await apiClient.get("/analytics/reports/history", {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching report history:", error);
      throw error;
    }
  }
}

export default new AnalyticsService();
