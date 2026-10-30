import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
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
    <Tooltip title="Choose roomier or compact project rows">
      <ToggleButtonGroup
        exclusive
        size="small"
        value={value}
        onChange={(_, next: Density | null) => next && onChange(next)}
        aria-label="Table density"
        sx={{
          width: { xs: '100%', sm: 190 },
          height: 40,
          '& .MuiToggleButton-root': { flex: 1 },
        }}
      >
        <ToggleButton value="comfortable" aria-label="Comfortable density">
          Comfortable
        </ToggleButton>
        <ToggleButton value="compact" aria-label="Compact density">
          Compact
        </ToggleButton>
      </ToggleButtonGroup>
    </Tooltip>
  );
}
