
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

interface SecurityLayoutProps {
  children: ReactNode;
  className?: string;
}

const SecurityLayout = ({ children, className }: SecurityLayoutProps) => {
  const { settings } = useSettings();
  
  return (
    <div 
      className={cn(
        "space-y-8 w-full",
        className
      )}
      style={{ fontSize: settings.fontSize === "small" ? "14px" : settings.fontSize === "large" ? "18px" : "16px" }}
    >
      {children}
    </div>
  );
};

export default SecurityLayout;
