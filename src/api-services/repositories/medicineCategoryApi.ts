import apiClient from '../providers/providers'
import type { MedicineCategories, Datum } from '../models/interfaces/medicine_categories.interface'

export interface CreateMedicineCategoryPayload {
  categoryName: string
  description?: string
}

export type UpdateMedicineCategoryPayload = Partial<CreateMedicineCategoryPayload>

export const medicineCategoryApi = {
  async getAll(page = 1, perPage = 10): Promise<MedicineCategories> {
    const response = await apiClient.get('/medicine-data/medicine-categories', {
      params: { page, perPage },
    })
    return response.data as MedicineCategories
  },

  async getById(id: string): Promise<Datum> {
    const response = await apiClient.get(`/medicine-data/medicine-categories/${id}`)
    return response.data as Datum
  },

  async create(payload: CreateMedicineCategoryPayload): Promise<Datum> {
    const response = await apiClient.post('/medicine-data/medicine-categories', payload)
    return response.data as Datum
  },

  async update(id: string, payload: UpdateMedicineCategoryPayload): Promise<Datum> {
    const response = await apiClient.patch(`/medicine-data/medicine-categories/${id}`, payload)
    return response.data as Datum
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/medicine-data/medicine-categories/${id}`)
  },
}
