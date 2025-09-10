# CNAPP Dashboard

A comprehensive security dashboard for cloud-native applications built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Dynamic Widget Management**: Add and remove widgets dynamically
- **Category-based Organization**: Widgets organized by CSPM, CWPP, Image, and Ticket categories
- **Interactive Charts**: Beautiful donut and bar charts using Recharts
- **Local Storage**: Persist dashboard configuration locally
- **Search Functionality**: Search through available widgets
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Theme**: Modern dark theme with beautiful colors and animations

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful component library
- **Recharts** - Interactive charts and visualizations
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

## Quick Start

### Prerequisites

- Node.js 16+ and npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/
│   ├── charts/          # Chart components
│   ├── dashboard/       # Dashboard-specific components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── types/              # TypeScript type definitions
└── lib/                # Utility functions
```

## Dashboard Features

### Widget Categories

- **CSPM** - Cloud Security Posture Management
- **CWPP** - Cloud Workload Protection Platform  
- **Image** - Container image security scanning
- **Ticket** - Security tickets and alerts

### Widget Types

- **Donut Charts** - For displaying proportional data
- **Bar Charts** - For displaying comparative data
- **Metrics** - For displaying key performance indicators

### Functionality

1. **Add Widgets** - Click "Add Widget" to open the widget selection modal
2. **Remove Widgets** - Hover over a widget and click the X button to remove
3. **Search Widgets** - Use the search bar in the add widget modal
4. **Persistent State** - Dashboard configuration is saved locally

## Customization

### Adding New Widget Types

1. Define the widget type in `src/types/dashboard.ts`
2. Create the chart component in `src/components/charts/`
3. Add the widget to the `DEFAULT_WIDGETS` array
4. Update the `DashboardWidget` component to render the new type

### Styling

The project uses a design system defined in:
- `src/index.css` - CSS variables and design tokens
- `tailwind.config.ts` - Tailwind configuration

### Adding New Categories

Update the `WIDGET_CATEGORIES` array in `src/types/dashboard.ts`

## Deployment

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Deploy to Lovable

1. Open your Lovable project
2. Click "Publish" in the top right
3. Your app will be deployed automatically

## GitHub Integration

This project is connected to GitHub for version control and collaboration:

1. **Automatic Sync** - Changes in Lovable sync to GitHub automatically
2. **Local Development** - Clone and develop locally, push changes to sync back
3. **Collaboration** - Use GitHub for team collaboration and code reviews

