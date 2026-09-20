import type { Project } from './projectSchema'

export function exportProjects(projects: readonly Project[]) {
  if (!projects.length) return
  const rows = [
    ['ID', 'Project', 'Owner', 'Status', 'Priority', 'Progress', 'Due date', 'Budget'],
    ...projects.map((project) => [
      project.id,
      project.name,
      project.owner,
      project.status,
      project.priority,
      `${project.progress}%`,
      project.due,
      project.budget,
    ]),
  ]
  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(','))
    .join('\r\n')
  const url = globalThis.URL.createObjectURL(
    new globalThis.Blob([csv], { type: 'text/csv;charset=utf-8' }),
  )
  const link = globalThis.document.createElement('a')
  link.href = url
  link.download = 'meridian-projects.csv'
  globalThis.document.body.append(link)
  link.click()
  link.remove()
  globalThis.URL.revokeObjectURL(url)
}
