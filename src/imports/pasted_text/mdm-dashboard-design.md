Enterprise Mobile Device Management (MDM) & Monitoring Dashboard

1. Core Concept & Aesthetic

Product: A robust, professional-grade Web Admin Dashboard designed to monitor, manage, and remotely control a fleet of Android devices (running a specialized Flutter application).

Vibe: Professional, secure, high-tech, data-dense but clean, and intuitive (similar to modern SaaS monitoring tools like Datadog, Sentry, or an advanced Firebase Console).

Design System Base: Must follow Tailwind CSS layout and utility patterns.

Palette: Modern "Enterprise Dark Mode."

Backgrounds: Slate 900 / 950

Borders/Cards: Slate 800

Text: Slate 200 / 50

Primary Accents (Buttons/Active States): Indigo 600 or Blue 600

System Statuses: Emerald (Online/Active), Amber (Warning/Inactive), Rose (Offline/Error).

Typography: Clean, highly readable sans-serif font (e.g., Inter, Roboto). Smaller font sizes are acceptable for data tables and logs, provided they remain legible.

2. Information Architecture (Page/Frame Structure)

The final Figma file must contain distinct frames for the following key pages:



Page A: Global Elements (Style Guide)

Include standard Tailwind components: Buttons (Primary, Secondary, Success, Danger), Form Inputs, Table styles, Card styles, Badge variants (for OS, Status), and the full Icon set (using Lucide React or similar minimal icons).

Page B: Authentication (Firebase Auth)

A minimalist Login Page frame (email/password). Includes "Forgot Password" flow.

Page C: Main Dashboard (Overview)

This is the command center, providing a macro view of the fleet.



Header: Title "Global Overview," Search Bar (for device ID/label), Sync Status indicator ("All Systems Live"), and Admin Profile dropdown.

Sidebar (Persistent): Collapsible navigation menu with icons for: Overview, Device Fleet, Data Logs, Media Manager, Analytics, Settings.

Key Widgets:

Total Devices Card: Shows number of Online / Offline devices.

Live Activity Feed: A real-time, scrolling timeline showing condensed incoming events (e.g., "Device A13: WhatsApp notification received - 10:02:31 AM," "Device B22: SMS sent - 10:02:30 AM").

Fleet Status Map/List: Visual representation or list showing device models, battery health, and connection quality.

Page D: Device Fleet Management

Frame 1: Fleet List: A dense data table view of all registered devices.

Columns: Checkbox, Device Label (editable), Device ID, Model, OS Version, Battery %, Network Type, Visibility Mode (Visible/Minimal), Last Sync, Quick Actions (Dropdown).

Controls: Search bar, Filter by Status/OS, Grouping options, and "Add New Device" button.

Frame 2: Individual Device Detail View (The "Single Device Command Center"): This view displays when a specific device is selected.

Tab System:

Overview Tab: Visual widgets for Battery usage, Network signal strength, App usage statistics (doughnut chart), and background activity logs (list).

Remote Control Tab: Contains a grid of action buttons: "Request Screen Share," "Capture Photo (Front/Back)," "Record Mic," "Vibrate," and the essential "Minimal Visibility Mode" toggle (to hide/show the Flutter launcher icon).

Command History: A log showing previous remote commands sent and their success/failure status (essential for audit trailing).

Page E: Data Monitoring Logs

Frame 1: Notification Logs Viewer: Table view of all intercepted notifications. Columns: Timestamp, Device Label, App Icon, App Name, Notification Title, Notification Body. Search/Filter bar required.

Frame 2: SMS Logs Dashboard:

Two distinct tables (or a tabbed system): Incoming SMS and Outgoing SMS.

Columns: Timestamp, Device Label, Sender/Recipient Number, Message Body.

Control Panel widget: A form to send an SMS from the selected device.

Frame 3: Activity Timeline: A dedicated, visual chronological history of actions for a single selected device, showing SMS, Notifications, App opening, and File changes in sequence.

Page F: File & Media Access Module

Frame 1: Remote Gallery Viewer: A thumbnail grid view displaying images and videos captured by the device camera (including those captured on-demand). Filter by date/device required.

Frame 2: Remote File Explorer: A list-based file manager UI (folders/files). Shows device storage directory structure. Includes columns for Filename, Type, Size, and "File Activity" (Created/Modified).

Page G: Analytics & Reports

Frame 1: Fleet Reports: Line and bar charts showing device activity trends over time (7/30 days).

Frame 2: Training Performance Tracking: Specialized reporting section for management sessions.

Frame 3: Export Hub: UI with options to select data types (SMS, Notifications, Activity) and export them as "CSV" or "JSON."

3. Interactivity & Prototype Requirements

Hovers: Demonstrate hover states for buttons, sidebar links, and table rows.

Modals: Design modals for:

Confirmation of dangerous remote actions (e.g., "Are you sure you want to capture a photo?").

"Send SMS" composition form.

Firebase Integration Indicators: Design UI elements that show data is syncing in real-time (e.g., a flashing "Live" dot next to logs, a small "Syncing..." spinner).