import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '@/components/ui/card';

interface DonutChartProps {
  data: Array<{
    name: string;
    value: number;
    fill: string;
  }>;
  title?: string;
  subtitle?: string;
  showPercentage?: boolean;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-card rounded-lg border shadow-card p-3">
        <p className="text-sm font-medium">{data.name}</p>
        <p className="text-sm text-muted-foreground">
          Value: <span className="font-semibold text-foreground">{data.value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mt-4">
      {payload?.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export const DonutChart = ({ data, title, subtitle, showPercentage = false }: DonutChartProps) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  return (
    <Card className="p-6 bg-widget-bg border-widget-border shadow-card">
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {showPercentage && (
        <div className="mt-4 flex justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">{total.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Items</div>
          </div>
        </div>
      )}
    </Card>
  );
};