
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface AppLayoutProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const AppLayout = ({ children, className, contentClassName }: AppLayoutProps) => {
  return (
    <div className="h-full flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col md:pl-[70px] transition-all duration-300">
        <Header />
        
        <main className={cn("flex-1 w-full", className)}>
          <div className={cn("container max-w-[1200px] p-6", contentClassName)}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
