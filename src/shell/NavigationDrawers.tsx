import { Box, Drawer } from '@mui/material';
import type { RefObject } from 'react';
import Navigation from './Navigation';

const drawerWidth = 252;

interface NavigationDrawersProps {
  mobileOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  closeMobileNavigation: () => void;
  restoreMenuFocus: () => void;
}

export default function NavigationDrawers({
  mobileOpen,
  closeMobileNavigation,
  restoreMenuFocus,
}: NavigationDrawersProps) {
  return (
    <Box
      component="aside"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Navigation />
      </Drawer>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={closeMobileNavigation}
        ModalProps={{ keepMounted: true, disableRestoreFocus: true }}
        slotProps={{
          paper: { id: 'mobile-navigation', 'aria-label': 'Mobile navigation' },
          transition: { onExited: restoreMenuFocus },
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: Math.min(drawerWidth + 28, 300) },
        }}
      >
        <Navigation
          onNavigate={closeMobileNavigation}
          onClose={closeMobileNavigation}
        />
      </Drawer>
    </Box>
  );
}
