// Camera, microphone, and media capture service
import apiClient from "./api";

export interface CapturedMedia {
  id: string;
  deviceId: string;
  timestamp: string;
  mediaType: "image" | "video" | "audio";
  url: string;
  thumbnailUrl?: string;
  size: number;
  duration?: number; // for video/audio in seconds
  metadata?: Record<string, any>;
}

export interface MediaRequest {
  id: string;
  deviceId: string;
  requestTime: string;
  mediaType: "image" | "video" | "audio";
  status: "pending" | "completed" | "failed";
  result?: CapturedMedia;
}

class CameraMediaService {
  // Capture image on demand
  async captureImage(
    deviceId: string,
    options?: { quality?: number; camera?: "front" | "back" },
  ): Promise<MediaRequest> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/capture-image`,
        {
          quality: options?.quality || 90,
          camera: options?.camera || "back",
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error capturing image:", error);
      throw error;
    }
  }

  // Start video recording on demand
  async startVideoRecording(
    deviceId: string,
    options?: { duration?: number; quality?: string; audio?: boolean },
  ): Promise<MediaRequest> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/start-recording`,
        {
          duration: options?.duration || 30,
          quality: options?.quality || "high",
          audio: options?.audio !== false,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error starting video recording:", error);
      throw error;
    }
  }

  // Stop video recording
  async stopVideoRecording(deviceId: string): Promise<CapturedMedia> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/stop-recording`,
      );
      return response.data;
    } catch (error) {
      console.error("Error stopping video recording:", error);
      throw error;
    }
  }

  // Record audio
  async recordAudio(
    deviceId: string,
    options?: { duration?: number },
  ): Promise<MediaRequest> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/record-audio`,
        {
          duration: options?.duration || 30,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error recording audio:", error);
      throw error;
    }
  }

  // Get captured media list
  async getCapturedMedia(
    deviceId: string,
    mediaType?: "image" | "video" | "audio",
    limit: number = 100,
  ): Promise<CapturedMedia[]> {
    try {
      const params: any = { limit };
      if (mediaType) params.mediaType = mediaType;

      const response = await apiClient.get(`/devices/${deviceId}/media`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching captured media:", error);
      throw error;
    }
  }

  // Download media
  async getMediaDownloadUrl(
    deviceId: string,
    mediaId: string,
  ): Promise<{ url: string }> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/media/${mediaId}/download-url`,
      );
      return response.data;
    } catch (error) {
      console.error("Error getting download URL:", error);
      throw error;
    }
  }

  // Access microphone for live monitoring
  async startMicrophoneMonitoring(
    deviceId: string,
  ): Promise<{ streamId: string }> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/microphone/start-monitoring`,
      );
      return response.data;
    } catch (error) {
      console.error("Error starting microphone monitoring:", error);
      throw error;
    }
  }

  // Stop microphone monitoring
  async stopMicrophoneMonitoring(
    deviceId: string,
    streamId: string,
  ): Promise<void> {
    try {
      await apiClient.post(`/devices/${deviceId}/microphone/stop-monitoring`, {
        streamId,
      });
    } catch (error) {
      console.error("Error stopping microphone monitoring:", error);
      throw error;
    }
  }

  // Get microphone stream (WebRTC)
  getMicrophoneStream(): RTCPeerConnection | null {
    // This would establish WebRTC connection to the device
    // Implementation depends on your backend WebRTC setup
    return null;
  }

  // Delete captured media
  async deleteMedia(deviceId: string, mediaId: string): Promise<void> {
    try {
      await apiClient.delete(`/devices/${deviceId}/media/${mediaId}`);
    } catch (error) {
      console.error("Error deleting media:", error);
      throw error;
    }
  }

  // Get media statistics
  async getMediaStats(deviceId: string): Promise<any> {
    try {
      const response = await apiClient.get(`/devices/${deviceId}/media/stats`);
      return response.data;
    } catch (error) {
      console.error("Error fetching media stats:", error);
      throw error;
    }
  }
}

export default new CameraMediaService();
