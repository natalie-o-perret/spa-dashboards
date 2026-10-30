import * as Schema from 'effect/Schema';

const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/;

function isCalendarDate(value: string) {
  const [, yearText, monthText, dayText] = dateOnlyPattern.exec(value) ?? [];
  if (!yearText || !monthText || !dayText) return false;

  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [
    31,
    leapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  return year > 0 && day > 0 && day <= (daysInMonth[month - 1] ?? 0);
}

export const ProjectId = Schema.Number.check(
  Schema.isInt(),
  Schema.isGreaterThan(0),
).pipe(Schema.brand('ProjectId'));
export const ProjectName = Schema.Trim.check(Schema.isNonEmpty()).pipe(
  Schema.brand('ProjectName'),
);
export const ProjectOwner = Schema.Trim.check(Schema.isNonEmpty()).pipe(
  Schema.brand('ProjectOwner'),
);
export const ProjectStatus = Schema.Literals([
  'On track',
  'At risk',
  'Blocked',
  'Complete',
]);
export const ProjectPriority = Schema.Literals([
  'Low',
  'Medium',
  'High',
  'Critical',
]);
export const Progress = Schema.Number.check(
  Schema.isInt(),
  Schema.isBetween({ minimum: 0, maximum: 100 }),
).pipe(Schema.brand('Progress'));
export const Budget = Schema.Number.check(
  Schema.isInt(),
  Schema.isGreaterThanOrEqualTo(0),
).pipe(Schema.brand('Budget'));
export const DueDate = Schema.String.check(
  Schema.isPattern(dateOnlyPattern),
  Schema.makeFilter(isCalendarDate),
).pipe(Schema.brand('DueDate'));

export class Project extends Schema.Class<Project>('Project')({
  id: ProjectId,
  name: ProjectName,
  owner: ProjectOwner,
  status: ProjectStatus,
  priority: ProjectPriority,
  progress: Progress,
  due: DueDate,
  budget: Budget,
}) {}

export const ProjectList = Schema.Array(Project).check(
  Schema.makeFilter(
    (projects) =>
      new Set(projects.map(({ id }) => id)).size === projects.length,
    { identifier: 'UniqueProjectIds' },
  ),
);
export type ProjectStatus = typeof ProjectStatus.Type;
export type ProjectPriority = typeof ProjectPriority.Type;
