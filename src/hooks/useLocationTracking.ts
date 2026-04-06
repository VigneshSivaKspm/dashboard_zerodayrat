import { useState, useEffect, useCallback } from "react";
import locationTrackingService, {
  LocationData,
  Geofence,
} from "../services/locationTracking";

export function useLocationTracking(deviceId: string) {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(
    null,
  );
  const [locationHistory, setLocationHistory] = useState<LocationData[]>([]);
  const [geofences, setGeofences] = useState<Geofence[]>([]);
  const [loading, setLoading] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to real-time location
  useEffect(() => {
    const unsubscribe = locationTrackingService.subscribeToLocation(
      deviceId,
      (location) => {
        setCurrentLocation(location);
        setLocationHistory((prev) => [location, ...prev].slice(0, 1000));
      },
    );

    return () => unsubscribe();
  }, [deviceId]);

  // Fetch initial data
  const fetchLocationData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [current, geofenceList] = await Promise.all([
        locationTrackingService.getCurrentLocation(deviceId),
        locationTrackingService.getGeofences(deviceId),
      ]);
      setCurrentLocation(current);
      setGeofences(geofenceList);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchLocationData();
  }, [fetchLocationData]);

  // Fetch location history
  const fetchHistory = useCallback(
    async (options?: {
      startDate?: string;
      endDate?: string;
      limit?: number;
    }) => {
      setLoading(true);
      setError(null);
      try {
        const history = await locationTrackingService.getLocationHistory(
          deviceId,
          options,
        );
        setLocationHistory(history.locations);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Start tracking
  const startTracking = useCallback(
    async (interval?: number) => {
      setLoading(true);
      setError(null);
      try {
        await locationTrackingService.startTracking(deviceId, interval);
        setTracking(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  // Stop tracking
  const stopTracking = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await locationTrackingService.stopTracking(deviceId);
      setTracking(false);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Create geofence
  const createGeofence = useCallback(
    async (
      name: string,
      latitude: number,
      longitude: number,
      radius: number,
    ) => {
      setLoading(true);
      setError(null);
      try {
        const newGeofence = await locationTrackingService.createGeofence(
          deviceId,
          {
            name,
            latitude,
            longitude,
            radius,
            active: true,
          },
        );
        setGeofences((prev) => [...prev, newGeofence]);
        return newGeofence;
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

  // Delete geofence
  const deleteGeofence = useCallback(
    async (geofenceId: string) => {
      setLoading(true);
      setError(null);
      try {
        await locationTrackingService.deleteGeofence(deviceId, geofenceId);
        setGeofences((prev) => prev.filter((g) => g.id !== geofenceId));
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [deviceId],
  );

  return {
    currentLocation,
    locationHistory,
    geofences,
    loading,
    tracking,
    error,
    fetchHistory,
    startTracking,
    stopTracking,
    createGeofence,
    deleteGeofence,
    refetch: fetchLocationData,
  };
}
