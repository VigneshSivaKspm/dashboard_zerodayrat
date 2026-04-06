// Device monitoring service
import apiClient from "./api";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

export interface DeviceInfo {
  id: string;
  label: string;
  deviceId: string;
  model: string;
  osVersion: string;
  battery: number;
  network: string;
  status: "online" | "offline";
  lastSync: string;
  cpu: number;
  memory: number;
  storage: number;
}

export interface AppUsage {
  appName: string;
  packageName: string;
  usageTime: number;
  category: string;
}

export interface BackgroundActivity {
  id: string;
  deviceId: string;
  timestamp: string;
  activityType: string;
  description: string;
  severity: "low" | "medium" | "high";
}

class DeviceMonitoringService {
  // Get all devices
  async getDevices(): Promise<DeviceInfo[]> {
    try {
      const response = await apiClient.get("/devices");
      return response.data;
    } catch (error) {
      console.error("Error fetching devices:", error);
      throw error;
    }
  }

  // Get device details with real-time updates
  subscribeToDevice(deviceId: string, callback: (device: DeviceInfo) => void) {
    const dbRef = ref(database, `devices/${deviceId}`);
    return onValue(dbRef, (snapshot: any) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
  }

  // Get app usage statistics
  async getAppUsage(deviceId: string): Promise<AppUsage[]> {
    try {
      const response = await apiClient.get(`/devices/${deviceId}/app-usage`);
      return response.data;
    } catch (error) {
      console.error("Error fetching app usage:", error);
      throw error;
    }
  }

  // Get background activity logs
  async getBackgroundActivity(
    deviceId: string,
    limit: number = 100,
  ): Promise<BackgroundActivity[]> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/background-activity`,
        {
          params: { limit },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching background activity:", error);
      throw error;
    }
  }

  // Subscribe to device health metrics (real-time)
  subscribeToDeviceHealth(deviceId: string, callback: (metrics: any) => void) {
    const dbRef = ref(database, `devices/${deviceId}/metrics`);
    return onValue(dbRef, (snapshot: any) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
  }

  // Get device location (if available)
  async getDeviceLocation(deviceId: string) {
    try {
      const response = await apiClient.get(`/devices/${deviceId}/location`);
      return response.data;
    } catch (error) {
      console.error("Error fetching device location:", error);
      throw error;
    }
  }
}

export default new DeviceMonitoringService();
