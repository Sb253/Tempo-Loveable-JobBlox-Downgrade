
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, ChevronRight, Plus } from "lucide-react";

interface NotesCardProps {
  notes: string;
  technician: string;
}

export const NotesCard = ({ notes, technician }: NotesCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notes
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <ChevronRight className="h-4 w-4 text-blue-600" />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <Plus className="h-4 w-4 text-blue-600" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-gray-500 mb-2">02/23/2024, 4:59PM</div>
        <div className="font-medium mb-3">{notes || "REMODEL OF SMALL BATHROOM ON THE UPPER FLOOR"}</div>
        
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-xs font-semibold text-blue-600">
              {technician.split(' ').map(n => n.charAt(0)).join('')}
            </span>
          </div>
          <span className="font-medium">{technician}</span>
        </div>
      </CardContent>
    </Card>
  );
};
