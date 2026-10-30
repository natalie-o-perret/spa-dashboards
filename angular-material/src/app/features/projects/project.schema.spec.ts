import { decodeUnknownSync } from 'effect/Schema';
import { Project, ProjectsSchema } from './project.schema';
import { RAW_PROJECTS } from './projects.fixture';

const decodeProjects = decodeUnknownSync(ProjectsSchema);
const firstProject = RAW_PROJECTS[0];

describe('ProjectsSchema', () => {
  it('decodes the complete fixture', () => {
    const projects = decodeProjects(RAW_PROJECTS);

    expect(projects).toHaveLength(18);
    expect(projects[0]).toBeInstanceOf(Project);
    expect(projects[0]).toMatchObject(firstProject);
  });

  it.each([
    ['zero id', { id: 0 }],
    ['blank name', { name: '  ' }],
    ['blank owner', { owner: '  ' }],
    ['unknown status', { status: 'Unknown' }],
    ['progress over 100', { progress: 101 }],
    ['fractional progress', { progress: 50.5 }],
    ['impossible date', { due: '2026-02-29' }],
    ['year zero', { due: '0000-01-01' }],
    ['timestamp date', { due: '2026-09-24T00:00:00Z' }],
    ['negative budget', { budget: -1 }],
    ['fractional budget', { budget: 10.5 }],
  ])('rejects %s', (_case, change) => {
    expect(() => decodeProjects([{ ...firstProject, ...change }])).toThrow();
  });

  it('rejects duplicate project ids', () => {
    expect(() => decodeProjects([firstProject, firstProject])).toThrow();
  });

  it('trims names and owners before validating them', () => {
    const [project] = decodeProjects([{ ...firstProject, name: '  Aurora  ', owner: '  Maya  ' }]);
    expect(project.name).toBe('Aurora');
    expect(project.owner).toBe('Maya');
  });
});
