import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, it } from 'vitest'
import ProjectTable from './ProjectTable.vue'
import ProjectTableControls from './ProjectTableControls.vue'

describe('ProjectTable', () => {
  it('uses status badges in selected filter values but not for all statuses', async () => {
    const wrapper = mount(ProjectTableControls, {
      attachTo: document.body,
      props: { search: '', status: 'All statuses', density: 'comfortable' },
      global: { plugins: [createVuetify()] },
    })
    expect(wrapper.find('[data-testid="status-filter"] .v-chip').exists()).toBe(false)
    await wrapper.setProps({ status: 'Blocked' })
    expect(wrapper.get('[data-testid="status-filter"] .v-chip').text()).toBe('Blocked')
    await wrapper.setProps({ status: 'All statuses' })
    expect(wrapper.find('[data-testid="status-filter"] .v-chip').exists()).toBe(false)
    wrapper.unmount()
  })

  it('filters, cycles sorting, paginates, and selects only the visible page', async () => {
    const wrapper = mount(ProjectTable, {
      attachTo: document.body,
      global: { plugins: [createVuetify()] },
    })
    const rows = () => wrapper.findAll('tbody .v-data-table__tr')

    expect(rows()).toHaveLength(5)
    expect(rows()[0]?.text()).toContain('Aurora mobile refresh')

    await wrapper.get('[data-testid="project-search"] input').setValue('blocked')
    expect(rows()).toHaveLength(2)
    expect(wrapper.text()).toContain('2 projects shown')
    expect(wrapper.text()).toContain('Delta billing clarity')
    expect(wrapper.text()).toContain('Northstar permissions')

    await wrapper.get('[data-testid="project-search"] input').setValue('')
    const projectHeader = wrapper.findAll('th').find((header) => header.text().includes('Project'))
    expect(projectHeader).toBeDefined()

    await wrapper.get('button[aria-label="Next page"]').trigger('click')
    expect(rows()[0]?.text()).toContain('Fieldnote analytics')

    await projectHeader?.trigger('click')
    expect(projectHeader?.attributes('aria-sort')).toBe('ascending')
    expect(rows()[0]?.text()).toContain('Fieldnote analytics')

    await projectHeader?.trigger('click')
    expect(projectHeader?.attributes('aria-sort')).toBe('descending')
    expect(rows()[0]?.text()).toContain('Meadow localisation')

    await projectHeader?.trigger('click')
    expect(projectHeader?.attributes('aria-sort')).toBeUndefined()
    expect(rows()[0]?.text()).toContain('Fieldnote analytics')
    expect(wrapper.find('button[aria-label^="Page "]').exists()).toBe(false)
    expect(wrapper.get('[aria-label="Select Fieldnote analytics"]').attributes('aria-label')).toBe(
      'Select Fieldnote analytics',
    )

    await wrapper.get('[aria-label="Select all projects on this page"]').trigger('click')
    expect(wrapper.text()).toContain('5 selected')

    await wrapper.get('button[aria-label="Next page"]').trigger('click')
    expect(rows()[0]?.text()).toContain('Kite support centre')
    expect(wrapper.text()).toContain('5 selected')

    wrapper.unmount()
  })

  it('uses singular summary grammar and disables export for no results', async () => {
    const wrapper = mount(ProjectTable, {
      attachTo: document.body,
      global: { plugins: [createVuetify()] },
    })
    const search = wrapper.get('[data-testid="project-search"] input')

    await search.setValue('Northstar permissions')
    expect(wrapper.text()).toContain('1 project shown')

    await search.setValue('not a project')
    expect(wrapper.get('[data-testid="no-results"]').text()).toContain(
      'No projects foundNo projects match your current search and status filters.Clear filters',
    )
    const exportButton = wrapper
      .findAll('button')
      .find((button) => button.text().includes('Export CSV'))
    expect(exportButton?.attributes('disabled')).toBeDefined()

    wrapper.unmount()
  })
})
