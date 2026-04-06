// Documentation for backend API requirements

# ZeroDayRat MDM - Backend API Requirements

## Overview

This document outlines all required API endpoints for the ZeroDayRat MDM Dashboard.

---

## Device Monitoring Endpoints

### GET /api/devices

- **Description**: Get list of all devices
- **Query Params**: `limit`, `offset`, `status`, `search`
- **Response**: `DeviceInfo[]`

### GET /api/devices/:deviceId

- **Description**: Get device details
- **Response**: `DeviceInfo`

### GET /api/devices/:deviceId/app-usage

- **Description**: Get app usage statistics
- **Query Params**: `limit`, `startDate`
- **Response**: `AppUsage[]`

### GET /api/devices/:deviceId/background-activity

- **Description**: Get background activity logs
- **Query Params**: `limit`, `startDate`
- **Response**: `BackgroundActivity[]`

### GET /api/devices/:deviceId/location

- **Description**: Get device GPS location
- **Response**: `{ latitude, longitude, accuracy, timestamp }`

---

## Notification & SMS Endpoints

### GET /api/notifications

- **Description**: Get all notifications across devices
- **Query Params**: `deviceId`, `limit`, `startDate`
- **Response**: `MobileNotification[]`

### GET /api/devices/:deviceId/notifications

- **Description**: Get device notifications
- **Query Params**: `limit`, `startDate`
- **Response**: `MobileNotification[]`

### GET /api/devices/:deviceId/sms

- **Description**: Get SMS messages
- **Query Params**: `type` (incoming/outgoing/all), `limit`
- **Response**: `SMSMessage[]`

### POST /api/devices/:deviceId/send-sms

- **Description**: Send SMS from device
- **Body**: `{ phoneNumber, message }`
- **Response**: `{ success, messageId }`

### GET /api/alerts

- **Description**: Get alert events
- **Query Params**: `severity`, `limit`, `startDate`
- **Response**: `AlertEvent[]`

### GET /api/devices/:deviceId/alerts

- **Description**: Get device alerts
- **Query Params**: `severity`, `limit`, `startDate`
- **Response**: `AlertEvent[]`

---

## Camera & Media Endpoints

### POST /api/devices/:deviceId/capture-image

- **Description**: Trigger image capture
- **Body**: `{ quality, camera }`
- **Response**: `MediaRequest`

### POST /api/devices/:deviceId/start-recording

- **Description**: Start video recording
- **Body**: `{ duration, quality, audio }`
- **Response**: `MediaRequest`

### POST /api/devices/:deviceId/stop-recording

- **Description**: Stop video recording
- **Response**: `CapturedMedia`

### POST /api/devices/:deviceId/record-audio

- **Description**: Record audio
- **Body**: `{ duration }`
- **Response**: `MediaRequest`

### GET /api/devices/:deviceId/media

- **Description**: Get captured media
- **Query Params**: `mediaType` (image/video/audio), `limit`
- **Response**: `CapturedMedia[]`

### GET /api/devices/:deviceId/media/:mediaId/download-url

- **Description**: Get download URL for media
- **Response**: `{ url }`

### POST /api/devices/:deviceId/microphone/start-monitoring

- **Description**: Start microphone monitoring
- **Response**: `{ streamId }`

### POST /api/devices/:deviceId/microphone/stop-monitoring

- **Description**: Stop microphone monitoring
- **Body**: `{ streamId }`

---

## File & Gallery Endpoints

### GET /api/devices/:deviceId/files

- **Description**: Browse file system
- **Query Params**: `path`
- **Response**: `FileInfo[]`

### GET /api/devices/:deviceId/files/search

- **Description**: Search files
- **Query Params**: `q`, `fileType`, `limit`
- **Response**: `FileInfo[]`

### GET /api/devices/:deviceId/files/download-url

- **Description**: Get file download URL
- **Query Params**: `path`
- **Response**: `{ url }`

### DELETE /api/devices/:deviceId/files

- **Description**: Delete file
- **Query Params**: `path`

### GET /api/devices/:deviceId/gallery

- **Description**: Get gallery images
- **Query Params**: `folder`, `limit`, `offset`
- **Response**: `GalleryImage[]`

### GET /api/devices/:deviceId/gallery/:imageId

- **Description**: Get image details with EXIF
- **Response**: `{ image details with metadata }`

### GET /api/devices/:deviceId/file-activity

- **Description**: Get file activity logs
- **Query Params**: `filePath`, `action`, `limit`, `startDate`
- **Response**: `FileActivityLog[]`

### GET /api/devices/:deviceId/storage-stats

- **Description**: Get storage statistics
- **Response**: `{ used, total, percentage }`

### POST /api/devices/:deviceId/files/thumbnails

- **Description**: Get file thumbnails
- **Body**: `{ filePaths }`
- **Response**: `{ [filePath]: thumbnailUrl }`

---

## Real-time Sync Endpoints

### POST /api/devices/:deviceId/sync

- **Description**: Trigger manual sync
- **Body**: `{ dataTypes }`
- **Response**: `SyncStatus`

### GET /api/devices/:deviceId/sync-history

- **Description**: Get sync history
- **Query Params**: `limit`
- **Response**: `SyncHistory[]`

### GET /api/sync-stats

- **Description**: Get sync statistics
- **Response**: `SyncStats`

### POST /api/webhooks/configure

- **Description**: Configure webhook
- **Body**: `{ url, events }`
- **Response**: `{ webhookId }`

### GET /api/webhooks

- **Description**: Get active webhooks
- **Response**: `Webhook[]`

### DELETE /api/webhooks/:webhookId

- **Description**: Remove webhook

---

## User Management Endpoints

### GET /api/users

- **Description**: Get user list
- **Query Params**: `limit`, `offset`, `status`
- **Response**: `AppUser[]`

### PATCH /api/users/:userId/status

- **Description**: Update user status
- **Body**: `{ status }`

### DELETE /api/users/:userId

- **Description**: Delete user

### GET /api/users/:userId/activity-logs

- **Description**: Get user activity logs
- **Query Params**: `limit`
- **Response**: `UserActivity[]`

### GET /api/activity-logs

- **Description**: Get all activity logs
- **Query Params**: `limit`, `offset`
- **Response**: `UserActivity[]`

### PATCH /api/users/:userId/role

- **Description**: Update user role
- **Body**: `{ role }`

### POST /api/users/:userId/permissions/grant

- **Description**: Grant permissions
- **Body**: `{ permissions }`

### POST /api/users/:userId/permissions/revoke

- **Description**: Revoke permissions
- **Body**: `{ permissions }`

---

## Firebase Real-time Database Structure

```
devices/
├── {deviceId}/
│   ├── info (DeviceInfo)
│   ├── metrics (health metrics)
│   └── lastUpdate (timestamp)

notifications/
├── {deviceId}/
│   └── {notificationId} (MobileNotification)

sms/
├── {deviceId}/
│   └── {smsId} (SMSMessage)

alerts/
├── {alertId} (AlertEvent)

sync/
├── {deviceId} (SyncStatus)

events/
└── {eventId} (WebhookEvent)
```

---

## Authentication Headers

All requests require:

```
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json
```

---

## Response Format

```json
{
  "success": true,
  "data": {},
  "message": "Success",
  "timestamp": "2026-04-06T10:00:00Z"
}
```

---

## Error Format

```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Error description",
  "timestamp": "2026-04-06T10:00:00Z"
}
```

---

## Setup Instructions

### 1. Update package.json

Add required dependencies:

```bash
npm install firebase axios
```

### 2. Update vite.config.ts

No changes needed - configured to work with backend.

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```
VITE_FIREBASE_API_KEY=...
VITE_API_URL=http://your-backend.com/api
```

### 4. Backend Requirements

Implement all endpoints listed above with:

- JWT Authentication
- Rate limiting
- CORS support
- Request validation
- Error handling
- Logging

### 5. Firebase Setup

- Create Firebase project
- Enable Authentication
- Create Firestore database
- Create Real-time database
- Configure Cloud Storage

---

## Testing Real-time Features

Use Firebase Emulator Suite:

```bash
firebase emulators:start
```

Then set `VITE_USE_FIREBASE_EMULATOR=true` in `.env.local`
