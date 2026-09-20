const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]
const budgetFormatter = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export function formatDate(value: string) {
  const [year, month, day] = value.split('-')
  return `${Number(day)} ${monthNames[Number(month) - 1]} ${year}`
}

export function formatBudget(value: number) {
  return budgetFormatter.format(value)
}
