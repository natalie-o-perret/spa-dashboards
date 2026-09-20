import type { RefObject } from 'react';
import type { PaletteMode } from '@mui/material';
import {
  alpha,
  AppBar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import { MenuRounded } from '@mui/icons-material';
import TopBarActions from './TopBarActions';

interface TopBarProps {
  mode: PaletteMode;
  mobileOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onMenu: () => void;
  onToggleMode: () => void;
}

export default function TopBar(props: TopBarProps) {
  const { mode, mobileOpen, menuButtonRef, onMenu, onToggleMode } = props;
  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: (theme) => alpha(theme.palette.background.paper, 0.92),
        backdropFilter: 'blur(14px)',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '72px !important',
          gap: { xs: 0.75, sm: 1.5 },
          px: { xs: 1.5, sm: 3 },
        }}
      >
        <Tooltip title="Open navigation">
          <IconButton
            ref={menuButtonRef}
            edge="start"
            onClick={onMenu}
            aria-label="Open navigation"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            sx={{ display: { md: 'none' } }}
          >
            <MenuRounded />
          </IconButton>
        </Tooltip>
        <Stack spacing={0} sx={{ minWidth: 0, alignItems: 'flex-start' }}>
          <Typography
            noWrap
            sx={{
              display: { xs: 'none', sm: 'block' },
              color: 'text.secondary',
              fontSize: '0.625rem',
              lineHeight: 1.25,
            }}
          >
            Friday, 18 September
          </Typography>
          <Typography
            noWrap
            sx={{
              mt: { xs: 0, sm: 0.25 },
              fontSize: { xs: '0.8125rem', sm: '0.875rem' },
              fontWeight: 750,
            }}
          >
            Portfolio overview
          </Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <TopBarActions mode={mode} onToggleMode={onToggleMode} />
      </Toolbar>
    </AppBar>
  );
}
