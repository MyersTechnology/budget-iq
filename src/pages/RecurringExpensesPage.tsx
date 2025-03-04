
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from "@/components/ui/use-toast";
import RecurringHeader from '@/components/recurring/RecurringHeader';
import RecurringSummary from '@/components/recurring/RecurringSummary';
import RecurringList from '@/components/recurring/RecurringList';
import RecurringInsights from '@/components/recurring/RecurringInsights';
import RecurringCalendar from '@/components/recurring/RecurringCalendar';
import { useRecurringData } from '@/hooks/useRecurringData';
import { RecurringCategory } from '@/types/recurring';

const RecurringExpensesPage = () => {
  const { 
    recurringItems, 
    categories, 
    insights, 
    isLoading, 
    monthlyTotal,
    yearlyTotal,
    budgetPercentage,
    upcomingPayments,
    toggleItemTracking,
    updateItemCategory,
    dismissInsight
  } = useRecurringData();
  
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'list' | 'calendar'>('list');

  const handleToggleTracking = (itemId: string, tracked: boolean) => {
    toggleItemTracking(itemId, tracked);
    toast({
      title: tracked ? "Tracking resumed" : "Tracking paused",
      description: `${tracked ? "Now tracking" : "Paused tracking for"} this subscription.`
    });
  };

  const handleUpdateCategory = (itemId: string, category: string) => {
    // Cast the string to RecurringCategory type
    updateItemCategory(itemId, category as RecurringCategory);
    toast({
      title: "Category updated",
      description: "The subscription category has been updated."
    });
  };

  const handleDismissInsight = (insightId: string) => {
    dismissInsight(insightId);
    toast({
      title: "Insight dismissed",
      description: "This insight won't be shown again."
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 py-6 animate-fade-in max-h-screen overflow-auto">
        <RecurringHeader 
          monthlyTotal={monthlyTotal} 
          yearlyTotal={yearlyTotal}
          budgetPercentage={budgetPercentage}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className={activeTab === 'list' ? 'block' : 'hidden'}>
              <RecurringList 
                items={recurringItems}
                categories={categories}
                isLoading={isLoading}
                onToggleTracking={handleToggleTracking}
                onUpdateCategory={handleUpdateCategory}
              />
            </div>
            
            <div className={activeTab === 'calendar' ? 'block' : 'hidden'}>
              <RecurringCalendar 
                upcomingPayments={upcomingPayments}
                isLoading={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-6">
            <RecurringSummary 
              monthlyTotal={monthlyTotal}
              yearlyTotal={yearlyTotal}
              budgetPercentage={budgetPercentage}
              categories={categories}
              isLoading={isLoading}
            />
            
            <RecurringInsights 
              insights={insights}
              onDismiss={handleDismissInsight}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RecurringExpensesPage;
