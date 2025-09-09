import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Search, Filter, Settings } from 'lucide-react';
import { DonutChart } from '@/components/widgets/DonutChart';
import { ProgressBarWidget } from '@/components/widgets/ProgressBarWidget';
import { AddWidgetModal } from '@/components/AddWidgetModal';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { WIDGET_TEMPLATES, type Widget, type WidgetTemplate } from '@/types/widget';

const CATEGORIES = [
  'CSPM Executive Dashboard',
  'CSPM Dashboard', 
  'CWPP Dashboard',
  'Registry Scan'
];

// Initialize with some default widgets
const DEFAULT_WIDGETS: Widget[] = [
  {
    id: 'default-1',
    name: 'Cloud Accounts Risk Assessment',
    type: 'donut-chart',
    category: 'CSPM Executive Dashboard',
    data: [
      { name: 'Failed', value: 1689, fill: 'hsl(var(--danger))' },
      { name: 'Warning', value: 681, fill: 'hsl(var(--warning))' },
      { name: 'Not Available', value: 36, fill: 'hsl(var(--muted))' },
      { name: 'Passed', value: 7253, fill: 'hsl(var(--success))' }
    ],
    config: {
      title: 'Cloud Accounts Risk Assessment',
      subtitle: '9659 Total',
      showPercentage: true
    }
  },
  {
    id: 'default-2',
    name: 'Cloud Account Risk Assessment',
    type: 'donut-chart',
    category: 'CSPM Dashboard',
    data: [
      { name: 'High', value: 589, fill: 'hsl(var(--danger))' },
      { name: 'Critical', value: 470, fill: 'hsl(var(--chart-4))' },
      { name: 'Medium', value: 681, fill: 'hsl(var(--warning))' },
      { name: 'Low', value: 7253, fill: 'hsl(var(--success))' }
    ],
    config: {
      title: 'Cloud Account Risk Assessment',
      subtitle: '8993 Total'
    }
  },
  {
    id: 'default-3',
    name: 'Top 5 Namespace Specific Alerts',
    type: 'progress-bar',
    category: 'CWPP Dashboard',
    data: [
      { name: 'workload-security', value: 84, max: 100, color: 'hsl(var(--danger))' },
      { name: 'kube-system', value: 72, max: 100, color: 'hsl(var(--warning))' },
      { name: 'kube-public', value: 56, max: 100, color: 'hsl(var(--info))' },
      { name: 'default', value: 34, max: 100, color: 'hsl(var(--success))' }
    ],
    config: {
      title: 'Top 5 Namespace Specific Alerts'
    }
  },
  {
    id: 'default-4',
    name: 'Image Security Issues',
    type: 'progress-bar',
    category: 'Registry Scan',
    data: [
      { name: 'Critical Vulnerabilities', value: 9, max: 100, color: 'hsl(var(--danger))' },
      { name: 'High Risk Issues', value: 150, max: 500, color: 'hsl(var(--warning))' },
      { name: 'Medium Risk Issues', value: 299, max: 500, color: 'hsl(var(--info))' },
      { name: 'Low Risk Issues', value: 542, max: 600, color: 'hsl(var(--success))' }
    ],
    config: {
      title: 'Image Security Issues'
    }
  }
];

export const Dashboard = () => {
  const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const handleAddWidget = useCallback((template: WidgetTemplate) => {
    const newWidget: Widget = {
      id: `widget-${Date.now()}`,
      name: template.name,
      type: template.type,
      category: template.category,
      data: template.defaultData,
      config: template.defaultConfig
    };
    setWidgets(prev => [...prev, newWidget]);
  }, []);

  const handleRemoveWidget = useCallback((widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  }, []);

  const filteredWidgets = widgets.filter(widget => {
    const matchesSearch = widget.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || widget.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderWidget = (widget: Widget) => {
    switch (widget.type) {
      case 'donut-chart':
        return (
          <DonutChart
            data={widget.data}
            title={widget.config?.title}
            subtitle={widget.config?.subtitle}
            showPercentage={widget.config?.showPercentage}
          />
        );
      case 'progress-bar':
        return (
          <ProgressBarWidget
            data={widget.data}
            title={widget.config?.title}
          />
        );
      default:
        return <div>Widget type not supported</div>;
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-sidebar-bg border-b border-border shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Cloud Native Application Protection Platform (CNAPP) Dashboard
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-primary hover:bg-primary-hover text-primary-foreground"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Widget
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="px-6 py-4 bg-sidebar-bg border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search widgets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-background border-border"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-[200px] bg-background border-border">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary-light text-primary">
              {filteredWidgets.length} Widgets
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        {filteredWidgets.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="text-muted-foreground mb-4">
                {searchTerm || selectedCategory !== 'all' 
                  ? 'No widgets match your current filters'
                  : 'No widgets available'
                }
              </div>
              <Button
                onClick={() => setIsAddModalOpen(true)}
                variant="outline"
                className="border-primary text-primary hover:bg-primary-light"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Widget
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWidgets.map((widget) => (
              <div key={widget.id} className="relative group">
                <div className="absolute -top-2 -right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleRemoveWidget(widget.id)}
                    className="h-8 w-8 rounded-full p-0 shadow-lg"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="relative">
                  {renderWidget(widget)}
                  
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="text-xs bg-background/80 backdrop-blur">
                      {widget.category.split(' ')[0]}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Add Widget Modal */}
      <AddWidgetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddWidget={handleAddWidget}
        categories={CATEGORIES}
      />
    </div>
  );
};