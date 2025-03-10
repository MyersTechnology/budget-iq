
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";
import NavigationMenu from "./NavigationMenu";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const AppLayout = ({ children, className, contentClassName }: AppLayoutProps) => {
  return (
    <div className="h-full flex w-full">
      <NavigationMenu isOpen={false} onClose={() => {}} />
      
      <div className="flex-1 flex flex-col transition-all duration-300">
        <Header />
        
        <main className={cn("flex-1 w-full pt-24", className)}>
          <div className={cn("container max-w-[1200px] px-6 py-8", contentClassName)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

