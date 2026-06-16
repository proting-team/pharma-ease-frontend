import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FinancialReportView from '../FinancialReportView.vue'
import { financialReportApi } from '@/api-services/repositories/financialReportApi'

// Mock financialReportApi
vi.mock('@/api-services/repositories/financialReportApi', () => ({
  financialReportApi: {
    getData: vi.fn(),
    exportReport: vi.fn(),
  },
}))

describe('FinancialReportView.vue Unit Tests', () => {
  const mockReportData = {
    metadata: {
      generatedAt: '2026-06-09T10:00:00.000Z',
      filter: { startDate: null, endDate: null },
    },
    summary: {
      totalRevenue: 1500000,
      totalExpenses: 500000,
      netProfit: 1000000,
      totalTransactionsCount: 2,
      totalOrdersCount: 1,
    },
    incomeBreakdown: [
      {
        id: 'tx-1',
        transactionCode: 'TX-001',
        transactionDate: '2026-06-09T10:00:00.000Z',
        totalPrice: 1500000,
        employee: { name: 'Budi' },
        transactionDetails: [
          {
            id: 'det-1',
            quantity: 3,
            unitPrice: 500000,
            medicine: { medicineName: 'Amoxicillin', sku: 'AMX-01' },
          },
        ],
      },
    ],
    expenseBreakdown: [
      {
        id: 'ord-1',
        orderCode: 'ORD-001',
        orderDate: '2026-06-09T09:00:00.000Z',
        totalPrice: 500000,
        employee: { name: 'Admin' },
        supplier: { companyName: 'PT Bio Farma' },
        orderDetails: [
          {
            id: 'ord-det-1',
            quantity: 10,
            unitPrice: 50000,
            medicine: { medicineName: 'Paracetamol', sku: 'PCT-01' },
          },
        ],
      },
    ],
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(financialReportApi.getData).mockResolvedValue(mockReportData as any)
  })

  it('renders report summaries and tables on mount', async () => {
    const wrapper = mount(FinancialReportView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(financialReportApi.getData).toHaveBeenCalled()

    // Assert Summary values
    expect(wrapper.text()).toContain('Financial Report')
    expect(wrapper.text()).toContain('1.500.000') // Revenue (formatted Indonesian currency dots)
    expect(wrapper.text()).toContain('500.000') // Expenses
    expect(wrapper.text()).toContain('1.000.000') // Net Profit

    // Assert Income list
    expect(wrapper.text()).toContain('TX-001')
    expect(wrapper.text()).toContain('Budi')

    // Assert Expense list
    expect(wrapper.text()).toContain('ORD-001')
    expect(wrapper.text()).toContain('Admin')
  })

  it('changes selected period and updates statistics display', async () => {
    const wrapper = mount(FinancialReportView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Default period should be daily
    expect((wrapper.vm as any).selectedPeriod).toBe('daily')

    // Click Monthly period button
    const monthlyBtn = wrapper.findAll('button').find((b) => b.text() === 'Monthly')
    expect(monthlyBtn).toBeDefined()
    await monthlyBtn!.trigger('click')

    expect((wrapper.vm as any).selectedPeriod).toBe('monthly')
  })

  it('triggers report export when handleExport is called', async () => {
    const mockBlob = new Blob(['csv contents'], { type: 'text/csv' })
    vi.mocked(financialReportApi.exportReport).mockResolvedValue(mockBlob)
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn().mockReturnValue('blob:http://localhost/xyz'),
      revokeObjectURL: vi.fn(),
    })

    const wrapper = mount(FinancialReportView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Trigger export excel
    await (wrapper.vm as any).handleExport('excel')
    expect(financialReportApi.exportReport).toHaveBeenCalledWith(
      'excel',
      expect.any(String),
      expect.any(String),
    )
  })
})
