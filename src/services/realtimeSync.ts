// Real-time sync and webhook service
import apiClient from "./api";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

export interface SyncStatus {
  deviceId: string;
  lastSync: string;
  nextSync: string;
  status: "synced" | "syncing" | "pending" | "failed";
  dataTypes: string[];
  progress?: number;
}

export interface WebhookEvent {
  id: string;
  eventType: string;
  timestamp: string;
  deviceId: string;
  data: Record<string, any>;
}

class RealTimeSyncService {
  private listeners: Map<string, any> = new Map();

  // Subscribe to device sync status
  subscribeSyncStatus(
    deviceId: string,
    callback: (status: SyncStatus) => void,
  ): () => void {
    const dbRef = ref(database, `sync/${deviceId}`);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });

    this.listeners.set(`sync-${deviceId}`, unsubscribe);

    return () => {
      unsubscribe();
      this.listeners.delete(`sync-${deviceId}`);
    };
  }

  // Manual sync trigger
  async triggerSync(
    deviceId: string,
    dataTypes?: string[],
  ): Promise<SyncStatus> {
    try {
      const response = await apiClient.post(`/devices/${deviceId}/sync`, {
        dataTypes: dataTypes || ["all"],
      });
      return response.data;
    } catch (error) {
      console.error("Error triggering sync:", error);
      throw error;
    }
  }

  // Get sync history
  async getSyncHistory(deviceId: string, limit: number = 50): Promise<any[]> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/sync-history`,
        {
          params: { limit },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching sync history:", error);
      throw error;
    }
  }

  // Subscribe to all device updates (real-time)
  subscribeToAllDeviceUpdates(
    callback: (event: WebhookEvent) => void,
  ): () => void {
    const dbRef = ref(database, "events");

    const unsubscribe = onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });

    this.listeners.set("all-updates", unsubscribe);

    return () => {
      unsubscribe();
      this.listeners.delete("all-updates");
    };
  }

  // Configure webhook endpoints
  async configureWebhook(
    webhookUrl: string,
    events: string[],
  ): Promise<{ webhookId: string }> {
    try {
      const response = await apiClient.post("/webhooks/configure", {
        url: webhookUrl,
        events,
      });
      return response.data;
    } catch (error) {
      console.error("Error configuring webhook:", error);
      throw error;
    }
  }

  // Get active webhooks
  async getActiveWebhooks(): Promise<any[]> {
    try {
      const response = await apiClient.get("/webhooks");
      return response.data;
    } catch (error) {
      console.error("Error fetching webhooks:", error);
      throw error;
    }
  }

  // Remove webhook
  async removeWebhook(webhookId: string): Promise<void> {
    try {
      await apiClient.delete(`/webhooks/${webhookId}`);
    } catch (error) {
      console.error("Error removing webhook:", error);
      throw error;
    }
  }

  // Get sync statistics
  async getSyncStats(): Promise<any> {
    try {
      const response = await apiClient.get("/sync-stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching sync stats:", error);
      throw error;
    }
  }

  // Cleanup all listeners
  cleanup(): void {
    this.listeners.forEach((unsubscribe) => {
      unsubscribe();
    });
    this.listeners.clear();
  }
}

export default new RealTimeSyncService();
