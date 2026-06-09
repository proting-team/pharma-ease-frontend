import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from '../../providers/providers'
import { authApi } from '../authApi'
import { activityLogApi } from '../activityLogApi'
import { employeeApi } from '../employeeApi'
import { financialReportApi } from '../financialReportApi'
import { medicineApi } from '../medicineApi'
import { medicineCategoryApi } from '../medicineCategoryApi'
import { medicineOrderApi } from '../medicineOrderApi'
import { operationalReportApi } from '../operationalReportApi'
import { supplierApi } from '../supplierApi'
import { transactionApi } from '../transactionApi'

vi.mock('../../providers/providers', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    }
  }
})

describe('API Repositories Unit Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('authApi', () => {
    it('should perform login post request', async () => {
      const mockResponse = { data: { access_token: 'jwt-token-xyz', user: { name: 'Admin' } } }
      vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse)

      const credentials = { email: 'admin@pharma.com', password: 'password123' }
      const result = await authApi.login(credentials)

      expect(apiClient.post).toHaveBeenCalledWith('/auth/sign-in', credentials)
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('activityLogApi', () => {
    it('should fetch all logs with default or custom pagination', async () => {
      const mockResponse = { data: { data: [], meta: { total: 0 } } }
      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      let result = await activityLogApi.getAll()
      expect(apiClient.get).toHaveBeenCalledWith('/activity-logs', { params: { page: 1, perPage: 10 } })
      expect(result).toEqual(mockResponse.data)

      await activityLogApi.getAll(3, 25)
      expect(apiClient.get).toHaveBeenCalledWith('/activity-logs', { params: { page: 3, perPage: 25 } })
    })

    it('should fetch a log by ID', async () => {
      const mockResponse = { data: { id: 'log-1', action: 'CREATE' } }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      const result = await activityLogApi.getById('log-1')
      expect(apiClient.get).toHaveBeenCalledWith('/activity-logs/log-1')
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('employeeApi', () => {
    it('should fetch all employees with search and pagination', async () => {
      const mockResponse = { data: { data: [], meta: {} } }
      vi.mocked(apiClient.get).mockResolvedValue(mockResponse)

      await employeeApi.getAll(1, 10, 'john')
      expect(apiClient.get).toHaveBeenCalledWith('/employees', { params: { page: 1, perPage: 10, search: 'john' } })

      await employeeApi.getAll(2, 15)
      expect(apiClient.get).toHaveBeenCalledWith('/employees', { params: { page: 2, perPage: 15 } })
    })

    it('should fetch employee by ID', async () => {
      const mockResponse = { data: { id: 'emp-1', name: 'John Doe' } }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      const result = await employeeApi.getById('emp-1')
      expect(apiClient.get).toHaveBeenCalledWith('/employees/emp-1')
      expect(result).toEqual(mockResponse.data)
    })

    it('should create a new employee', async () => {
      const mockResponse = { data: { id: 'emp-2', name: 'Jane' } }
      vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse)

      const payload = {
        name: 'Jane',
        empId: 'EMP002',
        email: 'jane@pharma.com',
        password: 'password123',
        role: 'CASHIER',
        shift: 'MORNING',
        salary: 3000000,
        startDate: '2026-06-01',
      }
      const result = await employeeApi.create(payload)
      expect(apiClient.post).toHaveBeenCalledWith('/employees', payload)
      expect(result).toEqual(mockResponse.data)
    })

    it('should update employee', async () => {
      const mockResponse = { data: { id: 'emp-1', name: 'John Updated' } }
      vi.mocked(apiClient.patch).mockResolvedValueOnce(mockResponse)

      const payload = { name: 'John Updated' }
      const result = await employeeApi.update('emp-1', payload)
      expect(apiClient.patch).toHaveBeenCalledWith('/employees/emp-1', payload)
      expect(result).toEqual(mockResponse.data)
    })

    it('should delete employee', async () => {
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} })
      await employeeApi.delete('emp-1')
      expect(apiClient.delete).toHaveBeenCalledWith('/employees/emp-1')
    })
  })

  describe('financialReportApi', () => {
    it('should fetch report data with date filter parameters', async () => {
      const mockResponse = { data: { summary: {}, incomeBreakdown: [] } }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      const result = await financialReportApi.getData('2026-01-01', '2026-01-31')
      expect(apiClient.get).toHaveBeenCalledWith('/financial-report', {
        params: { startDate: '2026-01-01', endDate: '2026-01-31' },
      })
      expect(result).toEqual(mockResponse.data)
    })

    it('should export financial report as Blob', async () => {
      const mockBlob = new Blob(['dummy content'], { type: 'application/vnd.ms-excel' })
      const mockResponse = { data: mockBlob }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      const result = await financialReportApi.exportReport('excel', '2026-01-01', '2026-01-31')
      expect(apiClient.get).toHaveBeenCalledWith('/financial-report/export', {
        params: { format: 'excel', startDate: '2026-01-01', endDate: '2026-01-31' },
        responseType: 'blob',
      })
      expect(result).toBe(mockBlob)
    })
  })

  describe('medicineApi', () => {
    it('should fetch all medicines with query parameters', async () => {
      const mockResponse = { data: { data: [], meta: {} } }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      await medicineApi.getAll(1, 10, 'Paracetamol')
      expect(apiClient.get).toHaveBeenCalledWith('/medicine-data/medicines', {
        params: { page: 1, perPage: 10, search: 'Paracetamol' },
      })
    })

    it('should fetch a medicine by ID', async () => {
      const mockResponse = { data: { id: 'med-1' } }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      const result = await medicineApi.getById('med-1')
      expect(apiClient.get).toHaveBeenCalledWith('/medicine-data/medicines/med-1')
      expect(result).toEqual(mockResponse.data)
    })

    it('should create, update, and delete medicine', async () => {
      // Create
      const mockResponse1 = { data: { id: 'med-2' } }
      vi.mocked(apiClient.post).mockResolvedValueOnce(mockResponse1)
      const createPayload = {
        medicineName: 'Amoxicillin',
        sku: 'AMX-123',
        stock: 100,
        price: 5000,
        expiredDate: '2028-12-31',
        categoryId: 'cat-1',
        supplierId: 'sup-1',
      }
      let result = await medicineApi.create(createPayload)
      expect(apiClient.post).toHaveBeenCalledWith('/medicine-data/medicines', createPayload)
      expect(result).toEqual(mockResponse1.data)

      // Update
      const mockResponse2 = { data: { id: 'med-2', stock: 120 } }
      vi.mocked(apiClient.patch).mockResolvedValueOnce(mockResponse2)
      result = await medicineApi.update('med-2', { stock: 120 })
      expect(apiClient.patch).toHaveBeenCalledWith('/medicine-data/medicines/med-2', { stock: 120 })
      expect(result).toEqual(mockResponse2.data)

      // Delete
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} })
      await medicineApi.delete('med-2')
      expect(apiClient.delete).toHaveBeenCalledWith('/medicine-data/medicines/med-2')
    })
  })

  describe('medicineCategoryApi', () => {
    it('should manage medicine categories', async () => {
      const mockResponse = { data: { data: [], meta: {} } }
      vi.mocked(apiClient.get).mockResolvedValueOnce(mockResponse)

      // Get all
      await medicineCategoryApi.getAll(2, 5)
      expect(apiClient.get).toHaveBeenCalledWith('/medicine-data/medicine-categories', {
        params: { page: 2, perPage: 5 },
      })

      // Get by id
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { id: 'cat-1' } })
      await medicineCategoryApi.getById('cat-1')
      expect(apiClient.get).toHaveBeenCalledWith('/medicine-data/medicine-categories/cat-1')

      // Create
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: { id: 'cat-2' } })
      const payload = { categoryName: 'Capsules', description: 'Capsule medicines' }
      await medicineCategoryApi.create(payload)
      expect(apiClient.post).toHaveBeenCalledWith('/medicine-data/medicine-categories', payload)

      // Update
      vi.mocked(apiClient.patch).mockResolvedValueOnce({ data: { id: 'cat-2' } })
      await medicineCategoryApi.update('cat-2', { categoryName: 'Capsules Updated' })
      expect(apiClient.patch).toHaveBeenCalledWith('/medicine-data/medicine-categories/cat-2', {
        categoryName: 'Capsules Updated',
      })

      // Delete
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} })
      await medicineCategoryApi.delete('cat-2')
      expect(apiClient.delete).toHaveBeenCalledWith('/medicine-data/medicine-categories/cat-2')
    })
  })

  describe('medicineOrderApi', () => {
    it('should manage medicine purchase orders', async () => {
      // Get all
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { data: [] } })
      await medicineOrderApi.getAll(1, 10)
      expect(apiClient.get).toHaveBeenCalledWith('/finances/medicine-orders', {
        params: { page: 1, perPage: 10 },
      })

      // Get by id
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { id: 'ord-1' } })
      await medicineOrderApi.getById('ord-1')
      expect(apiClient.get).toHaveBeenCalledWith('/finances/medicine-orders/ord-1')

      // Create
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: { id: 'ord-2' } })
      const createPayload = {
        orderDate: '2026-06-09',
        employeeId: 'emp-1',
        supplierId: 'sup-1',
        medicines: [{ medicineId: 'med-1', quantity: 10, unitPrice: 2000 }],
      }
      await medicineOrderApi.create(createPayload)
      expect(apiClient.post).toHaveBeenCalledWith('/finances/medicine-orders', createPayload)

      // Update
      vi.mocked(apiClient.patch).mockResolvedValueOnce({ data: { id: 'ord-2' } })
      await medicineOrderApi.update('ord-2', { status: 'COMPLETED' })
      expect(apiClient.patch).toHaveBeenCalledWith('/finances/medicine-orders/ord-2', { status: 'COMPLETED' })

      // Delete
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} })
      await medicineOrderApi.delete('ord-2')
      expect(apiClient.delete).toHaveBeenCalledWith('/finances/medicine-orders/ord-2')
    })
  })

  describe('operationalReportApi', () => {
    it('should fetch operational report data', async () => {
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { stats: {} } })
      await operationalReportApi.getData('2026-06-01', '2026-06-09')
      expect(apiClient.get).toHaveBeenCalledWith('/operational-report', {
        params: { startDate: '2026-06-01', endDate: '2026-06-09' },
      })
    })

    it('should export operational report', async () => {
      const mockBlob = new Blob()
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockBlob })
      await operationalReportApi.exportReport('pdf', '2026-06-01')
      expect(apiClient.get).toHaveBeenCalledWith('/operational-report/export', {
        params: { format: 'pdf', startDate: '2026-06-01' },
        responseType: 'blob',
      })
    })
  })

  describe('supplierApi', () => {
    it('should manage suppliers', async () => {
      // Get all
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { data: [] } })
      await supplierApi.getAll(1, 10)
      expect(apiClient.get).toHaveBeenCalledWith('/suppliers', { params: { page: 1, perPage: 10 } })

      // Get by id
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { id: 'sup-1' } })
      await supplierApi.getById('sup-1')
      expect(apiClient.get).toHaveBeenCalledWith('/suppliers/sup-1')

      // Create
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: { id: 'sup-2' } })
      const createPayload = {
        companyName: 'PT Kalbe',
        phoneNumber: '08123',
        contactName: 'Kalbe Contact',
        supplierEmail: 'kalbe@pharma.com',
        status: 'ACTIVE',
        address: 'Jakarta',
        licenseNumber: 'LIC-999',
      }
      await supplierApi.create(createPayload)
      expect(apiClient.post).toHaveBeenCalledWith('/suppliers', createPayload)

      // Update
      vi.mocked(apiClient.patch).mockResolvedValueOnce({ data: { id: 'sup-2' } })
      await supplierApi.update('sup-2', { contactName: 'New Contact' })
      expect(apiClient.patch).toHaveBeenCalledWith('/suppliers/sup-2', { contactName: 'New Contact' })

      // Delete
      vi.mocked(apiClient.delete).mockResolvedValueOnce({ data: {} })
      await supplierApi.delete('sup-2')
      expect(apiClient.delete).toHaveBeenCalledWith('/suppliers/sup-2')
    })
  })

  describe('transactionApi', () => {
    it('should create and fetch transactions', async () => {
      // Create
      vi.mocked(apiClient.post).mockResolvedValueOnce({ data: { id: 'tx-1' } })
      const payload = {
        transactionDate: '2026-06-09T00:00:00.000Z',
        cashReceived: 50000,
        medicines: [{ medicineId: 'med-1', quantity: 2, unitPrice: 15000 }],
      }
      await transactionApi.create(payload)
      expect(apiClient.post).toHaveBeenCalledWith('/finances/transactions', payload)

      // Get all
      vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { data: [] } })
      await transactionApi.getAll(2, 20)
      expect(apiClient.get).toHaveBeenCalledWith('/finances/transactions', {
        params: { page: 2, perPage: 20 },
      })
    })
  })
})
