
import { Progress } from "@/components/ui/progress";

interface GenerationProgressProps {
  progress: number;
}

export const GenerationProgress = ({ progress }: GenerationProgressProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span>Generating Document...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};
