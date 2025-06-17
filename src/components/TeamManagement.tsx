
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InvitationManager } from './auth/InvitationManager';
import { EmployeeProfile } from '../types/auth';
import { EditMemberDialog } from './team/EditMemberDialog';
import { BulkActionsToolbar } from './team/BulkActionsToolbar';
import { DeleteConfirmDialog } from './team/DeleteConfirmDialog';
import { TeamStatsCards } from './team/TeamStatsCards';
import { TeamSearch } from './team/TeamSearch';
import { TeamMembersTable } from './team/TeamMembersTable';
import { AddMemberDialog } from './team/AddMemberDialog';
import { PasswordManagementDialog } from './team/PasswordManagementDialog';

const mockTeamMembers: EmployeeProfile[] = [
  {
    id: '1',
    name: 'Mike Johnson',
    email: 'mike@company.com',
    phone: '(555) 123-4567',
    address: '123 Main St, New York, NY',
    coordinates: [-74.0060, 40.7128],
    skills: ['plumbing', 'electrical', 'general'],
    availability: 'available',
    workload: 45,
    role: 'manager',
    permissions: ['view_dashboard', 'manage_customers', 'manage_jobs', 'view_reports'],
    hasPassword: true,
    canChangePassword: true,
    lastLogin: '2024-01-15T10:30:00Z',
    invitationStatus: 'accepted'
  },
  {
    id: '2',
    name: 'Sarah Davis',
    email: 'sarah@company.com',
    phone: '(555) 234-5678',
    address: '456 Broadway, New York, NY',
    coordinates: [-73.9851, 40.7589],
    skills: ['roofing', 'carpentry', 'painting'],
    availability: 'available',
    workload: 30,
    role: 'employee',
    permissions: ['view_dashboard', 'manage_jobs'],
    hasPassword: true,
    canChangePassword: false,
    lastLogin: '2024-01-14T14:20:00Z',
    invitationStatus: 'accepted'
  },
  {
    id: '3',
    name: 'Tom Wilson',
    email: 'tom@company.com',
    phone: '(555) 345-6789',
    address: '789 Park Ave, New York, NY',
    coordinates: [-73.9934, 40.7505],
    skills: ['electrical', 'hvac'],
    availability: 'offline',
    workload: 0,
    role: 'employee',
    permissions: ['view_dashboard'],
    hasPassword: false,
    canChangePassword: true,
    invitationStatus: 'pending'
  }
];

export const TeamManagement = () => {
  const { toast } = useToast();
  const [teamMembers, setTeamMembers] = useState<EmployeeProfile[]>(mockTeamMembers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddMember, setShowAddMember] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<EmployeeProfile | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(new Set());
  const [membersToDelete, setMembersToDelete] = useState<EmployeeProfile[]>([]);

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectAll = () => {
    if (selectedMembers.size === filteredMembers.length) {
      setSelectedMembers(new Set());
    } else {
      setSelectedMembers(new Set(filteredMembers.map(m => m.id)));
    }
  };

  const handleSelectMember = (memberId: string) => {
    const newSelection = new Set(selectedMembers);
    if (newSelection.has(memberId)) {
      newSelection.delete(memberId);
    } else {
      newSelection.add(memberId);
    }
    setSelectedMembers(newSelection);
  };

  const handleEditMember = (member: EmployeeProfile) => {
    setSelectedMember(member);
    setShowEditDialog(true);
  };

  const handleSaveEditedMember = (updatedMember: EmployeeProfile) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === updatedMember.id ? updatedMember : member
    ));
    setShowEditDialog(false);
    setSelectedMember(null);
  };

  const handleDeleteMember = (member: EmployeeProfile) => {
    setMembersToDelete([member]);
    setShowDeleteDialog(true);
  };

  const handleBulkDelete = () => {
    const membersToDeleteList = teamMembers.filter(m => selectedMembers.has(m.id));
    setMembersToDelete(membersToDeleteList);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    const idsToDelete = new Set(membersToDelete.map(m => m.id));
    setTeamMembers(prev => prev.filter(member => !idsToDelete.has(member.id)));
    setSelectedMembers(new Set());
    setShowDeleteDialog(false);
    setMembersToDelete([]);
    
    toast({
      title: "Members Deleted",
      description: `${membersToDelete.length} member${membersToDelete.length > 1 ? 's' : ''} deleted successfully.`,
    });
  };

  const handleBulkRoleChange = (role: 'admin' | 'manager' | 'employee') => {
    setTeamMembers(prev => prev.map(member => 
      selectedMembers.has(member.id) ? { ...member, role } : member
    ));
    
    toast({
      title: "Bulk Role Update",
      description: `Updated role to ${role} for ${selectedMembers.size} member${selectedMembers.size > 1 ? 's' : ''}.`,
    });
    
    setSelectedMembers(new Set());
  };

  const handleBulkStatusChange = (status: 'activate' | 'deactivate') => {
    const availability = status === 'activate' ? 'available' : 'offline';
    setTeamMembers(prev => prev.map(member => 
      selectedMembers.has(member.id) ? { ...member, availability } : member
    ));
    
    toast({
      title: "Bulk Status Update",
      description: `${status === 'activate' ? 'Activated' : 'Deactivated'} ${selectedMembers.size} member${selectedMembers.size > 1 ? 's' : ''}.`,
    });
    
    setSelectedMembers(new Set());
  };

  const handlePasswordManagement = (member: EmployeeProfile) => {
    setSelectedMember(member);
    setShowPasswordDialog(true);
  };

  const handleSetPassword = (memberId: string, passwordData: any) => {
    setTeamMembers(prev => prev.map(member => 
      member.id === memberId 
        ? { 
            ...member, 
            hasPassword: true, 
            canChangePassword: passwordData.canChangePassword
          }
        : member
    ));
  };

  const handleAddMember = (newMemberData: any) => {
    const member: EmployeeProfile = {
      id: Date.now().toString(),
      ...newMemberData,
      coordinates: [0, 0] as [number, number],
      availability: 'offline',
      workload: 0,
      hasPassword: false,
      lastLogin: undefined,
      invitationStatus: 'none'
    };

    setTeamMembers(prev => [...prev, member]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Team Management</h2>
        <Button onClick={() => setShowAddMember(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Tabs defaultValue="members" className="space-y-4">
        <TabsList>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <TeamStatsCards teamMembers={teamMembers} />
          
          <TeamSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />

          <BulkActionsToolbar
            selectedCount={selectedMembers.size}
            onBulkDelete={handleBulkDelete}
            onBulkRoleChange={handleBulkRoleChange}
            onBulkStatusChange={handleBulkStatusChange}
            onClearSelection={() => setSelectedMembers(new Set())}
          />

          <TeamMembersTable
            filteredMembers={filteredMembers}
            selectedMembers={selectedMembers}
            onSelectAll={handleSelectAll}
            onSelectMember={handleSelectMember}
            onEditMember={handleEditMember}
            onDeleteMember={handleDeleteMember}
            onPasswordManagement={handlePasswordManagement}
          />
        </TabsContent>

        <TabsContent value="invitations">
          <InvitationManager />
        </TabsContent>
      </Tabs>

      <AddMemberDialog
        isOpen={showAddMember}
        onClose={() => setShowAddMember(false)}
        onAddMember={handleAddMember}
      />

      <PasswordManagementDialog
        isOpen={showPasswordDialog}
        member={selectedMember}
        onClose={() => {
          setShowPasswordDialog(false);
          setSelectedMember(null);
        }}
        onSetPassword={handleSetPassword}
      />

      <EditMemberDialog
        member={selectedMember}
        isOpen={showEditDialog}
        onClose={() => {
          setShowEditDialog(false);
          setSelectedMember(null);
        }}
        onSave={handleSaveEditedMember}
      />

      <DeleteConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => {
          setShowDeleteDialog(false);
          setMembersToDelete([]);
        }}
        onConfirm={confirmDelete}
        memberNames={membersToDelete.map(m => m.name)}
        isBulk={membersToDelete.length > 1}
      />
    </div>
  );
};
