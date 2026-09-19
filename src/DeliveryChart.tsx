import { Box } from '@mui/material';
import DeliveryPlot from './DeliveryPlot';

export default function DeliveryChart() {
  return (
    <Box
      component="svg"
      viewBox="0 0 720 230"
      role="img"
      aria-labelledby="delivery-chart-title delivery-chart-description"
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        height: 'auto',
        mt: 2.5,
        overflow: 'visible',
        '& .chart-grid': { stroke: theme.palette.divider },
        '& .chart-label': {
          fill: theme.palette.text.secondary,
          fontFamily: theme.typography.fontFamily,
          fontSize: 11,
        },
        '& .chart-line': { stroke: theme.palette.primary.main },
        '& .chart-dot': {
          fill: theme.palette.background.paper,
          stroke: theme.palette.primary.main,
        },
        '& .chart-dot-latest': {
          fill: theme.palette.primary.main,
          stroke: theme.palette.background.paper,
        },
        '& .chart-area-start': { stopColor: theme.palette.primary.main },
      })}
    >
      <title id="delivery-chart-title">
        On-time delivery from week 31 to week 38
      </title>
      <desc id="delivery-chart-description">
        W31: 62%; W32: 68%; W33: 66%; W34: 73%; W35: 78%; W36: 81%; W37: 86%;
        W38: 91%.
      </desc>
      <defs>
        <linearGradient id="delivery-area" x1="0" y1="0" x2="0" y2="1">
          <stop className="chart-area-start" offset="0%" stopOpacity="0.3" />
          <stop className="chart-area-start" offset="100%" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <DeliveryPlot />
    </Box>
  );
}
