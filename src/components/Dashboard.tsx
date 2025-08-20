import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Shield,
  AlertTriangle,
  Users,
  Server,
  Globe,
  TrendingUp,
  Download,
  Eye,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import { DiceFramework } from "./DiceFramework";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "info" | "warning" | "danger";
  source: string;
  message: string;
  details?: string;
}

interface SystemStats {
  threatsBlocked: number;
  activeConnections: number;
  bandwidthUsage: string;
  uptime: string;
  cpuUsage: number;
  memoryUsage: number;
}

export const Dashboard = () => {
  const [logs] = useState<LogEntry[]>([
    {
      id: "1",
      timestamp: "2024-01-15 14:30:25",
      type: "danger",
      source: "192.168.1.45",
      message: "DDoS attack detected - UDP flood",
      details: "High volume traffic from suspicious IP range"
    },
    {
      id: "2", 
      timestamp: "2024-01-15 14:28:12",
      type: "warning",
      source: "10.0.0.23",
      message: "Unusual connection pattern detected",
      details: "Rapid connection attempts from single source"
    },
    {
      id: "3",
      timestamp: "2024-01-15 14:25:03",
      type: "info",
      source: "System",
      message: "DICE framework update applied",
      details: "Rule definitions updated successfully"
    }
  ]);

  const [stats] = useState<SystemStats>({
    threatsBlocked: 1247,
    activeConnections: 892,
    bandwidthUsage: "2.4 GB/s",
    uptime: "99.98%",
    cpuUsage: 34,
    memoryUsage: 67
  });

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case "danger": return "status-danger";
      case "warning": return "status-warning";
      case "info": return "status-info";
      default: return "muted";
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Threats Blocked</CardTitle>
            <Shield className="h-4 w-4 text-dice-defend" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dice-defend">{stats.threatsBlocked.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last hour
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
            <Users className="h-4 w-4 text-dice-investigate" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dice-investigate">{stats.activeConnections}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="w-3 h-3 mr-1" />
              Real-time monitoring
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bandwidth Usage</CardTitle>
            <Globe className="h-4 w-4 text-dice-contain" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dice-contain">{stats.bandwidthUsage}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Server className="w-3 h-3 mr-1" />
              Peak traffic handled
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
            <RefreshCw className="h-4 w-4 text-dice-evolve" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-dice-evolve">{stats.uptime}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <Activity className="w-3 h-3 mr-1" />
              Highly available
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="logs">Log Analysis</TabsTrigger>
          <TabsTrigger value="targets">Target Management</TabsTrigger>
          <TabsTrigger value="framework">DICE Framework</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Real-time Logs */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Real-time Security Events
                </CardTitle>
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </CardHeader>
              <CardContent className="space-y-4 max-h-80 overflow-y-auto">
                {logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className={`w-2 h-2 rounded-full mt-2 bg-${getLogTypeColor(log.type)}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="outline" className={`text-${getLogTypeColor(log.type)} border-${getLogTypeColor(log.type)}`}>
                          {log.type.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                      </div>
                      <p className="text-sm font-medium truncate">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{log.source}</p>
                      {log.details && (
                        <p className="text-xs text-muted-foreground mt-1">{log.details}</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  System Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU Usage</span>
                    <span className="font-medium">{stats.cpuUsage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-dice-defend h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.cpuUsage}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Memory Usage</span>
                    <span className="font-medium">{stats.memoryUsage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-dice-investigate h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.memoryUsage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download System Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs">
          <Card>
            <CardHeader>
              <CardTitle>Log Analysis & Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Advanced log analysis tools coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="targets">
          <Card>
            <CardHeader>
              <CardTitle>Target Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Target configuration and monitoring coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="framework">
          <DiceFramework />
        </TabsContent>
      </Tabs>
    </div>
  );
};