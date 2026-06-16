import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MedicineOrdersView from '../MedicineOrdersView.vue'
import { medicineOrderApi } from '@/api-services/repositories/medicineOrderApi'
import { supplierApi } from '@/api-services/repositories/supplierApi'
import { employeeApi } from '@/api-services/repositories/employeeApi'
import { medicineApi } from '@/api-services/repositories/medicineApi'

// Mock APIs
vi.mock('@/api-services/repositories/medicineOrderApi', () => ({
  medicineOrderApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

vi.mock('@/api-services/repositories/supplierApi', () => ({
  supplierApi: {
    getAll: vi.fn(),
  },
}))

vi.mock('@/api-services/repositories/employeeApi', () => ({
  employeeApi: {
    getAll: vi.fn(),
  },
}))

vi.mock('@/api-services/repositories/medicineApi', () => ({
  medicineApi: {
    getAll: vi.fn(),
  },
}))

describe('MedicineOrdersView.vue Unit Tests', () => {
  const mockOrdersResponse = {
    data: [
      {
        id: 'ord-1',
        orderCode: 'ORD-001',
        orderDate: '2026-06-09',
        totalPrice: 50000,
        status: 'PENDING',
        employee: { name: 'John Cashier' },
        supplier: { companyName: 'PT Kalbe Farma' },
      },
    ],
    meta: {
      total: 1,
      lastPage: 1,
      currentPage: 1,
      perPage: 10,
    },
  }

  const mockSuppliersResponse = {
    data: [{ id: 'sup-1', companyName: 'PT Kalbe Farma' }],
  }

  const mockEmployeesResponse = {
    data: [{ id: 'emp-1', name: 'John Cashier' }],
  }

  const mockMedicinesResponse = {
    data: [{ id: 'med-1', medicineName: 'Paracetamol', price: 5000 }],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(medicineOrderApi.getAll).mockResolvedValue(mockOrdersResponse as any)
    vi.mocked(supplierApi.getAll).mockResolvedValue(mockSuppliersResponse as any)
    vi.mocked(employeeApi.getAll).mockResolvedValue(mockEmployeesResponse as any)
    vi.mocked(medicineApi.getAll).mockResolvedValue(mockMedicinesResponse as any)
  })

  it('fetches lists and renders orders on mount', async () => {
    const wrapper = mount(MedicineOrdersView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(medicineOrderApi.getAll).toHaveBeenCalled()
    expect(supplierApi.getAll).toHaveBeenCalled()
    expect(employeeApi.getAll).toHaveBeenCalled()
    expect(medicineApi.getAll).toHaveBeenCalled()

    expect(wrapper.text()).toContain('ORD-001')
    expect(wrapper.text()).toContain('John Cashier')
    expect(wrapper.text()).toContain('PT Kalbe Farma')
    expect(wrapper.text()).toContain('PENDING')
  })

  it('opens order modal on Add Order click and closes on cancel', async () => {
    const wrapper = mount(MedicineOrdersView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Add Order modal should be closed initially
    expect(wrapper.text()).not.toContain('Add New Order')

    // Click Add Order
    const addBtn = wrapper.findAll('button').find((b) => b.text().includes('Add Order'))
    expect(addBtn).toBeDefined()
    await addBtn!.trigger('click')

    // Modal is open
    expect(wrapper.text()).toContain('Add New Order')

    // Click Cancel
    const cancelBtn = wrapper.findAll('button').find((b) => b.text().includes('Cancel'))
    expect(cancelBtn).toBeDefined()
    await cancelBtn!.trigger('click')

    // Modal is closed
    expect(wrapper.text()).not.toContain('Add New Order')
  })

  it('calls delete order API when delete is clicked and confirmed', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(medicineOrderApi.delete).mockResolvedValue(undefined)

    const wrapper = mount(MedicineOrdersView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    const deleteBtn = wrapper.find('button[title="Delete"]')
    expect(deleteBtn.exists()).toBe(true)
    await deleteBtn.trigger('click')

    expect(window.confirm).toHaveBeenCalled()
    expect(medicineOrderApi.delete).toHaveBeenCalledWith('ord-1')
  })
})
