
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Users, Shield, Power } from "lucide-react";

interface BulkActionsToolbarProps {
  selectedCount: number;
  onBulkDelete: () => void;
  onBulkRoleChange: (role: 'admin' | 'manager' | 'employee') => void;
  onBulkStatusChange: (status: 'activate' | 'deactivate') => void;
  onClearSelection: () => void;
}

export const BulkActionsToolbar = ({ 
  selectedCount, 
  onBulkDelete, 
  onBulkRoleChange, 
  onBulkStatusChange,
  onClearSelection 
}: BulkActionsToolbarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-blue-900">
            {selectedCount} member{selectedCount > 1 ? 's' : ''} selected
          </span>
          
          <div className="flex items-center space-x-2">
            <Select onValueChange={(value: 'admin' | 'manager' | 'employee') => onBulkRoleChange(value)}>
              <SelectTrigger className="w-40">
                <Shield className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Change role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="manager">Manager</SelectItem>
                <SelectItem value="employee">Employee</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onBulkStatusChange('activate')}
            >
              <Power className="h-4 w-4 mr-2" />
              Activate
            </Button>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onBulkStatusChange('deactivate')}
            >
              <Power className="h-4 w-4 mr-2" />
              Deactivate
            </Button>

            <Button 
              variant="destructive" 
              size="sm"
              onClick={onBulkDelete}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={onClearSelection}>
          Clear Selection
        </Button>
      </div>
    </div>
  );
};
