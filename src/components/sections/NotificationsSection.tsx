
import React from 'react';
import { Bell } from "lucide-react";

export const NotificationsSection = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-3">
      <Bell className="h-6 w-6 text-blue-600" />
      <div>
        <h2 className="text-xl font-semibold">Notifications</h2>
        <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
      </div>
    </div>
    <div className="space-y-4">
      {[
        { title: 'New client signed up', time: '2 minutes ago', type: 'success', read: false },
        { title: 'Subscription payment received', time: '1 hour ago', type: 'info', read: false },
        { title: 'System maintenance scheduled', time: '3 hours ago', type: 'warning', read: true },
        { title: 'Weekly report generated', time: '1 day ago', type: 'info', read: true },
        { title: 'Client feedback received', time: '2 days ago', type: 'success', read: true },
      ].map((notification, index) => (
        <div key={index} className={`p-4 border rounded-lg transition-colors ${
          !notification.read ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'
        }`}>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-muted-foreground">{notification.time}</p>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);
