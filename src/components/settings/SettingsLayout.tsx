
import React, { ReactNode, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";

interface SettingsLayoutProps {
  children: ReactNode;
  className?: string;
}

const SettingsLayout = ({ children, className }: SettingsLayoutProps) => {
  const { settings } = useSettings();
  
  // Apply settings at the component level
  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.darkMode);
    document.documentElement.classList.toggle('high-contrast', settings.highContrast);
    document.documentElement.dataset.fontSize = settings.fontSize;
  }, [settings.darkMode, settings.highContrast, settings.fontSize]);
  
  return (
    <div className={cn("space-y-8", className)}>
      {children}
    </div>
  );
};

export default SettingsLayout;
