import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginRequest, LoginResponse } from '@/api-services/models/interfaces/auth.interface'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<LoginResponse['user'] | null>(null)

  // Load user from localStorage on init
  const storedUser = localStorage.getItem('auth_user')
  if (storedUser) {
    try {
      user.value = JSON.parse(storedUser)
    } catch {
      localStorage.removeItem('auth_user')
    }
  }

  const isAuthenticated = computed(() => !!token.value)
  const userRole = computed(() => user.value?.role ?? null)
  const userName = computed(() => user.value?.name ?? '')
  const userInitials = computed(() => {
    if (!user.value?.name) return '??'
    return user.value.name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  async function login(credentials: LoginRequest): Promise<void> {
    // TODO: Ganti dengan panggilan API nyata
    // const response = await authApi.login(credentials)
    // Simulasi login untuk development
    const mockResponse: LoginResponse = {
      status: 200,
      message: 'Login successful',
      token: 'mock_token_' + Date.now(),
      user: {
        id: '1',
        name: 'Miss Felicia Ritchie MD',
        email: credentials.email,
        role: 'owner',
        shift: 'morning',
        profileAvatar: null,
      },
    }

    token.value = mockResponse.token
    user.value = mockResponse.user

    localStorage.setItem('auth_token', mockResponse.token)
    localStorage.setItem('auth_user', JSON.stringify(mockResponse.user))
  }

  function logout(): void {
    token.value = null
    user.value = null
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
  }

  return {
    token,
    user,
    isAuthenticated,
    userRole,
    userName,
    userInitials,
    login,
    logout,
  }
})
