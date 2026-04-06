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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Textarea } from "@/app/components/ui/textarea";
import { MessageCircle, Send, Download, Search } from "lucide-react";
import { useNotificationsAndSMS } from "@/hooks/useNotificationsAndSMS";

export default function SMSLogs() {
  const [selectedDeviceId] = useState("all");
  const { smsIncoming, smsOutgoing, sendSMS, loading, refetch } =
    useNotificationsAndSMS(selectedDeviceId);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSMS, setFilteredSMS] = useState(smsIncoming);
  const [showSendDialog, setShowSendDialog] = useState(false);
  const [sendPhoneNumber, setSendPhoneNumber] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [sendDeviceId, setSendDeviceId] = useState("");

  useEffect(() => {
    refetch();
  }, [selectedDeviceId, refetch]);

  useEffect(() => {
    let filtered = smsIncoming;

    if (searchTerm) {
      filtered = filtered.filter(
        (s: any) =>
          s.phoneNumber?.includes(searchTerm) ||
          s.message?.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredSMS(filtered);
  }, [smsIncoming, searchTerm]);

  const handleSendSMS = async () => {
    if (!sendDeviceId || !sendPhoneNumber || !sendMessage) return;

    try {
      await sendSMS(sendPhoneNumber, sendMessage);
      setSendPhoneNumber("");
      setSendMessage("");
      setSendDeviceId("");
      setShowSendDialog(false);
    } catch (error) {
      console.error("Error sending SMS:", error);
    }
  };

  const handleExport = () => {
    const allSMS = [...smsIncoming, ...smsOutgoing];
    const csv = [
      ["Device", "Phone Number", "Message", "Type", "Status", "Timestamp"],
      ...allSMS.map((s: any) => [
        s.deviceId,
        s.phoneNumber,
        `"${s.message}"`,
        "received" in s ? "Received" : "Sent",
        s.status || "delivered",
        new Date(s.timestamp).toLocaleString(),
      ]),
    ]
      .map((row) =>
        row
          .map((cell) => (typeof cell === "string" ? `"${cell}"` : cell))
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sms-logs-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="p-4 space-y-4 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-50 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            SMS Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            View and send SMS messages
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={showSendDialog} onOpenChange={setShowSendDialog}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Send className="h-4 w-4 mr-1" />
                Send SMS
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle className="text-sm">Send SMS</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Device ID
                  </label>
                  <Input
                    placeholder="Enter device ID"
                    value={sendDeviceId}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSendDeviceId(e.target.value)
                    }
                    className="mt-1 text-sm h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Phone Number
                  </label>
                  <Input
                    placeholder="+1234567890"
                    value={sendPhoneNumber}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSendPhoneNumber(e.target.value)
                    }
                    className="mt-1 text-sm h-8"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    placeholder="Enter message"
                    value={sendMessage}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setSendMessage(e.target.value)
                    }
                    className="mt-1 text-sm"
                  />
                </div>
                <Button
                  onClick={handleSendSMS}
                  className="w-full text-sm"
                  size="sm"
                >
                  Send
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={handleExport} size="sm" variant="outline">
            <Download className="h-4 w-4 mr-1" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Received</p>
            <p className="text-lg font-bold text-blue-600 mt-1">
              {smsIncoming.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Sent</p>
            <p className="text-lg font-bold text-green-600 mt-1">
              {smsOutgoing.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3">
            <p className="text-xs text-gray-500">Total</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              {smsIncoming.length + smsOutgoing.length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-3">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search phone or message..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setSearchTerm(e.target.value)
                }
                className="pl-8 text-sm h-8"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SMS List */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Received SMS</CardTitle>
          <CardDescription className="text-xs">
            {filteredSMS.length} messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-6 w-6 border-b-2 border-blue-500 rounded-full"></div>
            </div>
          ) : filteredSMS.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No SMS messages found
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredSMS.map((message: any, index: number) => (
                <div
                  key={index}
                  className="p-2 border rounded text-xs bg-white hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900">
                      {message.phoneNumber}
                    </p>
                    <span className="text-gray-400 whitespace-nowrap">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-600 line-clamp-2">
                    {message.message}
                  </p>
                  <div className="flex gap-1 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {message.deviceId}
                    </Badge>
                    {message.status && (
                      <Badge variant="secondary" className="text-xs capitalize">
                        {message.status}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sent SMS */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Sent SMS</CardTitle>
          <CardDescription className="text-xs">
            {smsOutgoing.length} messages
          </CardDescription>
        </CardHeader>
        <CardContent>
          {smsOutgoing.length === 0 ? (
            <div className="text-center py-8 text-xs text-gray-500">
              No sent SMS messages yet
            </div>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {smsOutgoing.map((message: any, index: number) => (
                <div
                  key={index}
                  className="p-2 border rounded text-xs bg-green-50 hover:bg-green-100"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900">
                      {message.phoneNumber}
                    </p>
                    <span className="text-gray-400 whitespace-nowrap">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{message.message}</p>
                  <Badge
                    variant="secondary"
                    className="text-xs mt-1 capitalize"
                  >
                    {message.status || "sent"}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
