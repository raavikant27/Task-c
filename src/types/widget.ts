export interface Widget {
  id: string;
  name: string;
  type: 'donut-chart' | 'progress-bar' | 'metric-card' | 'line-chart';
  category: 'CSPM Executive Dashboard' | 'CSPM Dashboard' | 'CWPP Dashboard' | 'Registry Scan';
  data: any;
  config?: {
    title?: string;
    subtitle?: string;
    color?: string;
    showPercentage?: boolean;
    height?: number;
  };
}

export interface DashboardState {
  widgets: Widget[];
  categories: string[];
}

export interface WidgetTemplate {
  id: string;
  name: string;
  type: Widget['type'];
  category: Widget['category'];
  description: string;
  defaultData: any;
  defaultConfig?: Widget['config'];
}

// Predefined widget templates
export const WIDGET_TEMPLATES: WidgetTemplate[] = [
  // CSPM Executive Dashboard
  {
    id: 'cspm-exec-overview',
    name: 'Cloud Accounts Risk Assessment',
    type: 'donut-chart',
    category: 'CSPM Executive Dashboard',
    description: 'Overview of cloud account security risks',
    defaultData: [
      { name: 'Failed', value: 1689, fill: 'hsl(var(--danger))' },
      { name: 'Warning', value: 681, fill: 'hsl(var(--warning))' },
      { name: 'Not Available', value: 36, fill: 'hsl(var(--muted))' },
      { name: 'Passed', value: 7253, fill: 'hsl(var(--success))' }
    ],
    defaultConfig: {
      title: 'Cloud Accounts Risk Assessment',
      subtitle: '9659 Total',
      showPercentage: true
    }
  },
  {
    id: 'cspm-exec-security-issues',
    name: 'Top 5 Namespace Specific Alerts',
    type: 'progress-bar',
    category: 'CSPM Executive Dashboard',
    description: 'Top security issues by namespace',
    defaultData: [
      { name: 'workload-security', value: 84, max: 100, color: 'hsl(var(--danger))' },
      { name: 'kube-system', value: 72, max: 100, color: 'hsl(var(--warning))' },
      { name: 'kube-public', value: 56, max: 100, color: 'hsl(var(--info))' },
      { name: 'default', value: 34, max: 100, color: 'hsl(var(--success))' }
    ],
    defaultConfig: {
      title: 'Top 5 Namespace Specific Alerts'
    }
  },

  // CSPM Dashboard
  {
    id: 'cspm-cloud-accounts',
    name: 'Cloud Accounts',
    type: 'donut-chart',
    category: 'CSPM Dashboard',
    description: 'Cloud accounts status distribution',
    defaultData: [
      { name: 'Connected', value: 2, fill: 'hsl(var(--success))' },
      { name: 'Not Connected', value: 2, fill: 'hsl(var(--danger))' }
    ],
    defaultConfig: {
      title: 'Cloud Accounts',
      subtitle: '4 Total',
      showPercentage: false
    }
  },
  {
    id: 'cspm-risk-assessment',
    name: 'Cloud Account Risk Assessment',
    type: 'donut-chart',
    category: 'CSPM Dashboard',
    description: 'Detailed risk assessment for cloud accounts',
    defaultData: [
      { name: 'High', value: 589, fill: 'hsl(var(--danger))' },
      { name: 'Critical', value: 470, fill: 'hsl(var(--chart-4))' },
      { name: 'Medium', value: 681, fill: 'hsl(var(--warning))' },
      { name: 'Low', value: 7253, fill: 'hsl(var(--success))' }
    ],
    defaultConfig: {
      title: 'Cloud Account Risk Assessment',
      subtitle: '8993 Total'
    }
  },

  // CWPP Dashboard
  {
    id: 'cwpp-namespace-alerts',
    name: 'Top 5 Namespace Specific Alerts',
    type: 'progress-bar',
    category: 'CWPP Dashboard',
    description: 'Workload protection alerts by namespace',
    defaultData: [
      { name: 'Critical', value: 15, max: 50 },
      { name: 'High', value: 12, max: 50 },
      { name: 'Medium', value: 8, max: 50 },
      { name: 'Low', value: 5, max: 50 }
    ],
    defaultConfig: {
      title: 'Top 5 Namespace Specific Alerts'
    }
  },
  {
    id: 'cwpp-workload-alerts',
    name: 'Workload Alerts',
    type: 'progress-bar',
    category: 'CWPP Dashboard',
    description: 'Critical workload security alerts',
    defaultData: [
      { name: 'Pod Security', value: 18, max: 25 },
      { name: 'Network Policy', value: 12, max: 25 },
      { name: 'Resource Limits', value: 9, max: 25 }
    ],
    defaultConfig: {
      title: 'Workload Alerts'
    }
  },

  // Registry Scan
  {
    id: 'registry-vulnerabilities',
    name: 'Image Risk Assessment',
    type: 'donut-chart',
    category: 'Registry Scan',
    description: 'Container image vulnerability assessment',
    defaultData: [
      { name: 'Critical', value: 9, fill: 'hsl(var(--danger))' },
      { name: 'High', value: 150, fill: 'hsl(var(--chart-4))' },
      { name: 'Medium', value: 299, fill: 'hsl(var(--warning))' },
      { name: 'Low', value: 542, fill: 'hsl(var(--success))' }
    ],
    defaultConfig: {
      title: 'Image Risk Assessment',
      subtitle: '1000 Total Images'
    }
  },
  {
    id: 'registry-scan-history',
    name: 'Image Security Issues',
    type: 'progress-bar',
    category: 'Registry Scan',
    description: 'Recent security scan results',
    defaultData: [
      { name: 'Critical Vulnerabilities', value: 9, max: 100, color: 'hsl(var(--danger))' },
      { name: 'High Risk Issues', value: 150, max: 500, color: 'hsl(var(--warning))' },
      { name: 'Medium Risk Issues', value: 299, max: 500, color: 'hsl(var(--info))' },
      { name: 'Low Risk Issues', value: 542, max: 600, color: 'hsl(var(--success))' }
    ],
    defaultConfig: {
      title: 'Image Security Issues'
    }
  }
];