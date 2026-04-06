import { useState, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { GraduationCap, Play, Pause, BarChart3 } from "lucide-react";
import { useAnalytics } from "@/hooks/useAnalytics";

export default function TrainingManager() {
  const { trainingPerformance, fetchTrainingPerformance } = useAnalytics();
  const [selectedDevice, setSelectedDevice] = useState("");
  const [trainingType, setTrainingType] = useState("device-basics");
  const [showStartDialog, setShowStartDialog] = useState(false);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);

  useEffect(() => {
    fetchTrainingPerformance();
  }, [fetchTrainingPerformance]);

  const handleStartTraining = async () => {
    if (!selectedDevice || !trainingType) return;

    // Create new session
    const newSession = {
      id: `session-${Date.now()}`,
      deviceId: selectedDevice,
      trainingType,
      startTime: new Date().toISOString(),
      status: "active" as const,
      progress: 0,
    };

    setActiveSessions((prev) => [...prev, newSession]);
    setShowStartDialog(false);
  };

  const handleStopTraining = (sessionId: string) => {
    setActiveSessions((prev) =>
      prev.map((s) =>
        s.id === sessionId
          ? {
              ...s,
              status: "completed",
              endTime: new Date().toISOString(),
              progress: 100,
            }
          : s,
      ),
    );
  };

  return (
    <div className="p-4 space-y-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            Training Manager
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage user training sessions
          </p>
        </div>
        <Dialog open={showStartDialog} onOpenChange={setShowStartDialog}>
          <DialogTrigger asChild>
            <Button size="sm">
              <Play className="h-4 w-4 mr-1" />
              Start Training
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className="text-sm">
                Start Training Session
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Device ID
                </label>
                <Input
                  placeholder="Enter device ID"
                  value={selectedDevice}
                  onChange={(e) => setSelectedDevice(e.target.value)}
                  className="mt-1 text-sm h-8"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">
                  Training Type
                </label>
                <Select value={trainingType} onValueChange={setTrainingType}>
                  <SelectTrigger className="mt-1 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="device-basics">Device Basics</SelectItem>
                    <SelectItem value="advanced-features">
                      Advanced Features
                    </SelectItem>
                    <SelectItem value="security">Security Training</SelectItem>
                    <SelectItem value="app-management">
                      App Management
                    </SelectItem>
                    <SelectItem value="settings">Settings & Config</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleStartTraining}
                className="w-full text-sm"
                size="sm"
              >
                Start Session
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Sessions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Active Sessions</CardTitle>
          <CardDescription className="text-xs">
            {activeSessions.filter((s) => s.status === "active").length}{" "}
            sessions running
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {activeSessions.filter((s) => s.status === "active").length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">
              No active sessions
            </p>
          ) : (
            activeSessions
              .filter((s) => s.status === "active")
              .map((session) => (
                <div
                  key={session.id}
                  className="p-3 border rounded text-xs bg-white hover:bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {session.trainingType}
                      </p>
                      <p className="text-gray-500">{session.deviceId}</p>
                    </div>
                    <Button
                      onClick={() => handleStopTraining(session.id)}
                      variant="destructive"
                      size="sm"
                      className="text-xs"
                    >
                      <Pause className="h-3 w-3 mr-1" />
                      Stop
                    </Button>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${session.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))
          )}
        </CardContent>
      </Card>

      {/* Training Statistics */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total Sessions</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {trainingPerformance.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Completed</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {trainingPerformance.filter((t) => t.completed).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Avg Score</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {trainingPerformance.length > 0
                ? (
                    trainingPerformance.reduce((sum, t) => sum + t.score, 0) /
                    trainingPerformance.length
                  ).toFixed(1)
                : "N/A"}
              %
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Performance History */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance History
          </CardTitle>
          <CardDescription className="text-xs">
            {trainingPerformance.length} sessions recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trainingPerformance.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">
              No training history yet
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {trainingPerformance.map((performance, index) => (
                <div
                  key={index}
                  className="p-3 border rounded text-xs bg-white hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">
                        {performance.trainingType}
                      </p>
                      <p className="text-gray-500">{performance.deviceId}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">
                        {performance.score}%
                      </p>
                      <Badge
                        variant={
                          performance.score >= 80 ? "default" : "secondary"
                        }
                        className="text-xs mt-1"
                      >
                        {performance.level}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        performance.score >= 80
                          ? "bg-green-500"
                          : performance.score >= 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                      }`}
                      style={{ width: `${performance.score}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-500 mt-2">
                    Duration: {performance.duration} minutes •{" "}
                    {new Date(performance.startTime).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Training Modules */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Available Training Modules</CardTitle>
          <CardDescription className="text-xs">
            5 modules available
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { id: "device-basics", name: "Device Basics", duration: "15 min" },
            {
              id: "advanced-features",
              name: "Advanced Features",
              duration: "30 min",
            },
            { id: "security", name: "Security Training", duration: "20 min" },
            {
              id: "app-management",
              name: "App Management",
              duration: "25 min",
            },
            { id: "settings", name: "Settings & Config", duration: "35 min" },
          ].map((module) => (
            <div
              key={module.id}
              className="p-2 border rounded text-xs flex items-center justify-between bg-white"
            >
              <div>
                <p className="font-medium text-gray-900">{module.name}</p>
                <p className="text-gray-500">{module.duration}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Assign
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Completion Rates by Module */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Completion Rates</CardTitle>
          <CardDescription className="text-xs">
            By training module
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { name: "Device Basics", rate: 95 },
            { name: "Advanced Features", rate: 72 },
            { name: "Security", rate: 88 },
            { name: "App Management", rate: 65 },
            { name: "Settings", rate: 42 },
          ].map((module, index) => (
            <div key={index} className="text-xs">
              <div className="flex justify-between mb-1">
                <p className="text-gray-900">{module.name}</p>
                <p className="font-bold text-gray-900">{module.rate}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    module.rate >= 80
                      ? "bg-green-500"
                      : module.rate >= 60
                        ? "bg-yellow-500"
                        : "bg-red-500"
                  }`}
                  style={{ width: `${module.rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
