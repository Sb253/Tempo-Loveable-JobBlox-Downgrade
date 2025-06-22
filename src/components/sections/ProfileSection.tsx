
import React from 'react';
import { User } from "lucide-react";

interface ProfileSectionProps {
  userType: string | null;
}

export const ProfileSection = ({ userType }: ProfileSectionProps) => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <User className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Profile Settings</h2>
        <p className="text-sm text-muted-foreground">Manage your account information</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">User Type</label>
          <p className="text-lg font-medium capitalize">{userType || 'Unknown'}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Email</label>
          <p className="text-lg">demo@example.com</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Company</label>
          <p className="text-lg">Acme Construction Co.</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Last Login</label>
          <p className="text-lg">Today at 2:30 PM</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Account Status</label>
          <p className="text-lg text-green-600 font-medium">Active</p>
        </div>
        <div className="p-4 border rounded-lg">
          <label className="text-sm font-medium text-muted-foreground">Plan</label>
          <p className="text-lg">Professional</p>
        </div>
      </div>
    </div>
  </div>
);
