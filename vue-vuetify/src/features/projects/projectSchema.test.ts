import * as Schema from 'effect/Schema'
import { describe, expect, it } from 'vitest'
import { ProjectListSchema, ProjectSchema } from './projectSchema'
import { projects } from './projects'
import { rawProjects } from './rawProjects'

const decodeProject = Schema.decodeUnknownSync(ProjectSchema)

describe('project schema', () => {
  it('decodes the complete valid fixture', () => {
    expect(projects).toHaveLength(18)
    expect(projects).toEqual(rawProjects)
  })

  it.each([
    ['zero id', { id: 0 }],
    ['blank name', { name: '  ' }],
    ['blank owner', { owner: '  ' }],
    ['unknown status', { status: 'Unknown' }],
    ['progress', { progress: 101 }],
    ['date', { due: '2026-02-29' }],
    ['year zero', { due: '0000-01-01' }],
    ['budget', { budget: -1 }],
  ] as const)('rejects invalid %s', (_field, invalid) => {
    expect(() => decodeProject({ ...rawProjects[0], ...invalid })).toThrow()
  })

  it('rejects duplicate project ids', () => {
    const decodeProjects = Schema.decodeUnknownSync(ProjectListSchema)
    expect(() => decodeProjects([rawProjects[0], rawProjects[0]])).toThrow()
  })

  it('trims names and owners before validating them', () => {
    expect(
      decodeProject({ ...rawProjects[0], name: '  Aurora  ', owner: '  Maya  ' }),
    ).toMatchObject({
      name: 'Aurora',
      owner: 'Maya',
    })
  })
})
