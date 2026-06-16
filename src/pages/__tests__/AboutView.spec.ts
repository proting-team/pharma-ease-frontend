import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AboutView from '../AboutView.vue'

describe('AboutView.vue', () => {
  it('renders about page title properly', () => {
    const wrapper = mount(AboutView)
    expect(wrapper.text()).toContain('This is an about page')
  })
})
