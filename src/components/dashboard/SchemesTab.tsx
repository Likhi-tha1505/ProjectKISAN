import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, CheckCircle2 } from "lucide-react";

interface Scheme {
  id: string;
  scheme_name: string;
  description: string;
  eligibility: string;
  application_link: string;
  category: string;
}

export const SchemesTab = () => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  useEffect(() => {
    const fetchSchemes = async () => {
      const { data } = await supabase
        .from("schemes")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setSchemes(data);
    };
    fetchSchemes();
  }, []);

  const categoryColors: Record<string, string> = {
    "Income Support": "bg-green-100 text-green-800",
    "Insurance": "bg-blue-100 text-blue-800",
    "Credit": "bg-purple-100 text-purple-800",
    "Agricultural Support": "bg-amber-100 text-amber-800",
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Government Schemes</h2>
        <p className="text-muted-foreground">
          Discover schemes you're eligible for and learn how to apply
        </p>
      </div>

      <div className="grid gap-6">
        {schemes.map((scheme) => (
          <Card key={scheme.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-xl flex items-center gap-2">
                    {scheme.scheme_name}
                    <Badge className={categoryColors[scheme.category] || ""}>
                      {scheme.category}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="mt-2">{scheme.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  Eligibility
                </h4>
                <p className="text-sm text-muted-foreground">{scheme.eligibility}</p>
              </div>

              <div className="bg-accent/10 rounded-lg p-4">
                <h4 className="font-semibold text-sm mb-2">How to Apply</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Visit the official portal to complete your application. The process is simple and can be
                  completed online.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <a href={scheme.application_link} target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-primary">Need Help?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Not sure which scheme is right for you? Chat with KISSAN AI to get personalized recommendations
            based on your farm size, location, and crops.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};