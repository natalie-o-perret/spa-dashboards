import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';

export default function NavigationBrand({ onClose }: { onClose?: () => void }) {
  return (
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ alignItems: 'center', px: 2.5, py: 2.75 }}
    >
      <Box
        aria-hidden="true"
        sx={{
          display: 'grid',
          width: 38,
          height: 38,
          flexShrink: 0,
          placeItems: 'center',
          borderRadius: 2.25,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          fontSize: '1rem',
          fontWeight: 800,
        }}
      >
        M
      </Box>
      <Box sx={{ minWidth: 0, flexGrow: 1 }}>
        <Typography
          sx={{ fontSize: '1.05rem', fontWeight: 800, lineHeight: 1.25 }}
        >
          Meridian
        </Typography>
        <Typography
          sx={{ mt: 0.25, color: 'text.secondary', fontSize: '0.75rem' }}
        >
          Portfolio operations
        </Typography>
      </Box>
      {onClose && (
        <Tooltip title="Close navigation">
          <IconButton onClick={onClose} aria-label="Close navigation">
            <CloseRounded />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
