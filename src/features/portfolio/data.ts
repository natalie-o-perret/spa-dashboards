export const metrics = [
  {
    label: 'Active projects',
    value: '15',
    detail: '3 due this month',
    icon: 'mdi-briefcase-outline',
  },
  {
    label: 'On-time delivery',
    value: '91%',
    detail: 'Up 4 points',
    icon: 'mdi-check-decagram-outline',
  },
  { label: 'Budget used', value: '68%', detail: '€482k of €710k', icon: 'mdi-wallet-outline' },
  {
    label: 'Team capacity',
    value: '76%',
    detail: '27 contributors',
    icon: 'mdi-account-multiple-outline',
  },
] as const

export const teamCapacity = [
  { name: 'Design', value: 82, people: 6 },
  { name: 'Engineering', value: 76, people: 12 },
  { name: 'Research', value: 64, people: 4 },
  { name: 'Content', value: 58, people: 5 },
] as const

export const delivery = [
  { week: 'W31', value: 62 },
  { week: 'W32', value: 68 },
  { week: 'W33', value: 66 },
  { week: 'W34', value: 73 },
  { week: 'W35', value: 78 },
  { week: 'W36', value: 81 },
  { week: 'W37', value: 86 },
  { week: 'W38', value: 91 },
] as const
