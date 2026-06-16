import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AuditLogView from '../AuditLogView.vue'
import { activityLogApi } from '@/api-services/repositories/activityLogApi'
import { employeeApi } from '@/api-services/repositories/employeeApi'

// Mock activityLogApi
vi.mock('@/api-services/repositories/activityLogApi', () => ({
  activityLogApi: {
    getAll: vi.fn(),
  },
}))

// Mock employeeApi
vi.mock('@/api-services/repositories/employeeApi', () => ({
  employeeApi: {
    getAll: vi.fn(),
  },
}))

describe('AuditLogView.vue Unit Tests', () => {
  const mockLogsResponse = {
    data: [
      {
        id: 'log-1',
        action: 'UPDATE_MEDICINE',
        employeeId: 'emp-1',
        resourceType: 'Medicine',
        resourceId: 'med-1',
        payloadData: { name: 'Paracetamol' },
        createdAt: '2026-06-09T10:00:00.000Z',
      },
    ],
    meta: {
      total: 1,
      lastPage: 1,
      currentPage: 1,
      perPage: 10,
      prev: null,
      next: null,
    },
  }

  const mockEmployeesResponse = {
    data: [{ id: 'emp-1', name: 'John Cashier', role: 'CASHIER' }],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(activityLogApi.getAll).mockResolvedValue(mockLogsResponse as any)
    vi.mocked(employeeApi.getAll).mockResolvedValue(mockEmployeesResponse as any)
  })

  it('renders log records correctly on mount', async () => {
    const wrapper = mount(AuditLogView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(activityLogApi.getAll).toHaveBeenCalledWith(1, 10)
    expect(wrapper.text()).toContain('Audit Log')
    expect(wrapper.text()).toContain('Update_medicine')
    expect(wrapper.text()).toContain('John Cashier')
    expect(wrapper.text()).toContain('cashier')
  })

  it('filters log list by search query input', async () => {
    const wrapper = mount(AuditLogView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    const searchInput = wrapper.find('input[placeholder="Search activities..."]')
    await searchInput.setValue('non-existent')

    // Expect search query state changes
    expect((wrapper.vm as any).searchQuery).toBe('non-existent')
  })

  it('filters log list by action dropdown select', async () => {
    const wrapper = mount(AuditLogView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Select the action option from select dropdown
    const actionSelect = wrapper.findAll('select')[0]
    await actionSelect.setValue('Updated')

    expect((wrapper.vm as any).selectedAction).toBe('Updated')
  })

  it('filters log list by module dropdown select', async () => {
    const wrapper = mount(AuditLogView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Select the module option from select dropdown
    const moduleSelect = wrapper.findAll('select')[1]
    await moduleSelect.setValue('Medicine Inventory')

    expect((wrapper.vm as any).selectedModule).toBe('Medicine Inventory')
  })
})
