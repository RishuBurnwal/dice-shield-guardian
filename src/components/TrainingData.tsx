import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Database,
  Upload,
  Brain,
  Play,
  CheckCircle,
  AlertCircle,
  FileText,
  TrendingUp,
  Clock,
  Zap,
  Settings
} from "lucide-react";

interface TrainingFile {
  id: string;
  name: string;
  size: string;
  type: string;
  status: "uploaded" | "processing" | "completed" | "error";
  uploadDate: string;
}

interface ModelStats {
  accuracy: number;
  totalSamples: number;
  trainingTime: string;
  lastUpdate: string;
}

export const TrainingData = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [selectedSensitivity, setSelectedSensitivity] = useState("medium");
  
  const [trainingFiles] = useState<TrainingFile[]>([
    {
      id: "1",
      name: "ddos_patterns_2024.pcap",
      size: "245 MB",
      type: "PCAP",
      status: "completed",
      uploadDate: "2024-01-15 10:30"
    },
    {
      id: "2",
      name: "malicious_requests.log",
      size: "89 MB",
      type: "LOG",
      status: "completed",
      uploadDate: "2024-01-15 09:15"
    },
    {
      id: "3",
      name: "network_baseline.json",
      size: "12 MB",
      type: "JSON",
      status: "processing",
      uploadDate: "2024-01-15 11:45"
    },
    {
      id: "4",
      name: "attack_vectors.csv",
      size: "156 MB",
      type: "CSV",
      status: "uploaded",
      uploadDate: "2024-01-15 12:00"
    }
  ]);

  const [modelStats] = useState<ModelStats>({
    accuracy: 97.3,
    totalSamples: 1847293,
    trainingTime: "2h 34m",
    lastUpdate: "2024-01-15 14:30"
  });

  const handleTraining = () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    // Simulate training progress
    const interval = setInterval(() => {
      setTrainingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsTraining(false);
          return 100;
        }
        return prev + Math.random() * 10;
      });
    }, 500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "status-safe";
      case "processing": return "status-warning";
      case "uploaded": return "status-info";
      case "error": return "status-danger";
      default: return "muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return CheckCircle;
      case "processing": return Clock;
      case "uploaded": return FileText;
      case "error": return AlertCircle;
      default: return FileText;
    }
  };

  return (
    <div className="space-y-6">
      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-dice-evolve" />
              <div>
                <p className="text-sm font-medium">Model Accuracy</p>
                <p className="text-2xl font-bold text-dice-evolve">{modelStats.accuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-dice-investigate" />
              <div>
                <p className="text-sm font-medium">Training Samples</p>
                <p className="text-2xl font-bold text-dice-investigate">{modelStats.totalSamples.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-dice-contain" />
              <div>
                <p className="text-sm font-medium">Last Training</p>
                <p className="text-2xl font-bold text-dice-contain">{modelStats.trainingTime}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dice-defend" />
              <div>
                <p className="text-sm font-medium">Improvement</p>
                <p className="text-2xl font-bold text-dice-defend">+2.4%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* File Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5 text-dice-investigate" />
            Upload Training Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-dice-investigate/50 transition-colors cursor-pointer">
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Drag & Drop Files Here</h3>
            <p className="text-muted-foreground mb-4">
              Support for .pcap, .log, .json, .csv files up to 500MB each
            </p>
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Choose Files
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="file-type">Data Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="network">Network Traffic</SelectItem>
                  <SelectItem value="attack">Attack Patterns</SelectItem>
                  <SelectItem value="baseline">Baseline Data</SelectItem>
                  <SelectItem value="logs">Security Logs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="source">Data Source</Label>
              <Input placeholder="e.g., Production Server, Honeypot, etc." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Training Files */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-dice-contain" />
            Training Dataset
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trainingFiles.map((file) => {
              const StatusIcon = getStatusIcon(file.status);
              
              return (
                <div 
                  key={file.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                >
                  <StatusIcon 
                    className={`w-5 h-5 text-${getStatusColor(file.status)} ${
                      file.status === 'processing' ? 'animate-spin' : ''
                    }`} 
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{file.name}</h4>
                      <Badge variant="outline" className={`text-${getStatusColor(file.status)} border-${getStatusColor(file.status)}`}>
                        {file.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{file.size}</span>
                      <span>{file.type}</span>
                      <span>{file.uploadDate}</span>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Model Training Controls */}
      <Card className="bg-gradient-shield border-dice-evolve/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-dice-evolve" />
            AI Model Training
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sensitivity">Detection Sensitivity</Label>
              <Select value={selectedSensitivity} onValueChange={setSelectedSensitivity}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low - Fewer false positives</SelectItem>
                  <SelectItem value="medium">Medium - Balanced detection</SelectItem>
                  <SelectItem value="high">High - Maximum sensitivity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={handleTraining} 
                disabled={isTraining}
                className="w-full"
                variant={isTraining ? "outline" : "default"}
              >
                {isTraining ? (
                  <>
                    <Clock className="w-4 h-4 mr-2 animate-spin" />
                    Training in Progress...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Training
                  </>
                )}
              </Button>
            </div>
          </div>

          {isTraining && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Training Progress</span>
                <span>{Math.round(trainingProgress)}%</span>
              </div>
              <Progress value={trainingProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Estimated time remaining: {Math.round((100 - trainingProgress) * 2)}s
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-dice-evolve">23</div>
              <p className="text-sm text-muted-foreground">Model Updates</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dice-evolve">847</div>
              <p className="text-sm text-muted-foreground">Attack Patterns</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-dice-evolve">99.1%</div>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};