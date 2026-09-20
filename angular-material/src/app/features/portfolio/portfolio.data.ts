export const METRICS = [
  { label: 'Active projects', value: '15', detail: '3 due this month', icon: 'folder_open' },
  { label: 'On-time delivery', value: '91%', detail: 'Up 4 points', icon: 'trending_up' },
  {
    label: 'Budget used',
    value: '68%',
    detail: '€482k of €710k',
    icon: 'account_balance_wallet',
  },
  { label: 'Team capacity', value: '76%', detail: '27 contributors', icon: 'groups' },
] as const;

export const TREND_POINTS = [
  { week: 'W31', value: 62, x: 54, y: 179 },
  { week: 'W32', value: 68, x: 144, y: 159 },
  { week: 'W33', value: 66, x: 234, y: 166 },
  { week: 'W34', value: 73, x: 324, y: 142 },
  { week: 'W35', value: 78, x: 414, y: 125 },
  { week: 'W36', value: 81, x: 504, y: 115 },
  { week: 'W37', value: 86, x: 594, y: 98 },
  { week: 'W38', value: 91, x: 684, y: 81 },
] as const;

export const TREND_LINE = TREND_POINTS.map(({ x, y }) => `${x},${y}`).join(' ');
export const TREND_AREA = `${TREND_LINE} 684,220 54,220`;

export const TEAM_CAPACITY = [
  { team: 'Design', value: 82, people: 6 },
  { team: 'Engineering', value: 76, people: 12 },
  { team: 'Research', value: 64, people: 4 },
  { team: 'Content', value: 58, people: 5 },
] as const;
