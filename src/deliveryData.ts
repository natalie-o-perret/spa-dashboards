export const trend = [
  { week: 'W31', value: 62 },
  { week: 'W32', value: 68 },
  { week: 'W33', value: 66 },
  { week: 'W34', value: 73 },
  { week: 'W35', value: 78 },
  { week: 'W36', value: 81 },
  { week: 'W37', value: 86 },
  { week: 'W38', value: 91 },
];

export function chartY(value: number) {
  return 190 - ((value - 50) / 50) * 160;
}
