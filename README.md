# Enterprise MDM Dashboard

A professional-grade Mobile Device Management (MDM) web admin dashboard built with React, TypeScript, and Tailwind CSS. This application provides comprehensive monitoring, management, and remote control capabilities for a fleet of Android devices.

## 🚀 Features

### 📊 Global Overview Dashboard
- Real-time device status monitoring
- Live activity feed with auto-updating events
- Fleet statistics and network status
- Quick access to device metrics

### 📱 Device Fleet Management
- Comprehensive device list with sortable columns
- Individual device detail views
- Remote control capabilities:
  - Screen share requests
  - Photo capture (front/back camera)
  - Microphone recording
  - Device vibration
  - Visibility mode toggle
- Command history tracking
- Battery and network monitoring

### 📝 Data Monitoring Logs
- **Notifications Viewer**: Track all intercepted app notifications
- **SMS Management**: View incoming/outgoing messages and send SMS remotely
- **Activity Timeline**: Chronological view of all device actions

### 📂 File & Media Access
- **Remote Gallery**: Browse photos and videos from devices
- **File Explorer**: Navigate device storage and file system
- Filter by device and date
- File activity tracking (created/modified/accessed)

### 📈 Analytics & Reports
- Activity trend charts (7/30 day views)
- Device usage statistics
- Training performance tracking
- Data export hub (CSV, JSON, Excel formats)

### ⚙️ Settings & Configuration
- Account management
- Security settings and 2FA
- Firebase configuration
- Notification preferences
- Data retention policies
- System information

## 🎨 Design System

### Color Palette
- **Background**: Slate 900/950 (Enterprise Dark Mode)
- **Cards/Borders**: Slate 800
- **Text**: Slate 200/50
- **Primary Accents**: Indigo 600 / Blue 600
- **Status Colors**:
  - 🟢 Emerald: Online/Active
  - 🟡 Amber: Warning/Inactive
  - 🔴 Rose: Offline/Error

### Typography
- Clean, highly readable sans-serif design
- Responsive font sizing
- Optimized for data-dense interfaces

## 🛠️ Tech Stack

- **React 18.3** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **React Router v7** - Navigation
- **Recharts** - Data visualization
- **Lucide React** - Icon system
- **Vite** - Build tool

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🗂️ Project Structure

```
/src
  /app
    /components
      /layouts
        RootLayout.tsx          # Main app layout with sidebar & header
      /dashboard
        StatCard.tsx            # Reusable stat card component
        LiveActivityFeed.tsx    # Real-time activity feed
        FleetStatusList.tsx     # Device fleet overview
    /pages
      Dashboard.tsx             # Main overview page
      DeviceFleet.tsx          # Device list management
      DeviceDetail.tsx         # Individual device control
      DataLogs.tsx             # Logs and monitoring
      MediaManager.tsx         # File and media browser
      Analytics.tsx            # Charts and reports
      Settings.tsx             # Configuration panel
      Login.tsx                # Authentication page
      NotFound.tsx             # 404 page
    routes.tsx                 # React Router configuration
    App.tsx                    # Root component
  /styles
    theme.css                  # Global styles and design tokens
```

## 🔐 Authentication

The dashboard includes a Firebase Authentication-ready login system. Currently configured for demo purposes with mock authentication. To enable real Firebase Auth:

1. Update Firebase configuration in Settings page
2. Implement Firebase Auth hooks
3. Configure environment variables

## 📱 Pages Overview

### Login (`/login`)
- Email/password authentication
- Forgot password flow
- Clean, minimal design

### Dashboard (`/`)
- Fleet statistics cards
- Live activity feed
- Quick device status overview
- Network and activity metrics

### Device Fleet (`/devices`)
- Sortable data table
- Search and filter capabilities
- Bulk device selection
- Quick actions menu

### Device Detail (`/devices/:id`)
- Three-tab interface:
  - **Overview**: App usage, battery, activity logs
  - **Remote Control**: Command buttons and actions
  - **History**: Command execution log
- Real-time status indicators

### Data Logs (`/logs`)
- Three-tab interface:
  - **Notifications**: All intercepted notifications
  - **SMS**: Incoming/outgoing messages with send capability
  - **Timeline**: Chronological activity view

### Media Manager (`/media`)
- Two-tab interface:
  - **Gallery**: Grid view of photos/videos
  - **Files**: File system browser with directory structure

### Analytics (`/analytics`)
- Activity trend charts
- Device usage bar charts
- Export hub with format selection
- Training performance metrics

### Settings (`/settings`)
- Account information
- Security and password management
- Firebase configuration
- Notification preferences
- Data retention controls

## 🎯 Key Features

### Real-time Monitoring
- Live activity feed updates every 5 seconds
- Connection status indicators
- Battery and network monitoring

### Remote Control
- Screen share requests
- Photo/video capture
- Microphone recording
- Visibility mode toggle
- Command history audit trail

### Data Management
- Comprehensive logging
- Export capabilities (CSV, JSON, Excel)
- Configurable retention periods
- Search and filter tools

### Professional UI/UX
- Responsive design
- Hover states and transitions
- Modal confirmations for dangerous actions
- Loading and sync indicators
- Toast notifications ready

## 🔄 Mock Data

The application includes realistic mock data for demonstration:
- 6 sample devices with varying statuses
- Real-time activity events
- SMS and notification logs
- File and media samples
- Analytics charts with 7-day data

## 🚦 Status Indicators

- 🟢 **Online**: Device connected and active
- 🔴 **Offline**: Device disconnected
- 🟡 **Warning**: Low battery or inactive
- 🔵 **Syncing**: Real-time data sync indicator

## 📊 Charts & Visualizations

- Line charts for activity trends
- Bar charts for device usage
- Progress bars for app usage
- Status badges and indicators

## 🔧 Customization

### Colors
Modify color scheme in Tailwind classes throughout components.

### Mock Data
Update mock data in component files to match your use case.

### Firebase Integration
Configure Firebase settings in the Settings page and implement real-time database connections.

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📄 License

This is a demonstration project created for Enterprise MDM purposes.

## 🤝 Support

For questions or issues, refer to the documentation or contact the development team.

---

**Built with ⚡ by a legendary developer** 🚀
