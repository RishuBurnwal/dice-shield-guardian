import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Settings, 
  User, 
  Bell, 
  Activity,
  Server,
  Clock,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  currentUser?: {
    name: string;
    role: string;
  };
  systemStatus: "safe" | "warning" | "danger";
}

export const Header = ({ currentUser, systemStatus = "safe" }: HeaderProps) => {
  const [notifications] = useState(3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "safe": return "status-safe";
      case "warning": return "status-warning"; 
      case "danger": return "status-danger";
      default: return "status-info";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "safe": return <CheckCircle className="w-4 h-4" />;
      case "warning": return <Clock className="w-4 h-4" />;
      case "danger": return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo and Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-hero rounded-lg shadow-dice">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">DICE Framework</h1>
              <p className="text-xs text-muted-foreground">DDoS Protection Suite</p>
            </div>
          </div>
          
          {/* System Status */}
          <Badge 
            variant="outline" 
            className={`border-${getStatusColor(systemStatus)} text-${getStatusColor(systemStatus)} capitalize`}
          >
            {getStatusIcon(systemStatus)}
            <span className="ml-1">{systemStatus}</span>
          </Badge>
        </div>

        {/* Center - Active Target */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-card rounded-lg border">
          <Server className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium">Target: 192.168.1.100</span>
          <Badge variant="secondary" className="text-xs">Active</Badge>
        </div>

        {/* Right Side - User Controls */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 text-xs p-0 flex items-center justify-center"
              >
                {notifications}
              </Badge>
            )}
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings className="w-4 h-4" />
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-dice rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-primary" />
                </div>
                {currentUser && (
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium">{currentUser.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUser.role}</p>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};