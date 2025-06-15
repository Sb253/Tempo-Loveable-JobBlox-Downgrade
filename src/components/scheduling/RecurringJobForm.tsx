
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X, Calendar, Clock, Repeat } from "lucide-react";
import { Job } from "@/components/SchedulingDashboard";

interface RecurringJobFormProps {
  onClose: () => void;
  onSave: (job: Job) => void;
}

export const RecurringJobForm = ({ onClose, onSave }: RecurringJobFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    customer: '',
    address: '',
    technician: '',
    jobType: 'maintenance' as Job['jobType'],
    priority: 'medium' as Job['priority'],
    startDate: '',
    startTime: '09:00',
    endTime: '17:00',
    duration: '2h',
    isRecurring: true,
    recurringPattern: {
      frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
      interval: 1,
      endDate: '',
      daysOfWeek: [] as number[], // For weekly: 0=Sunday, 1=Monday, etc.
      dayOfMonth: 1, // For monthly
    }
  });

  const [customFields, setCustomFields] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const job: Job = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      customer: formData.customer,
      location: formData.address.split(',')[0] || formData.address,
      address: formData.address,
      startDate: formData.startDate,
      startTime: formData.startTime,
      endTime: formData.endTime,
      duration: formData.duration,
      status: 'scheduled',
      priority: formData.priority,
      jobType: formData.jobType,
      technician: formData.technician,
      isRecurring: formData.isRecurring,
      recurringPattern: formData.recurringPattern,
      customFields: Object.keys(customFields).length > 0 ? customFields : undefined
    };

    onSave(job);
  };

  const addCustomField = () => {
    const fieldName = prompt("Enter field name:");
    if (fieldName && !customFields[fieldName]) {
      setCustomFields(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const removeCustomField = (fieldName: string) => {
    const newFields = { ...customFields };
    delete newFields[fieldName];
    setCustomFields(newFields);
  };

  const toggleDayOfWeek = (day: number) => {
    setFormData(prev => ({
      ...prev,
      recurringPattern: {
        ...prev.recurringPattern,
        daysOfWeek: prev.recurringPattern.daysOfWeek.includes(day)
          ? prev.recurringPattern.daysOfWeek.filter(d => d !== day)
          : [...prev.recurringPattern.daysOfWeek, day]
      }
    }));
  };

  const daysOfWeek = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' }
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Repeat className="h-5 w-5" />
              Create Recurring Job
            </div>
            <Button onClick={onClose} variant="outline" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Job Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="jobType">Job Type</Label>
                    <Select
                      value={formData.jobType}
                      onValueChange={(value: Job['jobType']) => setFormData(prev => ({ ...prev, jobType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                        <SelectItem value="installation">Installation</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select
                      value={formData.priority}
                      onValueChange={(value: Job['priority']) => setFormData(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Assignment */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer & Assignment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="customer">Customer *</Label>
                  <Input
                    id="customer"
                    value={formData.customer}
                    onChange={(e) => setFormData(prev => ({ ...prev, customer: e.target.value }))}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="technician">Assigned Technician</Label>
                  <Input
                    id="technician"
                    value={formData.technician}
                    onChange={(e) => setFormData(prev => ({ ...prev, technician: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Schedule Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="startDate">First Occurrence Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={formData.startTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={formData.endTime}
                      onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 2h, 3h 30m"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Recurring Pattern */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recurring Pattern</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select
                    value={formData.recurringPattern.frequency}
                    onValueChange={(value: 'daily' | 'weekly' | 'monthly') => 
                      setFormData(prev => ({
                        ...prev,
                        recurringPattern: { ...prev.recurringPattern, frequency: value }
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="interval">
                    Every {formData.recurringPattern.interval} {formData.recurringPattern.frequency.slice(0, -2)}(s)
                  </Label>
                  <Input
                    id="interval"
                    type="number"
                    min="1"
                    value={formData.recurringPattern.interval}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      recurringPattern: { ...prev.recurringPattern, interval: parseInt(e.target.value) || 1 }
                    }))}
                  />
                </div>

                {formData.recurringPattern.frequency === 'weekly' && (
                  <div>
                    <Label>Days of the Week</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {daysOfWeek.map(day => (
                        <div key={day.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={`day-${day.value}`}
                            checked={formData.recurringPattern.daysOfWeek.includes(day.value)}
                            onCheckedChange={() => toggleDayOfWeek(day.value)}
                          />
                          <Label htmlFor={`day-${day.value}`} className="text-sm">
                            {day.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.recurringPattern.frequency === 'monthly' && (
                  <div>
                    <Label htmlFor="dayOfMonth">Day of Month</Label>
                    <Input
                      id="dayOfMonth"
                      type="number"
                      min="1"
                      max="31"
                      value={formData.recurringPattern.dayOfMonth}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        recurringPattern: { ...prev.recurringPattern, dayOfMonth: parseInt(e.target.value) || 1 }
                      }))}
                    />
                  </div>
                )}

                <div>
                  <Label htmlFor="endDate">End Date (Optional)</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.recurringPattern.endDate}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      recurringPattern: { ...prev.recurringPattern, endDate: e.target.value }
                    }))}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Leave empty for recurring indefinitely
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Custom Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Custom Fields
                <Button type="button" onClick={addCustomField} variant="outline" size="sm">
                  Add Field
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.keys(customFields).length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(customFields).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label>{key}</Label>
                        <Button
                          type="button"
                          onClick={() => removeCustomField(key)}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <Input
                        value={value}
                        onChange={(e) => setCustomFields(prev => ({ ...prev, [key]: e.target.value }))}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No custom fields added</p>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              <Repeat className="h-4 w-4 mr-2" />
              Create Recurring Job
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
