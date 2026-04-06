import { useState } from "react";
import { Users, UserCheck, UserX, UserPlus } from "lucide-react";
import { StatCard } from "../components/dashboard/StatCard";
import { UserTable } from "../components/users/UserTable";
import { BlockUserDialog } from "../components/users/BlockUserDialog";
import { AllowUserDialog } from "../components/users/AllowUserDialog";
import { DeleteUserDialog } from "../components/users/DeleteUserDialog";

export interface User {
  id: string;
  email: string;
  name: string;
  status: "active" | "blocked" | "inactive";
  joinedDate: string;
  lastActive: string;
  loginCount: number;
  role: "admin" | "user" | "viewer";
  ipAddress: string;
  deviceCount: number;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      email: "john.doe@example.com",
      name: "John Doe",
      status: "active",
      joinedDate: "2024-01-15",
      lastActive: "2 hours ago",
      loginCount: 247,
      role: "admin",
      ipAddress: "192.168.1.100",
      deviceCount: 5,
    },
    {
      id: "2",
      email: "jane.smith@example.com",
      name: "Jane Smith",
      status: "active",
      joinedDate: "2024-02-20",
      lastActive: "30 minutes ago",
      loginCount: 156,
      role: "user",
      ipAddress: "192.168.1.101",
      deviceCount: 3,
    },
    {
      id: "3",
      email: "blocked.user@example.com",
      name: "Blocked User",
      status: "blocked",
      joinedDate: "2024-01-10",
      lastActive: "15 days ago",
      loginCount: 45,
      role: "viewer",
      ipAddress: "192.168.1.102",
      deviceCount: 1,
    },
    {
      id: "4",
      email: "tech.support@example.com",
      name: "Tech Support",
      status: "active",
      joinedDate: "2023-12-01",
      lastActive: "1 hour ago",
      loginCount: 892,
      role: "admin",
      ipAddress: "192.168.1.103",
      deviceCount: 8,
    },
    {
      id: "5",
      email: "inactive.user@example.com",
      name: "Inactive User",
      status: "inactive",
      joinedDate: "2024-03-01",
      lastActive: "60 days ago",
      loginCount: 12,
      role: "viewer",
      ipAddress: "192.168.1.104",
      deviceCount: 0,
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [activeDialog, setActiveDialog] = useState<
    "block" | "allow" | "delete" | null
  >(null);

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      change: `${users.filter((u) => u.status === "active").length} active`,
      icon: Users,
      trend: "up" as const,
    },
    {
      title: "Active Users",
      value: users.filter((u) => u.status === "active").length.toString(),
      change: `${((users.filter((u) => u.status === "active").length / users.length) * 100).toFixed(0)}% of total`,
      icon: UserCheck,
      trend: "neutral" as const,
      status: "success" as const,
    },
    {
      title: "Blocked Users",
      value: users.filter((u) => u.status === "blocked").length.toString(),
      change: "Suspended access",
      icon: UserX,
      trend: "neutral" as const,
      status: "warning" as const,
    },
    {
      title: "Inactive Users",
      value: users.filter((u) => u.status === "inactive").length.toString(),
      change: "30+ days no login",
      icon: UserPlus,
      trend: "down" as const,
      status: "error" as const,
    },
  ];

  const handleBlock = (user: User) => {
    setSelectedUser(user);
    setActiveDialog("block");
  };

  const handleAllow = (user: User) => {
    setSelectedUser(user);
    setActiveDialog("allow");
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setActiveDialog("delete");
  };

  const confirmBlock = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id ? { ...u, status: "blocked" } : u,
      ),
    );
    setActiveDialog(null);
    setSelectedUser(null);
  };

  const confirmAllow = () => {
    if (!selectedUser) return;
    setUsers(
      users.map((u) =>
        u.id === selectedUser.id ? { ...u, status: "active" } : u,
      ),
    );
    setActiveDialog(null);
    setSelectedUser(null);
  };

  const confirmDelete = () => {
    if (!selectedUser) return;
    setUsers(users.filter((u) => u.id !== selectedUser.id));
    setActiveDialog(null);
    setSelectedUser(null);
  };

  return (
    <div className="space-y-2">
      <div className="py-1">
        <h1 className="text-lg font-bold text-slate-50 mb-0.5">
          User Management
        </h1>
        <p className="text-xs text-slate-400">
          Manage users, permissions, access control
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1.5">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
            trend={stat.trend}
            status={stat.status}
          />
        ))}
      </div>

      {/* Users Table */}
      <div className="mt-1">
        <UserTable
          users={users}
          onBlock={handleBlock}
          onAllow={handleAllow}
          onDelete={handleDelete}
        />
      </div>

      {/* Block User Dialog */}
      <BlockUserDialog
        isOpen={activeDialog === "block"}
        user={selectedUser}
        onConfirm={confirmBlock}
        onCancel={() => {
          setActiveDialog(null);
          setSelectedUser(null);
        }}
      />

      {/* Allow User Dialog */}
      <AllowUserDialog
        isOpen={activeDialog === "allow"}
        user={selectedUser}
        onConfirm={confirmAllow}
        onCancel={() => {
          setActiveDialog(null);
          setSelectedUser(null);
        }}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        isOpen={activeDialog === "delete"}
        user={selectedUser}
        onConfirm={confirmDelete}
        onCancel={() => {
          setActiveDialog(null);
          setSelectedUser(null);
        }}
      />
    </div>
  );
}
