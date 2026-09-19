import { Box, Stack, Typography } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import DeliveryTrend from './DeliveryTrend';
import Metrics from './Metrics';
import ProjectsTable from './ProjectsTable';
import TeamCapacity from './TeamCapacity';

export default function DashboardContent() {
  return (
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
      <DashboardHeader />
      <Metrics />
      <Box
        id="analytics"
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'minmax(0, 1fr)',
            lg: 'minmax(0, 2fr) minmax(280px, 1fr)',
          },
          gap: 2,
          mt: 2,
        }}
      >
        <DeliveryTrend />
        <TeamCapacity />
      </Box>
      <Box sx={{ mt: 2 }}>
        <ProjectsTable />
      </Box>
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
  );
}
