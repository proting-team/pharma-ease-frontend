import { ref } from 'vue'
import { defineStore } from 'pinia'

export interface User {
  name: string
  role: string
  avatarInitials: string
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(localStorage.getItem('auth_token') === 'true')
  const user = ref<User | null>(
    localStorage.getItem('auth_token') === 'true'
      ? {
          name: 'Miss Felicia Ritchie MD',
          role: 'Owner',
          avatarInitials: 'MF',
        }
      : null
  )

  function login(_email: string) {
    isAuthenticated.value = true
    user.value = {
      name: 'Miss Felicia Ritchie MD',
      role: 'Owner',
      avatarInitials: 'MF',
    }
    localStorage.setItem('auth_token', 'true')
  }

  function logout() {
    isAuthenticated.value = false
    user.value = null
    localStorage.removeItem('auth_token')
  }

  return { isAuthenticated, user, login, logout }
})
