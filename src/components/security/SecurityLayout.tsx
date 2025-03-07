
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

interface SecurityLayoutProps {
  children: ReactNode;
  className?: string;
}

const SecurityLayout = ({ children, className }: SecurityLayoutProps) => {
  return (
    <div className={cn("space-y-8 font-size-responsive", className)}>
      {children}
    </div>
  );
};

export default SecurityLayout;
