
import MainLayout from "@/components/layout/MainLayout";
import SpendingTrends from "@/components/trends/SpendingTrends";

const TrendsPage = () => {
  return (
    <MainLayout>
      <div className="w-full">
        <SpendingTrends />
      </div>
    </MainLayout>
  );
};

export default TrendsPage;
