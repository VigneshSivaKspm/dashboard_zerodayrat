// Custom hook for file and gallery access
import { useState, useCallback } from "react";
import fileMediaAccessService, {
  FileInfo,
  GalleryImage,
  FileActivityLog,
} from "../services/fileMediaAccess";

export function useFileMediaAccess(deviceId: string) {
  const [files, setFiles] = useState<FileInfo[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [fileActivityLogs, setFileActivityLogs] = useState<FileActivityLog[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Browse file system
  const browseFiles = useCallback(
    async (path: string = "/") => {
      setLoading(true);
      setError(null);
      try {
        const fileList = await fileMediaAccessService.getFileStructure(
          deviceId,
          path,
        );
        setFiles(fileList);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Fetch gallery
  const fetchGallery = useCallback(
    async (options?: { folder?: string; limit?: number; offset?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const galleryImages = await fileMediaAccessService.getGallery(
          deviceId,
          options,
        );
        setGallery(galleryImages);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Fetch file activity logs
  const fetchFileActivityLogs = useCallback(
    async (options?: {
      filePath?: string;
      action?: string;
      limit?: number;
      startDate?: string;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const logs = await fileMediaAccessService.getFileActivityLogs(
          deviceId,
          options,
        );
        setFileActivityLogs(logs);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Search files
  const searchFiles = useCallback(
    async (query: string, options?: { fileType?: string; limit?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const results = await fileMediaAccessService.searchFiles(
          deviceId,
          query,
          options,
        );
        setFiles(results);
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  return {
    files,
    gallery,
    fileActivityLogs,
    loading,
    error,
    browseFiles,
    fetchGallery,
    fetchFileActivityLogs,
    searchFiles,
  };
}
