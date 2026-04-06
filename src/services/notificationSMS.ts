// Notification and SMS monitoring service
import apiClient from "./api";
import { ref, onValue } from "firebase/database";
import { database } from "./firebase";

export interface MobileNotification {
  id: string;
  deviceId: string;
  timestamp: string;
  app: string;
  title: string;
  body: string;
  packageName: string;
  icon?: string;
}

export interface SMSMessage {
  id: string;
  deviceId: string;
  timestamp: string;
  phoneNumber: string;
  message: string;
  type: "incoming" | "outgoing";
  deliveryStatus?: string;
}

export interface AlertEvent {
  id: string;
  deviceId: string;
  timestamp: string;
  eventType: string;
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  data: Record<string, any>;
}

class NotificationSMSService {
  // Get notifications
  async getNotifications(
    deviceId?: string,
    limit: number = 100,
    startDate?: string,
  ): Promise<MobileNotification[]> {
    try {
      const params: any = { limit };
      if (startDate) params.startDate = startDate;

      const endpoint = deviceId
        ? `/devices/${deviceId}/notifications`
        : "/notifications";

      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching notifications:", error);
      throw error;
    }
  }

  // Subscribe to real-time notifications
  subscribeToNotifications(
    deviceId: string,
    callback: (notification: MobileNotification) => void,
  ) {
    const dbRef = ref(database, `notifications/${deviceId}`);
    return onValue(dbRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        callback(data);
      }
    });
  }

  // Get SMS messages
  async getSMS(
    deviceId: string,
    type: "incoming" | "outgoing" | "all" = "all",
    limit: number = 100,
  ): Promise<SMSMessage[]> {
    try {
      const params: any = { limit };
      if (type !== "all") params.type = type;

      const response = await apiClient.get(`/devices/${deviceId}/sms`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching SMS:", error);
      throw error;
    }
  }

  // Send SMS from device
  async sendSMS(
    deviceId: string,
    phoneNumber: string,
    message: string,
  ): Promise<{ success: boolean; messageId: string }> {
    try {
      const response = await apiClient.post(`/devices/${deviceId}/send-sms`, {
        phoneNumber,
        message,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
    }
  }

  // Subscribe to SMS updates (real-time)
  subscribeToSMS(deviceId: string, callback: (sms: SMSMessage) => void) {
    const dbRef = ref(database, `sms/${deviceId}`);
    return onValue(dbRef, (snapshot: any) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
  }

  // Get alert events
  async getAlerts(
    deviceId?: string,
    severity?: string,
    limit: number = 100,
  ): Promise<AlertEvent[]> {
    try {
      const params: any = { limit };
      if (severity) params.severity = severity;

      const endpoint = deviceId ? `/devices/${deviceId}/alerts` : "/alerts";

      const response = await apiClient.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching alerts:", error);
      throw error;
    }
  }

  // Subscribe to critical alerts (real-time)
  subscribeToAlerts(callback: (alert: AlertEvent) => void) {
    const dbRef = ref(database, "alerts");
    return onValue(dbRef, (snapshot: any) => {
      if (snapshot.exists()) {
        callback(snapshot.val());
      }
    });
  }
}

export default new NotificationSMSService();
