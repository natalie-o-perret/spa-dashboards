import * as Schema from 'effect/Schema'
import { ProjectListSchema, type Project } from './projectSchema'
import { rawProjects } from './rawProjects'

export const projects: readonly Project[] = Schema.decodeUnknownSync(ProjectListSchema)(rawProjects)
