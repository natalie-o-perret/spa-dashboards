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

export const ProjectId = Schema.Number.check(Schema.isInt(), Schema.isGreaterThan(0)).pipe(
  Schema.brand('ProjectId'),
)
export const ProjectStatus = Schema.Literals(['On track', 'At risk', 'Blocked', 'Complete'])
export const ProjectPriority = Schema.Literals(['Critical', 'High', 'Medium', 'Low'])
export const ProjectName = Schema.Trim.check(Schema.isNonEmpty()).pipe(Schema.brand('ProjectName'))
export const ProjectOwner = Schema.Trim.check(Schema.isNonEmpty()).pipe(
  Schema.brand('ProjectOwner'),
)
export const Progress = Schema.Number.check(
  Schema.isInt(),
  Schema.isBetween({ minimum: 0, maximum: 100 }),
).pipe(Schema.brand('Progress'))
export const Budget = Schema.Number.check(Schema.isInt(), Schema.isGreaterThanOrEqualTo(0)).pipe(
  Schema.brand('Budget'),
)
export const DueDate = Schema.String.check(
  Schema.isPattern(dateOnlyPattern),
  Schema.makeFilter(isValidCalendarDate, { identifier: 'DueDate' }),
).pipe(Schema.brand('DueDate'))

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
export const ProjectListSchema = Schema.Array(ProjectSchema).check(
  Schema.makeFilter((projects) => new Set(projects.map(({ id }) => id)).size === projects.length, {
    identifier: 'UniqueProjectIds',
  }),
)

export type Project = Schema.Schema.Type<typeof ProjectSchema>
export type ProjectStatus = Schema.Schema.Type<typeof ProjectStatus>
export type ProjectPriority = Schema.Schema.Type<typeof ProjectPriority>
