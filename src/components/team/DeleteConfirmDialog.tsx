
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberNames: string[];
  isBulk?: boolean;
}

export const DeleteConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  memberNames, 
  isBulk = false 
}: DeleteConfirmDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm {isBulk ? 'Bulk ' : ''}Deletion
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the following team member{memberNames.length > 1 ? 's' : ''}?
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <ul className="space-y-1">
              {memberNames.map((name, index) => (
                <li key={index} className="text-sm font-medium text-red-900">
                  • {name}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-muted-foreground">
            This action cannot be undone. All data associated with {memberNames.length > 1 ? 'these members' : 'this member'} will be permanently removed.
          </p>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Delete {memberNames.length > 1 ? `${memberNames.length} Members` : 'Member'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
