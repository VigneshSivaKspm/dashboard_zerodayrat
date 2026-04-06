import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layouts/RootLayout";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { DeviceFleet } from "./pages/DeviceFleet";
import { DeviceDetail } from "./pages/DeviceDetail";
import { DataLogs } from "./pages/DataLogs";
import { MediaManager } from "./pages/MediaManager";
import { Analytics } from "./pages/Analytics";
import { Settings } from "./pages/Settings";
import { UserManagement } from "./pages/UserManagement";
import { NotFound } from "./pages/NotFound";

// Import new pages
import DashboardOverview from "../pages/DashboardOverview";
import NotificationLogs from "../pages/NotificationLogs";
import SMSLogs from "../pages/SMSLogs";
import ActivityTimeline from "../pages/ActivityTimeline";
import ControlPanel from "../pages/ControlPanel";
import TrainingManager from "../pages/TrainingManager";
import AnalyticsReports from "../pages/AnalyticsReports";
import LocationTracking from "../pages/LocationTracking";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "dashboard-overview", Component: DashboardOverview },
      { path: "notification-logs", Component: NotificationLogs },
      { path: "sms-logs", Component: SMSLogs },
      { path: "activity-timeline", Component: ActivityTimeline },
      { path: "control-panel", Component: ControlPanel },
      { path: "training-manager", Component: TrainingManager },
      { path: "analytics-reports", Component: AnalyticsReports },
      { path: "location-tracking", Component: LocationTracking },
      { path: "devices", Component: DeviceFleet },
      { path: "devices/:deviceId", Component: DeviceDetail },
      { path: "logs", Component: DataLogs },
      { path: "media", Component: MediaManager },
      { path: "analytics", Component: Analytics },
      { path: "users", Component: UserManagement },
      { path: "settings", Component: Settings },
      { path: "*", Component: NotFound },
    ],
  },
]);
