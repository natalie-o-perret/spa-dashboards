import {
  Array as ArraySchema,
  Class,
  Literal,
  Number as NumberSchema,
  String as StringSchema,
  Trim,
  between,
  brand,
  filter,
  int,
  nonEmptyString,
  nonNegative,
  positive,
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

export const ProjectId = NumberSchema.pipe(int(), positive(), brand('ProjectId'));
export const ProjectName = Trim.pipe(nonEmptyString(), brand('ProjectName'));
export const ProjectOwner = Trim.pipe(nonEmptyString(), brand('ProjectOwner'));
export const ProjectStatus = Literal('On track', 'At risk', 'Blocked', 'Complete');
export const ProjectPriority = Literal('Low', 'Medium', 'High', 'Critical');
export const Progress = NumberSchema.pipe(int(), between(0, 100), brand('Progress'));
export const Budget = NumberSchema.pipe(int(), nonNegative(), brand('Budget'));
export const DueDate = StringSchema.pipe(
  filter(isValidDateOnly, {
    identifier: 'DueDate',
    description: 'a valid date in YYYY-MM-DD format',
  }),
  brand('DueDate'),
);

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

export const ProjectsSchema = ArraySchema(Project).pipe(
  filter((projects) => new Set(projects.map(({ id }) => id)).size === projects.length, {
    identifier: 'UniqueProjectIds',
  }),
);
export type ProjectStatus = Project['status'];
