
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, Edit, Save, X, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export const EditableExpirationCard = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [expirationDate, setExpirationDate] = useState(new Date('2024-04-30'));
  const [tempDate, setTempDate] = useState<Date | undefined>(expirationDate);

  const handleSave = () => {
    if (tempDate) {
      setExpirationDate(tempDate);
      setIsEditing(false);
      toast({
        title: "Expiration Date Updated",
        description: `New expiration date: ${format(tempDate, "MMM dd, yyyy")}`,
      });
    }
  };

  const handleCancel = () => {
    setTempDate(expirationDate);
    setIsEditing(false);
  };

  const isExpired = expirationDate < new Date();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            Expiration date
          </div>
          <div className="flex gap-1">
            {isEditing ? (
              <>
                <Button size="sm" variant="ghost" onClick={handleSave} className="h-8 px-2 rounded hover:bg-gray-100">
                  <Save className="h-4 w-4 text-green-600" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleCancel} className="h-8 px-2 rounded hover:bg-gray-100">
                  <X className="h-4 w-4 text-red-600" />
                </Button>
              </>
            ) : (
              <Button size="sm" variant="ghost" onClick={() => setIsEditing(true)} className="h-8 px-2 rounded hover:bg-gray-100">
                <Edit className="h-4 w-4 text-blue-600" />
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isExpired && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-2 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">This estimate has expired.</span>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <span className="text-sm">Expires on</span>
          {isEditing ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !tempDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {tempDate ? format(tempDate, "MMM dd, yyyy") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={tempDate}
                  onSelect={setTempDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          ) : (
            <span className="font-medium">{format(expirationDate, "MMM dd, yyyy")}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
