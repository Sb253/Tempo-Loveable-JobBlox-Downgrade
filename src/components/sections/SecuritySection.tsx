
import React from 'react';
import { Shield } from "lucide-react";

export const SecuritySection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Shield className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Security Settings</h2>
        <p className="text-sm text-muted-foreground">Manage security and access controls</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
        <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded mt-2 inline-block">Not Enabled</span>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">API Keys</h3>
        <p className="text-sm text-muted-foreground">Manage API access tokens and permissions</p>
        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded mt-2 inline-block">2 Active Keys</span>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Login History</h3>
        <p className="text-sm text-muted-foreground">View recent login activity and sessions</p>
      </div>
      <div className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
        <h3 className="font-medium mb-2">Data Export</h3>
        <p className="text-sm text-muted-foreground">Download your account data and settings</p>
      </div>
    </div>
  </div>
);
