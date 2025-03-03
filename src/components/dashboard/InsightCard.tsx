
import { useEffect, useState } from 'react';
import { AlertCircle, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Insight } from '@/utils/mockData';

interface InsightCardProps {
  insight: Insight;
  delay?: number;
}

const InsightCard = ({ insight, delay = 0 }: InsightCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  // Determine icon and color based on insight type
  const getIconAndColor = () => {
    switch (insight.type) {
      case 'warning':
        return {
          icon: <AlertTriangle className="h-5 w-5" />,
          color: 'text-budget-orange bg-budget-orange/10'
        };
      case 'savings':
        return {
          icon: <CheckCircle2 className="h-5 w-5" />,
          color: 'text-budget-green bg-budget-green/10'
        };
      case 'info':
      default:
        return {
          icon: <AlertCircle className="h-5 w-5" />,
          color: 'text-budget-blue bg-budget-blue/10'
        };
    }
  };
  
  const { icon, color } = getIconAndColor();
  
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-500 ease-out border border-border/50 card-shadow",
        isVisible 
          ? "opacity-100 transform translate-y-0" 
          : "opacity-0 transform translate-y-8"
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("rounded-full p-2 mt-0.5", color)}>
            {icon}
          </div>
          
          <div className="flex-1">
            <h3 className="font-medium text-base leading-none mb-2">{insight.title}</h3>
            <p className="text-muted-foreground text-sm">{insight.description}</p>
            
            {insight.action && (
              <Button 
                variant="link" 
                className="px-0 h-8 font-medium -ml-3 mt-1" 
              >
                {insight.action}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;
