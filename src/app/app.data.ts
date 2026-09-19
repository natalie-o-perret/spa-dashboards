export type ProjectStatus = 'On track' | 'At risk' | 'Blocked' | 'Complete';
export type ProjectPriority = 'Low' | 'Medium' | 'High' | 'Critical';

export interface Project {
  id: number;
  name: string;
  owner: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  progress: number;
  due: string;
  budget: number;
}

export const NAV_ITEMS = [
  { label: 'Overview', icon: 'dashboard', href: '#overview', active: true },
  { label: 'Analytics', icon: 'monitoring', href: '#analytics', active: false },
  { label: 'Projects', icon: 'view_list', href: '#projects', active: false },
  { label: 'Team', icon: 'groups', href: '#team', active: false },
] as const;

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

export const PROJECTS: readonly Project[] = [
  {
    id: 1,
    name: 'Aurora mobile refresh',
    owner: 'Maya Chen',
    status: 'On track',
    priority: 'High',
    progress: 82,
    due: '2026-09-24',
    budget: 48000,
  },
  {
    id: 2,
    name: 'Beacon research hub',
    owner: 'Theo Martin',
    status: 'At risk',
    priority: 'High',
    progress: 61,
    due: '2026-09-28',
    budget: 36000,
  },
  {
    id: 3,
    name: 'Canvas design system',
    owner: 'Lena Ortiz',
    status: 'On track',
    priority: 'Medium',
    progress: 74,
    due: '2026-10-03',
    budget: 52000,
  },
  {
    id: 4,
    name: 'Delta billing clarity',
    owner: 'Jonah Reed',
    status: 'Blocked',
    priority: 'Critical',
    progress: 39,
    due: '2026-09-22',
    budget: 29000,
  },
  {
    id: 5,
    name: 'Ember onboarding',
    owner: 'Ari Lewis',
    status: 'Complete',
    priority: 'Medium',
    progress: 100,
    due: '2026-09-18',
    budget: 41000,
  },
  {
    id: 6,
    name: 'Fieldnote analytics',
    owner: 'Mina Khan',
    status: 'On track',
    priority: 'High',
    progress: 67,
    due: '2026-10-08',
    budget: 63000,
  },
  {
    id: 7,
    name: 'Grove partner portal',
    owner: 'Nora Singh',
    status: 'At risk',
    priority: 'Medium',
    progress: 53,
    due: '2026-10-12',
    budget: 44000,
  },
  {
    id: 8,
    name: 'Harbor accessibility',
    owner: 'Sam Jones',
    status: 'On track',
    priority: 'Critical',
    progress: 88,
    due: '2026-09-26',
    budget: 27000,
  },
  {
    id: 9,
    name: 'Iris content migration',
    owner: 'Priya Shah',
    status: 'On track',
    priority: 'Low',
    progress: 71,
    due: '2026-10-15',
    budget: 33000,
  },
  {
    id: 10,
    name: 'Juniper automation',
    owner: 'Owen Brown',
    status: 'Complete',
    priority: 'Medium',
    progress: 100,
    due: '2026-09-16',
    budget: 38000,
  },
  {
    id: 11,
    name: 'Kite support centre',
    owner: 'Eva Muller',
    status: 'On track',
    priority: 'Medium',
    progress: 58,
    due: '2026-10-20',
    budget: 47000,
  },
  {
    id: 12,
    name: 'Loom reporting suite',
    owner: 'Luca Rossi',
    status: 'At risk',
    priority: 'High',
    progress: 46,
    due: '2026-10-05',
    budget: 56000,
  },
  {
    id: 13,
    name: 'Meadow localisation',
    owner: 'Amara King',
    status: 'On track',
    priority: 'Low',
    progress: 64,
    due: '2026-10-24',
    budget: 31000,
  },
  {
    id: 14,
    name: 'Northstar permissions',
    owner: 'Ben Adams',
    status: 'Blocked',
    priority: 'High',
    progress: 32,
    due: '2026-09-30',
    budget: 42000,
  },
  {
    id: 15,
    name: 'Orbit notifications',
    owner: 'Zoe Lee',
    status: 'On track',
    priority: 'Medium',
    progress: 79,
    due: '2026-10-02',
    budget: 35000,
  },
  {
    id: 16,
    name: 'Patch account recovery',
    owner: 'Omar Ali',
    status: 'Complete',
    priority: 'Critical',
    progress: 100,
    due: '2026-09-14',
    budget: 24000,
  },
  {
    id: 17,
    name: 'Quartz search relevance',
    owner: 'Mae Wilson',
    status: 'At risk',
    priority: 'High',
    progress: 49,
    due: '2026-10-18',
    budget: 58000,
  },
  {
    id: 18,
    name: 'Relay API catalogue',
    owner: 'Felix Grant',
    status: 'On track',
    priority: 'Low',
    progress: 76,
    due: '2026-10-11',
    budget: 39000,
  },
];
