
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Lock, Edit, Trash2 } from "lucide-react";
import { EmployeeProfile } from '../../types/auth';

interface TeamMembersTableProps {
  filteredMembers: EmployeeProfile[];
  selectedMembers: Set<string>;
  onSelectAll: () => void;
  onSelectMember: (memberId: string) => void;
  onEditMember: (member: EmployeeProfile) => void;
  onDeleteMember: (member: EmployeeProfile) => void;
  onPasswordManagement: (member: EmployeeProfile) => void;
}

export const TeamMembersTable = ({
  filteredMembers,
  selectedMembers,
  onSelectAll,
  onSelectMember,
  onEditMember,
  onDeleteMember,
  onPasswordManagement
}: TeamMembersTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'on-job': return 'bg-blue-100 text-blue-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInvitationStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members & Access Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={filteredMembers.length > 0 && selectedMembers.size === filteredMembers.length}
                  onChange={onSelectAll}
                  className="rounded"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Invitation</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedMembers.has(member.id)}
                    onChange={() => onSelectMember(member.id)}
                    className="rounded"
                  />
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-muted-foreground">{member.email}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    <Shield className="h-3 w-3 mr-1" />
                    {member.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(member.availability)}>
                    {member.availability}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getInvitationStatusColor(member.invitationStatus)}>
                    {member.invitationStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {member.hasPassword ? (
                      <Badge className="bg-green-100 text-green-800">
                        <Lock className="h-3 w-3 mr-1" />
                        Set
                      </Badge>
                    ) : (
                      <Badge variant="outline">
                        Not Set
                      </Badge>
                    )}
                    {member.canChangePassword && (
                      <Badge variant="secondary" className="text-xs">
                        Can Change
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {member.lastLogin ? new Date(member.lastLogin).toLocaleDateString() : 'Never'}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onPasswordManagement(member)}
                    >
                      <Lock className="h-3 w-3 mr-1" />
                      Password
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onEditMember(member)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDeleteMember(member)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
