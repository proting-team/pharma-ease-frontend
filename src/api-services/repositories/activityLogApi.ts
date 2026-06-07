import apiClient from '../providers/providers'

export interface ActivityLogResponse {
  id: string
  action: string
  employeeId: string
  employee: {
    id: string
    name: string
    role: string
  }
  resourceType: string | null
  resourceId: string | null
  payloadData: Record<string, any> | null
  createdAt: string
}

export interface PaginatedResult<T> {
  data: T[]
  meta: {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: number | null
    next: number | null
  }
}

export const activityLogApi = {
  async getAll(page = 1, perPage = 10): Promise<PaginatedResult<ActivityLogResponse>> {
    const response = await apiClient.get('/activity-logs', {
      params: { page, perPage },
    })
    return response.data as PaginatedResult<ActivityLogResponse>
  },

  async getById(id: string): Promise<ActivityLogResponse> {
    const response = await apiClient.get(`/activity-logs/${id}`)
    return response.data as ActivityLogResponse
  },
}
