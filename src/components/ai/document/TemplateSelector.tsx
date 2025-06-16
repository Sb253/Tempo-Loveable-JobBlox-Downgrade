
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";
import { documentTemplates } from "@/types/documentTemplates";

interface TemplateSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TemplateSelector = ({ value, onChange }: TemplateSelectorProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Document Template</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a template" />
        </SelectTrigger>
        <SelectContent>
          {documentTemplates.map((template) => (
            <SelectItem key={template.id} value={template.id}>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <div>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {template.description} • {template.category}
                  </div>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
