
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
        {/* Content area with padding that adapts to sidebar state */}
        <main className="flex-1 p-4 md:pl-24 lg:pl-[272px]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
