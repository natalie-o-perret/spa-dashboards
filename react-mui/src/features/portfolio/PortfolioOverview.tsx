import { Box } from '@mui/material';
import DashboardHeader from './DashboardHeader';
import DeliveryTrend from './DeliveryTrend';
import Metrics from './Metrics';
import TeamCapacity from './TeamCapacity';

export default function PortfolioOverview() {
  return (
    <>
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
    </>
  );
}
