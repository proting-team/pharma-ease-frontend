import httpClient from '../providers/providers'

export interface MedicineSale {
  medicineId: string;
  quantity: number;
  unitPrice: number;
}

export interface CreateTransactionPayload {
  transactionDate: Date | string;
  cashReceived: number;
  medicines: MedicineSale[];
}

export const transactionApi = {
  create: async (payload: CreateTransactionPayload) => {
    const response = await httpClient.post('/finances/transactions', payload)
    return response.data
  },

  getAll: async (page = 1, perPage = 10) => {
    const response = await httpClient.get('/finances/transactions', {
      params: { page, perPage }
    })
    return response.data
  },
}
