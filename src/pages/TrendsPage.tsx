
import MainLayout from "@/components/layout/MainLayout";
import SpendingTrends from "@/components/trends/SpendingTrends";

const TrendsPage = () => {
  return (
    <MainLayout>
      <div className="w-full px-2 sm:px-4">
        <SpendingTrends />
      </div>
    </MainLayout>
  );
};

export default TrendsPage;
