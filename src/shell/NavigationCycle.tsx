import { Box, Chip, Typography } from '@mui/material';

export default function NavigationCycle() {
  return (
    <Box sx={{ mt: 'auto', p: 2.5 }}>
      <Box
        component="aside"
        aria-label="Current portfolio cycle"
        sx={{
          p: 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          bgcolor: 'action.hover',
        }}
      >
        <Chip
          label="Cycle 18"
          size="small"
          sx={{ bgcolor: 'action.selected', color: 'primary.main' }}
        />
        <Typography sx={{ mt: 1.25, fontSize: '0.8rem', fontWeight: 750 }}>
          Weekly portfolio review
        </Typography>
        <Typography
          sx={{ mt: 0.35, color: 'text.secondary', fontSize: '0.75rem' }}
        >
          Friday, 18 September
        </Typography>
      </Box>
    </Box>
  );
}
