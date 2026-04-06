// File and gallery access service
import apiClient from "./api";

export interface FileInfo {
  id: string;
  deviceId: string;
  path: string;
  name: string;
  type: string;
  size: number;
  createdTime: string;
  modifiedTime: string;
  accessedTime: string;
}

export interface GalleryImage {
  id: string;
  deviceId: string;
  path: string;
  filename: string;
  thumbnailUrl: string;
  fullImageUrl: string;
  size: number;
  timestamp: string;
  latitude?: number;
  longitude?: number;
  cameraModel?: string;
}

export interface FileActivityLog {
  id: string;
  deviceId: string;
  timestamp: string;
  action: "create" | "read" | "write" | "delete" | "move" | "copy";
  filePath: string;
  fileName: string;
  userId?: string;
  details: string;
}

class FileMediaAccessService {
  // Get file browser structure
  async getFileStructure(
    deviceId: string,
    path: string = "/",
  ): Promise<FileInfo[]> {
    try {
      const response = await apiClient.get(`/devices/${deviceId}/files`, {
        params: { path },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching file structure:", error);
      throw error;
    }
  }

  // Download file
  async getFileDownloadUrl(
    deviceId: string,
    filePath: string,
  ): Promise<{ url: string }> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/files/download-url`,
        {
          params: { path: filePath },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error getting file download URL:", error);
      throw error;
    }
  }

  // Get gallery/images
  async getGallery(
    deviceId: string,
    options?: { folder?: string; limit?: number; offset?: number },
  ): Promise<GalleryImage[]> {
    try {
      const params: any = {
        limit: options?.limit || 100,
        offset: options?.offset || 0,
      };
      if (options?.folder) params.folder = options.folder;

      const response = await apiClient.get(`/devices/${deviceId}/gallery`, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery:", error);
      throw error;
    }
  }

  // Get image details with EXIF data
  async getImageDetails(deviceId: string, imageId: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/gallery/${imageId}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching image details:", error);
      throw error;
    }
  }

  // Download gallery image
  async getImageDownloadUrl(
    deviceId: string,
    imageId: string,
  ): Promise<{ url: string }> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/gallery/${imageId}/download-url`,
      );
      return response.data;
    } catch (error) {
      console.error("Error getting image download URL:", error);
      throw error;
    }
  }

  // Get file activity logs
  async getFileActivityLogs(
    deviceId: string,
    options?: {
      filePath?: string;
      action?: string;
      limit?: number;
      startDate?: string;
    },
  ): Promise<FileActivityLog[]> {
    try {
      const params: any = { limit: options?.limit || 100 };
      if (options?.filePath) params.filePath = options.filePath;
      if (options?.action) params.action = options.action;
      if (options?.startDate) params.startDate = options.startDate;

      const response = await apiClient.get(
        `/devices/${deviceId}/file-activity`,
        { params },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching file activity logs:", error);
      throw error;
    }
  }

  // Search files
  async searchFiles(
    deviceId: string,
    query: string,
    options?: { fileType?: string; limit?: number },
  ): Promise<FileInfo[]> {
    try {
      const params: any = { q: query, limit: options?.limit || 50 };
      if (options?.fileType) params.fileType = options.fileType;

      const response = await apiClient.get(
        `/devices/${deviceId}/files/search`,
        {
          params,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error searching files:", error);
      throw error;
    }
  }

  // Delete file
  async deleteFile(deviceId: string, filePath: string): Promise<void> {
    try {
      await apiClient.delete(`/devices/${deviceId}/files`, {
        params: { path: filePath },
      });
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  // Get storage statistics
  async getStorageStats(deviceId: string): Promise<any> {
    try {
      const response = await apiClient.get(
        `/devices/${deviceId}/storage-stats`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching storage stats:", error);
      throw error;
    }
  }

  // Get file thumbnails (batch)
  async getFileThumbnails(
    deviceId: string,
    filePaths: string[],
  ): Promise<Record<string, string>> {
    try {
      const response = await apiClient.post(
        `/devices/${deviceId}/files/thumbnails`,
        { filePaths },
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching thumbnails:", error);
      throw error;
    }
  }
}

export default new FileMediaAccessService();
