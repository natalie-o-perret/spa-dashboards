import type { RefObject } from 'react';
import type { ThemeMode } from './ThemeShell';
import {
  alpha,
  AppBar,
  Box,
  Button,
  Chip,
  IconButton,
  Toolbar,
  Tooltip,
} from '@mui/material';
import {
  ArrowBackRounded,
  AutoAwesomeRounded,
  MenuRounded,
} from '@mui/icons-material';
import TopBarActions from './TopBarActions';

interface TopBarProps {
  mode: ThemeMode;
  mobileOpen: boolean;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
  onMenu: () => void;
  onModeChange: (mode: ThemeMode) => void;
}

export default function TopBar(props: TopBarProps) {
  const { mode, mobileOpen, menuButtonRef, onMenu, onModeChange } = props;
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
        <Tooltip title="Compare all four dashboards">
          <Button
            component="a"
            href="../"
            size="small"
            color="inherit"
            startIcon={<ArrowBackRounded />}
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            All dashboards
          </Button>
        </Tooltip>
        <Tooltip title="Built with React and MUI">
          <Chip
            size="small"
            icon={<AutoAwesomeRounded />}
            label="React + MUI"
            sx={{
              display: { xs: 'none', sm: 'inline-flex' },
              flexShrink: 0,
              borderRadius: 1.5,
              color: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.primary.dark
                  : theme.palette.primary.main,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
              '& .MuiChip-icon': { color: 'inherit', fontSize: 14 },
            }}
          />
        </Tooltip>
        <Box sx={{ flexGrow: 1 }} />
        <TopBarActions mode={mode} onModeChange={onModeChange} />
      </Toolbar>
    </AppBar>
  );
}
