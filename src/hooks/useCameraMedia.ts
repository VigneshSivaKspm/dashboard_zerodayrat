// Custom hook for camera and media
import { useState, useCallback } from "react";
import cameraMediaService, { CapturedMedia } from "../services/cameraMedia";

export function useCameraMedia(deviceId: string) {
  const [media, setMedia] = useState<CapturedMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Capture image
  const captureImage = useCallback(
    async (options?: { quality?: number; camera?: "front" | "back" }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await cameraMediaService.captureImage(deviceId, options);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Record video
  const recordVideo = useCallback(
    async (options?: {
      duration?: number;
      quality?: string;
      audio?: boolean;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await cameraMediaService.startVideoRecording(
          deviceId,
          options,
        );
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Record audio
  const recordAudio = useCallback(
    async (options?: { duration?: number }) => {
      setLoading(true);
      setError(null);
      try {
        const result = await cameraMediaService.recordAudio(deviceId, options);
        return result;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Unknown error");
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Fetch media
  const fetchMedia = useCallback(
    async (mediaType?: "image" | "video" | "audio") => {
      setLoading(true);
      setError(null);
      try {
        const capturedMedia = await cameraMediaService.getCapturedMedia(
          deviceId,
          mediaType,
        );
        setMedia(capturedMedia);
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
    media,
    loading,
    error,
    captureImage,
    recordVideo,
    recordAudio,
    fetchMedia,
  };
}
