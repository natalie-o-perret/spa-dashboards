import {
  Array as ArraySchema,
  Class,
  Literals,
  Number as NumberSchema,
  String as StringSchema,
  Trim,
  brand,
  isBetween,
  isGreaterThan,
  isGreaterThanOrEqualTo,
  isInt,
  isNonEmpty,
  makeFilter,
} from 'effect/Schema';

function isValidDateOnly(value: string): boolean {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= daysInMonth[month - 1];
}

export const ProjectId = NumberSchema.check(isInt(), isGreaterThan(0)).pipe(brand('ProjectId'));
export const ProjectName = Trim.check(isNonEmpty()).pipe(brand('ProjectName'));
export const ProjectOwner = Trim.check(isNonEmpty()).pipe(brand('ProjectOwner'));
export const ProjectStatus = Literals(['On track', 'At risk', 'Blocked', 'Complete']);
export const ProjectPriority = Literals(['Low', 'Medium', 'High', 'Critical']);
export const Progress = NumberSchema.check(isInt(), isBetween({ minimum: 0, maximum: 100 })).pipe(
  brand('Progress'),
);
export const Budget = NumberSchema.check(isInt(), isGreaterThanOrEqualTo(0)).pipe(brand('Budget'));
export const DueDate = StringSchema.check(
  makeFilter(isValidDateOnly, {
    identifier: 'DueDate',
    description: 'a valid date in YYYY-MM-DD format',
  }),
).pipe(brand('DueDate'));

export class Project extends Class<Project>('Project')({
  id: ProjectId,
  name: ProjectName,
  owner: ProjectOwner,
  status: ProjectStatus,
  priority: ProjectPriority,
  progress: Progress,
  due: DueDate,
  budget: Budget,
}) {}

export const ProjectsSchema = ArraySchema(Project).check(
  makeFilter((projects) => new Set(projects.map(({ id }) => id)).size === projects.length, {
    identifier: 'UniqueProjectIds',
  }),
);
export type ProjectStatus = Project['status'];
