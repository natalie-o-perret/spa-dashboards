import { Box } from '@mui/material';
import type { PaletteMode } from '@mui/material';
import DashboardContent from './DashboardContent';
import NavigationDrawers from './NavigationDrawers';
import TopBar from './TopBar';
import { useMobileNavigation } from './useMobileNavigation';

export interface AppProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function App({ mode, onToggleMode }: AppProps) {
  const navigation = useMobileNavigation();

  return (
    <>
      <Box
        component="a"
        className="skip-link"
        href="#main-content"
        sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
      >
        Skip to dashboard content
      </Box>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <NavigationDrawers {...navigation} />
        <Box sx={{ minWidth: 0, flexGrow: 1 }}>
          <TopBar
            mode={mode}
            mobileOpen={navigation.mobileOpen}
            menuButtonRef={navigation.menuButtonRef}
            onMenu={() => navigation.setMobileOpen(true)}
            onToggleMode={onToggleMode}
          />
          <DashboardContent />
        </Box>
      </Box>
    </>
  );
}
