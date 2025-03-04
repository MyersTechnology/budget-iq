
import MainLayout from "@/components/layout/MainLayout";
import BudgetRecommendations from "@/components/budget/BudgetRecommendations";

const BudgetPage = () => {
  return (
    <MainLayout>
      <div className="w-full px-2 sm:px-4">
        <BudgetRecommendations />
      </div>
    </MainLayout>
  );
};

export default BudgetPage;
