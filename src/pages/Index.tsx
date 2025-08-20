import { useState } from "react";
import { AuthLogin } from "@/components/AuthLogin";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { useToast } from "@/hooks/use-toast";

interface User {
  name: string;
  role: string;
  username: string;
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setIsLoading(true);
    setError("");

    // Simulate authentication
    setTimeout(() => {
      if (credentials.username === "admin" && credentials.password === "dice2024") {
        const user: User = {
          name: "Administrator",
          role: "Security Admin",
          username: credentials.username
        };
        setCurrentUser(user);
        setIsAuthenticated(true);
        toast({
          title: "Login Successful",
          description: "Welcome to DICE Security Framework",
        });
      } else {
        setError("Invalid credentials. Please try again.");
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  if (!isAuthenticated) {
    return (
      <AuthLogin 
        onLogin={handleLogin}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentUser={currentUser || undefined}
        systemStatus="safe"
      />
      <main className="container mx-auto p-6">
        <Dashboard />
      </main>
    </div>
  );
};

export default Index;