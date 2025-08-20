import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Network,
  Globe,
  Activity,
  TrendingUp,
  AlertTriangle,
  Eye,
  BarChart3,
  Wifi,
  Server,
  MapPin
} from "lucide-react";

interface NetworkData {
  timestamp: string;
  requestsPerSecond: number;
  bandwidth: number;
}

interface TopIP {
  ip: string;
  requests: number;
  country: string;
  risk: "low" | "medium" | "high";
  bandwidth: number;
}

export const NetworkMonitor = () => {
  const [realtimeData] = useState<NetworkData[]>([
    { timestamp: "14:30", requestsPerSecond: 1247, bandwidth: 2.4 },
    { timestamp: "14:31", requestsPerSecond: 2891, bandwidth: 4.1 },
    { timestamp: "14:32", requestsPerSecond: 5643, bandwidth: 8.7 },
    { timestamp: "14:33", requestsPerSecond: 1829, bandwidth: 3.2 },
    { timestamp: "14:34", requestsPerSecond: 967, bandwidth: 1.8 }
  ]);

  const [topIPs] = useState<TopIP[]>([
    { ip: "192.168.1.45", requests: 15847, country: "Russia", risk: "high", bandwidth: 12.4 },
    { ip: "10.0.0.23", requests: 8934, country: "China", risk: "medium", bandwidth: 8.7 },
    { ip: "172.16.0.12", requests: 6721, country: "USA", risk: "low", bandwidth: 5.2 },
    { ip: "203.0.113.5", requests: 4892, country: "Germany", risk: "medium", bandwidth: 3.8 },
    { ip: "198.51.100.7", requests: 3456, country: "Japan", risk: "low", bandwidth: 2.1 },
    { ip: "192.0.2.146", requests: 2847, country: "Brazil", risk: "high", bandwidth: 4.3 },
    { ip: "203.113.0.15", requests: 1923, country: "India", risk: "low", bandwidth: 1.9 },
    { ip: "172.32.1.89", requests: 1456, country: "UK", risk: "medium", bandwidth: 1.2 },
    { ip: "10.1.1.67", requests: 1234, country: "France", risk: "low", bandwidth: 0.9 },
    { ip: "192.168.0.99", requests: 987, country: "Canada", risk: "low", bandwidth: 0.7 }
  ]);

  const currentRPS = realtimeData[realtimeData.length - 1]?.requestsPerSecond || 0;
  const maxRPS = Math.max(...realtimeData.map(d => d.requestsPerSecond));

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high": return "status-danger";
      case "medium": return "status-warning";
      case "low": return "status-safe";
      default: return "muted";
    }
  };

  const getRiskBadge = (risk: string) => {
    switch (risk) {
      case "high": return "destructive";
      case "medium": return "secondary";
      case "low": return "outline";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Network Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-dice-investigate animate-pulse" />
              <div>
                <p className="text-sm font-medium">Current RPS</p>
                <p className="text-2xl font-bold text-dice-investigate">{currentRPS.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-dice-contain" />
              <div>
                <p className="text-sm font-medium">Peak Traffic</p>
                <p className="text-2xl font-bold text-dice-contain">{maxRPS.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-dice-defend" />
              <div>
                <p className="text-sm font-medium">Active Connections</p>
                <p className="text-2xl font-bold text-dice-defend">892</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-cyber">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Server className="w-5 h-5 text-dice-evolve" />
              <div>
                <p className="text-sm font-medium">Bandwidth</p>
                <p className="text-2xl font-bold text-dice-evolve">15.4 GB/s</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Traffic Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-dice-investigate" />
            <CardTitle>Network Traffic - Real-time</CardTitle>
            <Badge variant="outline" className="text-dice-investigate border-dice-investigate animate-pulse">
              Live
            </Badge>
          </div>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-end justify-between gap-2">
            {realtimeData.map((data, index) => {
              const height = (data.requestsPerSecond / maxRPS) * 100;
              const isLatest = index === realtimeData.length - 1;
              
              return (
                <div key={data.timestamp} className="flex-1 flex flex-col items-center">
                  <div className="text-xs text-muted-foreground mb-2">
                    {data.requestsPerSecond.toLocaleString()}
                  </div>
                  <div 
                    className={`w-full rounded-t transition-all duration-500 ${
                      isLatest 
                        ? 'bg-dice-investigate animate-pulse' 
                        : 'bg-dice-investigate/70'
                    }`}
                    style={{ height: `${height}%`, minHeight: '4px' }}
                  />
                  <div className="text-xs text-muted-foreground mt-2">
                    {data.timestamp}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Traffic intensity indicator */}
          <div className="mt-4 p-3 rounded-lg bg-muted/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Traffic Intensity</span>
              <span className="text-sm text-dice-investigate">{((currentRPS / maxRPS) * 100).toFixed(1)}%</span>
            </div>
            <Progress value={(currentRPS / maxRPS) * 100} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Top IPs by Request Count */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-dice-contain" />
            <CardTitle>Top IPs by Request Volume</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            <AlertTriangle className="w-4 h-4 mr-2" />
            Block Suspicious
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topIPs.map((ip, index) => (
              <div 
                key={ip.ip} 
                className={`flex items-center gap-4 p-3 rounded-lg transition-all hover:bg-muted/50 ${
                  ip.risk === 'high' ? 'bg-status-danger/10 border border-status-danger/20' : 
                  ip.risk === 'medium' ? 'bg-status-warning/10 border border-status-warning/20' :
                  'bg-muted/20'
                }`}
              >
                <div className="flex-shrink-0 w-8 text-center">
                  <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                </div>

                <div className="flex-shrink-0">
                  <div className={`w-3 h-3 rounded-full bg-${getRiskColor(ip.risk)} ${
                    ip.risk === 'high' ? 'animate-pulse' : ''
                  }`} />
                </div>

                <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                  <div>
                    <p className="font-mono text-sm font-medium">{ip.ip}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {ip.country}
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-dice-investigate">{ip.requests.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">requests</p>
                  </div>

                  <div className="text-center">
                    <p className="font-bold text-dice-contain">{ip.bandwidth} MB/s</p>
                    <p className="text-xs text-muted-foreground">bandwidth</p>
                  </div>

                  <div className="text-center">
                    <Badge variant={getRiskBadge(ip.risk)}>
                      {ip.risk.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="text-right">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Network Health Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-shield">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-dice-defend">
              <Wifi className="w-5 h-5" />
              Connection Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-dice-defend mb-2">98.7%</div>
              <p className="text-sm text-muted-foreground">Successful Connections</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-shield">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-dice-investigate">
              <TrendingUp className="w-5 h-5" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-dice-investigate mb-2">0.3s</div>
              <p className="text-sm text-muted-foreground">Average Response</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-shield">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-dice-contain">
              <AlertTriangle className="w-5 h-5" />
              Threat Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-dice-contain mb-2">MEDIUM</div>
              <p className="text-sm text-muted-foreground">Current Risk Level</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};