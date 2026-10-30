import { flushPromises, mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import { createVuetify } from 'vuetify'
import { VApp } from 'vuetify/components/VApp'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import DashboardTopBar from './DashboardTopBar.vue'

describe('theme button', () => {
  let media: MediaQueryList

  beforeEach(() => {
    localStorage.clear()
    media = Object.assign(new EventTarget(), { matches: false }) as MediaQueryList
    vi.spyOn(window, 'matchMedia').mockImplementation(() => media)
    vi.stubGlobal(
      'visualViewport',
      Object.assign(new EventTarget(), {
        width: 1024,
        height: 768,
        offsetLeft: 0,
        offsetTop: 0,
        scale: 1,
      }),
    )
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('keeps explicit choices separate from the live System palette', async () => {
    const vuetify = createVuetify({ theme: { defaultTheme: 'system' } })
    const wrapper = mount(
      defineComponent({
        components: { DashboardTopBar, VApp },
        template: '<v-app><DashboardTopBar :drawer-open="false" :mobile="false" /></v-app>',
      }),
      { attachTo: document.body, global: { plugins: [vuetify] } },
    )

    async function cycle(label: string) {
      await wrapper.get('[aria-label^="Theme:"]').trigger('click')
      await flushPromises()
      expect(wrapper.get('[aria-label^="Theme:"]').attributes('aria-label')).toContain(
        `Theme: ${label}.`,
      )
    }

    async function changeOS(dark: boolean) {
      Object.assign(media, { matches: dark })
      media.dispatchEvent(Object.assign(new Event('change'), { matches: dark }))
      await nextTick()
    }

    try {
      expect(vuetify.theme.isSystem.value).toBe(true)
      expect(vuetify.theme.current.value.dark).toBe(false)
      await changeOS(true)
      expect(vuetify.theme.current.value.dark).toBe(true)
      await cycle('Light')
      expect(localStorage.getItem('meridian-theme')).toBe('light')
      expect(vuetify.theme.isSystem.value).toBe(false)
      expect(vuetify.theme.current.value.dark).toBe(false)
      await changeOS(false)
      await changeOS(true)
      expect(vuetify.theme.current.value.dark).toBe(false)
      await cycle('Dark')
      expect(localStorage.getItem('meridian-theme')).toBe('dark')
      await cycle('System')
      expect(localStorage.getItem('meridian-theme')).toBe('system')
      expect(vuetify.theme.current.value.dark).toBe(true)
      await changeOS(false)
      expect(vuetify.theme.current.value.dark).toBe(false)

      vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
        throw new Error('Storage blocked')
      })
      await cycle('Light')
      await cycle('Dark')
      expect(vuetify.theme.current.value.dark).toBe(true)
    } finally {
      wrapper.unmount()
    }
  })
})
