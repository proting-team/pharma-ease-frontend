import apiClient from '../providers/providers'
import type { LoginRequest, LoginResponse } from '../models/interfaces/auth.interface'

export const authApi = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>('/auth/sign-in', credentials)
    return response.data
  },
}
