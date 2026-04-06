import { CheckCircle } from "lucide-react";
import { User } from "../../pages/UserManagement";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface AllowUserDialogProps {
  isOpen: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function AllowUserDialog({
  isOpen,
  user,
  onConfirm,
  onCancel,
}: AllowUserDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-slate-900 border-slate-800 max-w-xs p-3">
        <AlertDialogHeader className="gap-1">
          <div className="flex items-center gap-1.5">
            <div className="p-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <CheckCircle className="w-3 h-3" />
            </div>
            <AlertDialogTitle className="text-xs text-slate-50">
              Unblock?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-xs text-slate-400">
            Unblock{" "}
            <span className="font-semibold text-slate-50">{user?.name}</span> -
            restore access.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-1 bg-emerald-500/5 border border-emerald-500/10 rounded p-1.5 text-xs">
          <p className="text-xs text-slate-300">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-xs text-slate-300">
            <span className="font-semibold">Role:</span> {user?.role}
          </p>
        </div>
        <div className="flex gap-1.5 justify-end">
          <AlertDialogCancel
            onClick={onCancel}
            className="bg-slate-800 border-slate-700 text-xs text-slate-50 hover:bg-slate-700 px-2 py-1"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-emerald-600 text-white text-xs hover:bg-emerald-700 px-2 py-1"
          >
            Unblock
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
