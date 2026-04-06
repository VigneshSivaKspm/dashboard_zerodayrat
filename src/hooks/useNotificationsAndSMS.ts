// Custom hook for notifications and SMS
import { useState, useEffect, useCallback } from "react";
import notificationSMSService, {
  MobileNotification,
  SMSMessage,
  AlertEvent,
} from "../services/notificationSMS";

export function useNotificationsAndSMS(deviceId: string) {
  const [notifications, setNotifications] = useState<MobileNotification[]>([]);
  const [smsIncoming, setSmsIncoming] = useState<SMSMessage[]>([]);
  const [smsOutgoing, setSmsOutgoing] = useState<SMSMessage[]>([]);
  const [alerts, setAlerts] = useState<AlertEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to real-time notifications
  useEffect(() => {
    const unsubscribe = notificationSMSService.subscribeToNotifications(
      deviceId,
      (notification) => {
        setNotifications((prev) => [notification, ...prev].slice(0, 100));
      },
    );

    return () => unsubscribe();
  }, [deviceId]);

  // Subscribe to real-time SMS
  useEffect(() => {
    const unsubscribe = notificationSMSService.subscribeToSMS(
      deviceId,
      (sms) => {
        if (sms.type === "incoming") {
          setSmsIncoming((prev) => [sms, ...prev].slice(0, 100));
        } else {
          setSmsOutgoing((prev) => [sms, ...prev].slice(0, 100));
        }
      },
    );

    return () => unsubscribe();
  }, [deviceId]);

  // Subscribe to alerts
  useEffect(() => {
    const unsubscribe = notificationSMSService.subscribeToAlerts((alert) => {
      setAlerts((prev) => [alert, ...prev].slice(0, 100));
    });

    return () => unsubscribe();
  }, []);

  // Fetch initial data
  const fetchInitialData = useCallback(async () => {
    try {
      const [notif, smsIn, smsOut, alertsData] = await Promise.all([
        notificationSMSService.getNotifications(deviceId),
        notificationSMSService.getSMS(deviceId, "incoming"),
        notificationSMSService.getSMS(deviceId, "outgoing"),
        notificationSMSService.getAlerts(deviceId),
      ]);

      setNotifications(notif);
      setSmsIncoming(smsIn);
      setSmsOutgoing(smsOut);
      setAlerts(alertsData);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [deviceId]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  // Send SMS
  const sendSMS = useCallback(
    async (phoneNumber: string, message: string) => {
      try {
        const result = await notificationSMSService.sendSMS(
          deviceId,
          phoneNumber,
          message,
        );
        return result;
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
        throw err;
      }
    },
    [deviceId],
  );

  return {
    notifications,
    smsIncoming,
    smsOutgoing,
    alerts,
    loading,
    error,
    sendSMS,
    refetch: fetchInitialData,
  };
}
