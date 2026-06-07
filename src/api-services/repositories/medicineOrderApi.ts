import apiClient from '../providers/providers'
import type { MedicineOrders, Datum } from '../models/interfaces/medicine_order.interface'

export interface CreateMedicineOrderPayload {
  orderDate: string
  employeeId: string
  supplierId: string
  status?: string
  medicines: Array<{
    medicineId: string
    quantity: number
    unitPrice: number
  }>
}

export type UpdateMedicineOrderPayload = Partial<CreateMedicineOrderPayload>

export const medicineOrderApi = {
  async getAll(page = 1, perPage = 10): Promise<MedicineOrders> {
    const response = await apiClient.get('/finances/medicine-orders', {
      params: { page, perPage },
    })
    return response.data as MedicineOrders
  },

  async getById(id: string): Promise<Datum> {
    const response = await apiClient.get(`/finances/medicine-orders/${id}`)
    return response.data as Datum
  },

  async create(payload: CreateMedicineOrderPayload): Promise<Datum> {
    const response = await apiClient.post('/finances/medicine-orders', payload)
    return response.data as Datum
  },

  async update(id: string, payload: UpdateMedicineOrderPayload): Promise<Datum> {
    const response = await apiClient.patch(`/finances/medicine-orders/${id}`, payload)
    return response.data as Datum
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/finances/medicine-orders/${id}`)
  },
}
