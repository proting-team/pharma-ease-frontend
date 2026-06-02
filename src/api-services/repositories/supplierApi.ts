import apiClient from '../providers/providers'
import type { Datum, Suppliers } from '../models/interfaces/suppliers.interface'

export interface CreateSupplierPayload {
  companyName: string
  phoneNumber: string
  contactName?: string
  supplierEmail?: string
  status?: string
  address: string
  licenseNumber: string
}

export type UpdateSupplierPayload = Partial<CreateSupplierPayload>

export const supplierApi = {
  async getAll(page = 1, perPage = 10): Promise<Suppliers> {
    const response = await apiClient.get('/suppliers', {
      params: { page, perPage },
    })
    return response.data as Suppliers
  },

  async getById(id: string): Promise<Datum> {
    const response = await apiClient.get(`/suppliers/${id}`)
    return response.data as Datum
  },

  async create(payload: CreateSupplierPayload): Promise<Datum> {
    const response = await apiClient.post('/suppliers', payload)
    return response.data as Datum
  },

  async update(id: string, payload: UpdateSupplierPayload): Promise<Datum> {
    const response = await apiClient.patch(`/suppliers/${id}`, payload)
    return response.data as Datum
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/suppliers/${id}`)
  },
}
