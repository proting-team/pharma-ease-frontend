<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 font-sans">
    <div class="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <!-- Decorative top gradient bar -->
      <div class="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-green-600 to-emerald-700"></div>

      <!-- App Logo and Brand -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-12 h-12 bg-green-50 rounded-xl mb-4 text-[#11764B] text-2xl font-bold">
          ⚡
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Welcome to Pharma Ease</h1>
        <p class="text-sm text-gray-500 mt-1">Pharmacy Management System</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label for="email" class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Email Address</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
              </svg>
            </span>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              placeholder="name@company.com"
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] transition-shadow"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Password</label>
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </span>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              placeholder="••••••••"
              class="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] transition-shadow"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input type="checkbox" class="rounded border-gray-300 text-[#11764B] focus:ring-[#11764B]" />
            Remember me
          </label>
          <a href="#" class="text-sm font-semibold text-[#11764B] hover:text-[#158e5a]">Forgot Password?</a>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-[#11764B] hover:bg-[#158e5a] text-white font-semibold transition-all shadow-md active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="!isLoading">Sign In</span>
          <span v-else class="flex items-center justify-center">
            <div class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  isLoading.value = true
  // Simulate network request validation
  setTimeout(() => {
    authStore.login(email.value)
    isLoading.value = false
    router.push('/')
  }, 1000)
}
</script>
