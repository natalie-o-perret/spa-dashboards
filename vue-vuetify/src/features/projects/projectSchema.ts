import * as Schema from 'effect/Schema'

const dateOnlyPattern = /^(\d{4})-(\d{2})-(\d{2})$/

function isValidCalendarDate(value: string) {
  const match = dateOnlyPattern.exec(value)
  if (!match) return false
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const leapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
  const daysInMonth = [31, leapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  return year > 0 && day >= 1 && day <= (daysInMonth[month - 1] ?? 0)
}

export const ProjectId = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThan(0),
  Schema.brand('ProjectId'),
)
export const ProjectStatus = Schema.Literal('On track', 'At risk', 'Blocked', 'Complete')
export const ProjectPriority = Schema.Literal('Critical', 'High', 'Medium', 'Low')
export const ProjectName = Schema.Trim.pipe(Schema.nonEmptyString(), Schema.brand('ProjectName'))
export const ProjectOwner = Schema.Trim.pipe(Schema.nonEmptyString(), Schema.brand('ProjectOwner'))
export const Progress = Schema.Number.pipe(
  Schema.int(),
  Schema.between(0, 100),
  Schema.brand('Progress'),
)
export const Budget = Schema.Number.pipe(
  Schema.int(),
  Schema.greaterThanOrEqualTo(0),
  Schema.brand('Budget'),
)
export const DueDate = Schema.String.pipe(
  Schema.pattern(dateOnlyPattern),
  Schema.filter(isValidCalendarDate, { identifier: 'DueDate' }),
  Schema.brand('DueDate'),
)

export const ProjectSchema = Schema.Struct({
  id: ProjectId,
  name: ProjectName,
  owner: ProjectOwner,
  status: ProjectStatus,
  priority: ProjectPriority,
  progress: Progress,
  due: DueDate,
  budget: Budget,
})
export const ProjectListSchema = Schema.Array(ProjectSchema).pipe(
  Schema.filter((projects) => new Set(projects.map(({ id }) => id)).size === projects.length, {
    identifier: 'UniqueProjectIds',
  }),
)

export type Project = Schema.Schema.Type<typeof ProjectSchema>
export type ProjectStatus = Schema.Schema.Type<typeof ProjectStatus>
export type ProjectPriority = Schema.Schema.Type<typeof ProjectPriority>
