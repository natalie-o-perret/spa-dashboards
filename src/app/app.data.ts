export const NAV_ITEMS = [
  { label: 'Overview', icon: 'space_dashboard', href: '#overview', active: true },
  { label: 'Momentum', icon: 'show_chart', href: '#momentum', active: false },
  { label: 'Initiatives', icon: 'task_alt', href: '#initiatives', active: false },
  { label: 'Schedule', icon: 'calendar_today', href: '#schedule', active: false },
  { label: 'Activity', icon: 'bolt', href: '#activity', active: false },
] as const;

export const METRICS = [
  {
    label: 'Delivery confidence',
    value: '86%',
    detail: '+4 pts this month',
    icon: 'north_east',
    tone: 'positive',
  },
  {
    label: 'In flight',
    value: '12',
    detail: '4 nearing review',
    icon: 'arrow_forward',
    tone: 'neutral',
  },
  {
    label: 'Decisions waiting',
    value: '3',
    detail: '2 due today',
    icon: 'schedule',
    tone: 'attention',
  },
  {
    label: 'Team pulse',
    value: '8.7',
    detail: 'Strong and steady',
    icon: 'favorite',
    tone: 'positive',
  },
] as const;

export const TREND_POINTS = [
  { x: 28, y: 168, day: 'Mon', value: 68 },
  { x: 130, y: 153, day: 'Tue', value: 71 },
  { x: 232, y: 158, day: 'Wed', value: 70 },
  { x: 334, y: 123, day: 'Thu', value: 77 },
  { x: 436, y: 133, day: 'Fri', value: 75 },
  { x: 538, y: 98, day: 'Sat', value: 82 },
  { x: 640, y: 68, day: 'Sun', value: 86 },
] as const;

export const TREND_LINE = TREND_POINTS.map(({ x, y }) => `${x},${y}`).join(' ');
export const TREND_AREA = `${TREND_LINE} 640,198 28,198`;

export const INITIATIVES = [
  {
    name: 'Member onboarding refresh',
    description: 'Guided setup and clearer empty states',
    owner: 'AL',
    ownerName: 'Ari Lewis',
    due: '24 Sep',
    progress: 82,
    status: 'On track',
    tone: 'positive',
  },
  {
    name: 'Q4 planning toolkit',
    description: 'Shared briefs, rituals, and decision log',
    owner: 'MK',
    ownerName: 'Mina Khan',
    due: '02 Oct',
    progress: 64,
    status: 'On track',
    tone: 'positive',
  },
  {
    name: 'Billing clarity pass',
    description: 'Invoice language and plan comparison',
    owner: 'JR',
    ownerName: 'Jonah Reed',
    due: '29 Sep',
    progress: 41,
    status: 'Needs decision',
    tone: 'attention',
  },
  {
    name: 'Mobile handoff',
    description: 'Prototype validation with support teams',
    owner: 'NS',
    ownerName: 'Nora Singh',
    due: '08 Oct',
    progress: 28,
    status: 'In discovery',
    tone: 'neutral',
  },
] as const;

export const SCHEDULE = [
  {
    time: '09:30',
    datetime: '2026-09-18T09:30',
    title: 'Delivery pulse',
    meta: 'Core team · 30 min',
    state: 'Complete',
  },
  {
    time: '11:00',
    datetime: '2026-09-18T11:00',
    title: 'Prototype review',
    meta: 'Design studio · 45 min',
    state: 'Next',
  },
  {
    time: '14:30',
    datetime: '2026-09-18T14:30',
    title: 'Q4 scope decisions',
    meta: 'Leadership · 2 decisions',
    state: '',
  },
  {
    time: '16:00',
    datetime: '2026-09-18T16:00',
    title: 'Weekly wrap',
    meta: 'Async note · 20 min',
    state: '',
  },
] as const;

export const ACTIVITY = [
  {
    initials: 'NS',
    person: 'Nora',
    action: 'moved research synthesis to review',
    target: 'Mobile handoff',
    time: '12 min ago',
    tone: 'lavender',
  },
  {
    initials: 'JR',
    person: 'Jonah',
    action: 'flagged a copy decision in',
    target: 'Billing clarity pass',
    time: '38 min ago',
    tone: 'coral',
  },
  {
    initials: 'AL',
    person: 'Ari',
    action: 'completed the guided setup flow in',
    target: 'Member onboarding',
    time: '1 hr ago',
    tone: 'indigo',
  },
  {
    initials: 'MK',
    person: 'Mina',
    action: 'added the 3rd planning brief to',
    target: 'Q4 toolkit',
    time: '2 hrs ago',
    tone: 'sand',
  },
] as const;
