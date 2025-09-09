import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Search, Plus, BarChart3, PieChart, Activity, Shield } from 'lucide-react';
import { WIDGET_TEMPLATES, type WidgetTemplate, type Widget } from '@/types/widget';

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddWidget: (template: WidgetTemplate) => void;
  categories: string[];
}

const categoryIcons = {
  'CSPM Executive Dashboard': Shield,
  'CSPM Dashboard': BarChart3,
  'CWPP Dashboard': Activity,
  'Registry Scan': PieChart,
};

const typeLabels = {
  'donut-chart': 'Donut Chart',
  'progress-bar': 'Progress Bar',
  'metric-card': 'Metric Card',
  'line-chart': 'Line Chart',
};

export const AddWidgetModal = ({ isOpen, onClose, onAddWidget, categories }: AddWidgetModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTemplates = useMemo(() => {
    return WIDGET_TEMPLATES.filter(template => {
      const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          template.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleAddWidget = (template: WidgetTemplate) => {
    onAddWidget(template);
    onClose();
    setSearchTerm('');
    setSelectedCategory('all');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-4xl max-h-[90vh] bg-card border-border">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="text-xl font-semibold">Add Widget</DialogTitle>
          <div className="text-sm text-muted-foreground">
            Choose from available widgets to add to your dashboard
          </div>
        </DialogHeader>

        <div className="flex flex-col gap-4 overflow-hidden">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search widgets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-background border-border"
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-muted">
              <TabsTrigger value="all" className="text-sm">All</TabsTrigger>
              {categories.map((category) => {
                const Icon = categoryIcons[category as keyof typeof categoryIcons];
                return (
                  <TabsTrigger key={category} value={category} className="text-sm flex items-center gap-1">
                    {Icon && <Icon className="h-3 w-3" />}
                    <span className="hidden sm:inline">{category.split(' ')[0]}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-4 overflow-auto max-h-[50vh]">
              <TabsContent value={selectedCategory} className="space-y-4 mt-0">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-muted-foreground">No widgets found matching your criteria</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTemplates.map((template) => {
                      const Icon = categoryIcons[template.category as keyof typeof categoryIcons];
                      return (
                        <Card key={template.id} className="p-4 hover:shadow-card-lg transition-shadow cursor-pointer group">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {Icon && <Icon className="h-4 w-4 text-primary" />}
                              <Badge variant="secondary" className="text-xs">
                                {typeLabels[template.type]}
                              </Badge>
                            </div>
                          </div>
                          
                          <h4 className="font-medium text-sm mb-2 group-hover:text-primary transition-colors">
                            {template.name}
                          </h4>
                          
                          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                            {template.description}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">
                              {template.category.split(' ')[0]}
                            </Badge>
                            
                            <Button
                              size="sm"
                              onClick={() => handleAddWidget(template)}
                              className="h-7 px-3 text-xs"
                            >
                              <Plus className="h-3 w-3 mr-1" />
                              Add
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};