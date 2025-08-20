import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, Eye, EyeOff, Lock, User } from "lucide-react";
import heroImage from "@/assets/dice-hero.jpg";

interface AuthLoginProps {
  onLogin: (credentials: { username: string; password: string }) => void;
  isLoading?: boolean;
  error?: string;
}

export const AuthLogin = ({ onLogin, isLoading = false, error }: AuthLoginProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({ username, password });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dice-defend/20 via-dice-investigate/20 to-dice-evolve/20" />
        <img 
          src={heroImage} 
          alt="DICE Security Framework"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-hero rounded-full flex items-center justify-center shadow-dice animate-pulse-dice mb-6">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-dice bg-clip-text text-transparent">
              DICE Framework
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Advanced DDoS Protection Suite
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 max-w-md">
            <div className="text-center">
              <div className="w-12 h-12 bg-dice-defend/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-dice-defend" />
              </div>
              <h3 className="font-semibold text-dice-defend">Defend</h3>
              <p className="text-sm text-muted-foreground">Prevention First</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-dice-investigate/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6 text-dice-investigate" />
              </div>
              <h3 className="font-semibold text-dice-investigate">Investigate</h3>
              <p className="text-sm text-muted-foreground">Smart Detection</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-dice-contain/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Lock className="w-6 h-6 text-dice-contain" />
              </div>
              <h3 className="font-semibold text-dice-contain">Contain</h3>
              <p className="text-sm text-muted-foreground">Rapid Response</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-dice-evolve/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Shield className="w-6 h-6 text-dice-evolve" />
              </div>
              <h3 className="font-semibold text-dice-evolve">Evolve</h3>
              <p className="text-sm text-muted-foreground">AI Learning</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="border-2 shadow-elevated">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-gradient-hero rounded-full flex items-center justify-center mx-auto mb-4 shadow-dice">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to access DICE Security Framework
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-hero hover:opacity-90 transition-opacity"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center text-sm text-muted-foreground">
                <p>Demo Credentials:</p>
                <p className="font-mono">admin / dice2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};