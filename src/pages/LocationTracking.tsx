import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Badge } from "@/app/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  MapPin,
  Crosshair,
  Navigation,
  Radius,
  Plus,
  Trash2,
  Eye,
} from "lucide-react";
import { useLocationTracking } from "@/hooks/useLocationTracking";

export default function LocationTracking() {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [showGeofenceDialog, setShowGeofenceDialog] = useState(false);
  const [geofenceName, setGeofenceName] = useState("");
  const [geofenceRadius, setGeofenceRadius] = useState("100");

  const {
    currentLocation,
    locationHistory,
    geofences,
    tracking,
    loading,
    startTracking,
    stopTracking,
    createGeofence,
    deleteGeofence,
  } = useLocationTracking(selectedDeviceId || "default-device");

  const handleStartTracking = async () => {
    if (!selectedDeviceId) {
      alert("Please select a device first");
      return;
    }
    await startTracking(60000); // Update every 60 seconds
  };

  const handleCreateGeofence = async () => {
    if (!geofenceName || !selectedDeviceId) return;

    try {
      await createGeofence(
        geofenceName,
        currentLocation?.latitude || 0,
        currentLocation?.longitude || 0,
        parseInt(geofenceRadius) || 100,
      );
      setGeofenceName("");
      setGeofenceRadius("100");
      setShowGeofenceDialog(false);
    } catch (error) {
      console.error("Error creating geofence:", error);
    }
  };

  const handleStopTracking = async () => {
    await stopTracking();
  };

  return (
    <div className="p-4 space-y-4 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <MapPin className="h-6 w-6" />
            Location Tracking
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time device location tracking
          </p>
        </div>
        {tracking ? (
          <Button onClick={handleStopTracking} size="sm" variant="destructive">
            Stop Tracking
          </Button>
        ) : (
          <Button onClick={handleStartTracking} size="sm">
            Start Tracking
          </Button>
        )}
      </div>

      {/* Device Selection */}
      <Card>
        <CardContent className="p-3">
          <label className="text-xs font-medium text-slate-300">
            Select Device
          </label>
          <Input
            placeholder="Enter device ID"
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="mt-2 text-sm h-8"
          />
        </CardContent>
      </Card>

      {/* Current Location */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Crosshair className="h-4 w-4" />
            Current Location
          </CardTitle>
          <CardDescription className="text-xs">
            Real-time coordinates
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-4">
              <div className="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full"></div>
            </div>
          ) : currentLocation ? (
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-slate-800/50 rounded">
                  <p className="text-slate-400">Latitude</p>
                  <p className="font-mono font-semibold text-slate-50">
                    {currentLocation.latitude?.toFixed(6)}
                  </p>
                </div>
                <div className="p-2 bg-slate-800/50 rounded">
                  <p className="text-slate-400">Longitude</p>
                  <p className="font-mono font-semibold text-slate-50">
                    {currentLocation.longitude?.toFixed(6)}
                  </p>
                </div>
                <div className="p-2 bg-slate-800/50 rounded">
                  <p className="text-slate-400">Accuracy</p>
                  <p className="font-semibold text-slate-50">
                    ±{currentLocation.accuracy}m
                  </p>
                </div>
                <div className="p-2 bg-slate-800/50 rounded">
                  <p className="text-slate-400">Provider</p>
                  <p className="font-semibold text-slate-50 capitalize">
                    {currentLocation.provider}
                  </p>
                </div>
              </div>
              {currentLocation.address && (
                <div className="p-2 bg-blue-50 rounded">
                  <p className="text-slate-400">Address</p>
                  <p className="text-slate-50">{currentLocation.address}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <div className="p-2 bg-slate-800/50 rounded">
                  <p className="text-slate-400">Speed</p>
                  <p className="font-semibold text-slate-50">
                    {currentLocation.speed} m/s
                  </p>
                </div>
                <div className="p-2 bg-slate-800/50 rounded">
                  <p className="text-slate-400">Heading</p>
                  <p className="font-semibold text-slate-50">
                    {currentLocation.heading}°
                  </p>
                </div>
              </div>
              <p className="text-slate-400 text-xs pt-2">
                Updated:{" "}
                {new Date(currentLocation.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ) : (
            <p className="text-center py-4 text-xs text-slate-400">
              No location data available
            </p>
          )}
        </CardContent>
      </Card>

      {/* Location History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            Location History
          </CardTitle>
          <CardDescription className="text-xs">
            {locationHistory.length} locations recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {locationHistory.length === 0 ? (
            <p className="text-center py-4 text-xs text-slate-400">
              No history yet
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {locationHistory.slice(0, 20).map((location, index) => (
                <div
                  key={index}
                  className="p-2 border rounded text-xs bg-slate-900 hover:bg-slate-800/50"
                >
                  <div className="flex items-start justify-between mb-1">
                    <div>
                      <p className="font-mono font-semibold text-slate-50">
                        {location.latitude?.toFixed(4)},{" "}
                        {location.longitude?.toFixed(4)}
                      </p>
                      <p className="text-slate-400">
                        Accuracy: ±{location.accuracy}m
                      </p>
                    </div>
                    <span className="text-gray-400">
                      {new Date(location.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Geofences */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Radius className="h-4 w-4" />
            Geofences
          </CardTitle>
          <CardDescription className="text-xs">
            {geofences.length} geofences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Dialog
            open={showGeofenceDialog}
            onOpenChange={setShowGeofenceDialog}
          >
            <DialogTrigger asChild>
              <Button size="sm" className="w-full text-xs">
                <Plus className="h-4 w-4 mr-1" />
                Create Geofence
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-sm">Create Geofence</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-300">
                    Geofence Name
                  </label>
                  <Input
                    placeholder="e.g., Office, Home"
                    value={geofenceName}
                    onChange={(e) => setGeofenceName(e.target.value)}
                    className="mt-1 text-sm h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-300">
                    Radius (meters)
                  </label>
                  <Input
                    type="number"
                    placeholder="100"
                    value={geofenceRadius}
                    onChange={(e) => setGeofenceRadius(e.target.value)}
                    className="mt-1 text-sm h-8"
                  />
                </div>
                <p className="text-xs text-slate-400">
                  Geofence will be created at current location:{" "}
                  {currentLocation?.latitude?.toFixed(4)},{" "}
                  {currentLocation?.longitude?.toFixed(4)}
                </p>
                <Button
                  onClick={handleCreateGeofence}
                  disabled={!geofenceName}
                  className="w-full text-sm"
                  size="sm"
                >
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {geofences.length === 0 ? (
            <p className="text-center py-4 text-xs text-slate-400">
              No geofences yet
            </p>
          ) : (
            geofences.map((geofence) => (
              <div
                key={geofence.id}
                className="p-2 border rounded text-xs bg-slate-900 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-slate-50">{geofence.name}</p>
                  <p className="text-slate-400">
                    Radius: {geofence.radius}m • {geofence.latitude?.toFixed(4)}
                    , {geofence.longitude?.toFixed(4)}
                  </p>
                </div>
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs h-7"
                    onClick={() => alert(`Viewing geofence: ${geofence.name}`)}
                  >
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    className="text-xs h-7"
                    onClick={() => deleteGeofence(geofence.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Tracking Status */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Tracking Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Status</span>
            <Badge variant={tracking ? "default" : "secondary"}>
              {tracking ? "Active" : "Inactive"}
            </Badge>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Device</span>
            <span className="font-mono text-slate-50">
              {selectedDeviceId || "Not selected"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300">Last Update</span>
            <span className="text-slate-50">
              {currentLocation?.timestamp
                ? new Date(currentLocation.timestamp).toLocaleTimeString()
                : "Never"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


