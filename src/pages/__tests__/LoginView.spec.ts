import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import LoginView from '../LoginView.vue'

// Mock vue-router
const mockPush = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock auth store
const mockLogin = vi.fn()
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    login: mockLogin,
    token: null,
    user: null,
    isAuthenticated: false,
    userRole: null,
  }),
}))

describe('LoginView.vue Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form with input fields and submit button', () => {
    const wrapper = mount(LoginView)

    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Pharma Ease')
    expect(wrapper.text()).toContain('Sign In')
  })

  it('toggles password visibility when eye icon button is clicked', async () => {
    const wrapper = mount(LoginView)
    const passwordInput = wrapper.find('input#password')

    expect(passwordInput.attributes('type')).toBe('password')

    // Click the toggle visibility button
    const toggleBtn = wrapper.find('button[type="button"]')
    await toggleBtn.trigger('click')

    expect(passwordInput.attributes('type')).toBe('text')

    // Toggle back
    await toggleBtn.trigger('click')
    expect(passwordInput.attributes('type')).toBe('password')
  })

  it('validates email and password fields on empty submission', async () => {
    const wrapper = mount(LoginView)
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Email is required')
    expect(wrapper.text()).toContain('Password is required')
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('validates email format and minimum password length', async () => {
    const wrapper = mount(LoginView)

    await wrapper.find('input[type="email"]').setValue('invalid-email')
    await wrapper.find('input[type="password"]').setValue('123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.text()).toContain('Please enter a valid email')
    expect(wrapper.text()).toContain('Password must be at least 6 characters')
    expect(mockLogin).not.toHaveBeenCalled()
  })

  it('calls auth store login and routes on successful login', async () => {
    vi.useFakeTimers()
    mockLogin.mockResolvedValueOnce(undefined)

    const wrapper = mount(LoginView)
    await wrapper.find('input[type="email"]').setValue('admin@pharma.com')
    await wrapper.find('input[type="password"]').setValue('password123')
    await wrapper.find('form').trigger('submit.prevent')

    expect(mockLogin).toHaveBeenCalledWith({
      email: 'admin@pharma.com',
      password: 'password123',
    })

    // Advance timers so the setTimeout for redirect executes
    vi.runAllTimers()
    vi.useRealTimers()

    expect(mockPush).toHaveBeenCalledWith({ name: 'home' })
  })

  it('displays error message on failed login', async () => {
    const errorMessage = 'Invalid credentials'
    mockLogin.mockRejectedValueOnce({
      response: {
        data: {
          message: errorMessage,
        },
      },
    })

    const wrapper = mount(LoginView)
    await wrapper.find('input[type="email"]').setValue('wrong@pharma.com')
    await wrapper.find('input[type="password"]').setValue('wrongpassword')
    await wrapper.find('form').trigger('submit.prevent')

    expect(mockLogin).toHaveBeenCalled()

    await wrapper.vm.$nextTick()
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(wrapper.text()).toContain(errorMessage)
    expect(mockPush).not.toHaveBeenCalled()
  })
})
