import * as Schema from 'effect/Schema';
import { Project, ProjectList } from './projectSchema';
import { rawProjects } from './rawProjects';

const decodeProjects = Schema.decodeUnknownSync(ProjectList);

export const projects: readonly Project[] = decodeProjects(rawProjects);
