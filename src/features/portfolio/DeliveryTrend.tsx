import { Box, Card, Stack, Typography } from '@mui/material';
import DeliveryChart from './DeliveryChart';

export default function DeliveryTrend() {
  return (
    <Card
      component="section"
      aria-labelledby="delivery-title"
      sx={{ height: '100%', p: { xs: 2.5, sm: 3 } }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="overline" color="text.secondary">
            Analytics
          </Typography>
          <Typography id="delivery-title" component="h2" variant="h2">
            Delivery trend
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Typography
            sx={{
              color: 'primary.main',
              fontSize: '2rem',
              fontWeight: 780,
              lineHeight: 1,
              letterSpacing: '-0.04em',
            }}
          >
            91%
          </Typography>
          <Typography
            sx={{ mt: 0.65, color: 'text.secondary', fontSize: '0.75rem' }}
          >
            On-time delivery
          </Typography>
        </Box>
      </Stack>
      <DeliveryChart />
    </Card>
  );
}
