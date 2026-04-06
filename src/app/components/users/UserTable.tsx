import { MoreVertical, Lock, Unlock, Trash2 } from "lucide-react";
import { User } from "../../pages/UserManagement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface UserTableProps {
  users: User[];
  onBlock: (user: User) => void;
  onAllow: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserTable({
  users,
  onBlock,
  onAllow,
  onDelete,
}: UserTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "blocked":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "inactive":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
      case "user":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "viewer":
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/20";
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-md overflow-hidden text-xs">
      <Table>
        <TableHeader className="bg-slate-800/50">
          <TableRow className="border-b border-slate-800 hover:bg-transparent h-6">
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Name
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Email
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Status
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Role
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Join
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Active
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Log
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              Dev
            </TableHead>
            <TableHead className="text-xs text-slate-400 py-0.5 px-1 font-semibold">
              IP
            </TableHead>
            <TableHead className="text-right text-xs text-slate-400 py-0.5 px-1 font-semibold">
              •••
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="border-b border-slate-800 hover:bg-slate-800/20 h-6"
            >
              <TableCell className="font-medium text-slate-50 text-xs py-0.5 px-1">
                {user.name}
              </TableCell>
              <TableCell className="text-slate-400 text-xs py-0.5 px-1 truncate">
                {user.email}
              </TableCell>
              <TableCell className="py-0">
                <Badge
                  className={`${getStatusColor(user.status)} border text-xs py-0 px-0.5 text-nowrap`}
                >
                  {user.status.charAt(0).toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="py-0">
                <Badge
                  className={`${getRoleColor(user.role)} border text-xs py-0 px-0.5`}
                >
                  {user.role.charAt(0).toUpperCase()}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-400 text-xs py-0.5 px-1">
                {user.joinedDate.split("-").pop()}
              </TableCell>
              <TableCell className="text-slate-400 text-xs py-0.5 px-1">
                {user.lastActive}
              </TableCell>
              <TableCell className="text-slate-400 text-xs py-0.5 px-1">
                {user.loginCount}
              </TableCell>
              <TableCell className="text-slate-400 text-xs py-0.5 px-1">
                {user.deviceCount}
              </TableCell>
              <TableCell className="text-slate-400 font-mono text-xs py-0.5 px-1 text-nowrap">
                {user.ipAddress.split(".").slice(-2).join(".")}
              </TableCell>
              <TableCell className="text-right py-0 px-0.5">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                    >
                      <MoreVertical className="h-2.5 w-2.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-slate-900 border-slate-800 text-xs"
                  >
                    {user.status === "active" ? (
                      <DropdownMenuItem
                        onClick={() => onBlock(user)}
                        className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 cursor-pointer py-0.5 text-xs"
                      >
                        <Lock className="mr-1 h-2.5 w-2.5" />
                        <span className="text-xs">Block</span>
                      </DropdownMenuItem>
                    ) : user.status === "blocked" ? (
                      <DropdownMenuItem
                        onClick={() => onAllow(user)}
                        className="text-emerald-400 focus:bg-emerald-500/10 focus:text-emerald-400 cursor-pointer py-0.5 text-xs"
                      >
                        <Unlock className="mr-1 h-2.5 w-2.5" />
                        <span className="text-xs">Unblock</span>
                      </DropdownMenuItem>
                    ) : null}
                    <DropdownMenuItem
                      onClick={() => onDelete(user)}
                      className="text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 cursor-pointer py-0.5 text-xs"
                    >
                      <Trash2 className="mr-1 h-2.5 w-2.5" />
                      <span className="text-xs">Del</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
