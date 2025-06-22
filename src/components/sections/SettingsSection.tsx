
import React from 'react';
import { Settings } from "lucide-react";

export const SettingsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Settings className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">System Settings</h2>
        <p className="text-sm text-muted-foreground">Configure platform settings</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">General Settings</h3>
        <p className="text-sm text-muted-foreground">Basic platform configuration and preferences</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Billing Settings</h3>
        <p className="text-sm text-muted-foreground">Manage subscription and payment methods</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Team Management</h3>
        <p className="text-sm text-muted-foreground">Add and manage team members</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">API Configuration</h3>
        <p className="text-sm text-muted-foreground">Manage API keys and webhooks</p>
      </div>
    </div>
  </div>
);
