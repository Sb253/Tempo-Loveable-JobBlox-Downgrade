
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, FileText, CheckCircle, MoreHorizontal } from "lucide-react";

interface AppointmentHeaderProps {
  appointmentId: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';
}

export const AppointmentHeader = ({ appointmentId, status }: AppointmentHeaderProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'scheduled': return 'bg-blue-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      case 'cancelled': return 'bg-red-500';
      case 'no-show': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-center flex-1">Estimate #{appointmentId}</h1>
        </div>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <Button variant="outline" size="sm" className="h-10 px-4 bg-blue-50 border-blue-200 hover:bg-blue-100">
              <Edit className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-600 text-xs font-medium">Approve</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="outline" size="sm" className="h-10 px-4 bg-blue-50 border-blue-200 hover:bg-blue-100">
              <FileText className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-600 text-xs font-medium">Estimate</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="outline" size="sm" className="h-10 px-4 bg-blue-50 border-blue-200 hover:bg-blue-100">
              <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-600 text-xs font-medium">Copy to Job</span>
            </Button>
          </div>
          <div className="flex flex-col items-center">
            <Button variant="outline" size="sm" className="h-10 px-4 bg-blue-50 border-blue-200 hover:bg-blue-100">
              <MoreHorizontal className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-blue-600 text-xs font-medium">More</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
