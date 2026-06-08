import apiClient from '../providers/providers'

export interface OperationalReportData {
  metadata: {
    generatedAt: string
    filter: {
      startDate: string | null
      endDate: string | null
    }
  }
  stats: {
    totalMedicines: number
    lowStockMedicines: number
    outOfStockMedicines: number
    expiredMedicines: number
    totalActivityLogs: number
  }
  medicines: Array<{
    id: string
    medicineName: string
    sku: string
    description?: string | null
    stock: number
    price: number
    expiredDate: string
    category?: {
      categoryName: string
    } | null
    supplier?: {
      companyName: string
    } | null
  }>
  activityLogs: Array<{
    id: string
    action: string
    employeeId: string
    employee: {
      name: string
      empId: string
      role: string
    } | null
    resourceType: string | null
    resourceId: string | null
    payloadData: any
    createdAt: string
  }>
}

export const operationalReportApi = {
  async getData(startDate?: string, endDate?: string): Promise<OperationalReportData> {
    const params: any = {}
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await apiClient.get('/operational-report', { params })
    return response.data as OperationalReportData
  },

  async exportReport(format: 'excel' | 'pdf' | 'csv', startDate?: string, endDate?: string): Promise<Blob> {
    const params: any = { format }
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await apiClient.get('/operational-report/export', {
      params,
      responseType: 'blob',
    })
    return response.data as Blob
  }
}
