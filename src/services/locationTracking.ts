// Location tracking service
import apiClient from "./api";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

export interface LocationData {
  deviceId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number;
  speed: number;
  heading: number;
  timestamp: string;
  address?: string;
  provider: "gps" | "network" | "passive";
}

export interface LocationHistory {
  id: string;
  deviceId: string;
  locations: LocationData[];
  startTime: string;
  endTime: string;
  distance: number;
  duration: number;
}

export interface Geofence {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number; // in meters
  active: boolean;
}

class LocationTrackingService {
  // Get current device location
  async getCurrentLocation(deviceId: string): Promise<LocationData> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/location/current`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching current location:", error);
      throw error;
    }
  }

  // Get location history
  async getLocationHistory(
    deviceId: string,
    options?: { startDate?: string; endDate?: string; limit?: number },
  ): Promise<LocationHistory> {
    try {
      const params: any = { limit: options?.limit || 1000 };
      if (options?.startDate) params.startDate = options.startDate;
      if (options?.endDate) params.endDate = options.endDate;

      const response = await apiClient.get(
        `/devices/${deviceId}/location/history`,
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching location history:", error);
      throw error;
    }
  }

  // Subscribe to real-time location
  subscribeToLocation(
    deviceId: string,
    callback: (location: LocationData) => void,
  ) {
    const dbRef = ref(database, `locations/${deviceId}/current`);
    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
  }

  // Start location tracking
  async startTracking(
    deviceId: string,
    interval: number = 60000,
  ): Promise<void> {
    try {
      await apiClient.post(`/devices/${deviceId}/location/start-tracking`, {
        interval,
      });
    } catch (error) {
      console.error("Error starting location tracking:", error);
      throw error;
    }
  }

  // Stop location tracking
  async stopTracking(deviceId: string): Promise<void> {
    try {
      await apiClient.post(`/devices/${deviceId}/location/stop-tracking`);
    } catch (error) {
      console.error("Error stopping location tracking:", error);
      throw error;
    }
  }

  // Create geofence
  async createGeofence(
    deviceId: string,
    geofence: Omit<Geofence, "id">,
  ): Promise<Geofence> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/geofences`,
        geofence,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating geofence:", error);
      throw error;
    }
  }

  // Get geofences
  async getGeofences(deviceId: string): Promise<Geofence[]> {
    try {
      const response = await apiClient.get(`/devices/${deviceId}/geofences`);
      return response.data;
    } catch (error) {
      console.error("Error fetching geofences:", error);
      throw error;
    }
  }

  // Delete geofence
  async deleteGeofence(deviceId: string, geofenceId: string): Promise<void> {
    try {
      await apiClient.delete(`/devices/${deviceId}/geofences/${geofenceId}`);
    } catch (error) {
      console.error("Error deleting geofence:", error);
      throw error;
    }
  }

  // Get routes between locations
  async getRoute(
    startLat: number,
    startLng: number,
    endLat: number,
    endLng: number,
  ): Promise<any> {
    try {
      const response = await apiClient.get("/maps/route", {
        params: {
          startLat,
          startLng,
          endLat,
          endLng,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error getting route:", error);
      throw error;
    }
  }
}

export default new LocationTrackingService();
