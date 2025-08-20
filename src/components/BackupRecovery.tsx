import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Archive,
  RotateCcw,
  Download,
  Upload,
  Key,
  Clock,
  HardDrive,
  CheckCircle,
  AlertTriangle,
  Lock,
  Database,
  Settings
} from "lucide-react";

interface BackupEntry {
  id: string;
  name: string;
  timestamp: string;
  size: string;
  type: "manual" | "auto" | "scheduled";
  status: "completed" | "in-progress" | "failed";
  description: string;
}

export const BackupRecovery = () => {
  const [masterPassword, setMasterPassword] = useState("");
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState<string | null>(null);

  const [backups] = useState<BackupEntry[]>([
    {
      id: "1",
      name: "System_Full_Backup_20240115",
      timestamp: "2024-01-15 14:30:25",
      size: "2.4 GB",
      type: "manual",
      status: "completed",
      description: "Complete system state with all configurations, logs, and rules"
    },
    {
      id: "2", 
      name: "Auto_Backup_20240115_12",
      timestamp: "2024-01-15 12:00:00",
      size: "1.8 GB", 
      type: "auto",
      status: "completed",
      description: "Automatic backup - configurations and active rules"
    },
    {
      id: "3",
      name: "Emergency_Backup_20240114",
      timestamp: "2024-01-14 23:45:12",
      size: "2.1 GB",
      type: "manual", 
      status: "completed",
      description: "Pre-update backup created before system upgrade"
    },
    {
      id: "4",
      name: "Scheduled_Daily_20240114",
      timestamp: "2024-01-14 06:00:00",
      size: "1.6 GB",
      type: "scheduled",
      status: "completed", 
      description: "Daily scheduled backup - basic system state"
    },
    {
      id: "5",
      name: "Config_Backup_20240113",
      timestamp: "2024-01-13 16:20:33",
      size: "245 MB",
      type: "manual",
      status: "completed",
      description: "Configuration-only backup for rule changes"
    }
  ]);

  const handleCreateBackup = () => {
    setIsBackingUp(true);
    // Simulate backup process
    setTimeout(() => {
      setIsBackingUp(false);
    }, 3000);
  };

  const handleRestore = () => {
    if (!masterPassword || !selectedBackup) return;
    // Handle restore logic here
    console.log(`Restoring backup ${selectedBackup} with master password`);
    setMasterPassword("");
    setSelectedBackup(null);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "manual": return "dice-investigate";
      case "auto": return "dice-defend";
      case "scheduled": return "dice-evolve";
      default: return "muted";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "manual": return Settings;
      case "auto": return Shield;
      case "scheduled": return Clock;
      default: return Archive;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-safe";
      case "in-progress": return "status-warning"; 
      case "failed": return "status-danger";
      default: return "muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Backup Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Archive className="w-5 h-5 text-dice-defend" />
              <div>
                <p className="text-sm font-medium">Total Backups</p>
                <p className="text-2xl font-bold text-dice-defend">{backups.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-dice-investigate" />
              <div>
                <p className="text-sm font-medium">Storage Used</p>
                <p className="text-2xl font-bold text-dice-investigate">8.2 GB</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-dice-evolve" />
              <div>
                <p className="text-sm font-medium">Last Backup</p>
                <p className="text-2xl font-bold text-dice-evolve">2h ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-dice-contain" />
              <div>
                <p className="text-sm font-medium">Success Rate</p>
                <p className="text-2xl font-bold text-dice-contain">99.8%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Backup Controls */}
      <Card className="bg-gradient-shield border-dice-defend/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-dice-defend" />
            Backup Current System State
          </CardTitle>
          <CardDescription>
            Create a complete backup of your current DICE configuration, rules, logs, and system state
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="backup-name">Backup Name</Label>
              <Input 
                id="backup-name" 
                placeholder="Enter backup description..."
                defaultValue={`Manual_Backup_${new Date().toISOString().split('T')[0]}`}
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleCreateBackup}
                disabled={isBackingUp}
                className="w-full"
              >
                {isBackingUp ? (
                  <>
                    <Database className="w-4 h-4 mr-2 animate-pulse" />
                    Creating Backup...
                  </>
                ) : (
                  <>
                    <Archive className="w-4 h-4 mr-2" />
                    Create Backup Now
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center p-3 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground">Configurations</p>
              <p className="font-bold text-dice-defend">✓ Included</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground">Security Rules</p>
              <p className="font-bold text-dice-defend">✓ Included</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground">System Logs</p>
              <p className="font-bold text-dice-defend">✓ Included</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Backup List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-dice-contain" />
            Backup & Restore Points
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {backups.map((backup) => {
                const TypeIcon = getTypeIcon(backup.type);

                return (
                  <div 
                    key={backup.id}
                    className={`flex items-start gap-4 p-4 rounded-lg transition-all hover:bg-muted/50 cursor-pointer border-2 ${
                      selectedBackup === backup.id 
                        ? 'border-dice-investigate bg-dice-investigate/10' 
                        : 'border-transparent bg-muted/20'
                    }`}
                    onClick={() => setSelectedBackup(backup.id)}
                  >
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <TypeIcon className={`w-5 h-5 text-${getTypeColor(backup.type)}`} />
                      <div className={`w-3 h-3 rounded-full bg-${getStatusColor(backup.status)}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{backup.name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={`text-${getTypeColor(backup.type)} border-${getTypeColor(backup.type)}`}>
                            {backup.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className={`text-${getStatusColor(backup.status)} border-${getStatusColor(backup.status)}`}>
                            {backup.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{backup.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {backup.timestamp}
                        </span>
                        <span className="flex items-center gap-1">
                          <HardDrive className="w-3 h-3" />
                          {backup.size}
                        </span>
                      </div>
                    </div>

                    <div className="flex-shrink-0 flex gap-2">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Restore Controls */}
      <Card className="bg-gradient-shield border-dice-contain/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-dice-contain" />
            System Restore & Rollback
          </CardTitle>
          <CardDescription>
            Restore your system to a previous backup state with master password authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedBackup ? (
            <div className="p-4 rounded-lg bg-dice-investigate/10 border border-dice-investigate/20">
              <p className="text-sm font-medium mb-2">Selected Backup:</p>
              <p className="text-dice-investigate font-mono">
                {backups.find(b => b.id === selectedBackup)?.name}
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-lg bg-muted/20 border border-muted">
              <p className="text-sm text-muted-foreground">
                Select a backup from the list above to enable restore functionality
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="master-password" className="flex items-center gap-2">
                <Key className="w-4 h-4 text-dice-contain" />
                Master Password
              </Label>
              <Input 
                id="master-password"
                type="password"
                placeholder="Enter master password..."
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button 
                    disabled={!selectedBackup || !masterPassword}
                    className="w-full"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Restore System
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-dice-contain" />
                      Confirm System Restore
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action will restore your system to the selected backup state. 
                      All current configurations and data will be replaced. This action cannot be undone.
                      <br /><br />
                      <strong>Selected Backup:</strong> {backups.find(b => b.id === selectedBackup)?.name}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRestore}>
                      <Lock className="w-4 h-4 mr-2" />
                      Confirm Restore
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20">
            <AlertTriangle className="w-5 h-5 text-dice-contain flex-shrink-0" />
            <p className="text-sm text-muted-foreground">
              <strong>Security Notice:</strong> Master password authentication with 2FA is required for all restore operations. 
              System will automatically create a pre-restore backup before proceeding.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};