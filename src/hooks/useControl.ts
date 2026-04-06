import { useState, useCallback } from "react";
import controlService, {
  DeviceAction,
  TrainingSession,
  DeviceGroup,
} from "../services/control";

export function useControl(deviceId?: string) {
  const [actions, setActions] = useState<DeviceAction[]>([]);
  const [trainingSessions, setTrainingSessions] = useState<TrainingSession[]>(
    [],
  );
  const [deviceGroups, setDeviceGroups] = useState<DeviceGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Lock device
  const lockDevice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!deviceId) throw new Error("Device ID required");
      const result = await controlService.lockDevice(deviceId);
      setActions((prev) => [result, ...prev]);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Unlock device
  const unlockDevice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!deviceId) throw new Error("Device ID required");
      const result = await controlService.unlockDevice(deviceId);
      setActions((prev) => [result, ...prev]);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Reboot device
  const rebootDevice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!deviceId) throw new Error("Device ID required");
      const result = await controlService.rebootDevice(deviceId);
      setActions((prev) => [result, ...prev]);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("Unknown error");
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Send SMS action
  const sendSMS = useCallback(
    async (phoneNumber: string, message: string) => {
      setLoading(true);
      setError(null);
      try {
        if (!deviceId) throw new Error("Device ID required");
        const result = await controlService.sendSMSAction(
          deviceId,
          phoneNumber,
          message,
        );
        setActions((prev) => [result, ...prev]);
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

  // Create training session
  const createTrainingSession = useCallback(
    async (trainingType: string, config?: Record<string, any>) => {
      setLoading(true);
      setError(null);
      try {
        if (!deviceId) throw new Error("Device ID required");
        const result = await controlService.createTrainingSession(
          deviceId,
          trainingType,
          config,
        );
        setTrainingSessions((prev) => [result, ...prev]);
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

  // Fetch action history
  const fetchActionHistory = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!deviceId) throw new Error("Device ID required");
      const history = await controlService.getActionHistory(deviceId);
      setActions(history);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Fetch training sessions
  const fetchTrainingSessions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sessions = await controlService.getTrainingSessions(deviceId);
      setTrainingSessions(sessions);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  // Fetch device groups
  const fetchDeviceGroups = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const groups = await controlService.getDeviceGroups();
      setDeviceGroups(groups);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    actions,
    trainingSessions,
    deviceGroups,
    loading,
    error,
    lockDevice,
    unlockDevice,
    rebootDevice,
    sendSMS,
    createTrainingSession,
    fetchActionHistory,
    fetchTrainingSessions,
    fetchDeviceGroups,
  };
}
