import type { ReactNode } from 'react';
import { Box, Card, Stack, Typography } from '@mui/material';

interface MetricCardProps {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
}

export default function MetricCard(props: MetricCardProps) {
  const { label, value, detail, icon } = props;
  return (
    <Card component="article" sx={{ p: { xs: 2, sm: 2.5 } }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Typography
          component="p"
          sx={{
            color: 'text.secondary',
            fontSize: '0.8125rem',
            fontWeight: 650,
          }}
        >
          {label}
        </Typography>
        <Box
          aria-hidden="true"
          sx={{
            display: 'grid',
            width: 32,
            height: 32,
            flexShrink: 0,
            placeItems: 'center',
            borderRadius: 2,
            bgcolor: 'action.selected',
            color: 'primary.main',
          }}
        >
          {icon}
        </Box>
      </Stack>
      <Typography
        component="p"
        sx={{
          mt: 1.25,
          fontSize: { xs: '1.85rem', sm: '2.15rem' },
          fontWeight: 780,
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        {value}
      </Typography>
      <Typography
        component="p"
        sx={{ mt: 1.25, color: 'text.secondary', fontSize: '0.8125rem' }}
      >
        {detail}
      </Typography>
    </Card>
  );
}
