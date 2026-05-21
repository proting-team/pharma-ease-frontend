import type { Datum } from '../models/interfaces/suppliers.interface'

const API_BASE = '/api/suppliers'

export interface CreateSupplierPayload {
  supplierName: string
  contactPerson?: string
  phoneNumber: string
  address: string
}

export interface UpdateSupplierPayload extends Partial<CreateSupplierPayload> {
  status?: string
}

export const supplierApi = {
  async getAll(): Promise<Datum[]> {
    const response = await fetch(API_BASE)
    if (!response.ok) throw new Error('Failed to fetch suppliers')
    const data = await response.json()
    return data.data ?? []
  },

  async getById(id: string): Promise<Datum> {
    const response = await fetch(`${API_BASE}/${id}`)
    if (!response.ok) throw new Error('Failed to fetch supplier')
    return response.json()
  },

  async create(payload: CreateSupplierPayload): Promise<Datum> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to create supplier')
    return response.json()
  },

  async update(id: string, payload: UpdateSupplierPayload): Promise<Datum> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!response.ok) throw new Error('Failed to update supplier')
    return response.json()
  },

  async delete(id: string): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete supplier')
  },
}
