import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeView from '../HomeView.vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'
import { transactionApi } from '@/api-services/repositories/transactionApi'

// Mock API repositories
vi.mock('@/api-services/repositories/medicineApi', () => ({
  medicineApi: {
    getAll: vi.fn(),
  },
}))

vi.mock('@/api-services/repositories/transactionApi', () => ({
  transactionApi: {
    getAll: vi.fn(),
  },
}))

// Mock auth store role dynamically
let mockUserRole = 'ADMIN'
vi.mock('@/stores/auth', () => ({
  useAuthStore: () => ({
    userRole: mockUserRole,
  }),
}))

describe('HomeView.vue Unit Tests', () => {
  const today = new Date()
  const tenDaysFromNow = new Date()
  tenDaysFromNow.setDate(today.getDate() + 10)
  const expiryDateString = tenDaysFromNow.toISOString().split('T')[0]

  const mockMedicinesResponse = {
    data: [
      { id: '1', medicineName: 'Paracetamol', stock: 10, expiredDate: expiryDateString },
      { id: '2', medicineName: 'Amoxicillin', stock: 50, expiredDate: '2030-12-31' }
    ],
    meta: {
      total: 2
    }
  }

  const mockTransactionsResponse = {
    data: [
      { id: 'tx-1', totalPrice: 15000 },
      { id: 'tx-2', totalPrice: 25000 }
    ],
    meta: {
      total: 2
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockUserRole = 'ADMIN'
  })

  it('renders dashboard with loading state initially', () => {
    vi.mocked(medicineApi.getAll).mockReturnValue(new Promise(() => {}))
    vi.mocked(transactionApi.getAll).mockReturnValue(new Promise(() => {}))

    const wrapper = mount(HomeView)
    expect(wrapper.find('.animate-pulse').exists()).toBe(true)
    expect(wrapper.text()).toContain('Dashboard')
  })

  it('fetches both medicine and transaction metrics for ADMIN and calculates correct values', async () => {
    vi.mocked(medicineApi.getAll).mockResolvedValue(mockMedicinesResponse as any)
    vi.mocked(transactionApi.getAll).mockResolvedValue(mockTransactionsResponse as any)

    const wrapper = mount(HomeView)

    // Wait for the onMounted promises to resolve and component to update
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(medicineApi.getAll).toHaveBeenCalledWith(1, 1000)
    expect(transactionApi.getAll).toHaveBeenCalledWith(1, 1000)

    // Check displayed metrics
    expect(wrapper.text()).toContain('Total Medicines')
    expect(wrapper.text()).toContain('2') // total medicines
    expect(wrapper.text()).toContain('Low Stock Items')
    expect(wrapper.text()).toContain('1') // low stock item (stock = 10 <= 15)
    expect(wrapper.text()).toContain('Total Revenue')
    expect(wrapper.text()).toContain('40.000') // Rp 15.000 + Rp 25.000 = Rp 40.000
    expect(wrapper.text()).toContain('Total Transactions')
    expect(wrapper.text()).toContain('2') // total transactions count
  })

  it('filters out transactions fetch for PHARMACIST role', async () => {
    mockUserRole = 'PHARMACIST'
    vi.mocked(medicineApi.getAll).mockResolvedValue(mockMedicinesResponse as any)
    vi.mocked(transactionApi.getAll).mockResolvedValue(mockTransactionsResponse as any)

    const wrapper = mount(HomeView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(medicineApi.getAll).toHaveBeenCalled()
    expect(transactionApi.getAll).not.toHaveBeenCalled()

    // Transaction metrics should remain default (0 / loading skeleton replaced by 0 or skeleton)
    expect(wrapper.text()).toContain('Total Medicines')
    expect(wrapper.text()).toContain('2')
    expect(wrapper.text()).toContain('Total Transactions')
    expect(wrapper.text()).toContain('0') // default value since transaction data not loaded
  })

  it('filters out medicines fetch for CASHIER role', async () => {
    mockUserRole = 'CASHIER'
    vi.mocked(medicineApi.getAll).mockResolvedValue(mockMedicinesResponse as any)
    vi.mocked(transactionApi.getAll).mockResolvedValue(mockTransactionsResponse as any)

    const wrapper = mount(HomeView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(medicineApi.getAll).not.toHaveBeenCalled()
    expect(transactionApi.getAll).toHaveBeenCalled()

    // Medicine metrics should remain default (0 / loading skeleton replaced by 0)
    expect(wrapper.text()).toContain('Total Medicines')
    expect(wrapper.text()).toContain('0')
    expect(wrapper.text()).toContain('Total Transactions')
    expect(wrapper.text()).toContain('2')
  })

  it('computes and renders medicine nearing expiry list correctly', async () => {
    vi.mocked(medicineApi.getAll).mockResolvedValue(mockMedicinesResponse as any)
    vi.mocked(transactionApi.getAll).mockResolvedValue(mockTransactionsResponse as any)

    const wrapper = mount(HomeView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Expiring medicine title
    expect(wrapper.text()).toContain('Medicines Nearing Expiry')
    expect(wrapper.text()).toContain('Paracetamol')
    expect(wrapper.text()).toContain('10 days left')
    // Amoxicillin is set far in the future, so it shouldn't show up in nearing expiry
    expect(wrapper.text()).not.toContain('Amoxicillin')
  })
})
