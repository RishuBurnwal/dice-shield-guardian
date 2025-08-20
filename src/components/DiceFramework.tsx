import { Shield, Search, AlertTriangle, RefreshCw, Eye, Zap, Brain, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface DicePhase {
  id: string;
  title: string;
  description: string;
  tagline: string;
  icon: React.ComponentType<any>;
  color: string;
  status: "active" | "completed" | "pending";
}

export const DiceFramework = () => {
  const [activePhase, setActivePhase] = useState<string>("defend");
  const [isAnimating, setIsAnimating] = useState(false);

  const phases: DicePhase[] = [
    {
      id: "defend",
      title: "Defend",
      description: "Deploy protective barriers against incoming threats with intelligent filtering and real-time blocking mechanisms",
      tagline: "Prevent attacks before they happen",
      icon: Shield,
      color: "dice-defend",
      status: "active"
    },
    {
      id: "investigate",
      title: "Investigate", 
      description: "Analyze patterns, scan traffic, and detect anomalies using AI-powered threat intelligence",
      tagline: "Find threats hiding in plain sight",
      icon: Search,
      color: "dice-investigate",
      status: "pending"
    },
    {
      id: "contain",
      title: "Contain",
      description: "Isolate and neutralize identified threats before they can spread or cause damage",
      tagline: "Stop threats before they spread", 
      icon: AlertTriangle,
      color: "dice-contain",
      status: "pending"
    },
    {
      id: "evolve",
      title: "Evolve",
      description: "Learn from attacks, adapt strategies, and continuously improve defensive capabilities",
      tagline: "Learn and adapt for the future",
      icon: RefreshCw,
      color: "dice-evolve", 
      status: "pending"
    }
  ];

  const handlePhaseClick = (phaseId: string) => {
    setIsAnimating(true);
    setActivePhase(phaseId);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-dice bg-clip-text text-transparent">
          DICE Protection Framework
        </h2>
        <p className="text-lg text-muted-foreground mb-2">
          Advanced DDoS protection through intelligent cycle adaptation
        </p>
        <Badge variant="outline" className="text-dice-investigate border-dice-investigate">
          <Activity className="w-3 h-3 mr-1 animate-pulse" />
          Active Protection Layer
        </Badge>
      </div>

      {/* Enhanced DICE Cycle Visualization */}
      <div className="relative w-96 h-96 mx-auto mb-8">
        {/* Animated Background Rings */}
        <div className="absolute inset-0 rounded-full border border-dice-defend/20 animate-rotate-dice" />
        <div className="absolute inset-4 rounded-full border border-dice-investigate/20 animate-rotate-dice" style={{ animationDirection: 'reverse' }} />
        <div className="absolute inset-8 rounded-full border border-dice-contain/20 animate-rotate-dice" />

        {/* Central 3D Shield */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-shield rounded-full flex items-center justify-center shadow-shield animate-shield-pulse">
              <Shield className="w-12 h-12 text-dice-defend animate-pulse" />
            </div>
            {/* Glowing ring around shield */}
            <div className="absolute inset-0 rounded-full bg-gradient-shield opacity-30 animate-pulse" />
          </div>
        </div>

        {/* DICE Phases in Circle with Enhanced Animations */}
        {phases.map((phase, index) => {
          const angle = (index * 90) - 90; // Start at top, go clockwise
          const radian = (angle * Math.PI) / 180;
          const radius = 140;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;

          return (
            <div
              key={phase.id}
              className="absolute w-20 h-20 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-500 hover:scale-125 group"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              onClick={() => handlePhaseClick(phase.id)}
            >
              <div className={`
                w-full h-full rounded-full flex items-center justify-center transition-all duration-500 relative
                ${isActive 
                  ? `bg-${phase.color} shadow-cyber animate-glow` 
                  : 'bg-card/80 border-2 border-border hover:border-dice-investigate/50 backdrop-blur-sm'
                }
              `}>
                <Icon className={`w-10 h-10 transition-all duration-300 ${
                  isActive 
                    ? `text-${phase.color}-foreground` 
                    : 'text-muted-foreground group-hover:text-dice-investigate'
                } ${phase.id === 'evolve' && isActive ? 'animate-rotate-dice' : ''}
                ${phase.id === 'investigate' && isActive ? 'animate-pulse' : ''}
                ${phase.id === 'contain' && isActive ? 'animate-bounce' : ''}`} />
                
                {isActive && (
                  <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-20" />
                )}
              </div>

              {/* Phase label */}
              <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-center whitespace-nowrap transition-all duration-300 ${
                isActive ? `text-${phase.color}` : 'text-muted-foreground'
              }`}>
                {phase.title}
              </div>
            </div>
          );
        })}

        {/* Dynamic Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="diceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--dice-defend))" />
              <stop offset="33%" stopColor="hsl(var(--dice-investigate))" />
              <stop offset="66%" stopColor="hsl(var(--dice-contain))" />
              <stop offset="100%" stopColor="hsl(var(--dice-evolve))" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="50%"
            cy="50%"
            r="140"
            fill="none"
            stroke="url(#diceGradient)"
            strokeWidth="3"
            strokeDasharray="10,5"
            className="opacity-40 animate-rotate-dice"
            filter="url(#glow)"
          />
          {/* Data flow animation */}
          <circle
            cx="50%"
            cy="50%"
            r="140"
            fill="none"
            stroke="hsl(var(--dice-investigate))"
            strokeWidth="1"
            strokeDasharray="2,8"
            className="opacity-60 animate-data-flow"
          />
        </svg>
      </div>

      {/* Enhanced Active Phase Details */}
      <Card className={`p-6 transition-all duration-500 border-2 ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}
            style={{ 
              borderColor: `hsl(var(--${phases.find(p => p.id === activePhase)?.color}))`,
              background: `linear-gradient(135deg, hsl(var(--card)), hsl(var(--${phases.find(p => p.id === activePhase)?.color}) / 0.05))`
            }}>
        {phases.filter(phase => phase.id === activePhase).map(phase => {
          const Icon = phase.icon;
          return (
            <div key={phase.id} className="space-y-4">
              <div className="flex items-start gap-4">
                <div className={`p-4 rounded-xl bg-${phase.color}/10 border-2 border-${phase.color}/20 shadow-elevated`}>
                  <Icon className={`w-8 h-8 text-${phase.color} ${
                    phase.id === 'evolve' ? 'animate-rotate-dice' : 
                    phase.id === 'investigate' ? 'animate-pulse' : ''
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`text-2xl font-bold text-${phase.color}`}>
                      {phase.title}
                    </h3>
                    <Badge className={`bg-${phase.color}/20 text-${phase.color} border-${phase.color}/30`}>
                      Active
                    </Badge>
                  </div>
                  <p className={`text-lg font-medium text-${phase.color}/80 mb-2`}>
                    {phase.tagline}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>

              {/* Phase Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="text-center p-3 rounded-lg bg-card/50">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Eye className={`w-4 h-4 text-${phase.color}`} />
                    <span className="text-sm font-medium">Detection Rate</span>
                  </div>
                  <div className={`text-2xl font-bold text-${phase.color}`}>98.7%</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/50">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Zap className={`w-4 h-4 text-${phase.color}`} />
                    <span className="text-sm font-medium">Response Time</span>
                  </div>
                  <div className={`text-2xl font-bold text-${phase.color}`}>0.3s</div>
                </div>
                <div className="text-center p-3 rounded-lg bg-card/50">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Brain className={`w-4 h-4 text-${phase.color}`} />
                    <span className="text-sm font-medium">AI Confidence</span>
                  </div>
                  <div className={`text-2xl font-bold text-${phase.color}`}>97.3%</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className={`border-${phase.color}/30 hover:bg-${phase.color}/10`}>
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
                <Button variant="outline" className={`border-${phase.color}/30 hover:bg-${phase.color}/10`}>
                  <Zap className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};