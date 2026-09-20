import { decodeUnknownSync } from 'effect/Schema';
import { Project, ProjectsSchema } from './project.schema';
import { RAW_PROJECTS } from './projects.fixture';

export const PROJECTS: readonly Project[] = decodeUnknownSync(ProjectsSchema)(RAW_PROJECTS);
