import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Density } from './projectTableData';

interface DensityControlProps {
  value: Density;
  onChange: (value: Density) => void;
}

export default function DensityControl({
  value,
  onChange,
}: DensityControlProps) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={value}
      onChange={(_, next: Density | null) => next && onChange(next)}
      aria-label="Table density"
      sx={{
        width: { xs: '100%', sm: 'fit-content' },
        '& .MuiToggleButton-root': { flex: { xs: 1, sm: 'initial' } },
      }}
    >
      <ToggleButton value="comfortable" aria-label="Comfortable density">
        Comfortable
      </ToggleButton>
      <ToggleButton value="compact" aria-label="Compact density">
        Compact
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
