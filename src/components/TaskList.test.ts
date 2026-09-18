import { mount } from '@vue/test-utils'
import { createVuetify } from 'vuetify'
import { describe, expect, it } from 'vitest'
import TaskList from './TaskList.vue'

describe('TaskList', () => {
  it('filters the visible tasks by status', async () => {
    const wrapper = mount(TaskList, {
      attachTo: document.body,
      global: { plugins: [createVuetify()] },
    })

    expect(wrapper.findAll('[data-task]')).toHaveLength(5)

    await wrapper.get('[data-filter="done"]').trigger('click')

    const visibleTasks = wrapper.findAll('[data-task]')
    expect(visibleTasks).toHaveLength(1)
    expect(visibleTasks[0]?.text()).toContain('Clean and oil shared tools')
    expect(visibleTasks[0]?.attributes('data-status')).toBe('done')

    wrapper.unmount()
  })
})
