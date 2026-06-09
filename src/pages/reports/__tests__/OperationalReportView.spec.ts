import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import OperationalReportView from '../OperationalReportView.vue'
import { operationalReportApi } from '@/api-services/repositories/operationalReportApi'

// Mock vue-router
const mockQuery = { tab: 'activities' }
vi.mock('vue-router', () => ({
  useRoute: () => ({
    query: mockQuery,
  }),
}))

// Mock operationalReportApi
vi.mock('@/api-services/repositories/operationalReportApi', () => ({
  operationalReportApi: {
    getData: vi.fn(),
    exportReport: vi.fn(),
  },
}))

describe('OperationalReportView.vue Unit Tests', () => {
  const mockReportData = {
    metadata: {
      generatedAt: '2026-06-09T10:00:00.000Z',
      filter: { startDate: null, endDate: null }
    },
    stats: {
      totalMedicines: 100,
      lowStockMedicines: 5,
      outOfStockMedicines: 2,
      expiredMedicines: 3,
      totalActivityLogs: 15
    },
    medicines: [
      {
        id: 'med-1',
        medicineName: 'Amoxicillin',
        sku: 'AMX-01',
        description: 'Antibiotic',
        stock: 50,
        price: 10000,
        expiredDate: '2028-12-31',
        category: { categoryName: 'Capsules' },
        supplier: { companyName: 'PT Bio Farma' }
      }
    ],
    activityLogs: [
      {
        id: 'act-1',
        action: 'UPDATE_MEDICINE',
        employeeId: 'emp-1',
        employee: { name: 'John Doe', empId: 'EMP01', role: 'ADMIN' },
        resourceType: 'Medicine',
        resourceId: 'med-1',
        payloadData: { oldStock: 20, newStock: 50 },
        createdAt: '2026-06-09T10:00:00.000Z'
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    mockQuery.tab = 'activities'
    vi.mocked(operationalReportApi.getData).mockResolvedValue(mockReportData as any)
  })

  it('renders metadata, stats, and default activities tab on mount', async () => {
    const wrapper = mount(OperationalReportView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(operationalReportApi.getData).toHaveBeenCalled()

    // Assert stats counters
    expect(wrapper.text()).toContain('Operational Report')
    expect(wrapper.text()).toContain('15') // total activities count
    expect(wrapper.text()).toContain('100') // total medicines count
    expect(wrapper.text()).toContain('5') // low stock count
    expect(wrapper.text()).toContain('2') // out of stock count

    // Assert active activities list
    expect(wrapper.text()).toContain('update_medicine')
    expect(wrapper.text()).toContain('John Doe')
  })

  it('switches between activities and inventory tabs', async () => {
    const wrapper = mount(OperationalReportView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Default tab should be activities
    expect(wrapper.vm.activeTab).toBe('activities')

    // Click inventory tab button
    const invTabBtn = wrapper.findAll('button').find(b => b.text().includes('Medicine Inventory Status'))
    expect(invTabBtn).toBeDefined()
    await invTabBtn!.trigger('click')

    // Tab is switched
    expect(wrapper.vm.activeTab).toBe('inventory')
  })

  it('triggers operational export on format click', async () => {
    const mockBlob = new Blob()
    vi.mocked(operationalReportApi.exportReport).mockResolvedValue(mockBlob)
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn().mockReturnValue('blob:http://localhost/xyz'),
      revokeObjectURL: vi.fn(),
    })

    const wrapper = mount(OperationalReportView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    await wrapper.vm.handleExport('pdf')
    expect(operationalReportApi.exportReport).toHaveBeenCalledWith('pdf', undefined, undefined)
  })
})
