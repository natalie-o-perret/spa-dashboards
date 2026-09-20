import type { PropsWithChildren } from 'react';
import { Box, Stack, Typography, type PaletteMode } from '@mui/material';
import NavigationDrawers from './NavigationDrawers';
import TopBar from './TopBar';
import { useMobileNavigation } from './useMobileNavigation';

interface DashboardShellProps extends PropsWithChildren {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function DashboardShell({
  children,
  mode,
  onToggleMode,
}: DashboardShellProps) {
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
          <Box
            component="main"
            id="main-content"
            tabIndex={-1}
            sx={{
              width: '100%',
              maxWidth: 1440,
              mx: 'auto',
              px: { xs: 2, sm: 3, lg: 4 },
              pt: { xs: 4, md: 5 },
              pb: 4,
              outline: 0,
            }}
          >
            {children}
            <Stack
              component="footer"
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{
                justifyContent: 'space-between',
                mt: 4,
                pt: 2.5,
                borderTop: '1px solid',
                borderColor: 'divider',
                color: 'text.secondary',
              }}
            >
              <Typography sx={{ fontSize: '0.75rem' }}>
                Meridian / Portfolio operations
              </Typography>
              <Typography sx={{ fontSize: '0.75rem' }}>
                Static demo data / Updated 18 September 2026
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
