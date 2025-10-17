import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, Heart } from "lucide-react";

export const AboutTab = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold text-primary">About PROJECT KISAN</h2>
        <blockquote className="text-xl italic text-muted-foreground border-l-4 border-accent pl-6">
          "Bridging the gap between technology and agriculture, one farmer at a time."
        </blockquote>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            PROJECT KISAN is dedicated to empowering small-scale farmers across India with cutting-edge AI
            technology. We believe that every farmer deserves access to real-time information, expert
            guidance, and government support to maximize their yields and profits.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Our platform combines artificial intelligence with agricultural expertise to provide personalized
            crop recommendations, pest detection, market insights, and scheme guidance - all in a language
            farmers understand.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>What We Offer</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">1</span>
              </div>
              <div>
                <h4 className="font-semibold">AI-Powered Crop Advisory</h4>
                <p className="text-sm text-muted-foreground">
                  Get personalized recommendations based on your soil, weather, and location
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">2</span>
              </div>
              <div>
                <h4 className="font-semibold">Real-Time Market Prices</h4>
                <p className="text-sm text-muted-foreground">
                  Stay updated with current mandi prices and selling opportunities
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">3</span>
              </div>
              <div>
                <h4 className="font-semibold">Government Scheme Access</h4>
                <p className="text-sm text-muted-foreground">
                  Discover and apply for schemes you're eligible for
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-primary text-sm font-semibold">4</span>
              </div>
              <div>
                <h4 className="font-semibold">24/7 AI Assistant</h4>
                <p className="text-sm text-muted-foreground">
                  Chat with KISSAN AI anytime for instant farming advice
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:support@projectkisan.in" className="text-primary font-medium hover:underline">
                support@projectkisan.in
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <a href="tel:+911800000000" className="text-primary font-medium hover:underline">
                +91 1800-000-000 (Toll Free)
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};