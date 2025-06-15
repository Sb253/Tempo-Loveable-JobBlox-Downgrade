
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Download, FileText, Package, Wrench, Users } from "lucide-react";

export const ImportExportHub = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const dataTypes = [
    { id: 'supplies', label: 'Supplies', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: FileText },
    { id: 'materials', label: 'Materials', icon: Wrench },
    { id: 'services', label: 'Services', icon: Users }
  ];

  const handleImport = (type: string) => {
    setIsImporting(true);
    // Simulate import process
    setTimeout(() => {
      setIsImporting(false);
      console.log(`Importing ${type} data...`);
    }, 2000);
  };

  const handleExport = (type: string) => {
    setIsExporting(true);
    // Simulate export process
    setTimeout(() => {
      setIsExporting(false);
      console.log(`Exporting ${type} data...`);
    }, 2000);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Import / Export Hub</h2>
        <p className="text-muted-foreground mb-6">Manage your data imports and exports for supplies, inventory, materials, and services</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataTypes.map((type) => {
          const Icon = type.icon;
          return (
            <Card key={type.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  {type.label}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleImport(type.id)}
                    disabled={isImporting}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {isImporting ? 'Importing...' : 'Import'}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleExport(type.id)}
                    disabled={isExporting}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    {isExporting ? 'Exporting...' : 'Export'}
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Supported formats: CSV, Excel, JSON
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">Materials export</span>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Inventory import</span>
              <Badge variant="outline">Completed</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Services export</span>
              <Badge variant="outline">Completed</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
