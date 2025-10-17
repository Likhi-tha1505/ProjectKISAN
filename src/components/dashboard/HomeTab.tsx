import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { ChatBot } from "@/components/dashboard/ChatBot";

export const HomeTab = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <blockquote className="text-2xl md:text-3xl font-semibold text-primary leading-relaxed border-l-4 border-accent pl-6">
            "Empowering farmers through technology, nurturing prosperity through knowledge."
          </blockquote>
          
          <Button
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg"
            onClick={() => setShowChat(true)}
          >
            <MessageSquare className="mr-2 h-5 w-5" />
            ASK KISSAN
          </Button>

          <p className="text-muted-foreground">
            Get instant AI-powered advice on crops, pests, market prices, and government schemes.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop"
              alt="Farmer in field"
              className="relative rounded-lg shadow-2xl w-full max-w-md object-cover"
            />
          </div>
        </div>
      </div>

      {showChat && <ChatBot onClose={() => setShowChat(false)} />}
    </div>
  );
};