import { Sprout } from "lucide-react";

export const Logo = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizes = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${sizes[size]} bg-primary rounded-full flex items-center justify-center shadow-md`}>
        <Sprout className="text-primary-foreground" size={size === "sm" ? 20 : size === "md" ? 28 : 36} />
      </div>
      <h1 className={`${textSizes[size]} font-bold text-primary tracking-tight`}>
        PROJECT KISAN
      </h1>
    </div>
  );
};