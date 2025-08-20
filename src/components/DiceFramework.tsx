import { Shield, Search, AlertTriangle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface DicePhase {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  status: "active" | "completed" | "pending";
}

export const DiceFramework = () => {
  const [activePhase, setActivePhase] = useState<string>("defend");

  const phases: DicePhase[] = [
    {
      id: "defend",
      title: "Defend",
      description: "Your First Shield - Prevent attacks before they happen",
      icon: Shield,
      color: "dice-defend",
      status: "active"
    },
    {
      id: "investigate",
      title: "Investigate", 
      description: "Your Detective - Find threats hiding in plain sight",
      icon: Search,
      color: "dice-investigate",
      status: "pending"
    },
    {
      id: "contain",
      title: "Contain",
      description: "Your Emergency Guard - Stop threats before they spread", 
      icon: AlertTriangle,
      color: "dice-contain",
      status: "pending"
    },
    {
      id: "evolve",
      title: "Evolve",
      description: "Your Smart Learner - Learn and adapt for the future",
      icon: RefreshCw,
      color: "dice-evolve", 
      status: "pending"
    }
  ];

  return (
    <div className="relative">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-dice bg-clip-text text-transparent">
          DICE Protection Framework
        </h2>
        <p className="text-muted-foreground">
          Advanced DDoS protection through intelligent cycle adaptation
        </p>
      </div>

      {/* DICE Cycle Visualization */}
      <div className="relative w-80 h-80 mx-auto mb-8">
        {/* Central Shield */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-dice animate-pulse-dice">
            <Shield className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* DICE Phases in Circle */}
        {phases.map((phase, index) => {
          const angle = (index * 90) - 90; // Start at top, go clockwise
          const radian = (angle * Math.PI) / 180;
          const radius = 120;
          const x = Math.cos(radian) * radius;
          const y = Math.sin(radian) * radius;
          
          const Icon = phase.icon;
          const isActive = activePhase === phase.id;

          return (
            <div
              key={phase.id}
              className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
              }}
              onClick={() => setActivePhase(phase.id)}
            >
              <div className={`
                w-full h-full rounded-full flex items-center justify-center transition-all duration-300
                ${isActive 
                  ? `bg-${phase.color} shadow-glow animate-glow` 
                  : 'bg-card border border-border hover:bg-accent'
                }
              `}>
                <Icon className={`w-8 h-8 ${
                  isActive 
                    ? `text-${phase.color}-foreground` 
                    : 'text-muted-foreground'
                } ${phase.id === 'evolve' && isActive ? 'animate-rotate-dice' : ''}`} />
              </div>
            </div>
          );
        })}

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <linearGradient id="diceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--dice-defend))" />
              <stop offset="33%" stopColor="hsl(var(--dice-investigate))" />
              <stop offset="66%" stopColor="hsl(var(--dice-contain))" />
              <stop offset="100%" stopColor="hsl(var(--dice-evolve))" />
            </linearGradient>
          </defs>
          <circle
            cx="50%"
            cy="50%"
            r="120"
            fill="none"
            stroke="url(#diceGradient)"
            strokeWidth="2"
            strokeDasharray="5,5"
            className="opacity-30 animate-rotate-dice"
          />
        </svg>
      </div>

      {/* Active Phase Details */}
      <Card className="p-6 bg-gradient-card border-2 transition-all duration-300" 
            style={{ borderColor: `hsl(var(--${phases.find(p => p.id === activePhase)?.color}))` }}>
        {phases.filter(phase => phase.id === activePhase).map(phase => {
          const Icon = phase.icon;
          return (
            <div key={phase.id} className="flex items-start gap-4">
              <div className={`p-3 rounded-lg bg-${phase.color}/10 border border-${phase.color}/20`}>
                <Icon className={`w-6 h-6 text-${phase.color}`} />
              </div>
              <div className="flex-1">
                <h3 className={`text-xl font-bold text-${phase.color} mb-2`}>
                  {phase.title}
                </h3>
                <p className="text-muted-foreground">
                  {phase.description}
                </p>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
};