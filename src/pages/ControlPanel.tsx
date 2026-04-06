import { useState, useEffect, ChangeEvent } from "react";
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
import { Alert, AlertDescription } from "@/app/components/ui/alert";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Lock,
  Unlock,
  RotateCcw,
  Trash2,
  MessageCircle,
  Share2,
  Settings,
  AlertCircle,
  Send,
} from "lucide-react";
import { useControl } from "@/hooks/useControl";

export default function ControlPanel() {
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmAction, setConfirmAction] = useState("");
  const [smsPhoneNumber, setSmsPhoneNumber] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const { deviceGroups, actions, fetchDeviceGroups } = useControl();

  useEffect(() => {
    fetchDeviceGroups();
  }, [fetchDeviceGroups]);

  const handleAction = async (action: string, deviceId: string) => {
    if (!deviceId) {
      alert("Please select a device first");
      return;
    }

    switch (action) {
      case "lock":
        setConfirmAction("lock");
        setShowConfirm(true);
        break;
      case "unlock":
        setConfirmAction("unlock");
        setShowConfirm(true);
        break;
      case "reboot":
        setConfirmAction("reboot");
        setShowConfirm(true);
        break;
      case "wipe":
        setConfirmAction("wipe");
        setShowConfirm(true);
        break;
      default:
        break;
    }
  };

  return (
    <div className="p-4 space-y-4 bg-slate-950 min-h-screen">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Control Panel
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage and control connected devices
        </p>
      </div>

      {/* Device Selection */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Select Device</CardTitle>
          <CardDescription className="text-xs">
            Choose a device to control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="Enter device ID"
            value={selectedDeviceId}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSelectedDeviceId(e.target.value)
            }
            className="text-sm h-8"
          />
        </CardContent>
      </Card>

      {/* Warning Alert */}
      {selectedDeviceId && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-xs ml-2">
            Device control actions are permanent. Proceed with caution.
          </AlertDescription>
        </Alert>
      )}

      {/* Device Control Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-3">
            <Button
              onClick={() => handleAction("lock", selectedDeviceId)}
              disabled={!selectedDeviceId}
              className="w-full text-xs h-8"
              variant="outline"
            >
              <Lock className="h-4 w-4 mr-1" />
              Lock Device
            </Button>
            <p className="text-xs text-gray-500 mt-2">
              Remotely lock the device
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <Button
              onClick={() => handleAction("unlock", selectedDeviceId)}
              disabled={!selectedDeviceId}
              className="w-full text-xs h-8"
              variant="outline"
            >
              <Unlock className="h-4 w-4 mr-1" />
              Unlock Device
            </Button>
            <p className="text-xs text-gray-500 mt-2">Remove device lock</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <Button
              onClick={() => handleAction("reboot", selectedDeviceId)}
              disabled={!selectedDeviceId}
              className="w-full text-xs h-8"
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reboot
            </Button>
            <p className="text-xs text-gray-500 mt-2">Restart the device</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-3">
            <Button
              onClick={() => handleAction("wipe", selectedDeviceId)}
              disabled={!selectedDeviceId}
              className="w-full text-xs h-8"
              variant="destructive"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Wipe Data
            </Button>
            <p className="text-xs text-gray-500 mt-2">Factory reset</p>
          </CardContent>
        </Card>
      </div>

      {/* Send SMS */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Send SMS
          </CardTitle>
          <CardDescription className="text-xs">
            Send message from device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input
            placeholder="Phone number"
            value={smsPhoneNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSmsPhoneNumber(e.target.value)
            }
            className="text-sm h-8"
          />
          <Textarea
            placeholder="Message"
            value={smsMessage}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setSmsMessage(e.target.value)
            }
            className="text-sm"
          />
          <Button className="w-full text-xs" size="sm">
            <Send className="h-4 w-4 mr-1" />
            Send SMS
          </Button>
        </CardContent>
      </Card>

      {/* Screen Share */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Screen Share
          </CardTitle>
          <CardDescription className="text-xs">
            View device screen in real-time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => alert("Screen share starting...")}
            disabled={!selectedDeviceId}
            className="w-full text-xs"
            size="sm"
          >
            Start Screen Share
          </Button>
        </CardContent>
      </Card>

      {/* Device Grouping */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Device Groups</CardTitle>
          <CardDescription className="text-xs">
            {deviceGroups.length} groups total
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {deviceGroups?.map((group) => (
            <div
              key={group.id}
              className="p-2 border rounded text-xs flex items-center justify-between bg-white"
            >
              <div>
                <p className="font-medium text-gray-900">{group.name}</p>
                <p className="text-gray-500">
                  {group.deviceIds?.length || 0} devices
                </p>
              </div>
              <Button size="sm" variant="outline" className="text-xs">
                Manage
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Recent Actions */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Recent Actions</CardTitle>
          <CardDescription className="text-xs">
            {actions.length} actions logged
          </CardDescription>
        </CardHeader>
        <CardContent>
          {actions.length === 0 ? (
            <p className="text-xs text-gray-500 text-center py-4">
              No actions yet
            </p>
          ) : (
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {actions.slice(0, 10).map((action, index) => (
                <div
                  key={index}
                  className="p-2 text-xs bg-gray-50 rounded border"
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{action.action}</p>
                    <Badge
                      variant={
                        action.status === "completed" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {action.status}
                    </Badge>
                  </div>
                  <p className="text-gray-500">
                    {new Date(action.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-sm">
            <CardHeader>
              <CardTitle className="text-sm">Confirm Action</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-gray-600">
                Are you sure you want to {confirmAction} this device? This
                action cannot be undone.
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowConfirm(false)}
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  disabled={true}
                  variant={confirmAction === "wipe" ? "destructive" : "default"}
                  size="sm"
                  className="flex-1 text-xs"
                >
                  Confirm
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
