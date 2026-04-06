// Control and action service for device commands
import apiClient from "./api";

export interface DeviceAction {
  id: string;
  deviceId: string;
  action: string;
  status: "pending" | "executing" | "completed" | "failed";
  timestamp: string;
  result?: any;
  error?: string;
}

export interface ScreenShareSession {
  id: string;
  deviceId: string;
  initiatedBy: string;
  startTime: string;
  endTime?: string;
  serverUrl: string;
}

export interface TrainingSession {
  id: string;
  deviceId: string;
  trainingType: string;
  startTime: string;
  endTime?: string;
  duration?: number;
  status: "active" | "completed" | "failed";
  data?: Record<string, any>;
}

export interface DeviceGroup {
  id: string;
  name: string;
  description: string;
  deviceIds: string[];
  createdAt: string;
  updatedAt: string;
}

class ControlService {
  // Send SMS action
  async sendSMSAction(
    deviceId: string,
    phoneNumber: string,
    message: string,
  ): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/send-sms`,
        {
          phoneNumber,
          message,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error sending SMS action:", error);
      throw error;
    }
  }

  // Lock device
  async lockDevice(deviceId: string): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/lock`,
      );
      return response.data;
    } catch (error) {
      console.error("Error locking device:", error);
      throw error;
    }
  }

  // Unlock device
  async unlockDevice(deviceId: string): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/unlock`,
      );
      return response.data;
    } catch (error) {
      console.error("Error unlocking device:", error);
      throw error;
    }
  }

  // Reboot device
  async rebootDevice(deviceId: string): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/reboot`,
      );
      return response.data;
    } catch (error) {
      console.error("Error rebooting device:", error);
      throw error;
    }
  }

  // Wipe device data
  async wipeDevice(deviceId: string): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/wipe`,
      );
      return response.data;
    } catch (error) {
      console.error("Error wiping device:", error);
      throw error;
    }
  }

  // Clear app data
  async clearAppData(
    deviceId: string,
    packageName: string,
  ): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/clear-app-data`,
        {
          packageName,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error clearing app data:", error);
      throw error;
    }
  }

  // Install app
  async installApp(deviceId: string, appUrl: string): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/install-app`,
        {
          appUrl,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error installing app:", error);
      throw error;
    }
  }

  // Uninstall app
  async uninstallApp(
    deviceId: string,
    packageName: string,
  ): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/uninstall-app`,
        {
          packageName,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error uninstalling app:", error);
      throw error;
    }
  }

  // Change device settings
  async changeDeviceSetting(
    deviceId: string,
    setting: string,
    value: any,
  ): Promise<DeviceAction> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/actions/change-setting`,
        { setting, value },
      );
      return response.data;
    } catch (error) {
      console.error("Error changing device setting:", error);
      throw error;
    }
  }

  // Start screen share session
  async startScreenShare(deviceId: string): Promise<ScreenShareSession> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/screen-share/start`,
      );
      return response.data;
    } catch (error) {
      console.error("Error starting screen share:", error);
      throw error;
    }
  }

  // Stop screen share
  async stopScreenShare(deviceId: string, sessionId: string): Promise<void> {
    try {
      await apiClient.post(`/devices/${deviceId}/screen-share/stop`, {
        sessionId,
      });
    } catch (error) {
      console.error("Error stopping screen share:", error);
      throw error;
    }
  }

  // Get action history
  async getActionHistory(
    deviceId: string,
    limit: number = 100,
  ): Promise<DeviceAction[]> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/actions/history`,
        {
          params: { limit },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching action history:", error);
      throw error;
    }
  }

  // Create training session
  async createTrainingSession(
    deviceId: string,
    trainingType: string,
    config?: Record<string, any>,
  ): Promise<TrainingSession> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/training/start`,
        {
          trainingType,
          config,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error creating training session:", error);
      throw error;
    }
  }

  // Stop training session
  async stopTrainingSession(
    deviceId: string,
    sessionId: string,
  ): Promise<TrainingSession> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/training/stop`,
        {
          sessionId,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error stopping training session:", error);
      throw error;
    }
  }

  // Get training sessions
  async getTrainingSessions(deviceId?: string): Promise<TrainingSession[]> {
    try {
      const endpoint = deviceId
        ? `/devices/${deviceId}/training/sessions`
        : "/training/sessions";
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      console.error("Error fetching training sessions:", error);
      throw error;
    }
  }

  // Create device group
  async createDeviceGroup(
    name: string,
    description: string,
    deviceIds: string[],
  ): Promise<DeviceGroup> {
    try {
      const response = await apiClient.post("/device-groups", {
        name,
        description,
        deviceIds,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating device group:", error);
      throw error;
    }
  }

  // Get device groups
  async getDeviceGroups(): Promise<DeviceGroup[]> {
    try {
      const response = await apiClient.get("/device-groups");
      return response.data;
    } catch (error) {
      console.error("Error fetching device groups:", error);
      throw error;
    }
  }

  // Update device group
  async updateDeviceGroup(
    groupId: string,
    updates: Partial<DeviceGroup>,
  ): Promise<DeviceGroup> {
    try {
      const response = await apiClient.patch(
        `/device-groups/${groupId}`,
        updates,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating device group:", error);
      throw error;
    }
  }

  // Delete device group
  async deleteDeviceGroup(groupId: string): Promise<void> {
    try {
      await apiClient.delete(`/device-groups/${groupId}`);
    } catch (error) {
      console.error("Error deleting device group:", error);
      throw error;
    }
  }

  // Bulk action on group
  async executeBulkAction(
    groupId: string,
    actionType: string,
    params?: Record<string, any>,
  ): Promise<DeviceAction[]> {
    try {
      const response = await apiClient.post(
        `/device-groups/${groupId}/actions`,
        {
          actionType,
          params,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error executing bulk action:", error);
      throw error;
    }
  }
}

export default new ControlService();
