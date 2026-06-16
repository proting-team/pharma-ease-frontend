import apiClient from '../providers/providers'
import type { Medicines, Datum } from '../models/interfaces/medicine.interface'

const API_BASE = '/medicine-data/medicines'

export interface CreateMedicinePayload {
  medicineName: string
  sku: string
  description?: string | null
  stock: number
  price: number
  expiredDate: string
  categoryId: string
  supplierId: string
}

export const medicineApi = {
  getAll: async (page = 1, perPage = 10, search = ''): Promise<Medicines> => {
    const params: any = { page, perPage }
    if (search) params.search = search

    const response = await apiClient.get(API_BASE, { params })
    return response.data as Medicines
  },

  getById: async (id: string): Promise<Datum> => {
    const response = await apiClient.get(`${API_BASE}/${id}`)
    return response.data as Datum
  },

  create: async (payload: CreateMedicinePayload): Promise<Datum> => {
    const response = await apiClient.post(API_BASE, payload)
    return response.data as Datum
  },

  update: async (id: string, payload: Partial<CreateMedicinePayload>): Promise<Datum> => {
    const response = await apiClient.patch(`${API_BASE}/${id}`, payload)
    return response.data as Datum
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`${API_BASE}/${id}`)
  },
}
