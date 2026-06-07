<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-emerald-50 px-4 py-8">
    <div class="w-full max-w-md bg-white py-8 px-4 shadow-xl shadow-black/5 border border-gray-200 sm:rounded-xl sm:px-10 relative overflow-hidden">

    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
      <div class="mx-auto h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4 ring-1 ring-emerald-100 shadow-sm">
        <ActivityIcon class="h-8 w-8 text-emerald-600" />
      </div>
      <h2 class="text-2xl font-bold tracking-tight text-gray-900">Pharma Ease</h2>
      <p class="mt-2 text-sm text-gray-500">
        Welcome back! Please login to your account
      </p>
    </div>

    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">

      <div v-if="successMessage" class="mb-4 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-3">
        <CheckCircleIcon class="h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <h4 class="font-semibold text-sm">Success</h4>
          <p class="text-sm">{{ successMessage }}</p>
        </div>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0">

      <div v-if="errorMessage" class="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center gap-3">
        <AlertCircleIcon class="h-5 w-5 shrink-0 text-red-600" />
        <div>
          <h4 class="font-semibold text-sm">Error</h4>
          <p class="text-sm">{{ errorMessage }}</p>
        </div>
      </div>
    </Transition>

    <form class="space-y-5" @submit.prevent="handleLogin">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-900 mb-1">Email Address</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="email"
            type="email"
            v-model="form.email"
            autocomplete="email"
            required
            :class="[
              'block w-full rounded-lg border bg-white pl-10 pr-3 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all shadow-sm',
              errors.email ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Enter your email">
        </div>
        <p v-if="errors.email" class="text-xs text-red-500 mt-1">{{ errors.email }}</p>
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockIcon class="h-5 w-5 text-gray-500" />
          </div>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="form.password"
            required
            :class="[
              'block w-full rounded-lg border bg-white pl-10 pr-10 py-2.5 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 transition-all shadow-sm',
              errors.password ? 'border-red-500' : 'border-gray-300'
            ]"
            placeholder="Enter your password">

          <button
            type="button"
            @click="togglePassword"
            class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer focus:outline-none">
            <EyeOffIcon v-if="showPassword" class="h-4 w-4" />
            <EyeIcon v-else class="h-4 w-4" />
          </button>
        </div>
        <p v-if="errors.password" class="text-xs text-red-500 mt-1">{{ errors.password }}</p>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            type="checkbox"
            v-model="form.rememberMe"
            class="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-600 bg-white cursor-pointer">
          <label for="remember-me" class="ml-2 block text-sm text-gray-500 cursor-pointer select-none">
            Remember me
          </label>
        </div>

        <div class="text-sm">
          <a :href="forgotPasswordUrl" class="font-medium text-emerald-600 hover:text-emerald-800 transition-colors">
            Forgot Password?
          </a>
        </div>
      </div>

      <div>
        <button
          type="submit"
          :disabled="isLoading"
          class="flex w-full justify-center rounded-lg bg-emerald-600 px-3 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all active:scale-[0.98] disabled:opacity-70">
          <span v-if="isLoading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>
      </div>
    </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import {
  ActivityIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()

const forgotPasswordUrl = '/forgot-password'

// State untuk Form Binding
const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

// State untuk UI
const showPassword = ref(false)
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')
const errors = ref<{ email?: string; password?: string }>({})

// Fungsi untuk toggle password
const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Validasi form
const validateForm = (): boolean => {
  const newErrors: { email?: string; password?: string } = {}

  if (!form.value.email) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    newErrors.email = 'Please enter a valid email'
  }

  if (!form.value.password) {
    newErrors.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}  // Helper untuk extract error message dari berbagai format error backend
function extractErrorMessage(err: any): string {
  if (!err) return 'Login failed. Please check your credentials.'

  // Network error (koneksi terputus, server down)
  if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
    return 'Cannot connect to server. Please make sure the backend is running.'
  }

  // Timeout
  if (err.code === 'ECONNABORTED') {
    return 'Connection timed out. Please try again.'
  }

  const data = err.response?.data
  if (!data) return err.message || 'Login failed. Please check your credentials.'

  // Format 1: NestJS validation error - { message: "Input Validation is Failed", errors: [{ property, errors }] }
  if (data.errors && Array.isArray(data.errors)) {
    // Ambil pesan error pertama yang ditemukan
    const firstError = data.errors[0]
    if (firstError?.errors?.length > 0) {
      return firstError.errors[0]
    }
    return data.message || 'Input validation failed'
  }

  // Format 2: NestJS HTTP exception - { statusCode: 401, message: "credential is not valid", error: "Unauthorized" }
  if (data.statusCode && typeof data.message === 'string') {
    return data.message
  }

  // Format 3: Array of messages (kadang NestJS balikin array)
  if (Array.isArray(data.message)) {
    return data.message[0] || 'Login failed'
  }

  // Format 4: Custom error message
  if (typeof data.message === 'string') {
    return data.message
  }

  return err.message || 'Login failed. Please check your credentials.'
}

// Fungsi handle submit login
const handleLogin = async () => {
  if (!validateForm()) return

  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    const payload = {
      email: form.value.email.trim(),
      password: form.value.password.trim(),
    }
    
    await authStore.login(payload)
    successMessage.value = 'Login successful! Redirecting...'
    setTimeout(() => {
      router.push({ name: 'home' })
    }, 500)
  } catch (err: any) {
    errorMessage.value = extractErrorMessage(err)
  } finally {
    isLoading.value = false
  }
}
</script>
