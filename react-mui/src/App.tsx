import { Box } from '@mui/material';
import type { ThemeMode } from './shell/ThemeShell';
import PortfolioOverview from './features/portfolio/PortfolioOverview';
import ProjectsTable from './features/projects/ProjectsTable';
import DashboardShell from './shell/DashboardShell';

export interface AppProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

export default function App({ mode, onModeChange }: AppProps) {
  return (
    <DashboardShell mode={mode} onModeChange={onModeChange}>
      <PortfolioOverview />
      <Box sx={{ mt: 2 }}>
        <ProjectsTable />
      </Box>
    </DashboardShell>
  );
}
