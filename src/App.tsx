import { Box } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import PortfolioOverview from './features/portfolio/PortfolioOverview';
import ProjectsTable from './features/projects/ProjectsTable';
import DashboardShell from './shell/DashboardShell';

export interface AppProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function App({ mode, onToggleMode }: AppProps) {
  return (
    <DashboardShell mode={mode} onToggleMode={onToggleMode}>
      <PortfolioOverview />
      <Box sx={{ mt: 2 }}>
        <ProjectsTable />
      </Box>
    </DashboardShell>
  );
}
