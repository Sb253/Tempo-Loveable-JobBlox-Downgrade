
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Target } from "lucide-react";

interface AutomationSettings {
  autoRequestEnabled: boolean;
  requestDelay: number;
  reminderEnabled: boolean;
  reminderInterval: number;
  maxReminders: number;
}

interface ReviewAutomationSettingsProps {
  settings: AutomationSettings;
  onSettingsChange: (settings: AutomationSettings) => void;
  onToggleAutomation: (setting: string) => void;
}

export const ReviewAutomationSettings = ({ 
  settings, 
  onSettingsChange, 
  onToggleAutomation 
}: ReviewAutomationSettingsProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Automated Review Requests
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Enable Auto-Requests</h3>
              <p className="text-sm text-muted-foreground">Automatically send review requests after job completion</p>
            </div>
            <Button 
              variant={settings.autoRequestEnabled ? "default" : "outline"}
              onClick={() => onToggleAutomation('autoRequestEnabled')}
            >
              {settings.autoRequestEnabled ? 'Enabled' : 'Disabled'}
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Request Delay (days after completion)</label>
              <Input 
                type="number" 
                value={settings.requestDelay}
                onChange={(e) => onSettingsChange({ ...settings, requestDelay: parseInt(e.target.value) })}
                className="w-20 mt-1"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Follow-up Reminders</h3>
                <p className="text-sm text-muted-foreground">Send reminder emails to customers who haven't left reviews</p>
              </div>
              <Button 
                variant={settings.reminderEnabled ? "default" : "outline"}
                onClick={() => onToggleAutomation('reminderEnabled')}
              >
                {settings.reminderEnabled ? 'Enabled' : 'Disabled'}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Reminder Interval (days)</label>
                <Input 
                  type="number" 
                  value={settings.reminderInterval}
                  onChange={(e) => onSettingsChange({ ...settings, reminderInterval: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Reminders</label>
                <Input 
                  type="number" 
                  value={settings.maxReminders}
                  onChange={(e) => onSettingsChange({ ...settings, maxReminders: parseInt(e.target.value) })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Review Request Templates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Subject</label>
            <Input placeholder="How was your experience with our service?" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Message</label>
            <textarea 
              className="w-full min-h-[100px] p-3 border rounded-md"
              placeholder="Hi {customer_name}, We'd love to hear about your experience with our recent {service_type} project..."
            />
          </div>
          <Button>Save Template</Button>
        </CardContent>
      </Card>
    </div>
  );
};
