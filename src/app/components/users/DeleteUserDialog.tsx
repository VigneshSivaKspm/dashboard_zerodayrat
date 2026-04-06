import { Trash2 } from "lucide-react";
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

interface DeleteUserDialogProps {
  isOpen: boolean;
  user: User | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteUserDialog({
  isOpen,
  user,
  onConfirm,
  onCancel,
}: DeleteUserDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="bg-slate-900 border-slate-800 max-w-xs p-3">
        <AlertDialogHeader className="gap-1">
          <div className="flex items-center gap-1.5">
            <div className="p-0.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Trash2 className="w-3 h-3" />
            </div>
            <AlertDialogTitle className="text-xs text-slate-50">
              Delete?
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-xs text-slate-400">
            Permanently delete{" "}
            <span className="font-semibold text-slate-50">{user?.name}</span> -
            irreversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-1 bg-rose-500/5 border border-rose-500/10 rounded p-1.5 text-xs">
          <p className="text-xs text-slate-300">
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <p className="text-xs text-slate-300">
            <span className="font-semibold">Devices:</span> {user?.deviceCount}
          </p>
        </div>
        <div className="bg-rose-500/5 border border-rose-500/10 rounded p-1.5">
          <ul className="text-xs text-rose-300/80 space-y-0 list-inside">
            <li>• Delete all data</li>
            <li>• Terminate sessions</li>
            <li>• Remove mappings</li>
          </ul>
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
            className="bg-rose-600 text-white text-xs hover:bg-rose-700 px-2 py-1"
          >
            Delete
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
