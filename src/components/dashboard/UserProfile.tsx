import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UserProfileProps {
  user: User;
  onClose: () => void;
}

export const UserProfile = ({ user, onClose }: UserProfileProps) => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      setProfile(data);
    };
    fetchProfile();
  }, [user.id]);

  return (
    <Card className="w-80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Profile Information</CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>
          <p className="font-medium">{profile?.full_name || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Email</p>
          <p className="font-medium">{user.email}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Phone</p>
          <p className="font-medium">{profile?.phone || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Location</p>
          <p className="font-medium">{profile?.location || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Soil Type</p>
          <p className="font-medium">{profile?.soil_type || "N/A"}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Land Size</p>
          <p className="font-medium">{profile?.land_size || "N/A"}</p>
        </div>
      </CardContent>
    </Card>
  );
};