import apiClient from '../providers/providers'
import type { Datum, Users } from '../models/interfaces/users.interface'

export interface CreateEmployeePayload {
  name: string
  empId: string
  email: string
  password: string
  role: string
  shift: string
  salary: number
  startDate: string
  dateOfBirth?: string
  address?: string
  phoneNumber?: string
  status?: string
}

export interface UpdateEmployeePayload extends Partial<CreateEmployeePayload> {
  password?: string
}

export const employeeApi = {
  async getAll(page = 1, perPage = 10, search?: string): Promise<Users> {
    const params: Record<string, string | number> = { page, perPage }
    if (search) {
      params.search = search
    }
    const response = await apiClient.get('/employees', { params })
    return response.data as Users
  },

  async getById(id: string): Promise<Datum> {
    const response = await apiClient.get(`/employees/${id}`)
    return response.data as Datum
  },

  async create(payload: CreateEmployeePayload): Promise<Datum> {
    const response = await apiClient.post('/employees', payload)
    return response.data as Datum
  },

  async update(id: string, payload: UpdateEmployeePayload): Promise<Datum> {
    const response = await apiClient.patch(`/employees/${id}`, payload)
    return response.data as Datum
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/employees/${id}`)
  },
}
