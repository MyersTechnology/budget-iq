
import { BarChart3, LineChart as LineChartIcon, AreaChart as AreaChartIcon, ChevronDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ChartTypeSelectorProps {
  chartType: 'line' | 'area' | 'bar';
  setChartType: (type: 'line' | 'area' | 'bar') => void;
}

const ChartTypeSelector = ({ chartType, setChartType }: ChartTypeSelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1">
          {chartType === 'line' ? <LineChartIcon className="h-4 w-4" /> : 
           chartType === 'area' ? <AreaChartIcon className="h-4 w-4" /> : 
           <BarChart3 className="h-4 w-4" />}
          <span>Chart Type</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setChartType('line')} className="gap-2">
          <LineChartIcon className="h-4 w-4" />
          <span>Line Chart</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setChartType('area')} className="gap-2">
          <AreaChartIcon className="h-4 w-4" />
          <span>Area Chart</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setChartType('bar')} className="gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Bar Chart</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChartTypeSelector;
