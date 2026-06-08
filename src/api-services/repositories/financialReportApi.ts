import apiClient from '../providers/providers'

export interface FinancialReportData {
  metadata: {
    generatedAt: string
    filter: {
      startDate: string | null
      endDate: string | null
    }
  }
  summary: {
    totalRevenue: number
    totalExpenses: number
    netProfit: number
    totalTransactionsCount: number
    totalOrdersCount: number
  }
  incomeBreakdown: Array<{
    id: string
    transactionCode: string
    transactionDate: string
    totalPrice: number
    employee: {
      name: string
      empId: string
    } | null
    transactionDetails: Array<{
      id: string
      quantity: number
      unitPrice: number
      medicine: {
        medicineName: string
        sku: string
      } | null
    }>
  }>
  expenseBreakdown: Array<{
    id: string
    orderCode: string
    orderDate: string
    totalPrice: number
    employee: {
      name: string
      empId: string
    } | null
    supplier: {
      companyName: string
    } | null
    orderDetails: Array<{
      id: string
      quantity: number
      unitPrice: number
      medicine: {
        medicineName: string
        sku: string
      } | null
    }>
  }>
}

export const financialReportApi = {
  async getData(startDate?: string, endDate?: string): Promise<FinancialReportData> {
    const params: any = {}
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await apiClient.get('/financial-report', { params })
    return response.data as FinancialReportData
  },

  async exportReport(format: 'excel' | 'pdf' | 'csv', startDate?: string, endDate?: string): Promise<Blob> {
    const params: any = { format }
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await apiClient.get('/financial-report/export', {
      params,
      responseType: 'blob',
    })
    return response.data as Blob
  }
}
