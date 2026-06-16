import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserManagementView from '../UserManagementView.vue'
import { employeeApi } from '@/api-services/repositories/employeeApi'

// Mock employeeApi
vi.mock('@/api-services/repositories/employeeApi', () => ({
  employeeApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('UserManagementView.vue Unit Tests', () => {
  const mockUsersResponse = {
    data: [
      {
        id: 'user-1',
        name: 'Rudi Santoso',
        email: 'rudi@pharma.com',
        empId: 'EMP001',
        role: 'ADMIN',
        shift: 'MORNING',
        salary: 4000000,
        startDate: '2026-01-01',
      },
    ],
    meta: {
      total: 1,
      lastPage: 1,
      currentPage: 1,
      perPage: 10,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(employeeApi.getAll).mockResolvedValue(mockUsersResponse as any)
  })

  it('fetches and lists users on mount', async () => {
    const wrapper = mount(UserManagementView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(employeeApi.getAll).toHaveBeenCalledWith(1, 10, undefined)
    expect(wrapper.text()).toContain('Rudi Santoso')
    expect(wrapper.text()).toContain('rudi@pharma.com')
    expect(wrapper.text()).toContain('EMP001')
    expect(wrapper.text()).toContain('ADMIN')
  })

  it('opens modal on Add User click and submits creation form', async () => {
    vi.mocked(employeeApi.create).mockResolvedValue({ id: 'user-2' } as any)
    const wrapper = mount(UserManagementView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Click Add User
    const addBtn = wrapper.findAll('button').find((b) => b.text().includes('Add User'))
    expect(addBtn).toBeDefined()
    await addBtn!.trigger('click')

    expect(wrapper.text()).toContain('Add New User')

    // Enter values
    await wrapper.find('input[placeholder="e.g., John Doe"]').setValue('Hendra')
    await wrapper.find('input[placeholder="e.g., EMP-001"]').setValue('EMP002')
    await wrapper.find('input[placeholder="e.g., user@lamtama.com"]').setValue('hendra@pharma.com')
    await wrapper.find('input[placeholder="Min. 6 characters"]').setValue('password123')
    await wrapper.find('select').setValue('CASHIER') // Role select is the first select in the form

    // Set required dates to prevent Invalid Date exceptions
    const dateInputs = wrapper.findAll('input[type="date"]')
    await dateInputs[0].setValue('2000-01-01') // dateOfBirth
    await dateInputs[1].setValue('2026-06-01') // formDateInput

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    expect(employeeApi.create).toHaveBeenCalled()
  })

  it('opens edit modal and updates existing user', async () => {
    vi.mocked(employeeApi.update).mockResolvedValue({ id: 'user-1' } as any)
    const wrapper = mount(UserManagementView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Click edit button (represented by text-orange-400 or title="Edit User")
    const editBtn = wrapper.find('button[title="Edit User"]')
    expect(editBtn.exists()).toBe(true)
    await editBtn.trigger('click')

    expect(wrapper.text()).toContain('Edit User')
    const nameInput = wrapper.find('input[placeholder="e.g., John Doe"]')
    expect((nameInput.element as HTMLInputElement).value).toBe('Rudi Santoso')

    // Modify name and submit
    await nameInput.setValue('Rudi Santoso Updated')
    await wrapper.find('form').trigger('submit.prevent')

    expect(employeeApi.update).toHaveBeenCalled()
  })

  it('calls delete employee API when delete button is clicked', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(employeeApi.delete).mockResolvedValue(undefined)

    const wrapper = mount(UserManagementView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Find delete button
    const deleteBtn = wrapper.find('button.text-red-400')
    expect(deleteBtn.exists()).toBe(true)
    await deleteBtn.trigger('click')

    expect(window.confirm).toHaveBeenCalled()
    expect(employeeApi.delete).toHaveBeenCalledWith('user-1')
  })
})
