import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { LoginRequest } from '@/api-services/models/interfaces/auth.interface'
import { authApi } from '@/api-services/repositories/authApi'

interface JwtPayload {
  email?: string
  role?: string
  sub?: string
  [key: string]: unknown
}

/** Decode JWT payload (base64) without verification — for display purposes only */
function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    return JSON.parse(atob(parts[1] ?? '')) as JwtPayload
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const user = ref<{
    id: string
    name: string
    email: string
    role: string
    shift: string
    profileAvatar: string | null
  } | null>(null)

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
    const apiResponse: any = await authApi.login(credentials)

    // Handle both { data: { access_token } } and { access_token } backend structures
    const responseData = apiResponse.access_token ? apiResponse : apiResponse.data
    
    if (!responseData || !responseData.access_token) {
      throw new Error("Format response dari server tidak sesuai, access_token tidak ditemukan.")
    }

    token.value = responseData.access_token

    // Some backend versions may not return the full user object.
    // Fallback: decode JWT to get email/role/sub, then build a user stub.
    if (responseData.user) {
      user.value = responseData.user
    } else {
      const payload = decodeJwtPayload(responseData.access_token)
      const email = payload?.email ?? credentials.email
      const role = payload?.role ?? ''
      const sub = payload?.sub ?? ''
      const fallbackName = email.split('@')[0] ?? email

      user.value = {
        id: sub,
        name: fallbackName,
        email,
        role,
        shift: '',
        profileAvatar: null,
      }
    }

    localStorage.setItem('auth_token', responseData.access_token)
    localStorage.setItem('auth_user', JSON.stringify(user.value))
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
