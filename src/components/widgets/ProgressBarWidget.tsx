import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProgressBarData {
  name: string;
  value: number;
  max?: number;
  color?: string;
}

interface ProgressBarWidgetProps {
  data: ProgressBarData[];
  title?: string;
}

export const ProgressBarWidget = ({ data, title }: ProgressBarWidgetProps) => {
  return (
    <Card className="p-6 bg-widget-bg border-widget-border shadow-card">
      {title && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
      )}
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = item.max ? Math.round((item.value / item.max) * 100) : item.value;
          const maxValue = item.max || 100;
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  {item.value}{item.max ? `/${maxValue}` : '%'}
                </span>
              </div>
              <div className="relative">
                <Progress 
                  value={percentage} 
                  className="h-3 bg-muted"
                />
                <div 
                  className="absolute top-0 left-0 h-3 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${Math.min(percentage, 100)}%`,
                    backgroundColor: item.color || 'hsl(var(--primary))'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 pt-4 border-t border-widget-border">
        <div className="text-xs text-muted-foreground text-center">
          Total: {data.reduce((sum, item) => sum + item.value, 0)} items
        </div>
      </div>
    </Card>
  );
};