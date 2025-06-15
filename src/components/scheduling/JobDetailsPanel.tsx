
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X, Calendar, Clock, MapPin, User, Phone, Mail, Save, Edit } from "lucide-react";
import { Job } from "@/components/SchedulingDashboard";
import { toast } from "@/components/ui/sonner";

interface JobDetailsPanelProps {
  job: Job;
  onClose: () => void;
  onUpdate: (job: Job) => void;
  statusColors: Record<string, string>;
  jobTypeColors: Record<string, string>;
}

export const JobDetailsPanel = ({ 
  job, 
  onClose, 
  onUpdate, 
  statusColors, 
  jobTypeColors 
}: JobDetailsPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState<Job>(job);

  const handleSave = () => {
    onUpdate(editedJob);
    setIsEditing(false);
    toast.success("Job updated successfully");
  };

  const handleCancel = () => {
    setEditedJob(job);
    setIsEditing(false);
  };

  const addCustomField = () => {
    const fieldName = prompt("Enter field name:");
    if (fieldName) {
      setEditedJob(prev => ({
        ...prev,
        customFields: {
          ...prev.customFields,
          [fieldName]: ''
        }
      }));
    }
  };

  const removeCustomField = (fieldName: string) => {
    setEditedJob(prev => {
      const newCustomFields = { ...prev.customFields };
      delete newCustomFields[fieldName];
      return {
        ...prev,
        customFields: newCustomFields
      };
    });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (time: string) => {
    return time.slice(0, 5);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded ${jobTypeColors[job.jobType]}`}></div>
              Job Details: {job.title}
            </div>
            <div className="flex items-center gap-2">
              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)} size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave} size="sm">
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">
                    Cancel
                  </Button>
                </div>
              )}
              <Button onClick={onClose} variant="outline" size="sm">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Title</label>
                {isEditing ? (
                  <Input
                    value={editedJob.title}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, title: e.target.value }))}
                  />
                ) : (
                  <p className="text-sm">{job.title}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                {isEditing ? (
                  <Textarea
                    value={editedJob.description || ''}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-muted-foreground">{job.description || 'No description provided'}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Job Type</label>
                  {isEditing ? (
                    <Select
                      value={editedJob.jobType}
                      onValueChange={(value: Job['jobType']) => setEditedJob(prev => ({ ...prev, jobType: value }))}
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
                  ) : (
                    <Badge variant="outline" className="capitalize">{job.jobType}</Badge>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Priority</label>
                  {isEditing ? (
                    <Select
                      value={editedJob.priority}
                      onValueChange={(value: Job['priority']) => setEditedJob(prev => ({ ...prev, priority: value }))}
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
                  ) : (
                    <Badge variant="outline" className="capitalize">{job.priority}</Badge>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                {isEditing ? (
                  <Select
                    value={editedJob.status}
                    onValueChange={(value: Job['status']) => setEditedJob(prev => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <Badge className={statusColors[job.status]}>
                    {job.status.replace('-', ' ')}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Customer & Location */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Customer & Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Customer</label>
                {isEditing ? (
                  <Input
                    value={editedJob.customer}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, customer: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{job.customer}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                {isEditing ? (
                  <Textarea
                    value={editedJob.address}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, address: e.target.value }))}
                    rows={2}
                  />
                ) : (
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                    <span className="text-sm">{job.address}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Assigned Technician</label>
                {isEditing ? (
                  <Input
                    value={editedJob.technician}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, technician: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{job.technician}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
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
                <label className="block text-sm font-medium mb-2">Date</label>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editedJob.startDate}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, startDate: e.target.value }))}
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDate(job.startDate)}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Start Time</label>
                  {isEditing ? (
                    <Input
                      type="time"
                      value={editedJob.startTime}
                      onChange={(e) => setEditedJob(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{formatTime(job.startTime)}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">End Time</label>
                  {isEditing ? (
                    <Input
                      type="time"
                      value={editedJob.endTime || ''}
                      onChange={(e) => setEditedJob(prev => ({ ...prev, endTime: e.target.value }))}
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{job.endTime ? formatTime(job.endTime) : 'Open ended'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                {isEditing ? (
                  <Input
                    value={editedJob.duration}
                    onChange={(e) => setEditedJob(prev => ({ ...prev, duration: e.target.value }))}
                    placeholder="e.g., 2h, 3h 30m"
                  />
                ) : (
                  <span className="text-sm">{job.duration}</span>
                )}
              </div>

              {job.isRecurring && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <h5 className="font-medium text-sm mb-2">Recurring Job</h5>
                  <p className="text-xs text-muted-foreground">
                    Repeats {job.recurringPattern?.frequency} every {job.recurringPattern?.interval} 
                    {job.recurringPattern?.frequency === 'daily' ? ' day(s)' : 
                     job.recurringPattern?.frequency === 'weekly' ? ' week(s)' : ' month(s)'}
                    {job.recurringPattern?.endDate && ` until ${formatDate(job.recurringPattern.endDate)}`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Custom Fields */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Custom Fields
                {isEditing && (
                  <Button onClick={addCustomField} variant="outline" size="sm">
                    Add Field
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editedJob.customFields && Object.keys(editedJob.customFields).length > 0 ? (
                Object.entries(editedJob.customFields).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-medium">{key}</label>
                      {isEditing && (
                        <Button
                          onClick={() => removeCustomField(key)}
                          variant="outline"
                          size="sm"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                    {isEditing ? (
                      <Input
                        value={value}
                        onChange={(e) => setEditedJob(prev => ({
                          ...prev,
                          customFields: {
                            ...prev.customFields,
                            [key]: e.target.value
                          }
                        }))}
                      />
                    ) : (
                      <p className="text-sm text-muted-foreground">{value}</p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No custom fields added</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-6 border-t">
          <div className="flex gap-2">
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              View on Map
            </Button>
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Reschedule
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Duplicate Job</Button>
            <Button variant="destructive">Cancel Job</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
