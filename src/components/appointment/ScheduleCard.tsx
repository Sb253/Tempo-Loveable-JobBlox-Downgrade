
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit } from "lucide-react";

interface ScheduleCardProps {
  scheduledDate: string;
  scheduledTime: string;
  technician: string;
}

export const ScheduleCard = ({ scheduledDate, scheduledTime, technician }: ScheduleCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Schedule
          </div>
          <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm">From:</span>
          <div className="text-right">
            <div className="font-medium">{scheduledDate}</div>
            <div className="text-sm text-gray-500">{scheduledTime}</div>
          </div>
        </div>
        
        <div className="flex justify-between">
          <span className="text-sm">To:</span>
          <div className="text-right">
            <div className="font-medium">{scheduledDate}</div>
            <div className="text-sm text-gray-500">11:30a</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold text-blue-600">
              {technician.charAt(0)}
            </span>
          </div>
          <span className="font-medium">{technician}</span>
        </div>
      </CardContent>
    </Card>
  );
};
