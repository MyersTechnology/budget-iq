
import Dashboard from "@/components/dashboard/Dashboard";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default Index;
