
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InsightCard from '@/components/dashboard/InsightCard';
import { Insight } from '@/utils/mockData';
import { Lightbulb } from 'lucide-react';

interface TrendsInsightsProps {
  insights: Insight[];
}

// Enhanced insights for the trends page
const trendInsights: Insight[] = [
  { 
    id: 'trend1', 
    title: 'Weekend spending pattern detected', 
    description: 'You typically spend 45% more on weekends compared to weekdays, primarily on dining and entertainment.', 
    type: 'info'
  },
  { 
    id: 'trend2', 
    title: 'Monthly expense spike identified', 
    description: 'Your spending typically increases during the first week of each month by an average of 28%.', 
    type: 'warning',
    action: 'View Details'
  },
  { 
    id: 'trend3', 
    title: 'Potential savings opportunity', 
    description: 'Setting a $50 weekly limit on coffee purchases could save you approximately $86 per month.', 
    type: 'savings',
    action: 'Create Budget Rule'
  },
  { 
    id: 'trend4', 
    title: 'Category growth detected', 
    description: 'Your "Shopping" category has grown consistently by 8-12% each month for the past 3 months.', 
    type: 'warning',
    action: 'Analyze Category'
  },
];

const TrendsInsights = ({ insights }: TrendsInsightsProps) => {
  // Combine original insights with trend-specific insights
  const combinedInsights = [...trendInsights, ...insights].slice(0, 4);
  
  return (
    <Card className="border border-border/50 card-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-budget-orange" />
          <CardTitle>AI-Powered Spending Insights</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {combinedInsights.map((insight, index) => (
            <InsightCard 
              key={insight.id} 
              insight={insight} 
              delay={index * 100}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsInsights;
