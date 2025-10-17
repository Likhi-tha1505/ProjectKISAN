import { useNavigate } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Sprout, TrendingUp, Users, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <Logo size="lg" />
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto">
            Empowering India's farmers with AI-driven insights for better crops, better prices, and better lives
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-lg transition-shadow">
            <Sprout className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Smart Crop Advisory</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered recommendations for your soil and climate
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-lg transition-shadow">
            <TrendingUp className="h-10 w-10 text-accent mb-4" />
            <h3 className="font-semibold text-lg mb-2">Live Market Prices</h3>
            <p className="text-sm text-muted-foreground">
              Real-time mandi prices and selling insights
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-lg transition-shadow">
            <Shield className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold text-lg mb-2">Government Schemes</h3>
            <p className="text-sm text-muted-foreground">
              Easy access to schemes you're eligible for
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm border border-border hover:shadow-lg transition-shadow">
            <Users className="h-10 w-10 text-accent mb-4" />
            <h3 className="font-semibold text-lg mb-2">24/7 AI Support</h3>
            <p className="text-sm text-muted-foreground">
              Chat with KISSAN AI anytime for instant help
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg px-8"
            onClick={() => navigate("/auth")}
          >
            Get Started Now
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Join thousands of farmers already using PROJECT KISAN
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
