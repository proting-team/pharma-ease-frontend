import apiClient from '../providers/providers'
import { Convert } from '../models/operational_report'
import type { OperationalReport } from '../models/interfaces/operational_report.interface'

export const operationalReportApi = {
  async getData(startDate?: string, endDate?: string): Promise<OperationalReport> {
    const params: any = {}
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await apiClient.get('/reports/operational-report', { params })
    const jsonStr = typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
    return Convert.toOperationalReport(jsonStr)
  },

  async exportReport(format: 'excel' | 'pdf' | 'csv', startDate?: string, endDate?: string): Promise<Blob> {
    const params: any = { format }
    if (startDate) params.startDate = startDate
    if (endDate) params.endDate = endDate

    const response = await apiClient.get('/reports/operational-report/export', {
      params,
      responseType: 'blob',
    })
    return response.data as Blob
  }
}
