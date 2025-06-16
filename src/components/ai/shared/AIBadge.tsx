
import { Badge } from "@/components/ui/badge";

interface AIBadgeProps {
  model?: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
}

export const AIBadge = ({ model = "GPT-4", variant = "secondary" }: AIBadgeProps) => {
  return (
    <Badge variant={variant} className="text-xs">
      {model}
    </Badge>
  );
};
