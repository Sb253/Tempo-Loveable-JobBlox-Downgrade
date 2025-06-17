
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TeamSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const TeamSearch = ({ searchTerm, onSearchChange }: TeamSearchProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Search</CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
    </Card>
  );
};
