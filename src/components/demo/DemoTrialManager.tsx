
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, TrendingUp, CreditCard, Calendar, ArrowRight } from "lucide-react";

interface TrialUser {
  id: string;
  email: string;
  name: string;
  startDate: string;
  endDate: string;
  daysRemaining: number;
  usage: number;
  status: 'active' | 'expired' | 'converted';
}

export const DemoTrialManager = () => {
  const [trialUsers] = useState<TrialUser[]>([
    {
      id: '1',
      email: 'demo@startup.com',
      name: 'Demo User 1',
      startDate: '2024-06-01',
      endDate: '2024-06-15',
      daysRemaining: 8,
      usage: 65,
      status: 'active'
    },
    {
      id: '2',
      email: 'trial@company.com',
      name: 'Trial User 2',
      startDate: '2024-05-20',
      endDate: '2024-06-03',
      daysRemaining: 0,
      usage: 90,
      status: 'expired'
    },
    {
      id: '3',
      email: 'test@business.com',
      name: 'Converted User',
      startDate: '2024-05-15',
      endDate: '2024-05-29',
      daysRemaining: 0,
      usage: 85,
      status: 'converted'
    }
  ]);

  const [newTrialEmail, setNewTrialEmail] = useState('');

  const activeTrials = trialUsers.filter(u => u.status === 'active').length;
  const expiredTrials = trialUsers.filter(u => u.status === 'expired').length;
  const convertedTrials = trialUsers.filter(u => u.status === 'converted').length;
  const conversionRate = trialUsers.length > 0 ? (convertedTrials / trialUsers.length * 100).toFixed(1) : '0';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'converted': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateTrial = () => {
    if (newTrialEmail) {
      console.log('Creating trial for:', newTrialEmail);
      setNewTrialEmail('');
      // Here you would implement the trial creation logic
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            14-Day Trial Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trial Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{activeTrials}</div>
              <div className="text-sm text-green-700">Active Trials</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{expiredTrials}</div>
              <div className="text-sm text-red-700">Expired Trials</div>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{convertedTrials}</div>
              <div className="text-sm text-blue-700">Converted</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{conversionRate}%</div>
              <div className="text-sm text-purple-700">Conversion Rate</div>
            </div>
          </div>

          {/* Create New Trial */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Create New Trial</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="Enter email address for trial"
                  value={newTrialEmail}
                  onChange={(e) => setNewTrialEmail(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={handleCreateTrial}>
                  <Users className="h-4 w-4 mr-2" />
                  Create Trial
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Trial users get full access for 14 days with the option to convert to a paid plan.
              </p>
            </CardContent>
          </Card>

          {/* Trial Users List */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Trial Users</h3>
            <div className="space-y-3">
              {trialUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    {user.status === 'active' && (
                      <div className="text-center">
                        <div className="text-sm font-medium">{user.daysRemaining} days left</div>
                        <Progress value={(14 - user.daysRemaining) / 14 * 100} className="w-20 h-2 mt-1" />
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className="text-sm font-medium">{user.usage}%</div>
                      <div className="text-xs text-muted-foreground">Usage</div>
                    </div>
                    
                    <Badge className={getStatusColor(user.status)}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                    
                    {user.status === 'active' && (
                      <Button variant="outline" size="sm">
                        <ArrowRight className="h-4 w-4 mr-1" />
                        Convert
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trial Conversion Flow */}
          <Card>
            <CardHeader>
              <CardTitle>Trial to Subscription Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span>14-Day Trial</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-50 rounded-lg">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span>Reminder Emails</span>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
                  <CreditCard className="h-4 w-4 text-green-600" />
                  <span>Paid Subscription</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Automated email sequences help convert trial users to paying customers with targeted messaging based on usage patterns.
              </p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};
