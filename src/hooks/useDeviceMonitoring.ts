// Custom hook for device monitoring
import { useState, useEffect, useCallback } from "react";
import deviceMonitoringService, {
  DeviceInfo,
  AppUsage,
  BackgroundActivity,
} from "../services/deviceMonitoring";

export function useDeviceMonitoring(deviceId: string) {
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [appUsage, setAppUsage] = useState<AppUsage[]>([]);
  const [backgroundActivity, setBackgroundActivity] = useState<
    BackgroundActivity[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to device real-time updates
  useEffect(() => {
    const unsubscribe = deviceMonitoringService.subscribeToDevice(
      deviceId,
      (deviceData) => {
        setDevice(deviceData);
        setError(null);
      },
    );

    return () => unsubscribe();
  }, [deviceId]);

  // Subscribe to health metrics
  useEffect(() => {
    const unsubscribe = deviceMonitoringService.subscribeToDeviceHealth(
      deviceId,
      (metrics) => {
        setDevice((prev) => (prev ? { ...prev, ...metrics } : null));
      },
    );

    return () => unsubscribe();
  }, [deviceId]);

  // Fetch app usage
  const fetchAppUsage = useCallback(async () => {
    try {
      const data = await deviceMonitoringService.getAppUsage(deviceId);
      setAppUsage(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  }, [deviceId]);

  // Fetch background activity
  const fetchBackgroundActivity = useCallback(async () => {
    try {
      const data =
        await deviceMonitoringService.getBackgroundActivity(deviceId);
      setBackgroundActivity(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    }
  }, [deviceId]);

  // Initial fetch
  useEffect(() => {
    Promise.all([fetchAppUsage(), fetchBackgroundActivity()]).finally(() => {
      setLoading(false);
    });
  }, [fetchAppUsage, fetchBackgroundActivity]);

  return {
    device,
    appUsage,
    backgroundActivity,
    loading,
    error,
    refetch: async () => {
      setLoading(true);
      await Promise.all([fetchAppUsage(), fetchBackgroundActivity()]);
      setLoading(false);
    },
  };
}
