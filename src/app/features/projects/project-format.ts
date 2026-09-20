const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const NUMBER_FORMATTER = new Intl.NumberFormat('en-IE');

export function formatDate(date: string): string {
  const [year, month, day] = date.split('-');
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatBudget(budget: number): string {
  return `€${NUMBER_FORMATTER.format(budget)}`;
}
