
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface BudgetSummaryProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  subtitle: string;
}

const BudgetSummary = ({ 
  title, 
  amount, 
  icon: Icon, 
  iconColor, 
  iconBgColor, 
  subtitle 
}: BudgetSummaryProps) => {
  return (
    <Card className="border border-border/50 shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h2 className="text-2xl font-bold mt-2">
              <AnimatedNumber value={amount} />
            </h2>
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          </div>
          <div className={`${iconBgColor} p-2.5 rounded-full`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetSummary;
