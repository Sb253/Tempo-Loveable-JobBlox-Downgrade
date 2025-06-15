
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Wifi, WifiOff, Upload, Download, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface OfflineData {
  id: string;
  type: 'photo' | 'report' | 'timesheet' | 'note';
  data: any;
  timestamp: string;
  synced: boolean;
}

export const OfflineSync = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [offlineData, setOfflineData] = useState<OfflineData[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);

  useEffect(() => {
    // Load offline data from localStorage
    const savedData = localStorage.getItem('offlineData');
    if (savedData) {
      setOfflineData(JSON.parse(savedData));
    }

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      toast({
        title: "Back Online",
        description: "Connection restored. Ready to sync data.",
      });
      autoSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast({
        title: "Gone Offline",
        description: "Data will be saved locally until connection is restored.",
        variant: "destructive",
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Save offline data to localStorage whenever it changes
    localStorage.setItem('offlineData', JSON.stringify(offlineData));
  }, [offlineData]);

  const addOfflineData = (type: OfflineData['type'], data: any) => {
    const newEntry: OfflineData = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: new Date().toISOString(),
      synced: false
    };

    setOfflineData(prev => [...prev, newEntry]);

    if (isOnline) {
      syncSingleItem(newEntry);
    }
  };

  const syncSingleItem = async (item: OfflineData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setOfflineData(prev => 
        prev.map(data => 
          data.id === item.id ? { ...data, synced: true } : data
        )
      );

      toast({
        title: "Data Synced",
        description: `${item.type} has been synced to server.`,
      });
    } catch (error) {
      toast({
        title: "Sync Failed",
        description: `Failed to sync ${item.type}. Will retry later.`,
        variant: "destructive",
      });
    }
  };

  const autoSync = async () => {
    if (!isOnline) return;

    const unsyncedData = offlineData.filter(item => !item.synced);
    if (unsyncedData.length === 0) return;

    setIsSyncing(true);
    setSyncProgress(0);

    for (let i = 0; i < unsyncedData.length; i++) {
      try {
        await syncSingleItem(unsyncedData[i]);
        setSyncProgress(((i + 1) / unsyncedData.length) * 100);
      } catch (error) {
        console.error('Sync error:', error);
      }
    }

    setIsSyncing(false);
    setSyncProgress(0);
  };

  const manualSync = () => {
    if (isOnline) {
      autoSync();
    } else {
      toast({
        title: "No Connection",
        description: "Cannot sync while offline. Data will sync when connection is restored.",
        variant: "destructive",
      });
    }
  };

  const clearSyncedData = () => {
    setOfflineData(prev => prev.filter(item => !item.synced));
    toast({
      title: "Cleared",
      description: "Synced data has been cleared from local storage.",
    });
  };

  const unsyncedCount = offlineData.filter(item => !item.synced).length;
  const syncedCount = offlineData.filter(item => item.synced).length;

  // Expose addOfflineData function globally for other components to use
  useEffect(() => {
    (window as any).addOfflineData = addOfflineData;
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-5 w-5 text-green-600" />
                Online
              </>
            ) : (
              <>
                <WifiOff className="h-5 w-5 text-red-600" />
                Offline
              </>
            )}
          </div>
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Connected" : "Offline Mode"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sync Status */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-orange-600">{unsyncedCount}</div>
            <div className="text-sm text-muted-foreground">Pending Sync</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{syncedCount}</div>
            <div className="text-sm text-muted-foreground">Synced</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">{offlineData.length}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </div>
        </div>

        {/* Sync Progress */}
        {isSyncing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Syncing data...</span>
              <span>{Math.round(syncProgress)}%</span>
            </div>
            <Progress value={syncProgress} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            onClick={manualSync} 
            disabled={isSyncing || !isOnline}
            className="flex-1"
          >
            <Upload className="h-4 w-4 mr-2" />
            Sync Now
          </Button>
          <Button 
            variant="outline" 
            onClick={clearSyncedData}
            disabled={syncedCount === 0}
          >
            Clear Synced
          </Button>
        </div>

        {/* Offline Data List */}
        {offlineData.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium">Local Data</h4>
            <div className="max-h-40 overflow-y-auto space-y-2">
              {offlineData.slice(-10).reverse().map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 border rounded text-sm">
                  <div className="flex items-center gap-2">
                    {item.synced ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Clock className="h-4 w-4 text-orange-600" />
                    )}
                    <span className="capitalize">{item.type}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Offline Instructions */}
        {!isOnline && (
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-orange-800">Offline Mode Active</p>
                <p className="text-orange-700">
                  Your data is being saved locally and will automatically sync when connection is restored.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
