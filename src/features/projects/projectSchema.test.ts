import * as Schema from 'effect/Schema';
import { describe, expect, it } from 'vitest';
import { Project, ProjectList } from './projectSchema';
import { projects } from './projects';
import { rawProjects } from './rawProjects';

const decodeProject = Schema.decodeUnknownSync(Project);
const validProject = rawProjects[0];

describe('project schema', () => {
  it('decodes the program-owned fixture at its module boundary', () => {
    expect(projects).toHaveLength(rawProjects.length);
    expect(projects.every((project) => project instanceof Project)).toBe(true);
    expect(projects[0]).toMatchObject(validProject);
  });

  it.each([
    ['progress above 100', { ...validProject, progress: 101 }],
    ['fractional progress', { ...validProject, progress: 50.5 }],
    ['impossible date', { ...validProject, due: '2026-02-30' }],
    ['year zero', { ...validProject, due: '0000-01-01' }],
    ['timestamp date', { ...validProject, due: '2026-09-24T00:00:00Z' }],
    ['negative budget', { ...validProject, budget: -1 }],
    ['fractional budget', { ...validProject, budget: 10.5 }],
  ])('rejects %s', (_, input) => {
    expect(() => decodeProject(input)).toThrow();
  });

  it('rejects duplicate project ids', () => {
    const decodeProjects = Schema.decodeUnknownSync(ProjectList);
    expect(() => decodeProjects([validProject, validProject])).toThrow();
  });
});
