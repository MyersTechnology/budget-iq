
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: ReactNode;
  className?: string;
}

const SettingsLayout = ({ children, className }: SettingsLayoutProps) => {
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
};

export default SettingsLayout;
