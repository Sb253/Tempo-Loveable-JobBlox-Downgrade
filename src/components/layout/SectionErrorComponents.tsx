
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

// Component for handling unknown sections
export const SectionNotFound = ({ sectionName }: { sectionName: string }) => (
  <div className="flex items-center justify-center min-h-96">
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <AlertCircle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <CardTitle>Section Not Found</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-muted-foreground mb-4">
          The section "{sectionName}" could not be found.
        </p>
        <p className="text-sm text-muted-foreground">
          Please check the navigation or contact support if this issue persists.
        </p>
      </CardContent>
    </Card>
  </div>
);
