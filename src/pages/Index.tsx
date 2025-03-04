
import Dashboard from "@/components/dashboard/Dashboard";
import MainLayout from "@/components/layout/MainLayout";

const Index = () => {
  return (
    <MainLayout>
      <div className="w-full px-2 sm:px-4">
        <Dashboard />
      </div>
    </MainLayout>
  );
};

export default Index;
