import type { PaletteMode } from '@mui/material';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { DarkModeRounded, GitHub, LightModeRounded } from '@mui/icons-material';

interface TopBarActionsProps {
  mode: PaletteMode;
  onToggleMode: () => void;
}

export default function TopBarActions({
  mode,
  onToggleMode,
}: TopBarActionsProps) {
  const nextMode = mode === 'light' ? 'dark' : 'light';
  return (
    <>
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          display: { xs: 'none', sm: 'flex' },
          alignItems: 'center',
          color: 'text.secondary',
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'success.main',
          }}
        />
        <Typography sx={{ fontSize: '0.75rem', whiteSpace: 'nowrap' }}>
          Last synced 8 min ago
        </Typography>
      </Stack>
      <Tooltip title="View source on GitHub">
        <IconButton
          component="a"
          href="https://github.com/natalie-o-perret/spa-dashboards/tree/main/react-mui"
          target="_blank"
          rel="noreferrer"
          aria-label="View React MUI source on GitHub"
        >
          <GitHub />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Use ${nextMode} theme`}>
        <IconButton onClick={onToggleMode} aria-label={`Use ${nextMode} theme`}>
          {mode === 'light' ? <DarkModeRounded /> : <LightModeRounded />}
        </IconButton>
      </Tooltip>
      <Avatar
        aria-label="Signed in as Maya Chen"
        sx={{
          width: 36,
          height: 36,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: '0.78rem',
          fontWeight: 800,
        }}
      >
        MC
      </Avatar>
    </>
  );
}
