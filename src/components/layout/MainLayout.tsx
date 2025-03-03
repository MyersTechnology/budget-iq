
import { ReactNode } from "react";
import Header from "./Header";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <div className="flex flex-1">
        {/* Content area with padding for desktop sidebar */}
        <main className="flex-1 md:pl-20 lg:pl-64">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
