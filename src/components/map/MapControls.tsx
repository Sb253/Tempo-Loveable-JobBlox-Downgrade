
import { Button } from "@/components/ui/button";
import { Plus, Navigation } from "lucide-react";

export const MapControls = () => {
  return (
    <div className="absolute top-3 right-3 flex flex-col gap-2">
      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
        <Plus className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
        <Navigation className="h-4 w-4" />
      </Button>
    </div>
  );
};
