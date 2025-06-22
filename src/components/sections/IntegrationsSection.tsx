
import React from 'react';
import { Globe } from "lucide-react";

export const IntegrationsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Globe className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Integrations</h2>
        <p className="text-sm text-muted-foreground">Connect with external services</p>
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { name: 'Slack', description: 'Team communication', status: 'available' },
        { name: 'Microsoft Teams', description: 'Video conferencing', status: 'available' },
        { name: 'Zapier', description: 'Workflow automation', status: 'connected' },
        { name: 'QuickBooks', description: 'Accounting software', status: 'available' },
        { name: 'Salesforce', description: 'CRM platform', status: 'available' },
        { name: 'HubSpot', description: 'Marketing automation', status: 'connected' }
      ].map((integration) => (
        <div key={integration.name} className="p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium">{integration.name}</h3>
            <span className={`text-xs px-2 py-1 rounded ${
              integration.status === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-600'
            }`}>
              {integration.status}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{integration.description}</p>
        </div>
      ))}
    </div>
  </div>
);
