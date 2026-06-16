import apiClient from '../providers/providers'
import { Convert } from '../models/activity_logs'
import type { ActivityLogs, Datum } from '../models/interfaces/activity_logs.interface'

export const activityLogApi = {
  async getAll(page = 1, perPage = 10): Promise<ActivityLogs> {
    const response = await apiClient.get('/activity-logs', {
      params: { page, perPage },
    })
    const jsonStr =
      typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
    return Convert.toActivityLogs(jsonStr)
  },

  async getById(id: string): Promise<{ status: number; message: string; data: Datum }> {
    const response = await apiClient.get(`/activity-logs/${id}`)
    return response.data as { status: number; message: string; data: Datum }
  },
}
