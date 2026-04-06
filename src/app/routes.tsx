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
