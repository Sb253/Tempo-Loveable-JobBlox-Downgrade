
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  Truck, 
  Play, 
  Square, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Clock,
  User,
  FileText,
  Tag,
  Paperclip,
  Plus,
  Edit2,
  Camera
} from "lucide-react";

interface ClientAppointmentProps {
  appointmentId?: string;
  onClose?: () => void;
}

export const ClientAppointment = ({ appointmentId = "5709", onClose }: ClientAppointmentProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<'pending' | 'on-way' | 'started' | 'finished'>('pending');
  const [notes, setNotes] = useState('REMODEL OF SMALL BATHROOM ON THE UPPER FLOOR');
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  
  // Mock appointment data
  const appointment = {
    estimateNumber: `EST-${appointmentId}`,
    customer: {
      name: 'RENE REICHL',
      address: '1950 25th Ave E\nSeattle, WA, 98112',
      phone: '(206) 555-0123',
      propertyImage: '/placeholder.svg',
      propertyValue: '$1,755,773',
      yearBuilt: '1926',
      beds: 4,
      baths: 2.0,
      sqft: 2710
    },
    schedule: {
      date: 'Thu Mar 14',
      startTime: '10:30a',
      endTime: '11:30a',
      technician: 'Scott Bondy',
      technicianAvatar: '/placeholder.svg'
    },
    financial: {
      subtotal: 12839.62,
      discount: {
        description: 'Seattle Home Show ($2,000.00)',
        amount: -2000.00
      },
      tax: {
        description: 'King County (10.5%)',
        amount: 1144.46
      },
      total: 12044.08,
      deposit: {
        amount: 6298.29,
        dueDate: '3/13'
      }
    }
  };

  const handleStatusChange = (newStatus: 'on-way' | 'started' | 'finished') => {
    setStatus(newStatus);
    const statusMessages = {
      'on-way': 'Status updated to "On My Way"',
      'started': 'Job started',
      'finished': 'Job completed'
    };
    toast({
      title: "Status Updated",
      description: statusMessages[newStatus]
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusBadgeColor = () => {
    switch (status) {
      case 'finished': return 'bg-green-100 text-green-800';
      case 'started': return 'bg-blue-100 text-blue-800';
      case 'on-way': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Estimate #{appointmentId}</h1>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit2 className="h-4 w-4 mr-2" />
            Approve
          </Button>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Estimate
          </Button>
          <Button variant="outline" size="sm">
            <Play className="h-4 w-4 mr-2" />
            Copy to Job
          </Button>
        </div>
      </div>

      {/* Status Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              Status
            </h3>
            <Badge className={getStatusBadgeColor()}>
              {status === 'finished' ? 'COMPLETED' : status === 'started' ? 'IN PROGRESS' : status === 'on-way' ? 'ON MY WAY' : 'SCHEDULED'}
            </Badge>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={status === 'on-way' ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-16"
              onClick={() => handleStatusChange('on-way')}
            >
              <Truck className="h-5 w-5" />
              <span className="text-xs">ON MY WAY</span>
            </Button>
            <Button
              variant={status === 'started' ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-16"
              onClick={() => handleStatusChange('started')}
            >
              <Play className="h-5 w-5" />
              <span className="text-xs">START</span>
            </Button>
            <Button
              variant={status === 'finished' ? 'default' : 'outline'}
              className="flex flex-col items-center gap-2 h-16"
              onClick={() => handleStatusChange('finished')}
            >
              <Square className="h-5 w-5" />
              <span className="text-xs">FINISH</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Customer Section */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
            <User className="h-5 w-5" />
            Customer
          </h3>
          
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={appointment.customer.propertyImage} 
                alt="Property" 
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-black/75 text-white px-3 py-1 rounded text-sm">
                {formatCurrency(parseFloat(appointment.customer.propertyValue.replace(/[$,]/g, '')))}
              </div>
              <div className="absolute bottom-4 right-4 bg-black/75 text-white px-2 py-1 rounded text-xs">
                Built in {appointment.customer.yearBuilt}
              </div>
              <div className="absolute bottom-4 left-4 bg-black/75 text-white px-2 py-1 rounded text-xs">
                {appointment.customer.beds} Beds | {appointment.customer.baths} Baths | {appointment.customer.sqft} Sq. ft.
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-lg">{appointment.customer.name}</h4>
                <p className="text-muted-foreground text-sm whitespace-pre-line">
                  {appointment.customer.address}
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <MapPin className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Schedule Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule
            </h3>
            <Button size="sm" variant="outline">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">From:</span>
              <span className="font-medium">{appointment.schedule.date} {appointment.schedule.startTime}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">To:</span>
              <span className="font-medium">{appointment.schedule.date} {appointment.schedule.endTime}</span>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <img 
                src={appointment.schedule.technicianAvatar} 
                alt={appointment.schedule.technician}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-medium">{appointment.schedule.technician}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-medium">{formatCurrency(appointment.financial.subtotal)}</span>
            </div>
            <div className="flex justify-between text-red-600">
              <div>
                <div>Discount</div>
                <div className="text-sm text-muted-foreground">{appointment.financial.discount.description}</div>
              </div>
              <span className="font-medium">{formatCurrency(appointment.financial.discount.amount)}</span>
            </div>
            <div className="flex justify-between">
              <div>
                <div>Tax</div>
                <div className="text-sm text-muted-foreground">{appointment.financial.tax.description}</div>
              </div>
              <span className="font-medium">{formatCurrency(appointment.financial.tax.amount)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(appointment.financial.total)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between">
              <div>
                <div className="font-medium">Deposit</div>
                <div className="text-sm text-muted-foreground">Due on {appointment.financial.deposit.dueDate}</div>
              </div>
              <span className="font-medium">{formatCurrency(appointment.financial.deposit.amount)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Edit2 className="h-5 w-5" />
              Notes
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowNotesDialog(true)}>
                <Edit2 className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              02/23/2024, 4:59PM
            </div>
            <div className="font-medium">
              {notes}
            </div>
            <div className="flex items-center gap-3">
              <img 
                src={appointment.schedule.technicianAvatar} 
                alt={appointment.schedule.technician}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm">{appointment.schedule.technician}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Sections */}
      <div className="space-y-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <span className="font-medium">Estimate Fields</span>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="h-5 w-5" />
                <span className="font-medium">Job Tags</span>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Paperclip className="h-5 w-5" />
                <span className="font-medium">Attachments</span>
              </div>
              <Button size="sm" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notes Dialog */}
      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Notes</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Enter job notes..."
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNotesDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowNotesDialog(false);
                toast({
                  title: "Notes Updated",
                  description: "Job notes have been saved."
                });
              }}>
                Save Notes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
