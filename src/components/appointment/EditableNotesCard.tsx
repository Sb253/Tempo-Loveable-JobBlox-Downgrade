
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FileText, Edit, Save, X } from "lucide-react";

interface EditableNotesCardProps {
  notes: string;
  technician: string;
  onNotesUpdate: (notes: string) => void;
}

export const EditableNotesCard = ({ notes, technician, onNotesUpdate }: EditableNotesCardProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes);

  const handleSave = () => {
    onNotesUpdate(editedNotes);
    setIsEditing(false);
    toast({
      title: "Notes Updated",
      description: "Your notes have been saved successfully.",
    });
  };

  const handleCancel = () => {
    setEditedNotes(notes);
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Notes
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
        <div className="text-sm text-gray-500 mb-2">02/23/2024, 4:59PM</div>
        
        {isEditing ? (
          <Textarea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            placeholder="Add your notes here..."
            className="mb-3 min-h-20"
          />
        ) : (
          <div className="font-medium mb-3 min-h-6">
            {notes || "REMODEL OF SMALL BATHROOM ON THE UPPER FLOOR"}
          </div>
        )}
        
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
