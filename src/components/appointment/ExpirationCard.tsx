
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, AlertCircle } from "lucide-react";

export const ExpirationCard = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Expiration date
          </div>
          <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
            <Edit className="h-4 w-4 text-blue-600" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">This estimate has expired.</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm">Expires on</span>
          <span className="font-medium">Apr 30, 2024</span>
        </div>
      </CardContent>
    </Card>
  );
};
