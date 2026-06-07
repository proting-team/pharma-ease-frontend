<template>
    <div class="w-full">

        <div class="mb-6">
            <h2 class="text-3xl font-bold text-gray-900">User Management</h2>
            <p class="text-gray-500 text-sm mt-1">Kelola data pegawai dan hak akses sistem Apotek Lamtama</p>
        </div>

        <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm whitespace-pre-line">
            {{ error }}
        </div>

        <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
            <div v-if="flashMessage.show" :class="[
                'mb-4 p-4 rounded-lg border flex items-center gap-3',
                flashMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'
            ]">
                <svg v-if="flashMessage.type === 'success'" class="h-5 w-5 shrink-0" fill="none" stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg v-else class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <p class="text-sm font-medium">{{ flashMessage.text }}</p>
            </div>
        </transition>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div class="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
                <h3 class="text-lg font-semibold text-gray-800">Users List</h3>

                <div class="flex items-center gap-4">
                    <div class="relative">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </span>
                        <input v-model="searchQuery" type="text" placeholder="Search users..."
                            class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 transition-shadow" />
                    </div>

                    <button @click="openAddModal"
                        class="bg-[#11764B] hover:bg-[#158e5a] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4">
                            </path>
                        </svg>
                        Add User
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-gray-600">
                    <thead class="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
                        <tr>
                            <th class="px-6 py-4 w-16">No</th>
                            <th class="px-6 py-4">Name</th>
                            <th class="px-6 py-4">Emp ID</th>
                            <th class="px-6 py-4">Role</th>
                            <th class="px-6 py-4">Shift</th>
                            <th class="px-6 py-4">Salary</th>
                            <th class="px-6 py-4">Join Date</th>
                            <th class="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 bg-white">
                        <tr v-if="loading">
                            <td colspan="8" class="px-6 py-8 text-center text-gray-500">Loading...</td>
                        </tr>
                        <tr v-for="(item, index) in users" :key="item.id" class="hover:bg-gray-50 transition-colors">
                            <td class="px-6 py-4 font-medium text-gray-900">{{ calculateNumber(index) }}</td>
                            <td class="px-6 py-4">
                                <div class="font-semibold text-gray-800">{{ item.name }}</div>
                                <div class="text-xs text-gray-500">{{ item.email }}</div>
                            </td>
                            <td class="px-6 py-4 text-gray-600">{{ item.empId }}</td>
                            <td class="px-6 py-4">
                                <span :class="[
                                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize',
                                    item.role === 'ADMIN' ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-gray-50 text-gray-700 border-gray-200'
                                ]">
                                    {{ item.role }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-gray-600 capitalize">{{ displayShift(item.shift) }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ formatMoney(item.salary) }}</td>
                            <td class="px-6 py-4 text-gray-600">{{ formatDate(item.startDate) }}</td>
                            <td class="px-6 py-4 flex justify-center gap-3">
                                <button @click="openEditModal(item)"
                                    class="text-orange-400 hover:text-orange-600 transition-colors" title="Edit User">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                                        </path>
                                    </svg>
                                </button>
                                <button @click="deleteUser(item.id)"
                                    class="text-red-400 hover:text-red-600 transition-colors" title="Delete User">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                                        </path>
                                    </svg>
                                </button>
                            </td>
                        </tr>

                        <tr v-if="!loading && users.length === 0">
                            <td colspan="8" class="px-6 py-12 text-center text-gray-500">
                                <div class="flex flex-col items-center justify-center gap-2">
                                    <svg class="h-8 w-8 opacity-50" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z">
                                        </path>
                                    </svg>
                                    <p>No User found.</p>
                                </div>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>

            <div v-if="meta" class="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
                <span class="text-sm text-gray-500">Showing page {{ meta.currentPage }} of {{ meta.lastPage }}</span>
                <div class="flex items-center gap-1">
                    <button :disabled="!meta.prev" @click="goToPage(meta.prev ?? null)"
                        class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">&lt;</button>
                    <button class="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-gray-800 font-medium">{{
                        meta.currentPage }}</button>
                    <button :disabled="!meta.next" @click="goToPage(meta.next ?? null)"
                        class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50">&gt;</button>
                </div>
            </div>

        </div>
    </div>

    <div v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">

        <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">

            <div class="flex justify-between items-center p-5 border-b border-gray-100">
                <h3 class="font-bold text-lg text-gray-800">{{ isEditMode ? 'Edit User' : 'Add New User' }}</h3>
                <button @click="closeModal" class="text-gray-400 hover:text-gray-700 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12">
                        </path>
                    </svg>
                </button>
            </div>

            <div class="p-5 overflow-y-auto">
                <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm whitespace-pre-line">
                    <strong class="block mb-1">Error:</strong>
                    {{ error }}
                </div>

                <form id="userForm" @submit.prevent="submitForm">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input v-model="form.name" type="text" placeholder="e.g., John Doe"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                            <input v-model="form.empId" type="text" placeholder="e.g., EMP-001"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input v-model="form.email" type="email" placeholder="e.g., user@lamtama.com"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                required />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input v-model="form.password" type="password" placeholder="Min. 6 characters"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                :required="!isEditMode" />
                            <p class="text-xs text-amber-600 mt-1">Min. 4 karakter, minimal 2 huruf besar &amp; 3 angka (contoh: JhonDoe-123)</p>
                            <p v-if="isEditMode" class="text-xs text-gray-500 mt-1">Kosongkan jika tidak ingin mengubah password</p>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <select v-model="form.role"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                required>
                                <option value="" disabled>Select Role</option>
                                <option v-for="role in rolesList" :key="role.value" :value="role.value">{{ role.label }}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Shift</label>
                            <select v-model="form.shift"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]">
                                <option value="">None</option>
                                <option v-for="shift in shiftsList" :key="shift.value" :value="shift.value">{{ shift.label }}</option>
                            </select>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                            <input v-model="form.salary" type="number" placeholder="e.g., 5000000"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]" />
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <input v-model="form.dateOfBirth" type="date"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                required />
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                            <input v-model="formDateInput" type="date"
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                                required />
                        </div>

                        <div class="md:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
                            <textarea v-model="form.address" rows="3" placeholder="Full address..."
                                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] resize-none"
                                required></textarea>
                        </div>

                    </div>
                </form>
            </div>

            <div class="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                <button @click="closeModal" type="button"
                    class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
                    Cancel
                </button>
                <button form="userForm" type="submit" :disabled="isSubmitting"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors">
                    {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update User' : 'Save User') }}
                </button>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import type { Datum, Meta } from '../api-services/models/interfaces/users.interface'
import { employeeApi } from '@/api-services/repositories/employeeApi'
import type { CreateEmployeePayload, UpdateEmployeePayload } from '@/api-services/repositories/employeeApi'

const users = ref<Datum[]>([])
const meta = ref<Meta | undefined>(undefined)
const loading = ref(false)
const error = ref<string | null>(null)

const searchQuery = ref('')
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<string | null>(null)
const isSubmitting = ref(false)

// Helper to extract error message from axios/backend responses
function getErrorMessage(e: unknown, fallback: string): string {
  console.error('[UserManagement] API Error:', e)

  if (e && typeof e === 'object' && 'response' in e) {
    const axiosErr = e as {
      response?: {
        data?: Record<string, unknown>;
        status?: number;
        config?: { url?: string; method?: string };
      }
    }
    const data = axiosErr.response?.data
    if (!data) return fallback

    // Log full response body for debugging
    console.log('[UserManagement] Error response body:', JSON.stringify(data, null, 2))

    // NestJS validation errors (class-validator format: { message: string[], error: string, statusCode: number })
    if (Array.isArray(data.message)) {
      return (data.message as string[]).map((m: string) => `• ${m}`).join('\n')
    }

    // NestJS/Multer/HTTP error with string message
    if (typeof data.message === 'string') {
      return `[${axiosErr.response?.status ?? 'Error'}] ${data.message}`
    }

    // NestJS custom errors array (e.g. { errors: [...] })
    if (Array.isArray(data.errors) && data.errors.length > 0) {
      const first = data.errors[0]
      if (typeof first === 'object' && 'property' in first) {
        return (data.errors as Array<{ property: string; errors: string[] }>)
          .map((err) => `• ${err.property}: ${err.errors.join(', ')}`)
          .join('\n')
      }
      return (data.errors as string[]).join('\n')
    }

    // Generic response
    return `[${axiosErr.response?.status ?? ''}] ${JSON.stringify(data)}`
  }

  if (e instanceof Error) {
    return `${e.name}: ${e.message}`
  }

  return fallback
}

// Enum mappings between frontend display and backend enums
const rolesList = [
  { value: 'ADMIN', label: 'Admin' },
  { value: 'CASHIER', label: 'Cashier' },
  { value: 'PHARMACIST', label: 'Pharmacist' },
  { value: 'OWNER', label: 'Owner' },
]

const shiftsList = [
  { value: 'DAY', label: 'Morning' },
  { value: 'EVENING', label: 'Afternoon' },
  { value: 'NIGHT', label: 'Night' },
]

const displayShift = (shift?: string) => {
  const map: Record<string, string> = {
    DAY: 'Morning',
    EVENING: 'Afternoon',
    NIGHT: 'Night',
  }
  return shift ? (map[shift] || shift) : '-'
}

// Form State
const form = ref({
  name: '',
  empId: '',
  email: '',
  password: '',
  role: '',
  shift: '',
  salary: 0,
  dateOfBirth: '',
  address: '',
})
const formDateInput = ref('')

const flashMessage = ref({ show: false, text: '', type: 'success' })
const showFlash = (text: string, type: 'success' | 'error') => {
    flashMessage.value = { show: true, text, type }
    setTimeout(() => flashMessage.value.show = false, 3000)
}

const calculateNumber = (index: number) => {
    if (!meta.value) return index + 1
    return index + 1 + ((meta.value.currentPage || 1) - 1) * (meta.value.perPage || 10)
}

const formatMoney = (amount?: number) => {
    if (amount === undefined) return 'Rp 0'
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
}

const formatDate = (date?: Date | string) => {
    if (!date) return '-'
    const d = new Date(date)
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

const fetchUsers = async (resetPage = false) => {
    loading.value = true
    error.value = null
    try {
        if (resetPage && meta.value) {
            meta.value.currentPage = 1
        }
        const page = meta.value?.currentPage ?? 1
        const perPage = meta.value?.perPage ?? 10
        const result = await employeeApi.getAll(page, perPage, searchQuery.value || undefined)
        users.value = result.data ?? []
        meta.value = result.meta ?? undefined
    } catch (e) {
        error.value = getErrorMessage(e, 'Failed to load users')
    } finally {
        loading.value = false
    }
}

const goToPage = (page: number | null | undefined) => {
    if (!page) return
    if (meta.value) meta.value.currentPage = page
    fetchUsers()
}

// Form
const openAddModal = () => {
    isEditMode.value = false
    form.value = { name: '', empId: '', email: '', password: '', role: '', shift: '', salary: 0, dateOfBirth: '', address: '' }
    formDateInput.value = ''
    isModalOpen.value = true
}

const openEditModal = (item: Datum) => {
    isEditMode.value = true
    editingId.value = item.id ?? null
    form.value = {
        name: item.name ?? '',
        empId: item.empId ?? '',
        email: item.email ?? '',
        password: '',
        role: item.role ?? '',
        shift: item.shift ?? '',
        salary: item.salary ?? 0,
        dateOfBirth: item.dateOfBirth ? (new Date(item.dateOfBirth).toISOString().split('T')[0] || '') : '',
        address: ((item as any).address ?? (item as any).alamat ?? '') as string,
    }

    if (item.startDate) {
        const d = new Date(item.startDate)
        formDateInput.value = d.toISOString().split('T')[0] || ''
    }
    isModalOpen.value = true
}

const closeModal = () => {
    isModalOpen.value = false
    isEditMode.value = false
    editingId.value = null
    error.value = null
}

const submitForm = async () => {
    isSubmitting.value = true
    error.value = null
    try {
        const payload = {
            name: form.value.name,
            empId: form.value.empId,
            email: form.value.email,
            role: form.value.role,
            salary: form.value.salary,
            status: 'ACTIVE',
            shift: form.value.shift || 'DAY',
            startDate: new Date(formDateInput.value).toISOString(),
            dateOfBirth: form.value.dateOfBirth ? new Date(form.value.dateOfBirth).toISOString() : undefined,
            address: form.value.address,
        }

        if (isEditMode.value && editingId.value) {
            const updatePayload: UpdateEmployeePayload = { ...payload }
            if (form.value.password) {
                updatePayload.password = form.value.password
            }
            console.log('[UserManagement] PATCH payload:', JSON.stringify(updatePayload, null, 2))
            await employeeApi.update(editingId.value, updatePayload)
            showFlash('User updated successfully!', 'success')
        } else {
            const createPayload: CreateEmployeePayload = { ...payload, password: form.value.password }
            console.log('[UserManagement] POST payload:', JSON.stringify(createPayload, null, 2))
            await employeeApi.create(createPayload)
            showFlash('New user added successfully!', 'success')
        }
        closeModal()
        fetchUsers()
    } catch (e) {
        showFlash('Failed to save user.', 'error')
        error.value = getErrorMessage(e, 'Failed to save user.')
    } finally {
        isSubmitting.value = false
    }
}

const deleteUser = async (id?: string) => {
    if (!id) return
    if (!confirm('Are you sure you want to delete this user?')) return

    error.value = null
    try {
        await employeeApi.delete(id)
        showFlash('User deleted successfully!', 'success')
        fetchUsers()
    } catch (e) {
        showFlash('Failed to delete user.', 'error')
        error.value = getErrorMessage(e, 'Failed to delete user.')
    }
}

// Debounced live search — tunggu 400ms setelah user berhenti ngetik
let searchTimeout: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, () => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
        fetchUsers(true)
    }, 400)
})

onMounted(() => {
    fetchUsers()
})
</script>