import { Box, Chip, Stack, Typography } from '@mui/material';
import { MonitorHeartRounded } from '@mui/icons-material';

export default function DashboardHeader() {
  return (
    <Stack
      component="header"
      id="overview"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2.5}
      sx={{
        alignItems: { xs: 'flex-start', sm: 'flex-end' },
        justifyContent: 'space-between',
      }}
    >
      <Box>
        <Typography variant="overline" color="primary.main">
          Cycle 18 / Weekly review
        </Typography>
        <Typography component="h1" variant="h1" sx={{ mt: 1 }}>
          Portfolio overview
        </Typography>
        <Typography
          sx={{
            maxWidth: 650,
            mt: 1.5,
            color: 'text.secondary',
            fontSize: { xs: '0.95rem', sm: '1rem' },
          }}
        >
          Track delivery, capacity, and risk across every active project.
        </Typography>
      </Box>
      <Chip
        icon={<MonitorHeartRounded />}
        label="15 active / 3 need attention"
        color="primary"
        variant="outlined"
        sx={{ bgcolor: 'background.paper' }}
      />
    </Stack>
  );
}
