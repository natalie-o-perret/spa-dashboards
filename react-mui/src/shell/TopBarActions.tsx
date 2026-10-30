import type { ThemeMode } from './ThemeShell';
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import {
  DarkModeRounded,
  GitHub,
  LightModeRounded,
  MonitorRounded,
} from '@mui/icons-material';

const choices = [
  {
    value: 'light',
    label: 'Light',
    icon: <LightModeRounded fontSize="small" />,
  },
  { value: 'dark', label: 'Dark', icon: <DarkModeRounded fontSize="small" /> },
  {
    value: 'system',
    label: 'System',
    icon: <MonitorRounded fontSize="small" />,
  },
] as const;

interface TopBarActionsProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

export default function TopBarActions({
  mode,
  onModeChange,
}: TopBarActionsProps) {
  const current = choices.find((choice) => choice.value === mode)!;
  const next = choices[(choices.indexOf(current) + 1) % choices.length]!;
  const themeActionLabel = `Theme: ${current.label}. Switch to ${next.label.toLowerCase()} theme`;
  return (
    <>
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          display: { xs: 'none', md: 'flex' },
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
      <Tooltip title={themeActionLabel}>
        <IconButton
          onClick={() => onModeChange(next.value)}
          aria-label={themeActionLabel}
        >
          {current.icon}
        </IconButton>
      </Tooltip>
      <Tooltip title="Demo workspace: Maya Chen">
        <Avatar
          aria-label="Signed in as Maya Chen"
          sx={{
            display: { xs: 'none', sm: 'flex' },
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
      </Tooltip>
    </>
  );
}
