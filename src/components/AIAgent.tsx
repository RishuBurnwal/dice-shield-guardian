import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bot,
  Activity,
  AlertTriangle,
  Shield,
  Zap,
  Clock,
  MapPin,
  Settings,
  TrendingUp,
  Brain
} from "lucide-react";

interface DetectionLog {
  id: string;
  timestamp: string;
  sourceIP: string;
  requestCount: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  actionTaken: string;
  attackType: string;
  location?: string;
}

export const AIAgent = () => {
  const [isEnabled, setIsEnabled] = useState(true);
  const [detectionLogs] = useState<DetectionLog[]>([
    {
      id: "1",
      timestamp: "2024-01-15 14:32:15",
      sourceIP: "192.168.1.45",
      requestCount: 2847,
      riskLevel: "critical",
      actionTaken: "IP Blocked + Rate Limited",
      attackType: "DDoS Flood",
      location: "Unknown"
    },
    {
      id: "2",
      timestamp: "2024-01-15 14:31:23",
      sourceIP: "10.0.0.23",
      requestCount: 156,
      riskLevel: "high",
      actionTaken: "Rate Limited",
      attackType: "SQL Injection",
      location: "Russia"
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:30:45",
      sourceIP: "172.16.0.12",
      requestCount: 89,
      riskLevel: "medium",
      actionTaken: "Monitoring",
      attackType: "Suspicious Pattern",
      location: "China"
    },
    {
      id: "4",
      timestamp: "2024-01-15 14:29:12",
      sourceIP: "203.0.113.5",
      requestCount: 1205,
      riskLevel: "high",
      actionTaken: "IP Blocked",
      attackType: "Brute Force",
      location: "USA"
    },
    {
      id: "5",
      timestamp: "2024-01-15 14:28:33",
      sourceIP: "198.51.100.7",
      requestCount: 67,
      riskLevel: "low",
      actionTaken: "Logged",
      attackType: "Port Scan",
      location: "Germany"
    }
  ]);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "status-danger";
      case "high": return "status-danger";
      case "medium": return "status-warning";
      case "low": return "status-info";
      default: return "muted";
    }
  };

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case "critical": return "destructive";
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Agent Status Header */}
      <Card className="bg-gradient-card border-dice-investigate/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8 text-dice-investigate" />
                {isEnabled && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-dice-defend rounded-full animate-pulse" />
                )}
              </div>
              <div>
                <CardTitle className="text-dice-investigate">AI Security Agent</CardTitle>
                <CardDescription>
                  Intelligent threat detection and autonomous response system
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">Status</p>
                <p className={`text-xs ${isEnabled ? 'text-dice-defend' : 'text-muted-foreground'}`}>
                  {isEnabled ? 'Active & Learning' : 'Disabled'}
                </p>
              </div>
              <Switch 
                checked={isEnabled} 
                onCheckedChange={setIsEnabled}
                className="data-[state=checked]:bg-dice-investigate"
              />
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* AI Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-dice-evolve" />
              <div>
                <p className="text-sm font-medium">Model Accuracy</p>
                <p className="text-2xl font-bold text-dice-evolve">97.3%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-dice-investigate" />
              <div>
                <p className="text-sm font-medium">Threats Detected</p>
                <p className="text-2xl font-bold text-dice-investigate">847</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-dice-defend" />
              <div>
                <p className="text-sm font-medium">Auto Blocked</p>
                <p className="text-2xl font-bold text-dice-defend">1,247</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dice-contain" />
              <div>
                <p className="text-sm font-medium">Response Time</p>
                <p className="text-2xl font-bold text-dice-contain">0.3s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Detection Log */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-dice-investigate animate-pulse" />
            <CardTitle>AI Detection Log</CardTitle>
            <Badge variant="outline" className="ml-2 text-dice-investigate border-dice-investigate">
              Real-time
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configure AI
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-80">
            <div className="space-y-3">
              {detectionLogs.map((log) => (
                <div 
                  key={log.id} 
                  className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors border-l-4"
                  style={{ borderLeftColor: `hsl(var(--${getRiskColor(log.riskLevel)}))` }}
                >
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full bg-${getRiskColor(log.riskLevel)} animate-pulse`} />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                    <div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {log.timestamp.split(' ')[1]}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {log.timestamp.split(' ')[0]}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-sm">{log.sourceIP}</p>
                      {log.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {log.location}
                        </div>
                      )}
                    </div>

                    <div className="text-center">
                      <p className="font-bold text-dice-investigate">{log.requestCount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">requests</p>
                    </div>

                    <div className="text-center">
                      <Badge variant={getRiskBadgeVariant(log.riskLevel)} className="mb-1">
                        {log.riskLevel.toUpperCase()}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{log.attackType}</p>
                    </div>

                    <div>
                      <p className="text-sm font-medium">{log.actionTaken}</p>
                    </div>

                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        <AlertTriangle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* AI Learning Status */}
      <Card className="bg-gradient-shield border-dice-evolve/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-dice-evolve animate-pulse" />
            Autonomous Learning Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground">Patterns Learned</p>
              <p className="text-2xl font-bold text-dice-evolve">15,847</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground">Model Updates</p>
              <p className="text-2xl font-bold text-dice-evolve">23</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50">
              <p className="text-sm text-muted-foreground">Next Training</p>
              <p className="text-2xl font-bold text-dice-evolve">2h 15m</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};