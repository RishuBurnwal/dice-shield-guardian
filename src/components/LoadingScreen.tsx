import { Shield } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center mx-auto shadow-dice animate-pulse-dice">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto border-4 border-dice-defend/30 rounded-full animate-rotate-dice"></div>
        </div>
        
        <div>
          <h1 className="text-2xl font-bold mb-2 bg-gradient-dice bg-clip-text text-transparent">
            DICE Framework
          </h1>
          <p className="text-muted-foreground animate-pulse">
            Initializing security protocols...
          </p>
        </div>

        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-dice-defend rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-dice-investigate rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-dice-contain rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 bg-dice-evolve rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></div>
        </div>
      </div>
    </div>
  );
};