import { chartY, trend } from './deliveryData';

export default function DeliveryPlot() {
  const points = trend
    .map((item, index) => `${24 + index * 96},${chartY(item.value)}`)
    .join(' ');
  return (
    <>
      {[50, 75, 100].map((value) => (
        <g key={value}>
          <line
            className="chart-grid"
            x1="24"
            x2="696"
            y1={chartY(value)}
            y2={chartY(value)}
            strokeDasharray="4 7"
          />
          <text
            className="chart-label"
            x="0"
            y={chartY(value) + 4}
            textAnchor="start"
          >
            {value}%
          </text>
        </g>
      ))}
      <polygon points={`${points} 696,190 24,190`} fill="url(#delivery-area)" />
      <polyline
        className="chart-line"
        points={points}
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      {trend.map((item, index) => {
        const x = 24 + index * 96;
        const latest = index === trend.length - 1;
        return (
          <g key={item.week}>
            <circle
              className={`chart-dot${latest ? ' chart-dot-latest' : ''}`}
              cx={x}
              cy={chartY(item.value)}
              r={latest ? 6 : 4.5}
              strokeWidth={latest ? 4 : 3}
              vectorEffect="non-scaling-stroke"
            />
            <text className="chart-label" x={x} y="216" textAnchor="middle">
              {item.week}
            </text>
          </g>
        );
      })}
    </>
  );
}
