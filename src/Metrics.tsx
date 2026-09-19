import { Box } from '@mui/material';
import {
  AccountBalanceWalletRounded,
  FolderRounded,
  GroupsRounded,
  TrendingUpRounded,
} from '@mui/icons-material';
import MetricCard from './MetricCard';

const metrics = [
  {
    label: 'Active projects',
    value: '15',
    detail: '3 due this month',
    icon: <FolderRounded aria-hidden="true" fontSize="small" />,
  },
  {
    label: 'On-time delivery',
    value: '91%',
    detail: 'Up 4 points',
    icon: <TrendingUpRounded aria-hidden="true" fontSize="small" />,
  },
  {
    label: 'Budget used',
    value: '68%',
    detail: '€482k of €710k',
    icon: <AccountBalanceWalletRounded aria-hidden="true" fontSize="small" />,
  },
  {
    label: 'Team capacity',
    value: '76%',
    detail: '27 contributors',
    icon: <GroupsRounded aria-hidden="true" fontSize="small" />,
  },
];

export default function Metrics() {
  return (
    <Box
      component="section"
      aria-label="Portfolio metrics"
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
        gap: 2,
        mt: 4,
      }}
    >
      {metrics.map((metric) => (
        <MetricCard key={metric.label} {...metric} />
      ))}
    </Box>
  );
}
