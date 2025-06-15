
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Tag, Paperclip, Plus } from "lucide-react";

export const ExpandableSections = () => {
  return (
    <div className="space-y-2">
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Estimate Fields</span>
            </div>
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <Plus className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Job Tags</span>
            </div>
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <Plus className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-2 border-dashed border-gray-300">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Paperclip className="h-5 w-5 text-gray-500" />
              <span className="font-medium">Attachments</span>
            </div>
            <Button size="sm" variant="ghost" className="h-8 px-2 rounded hover:bg-gray-100">
              <Plus className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
