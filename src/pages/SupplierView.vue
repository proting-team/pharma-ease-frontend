<template>
  <div class="w-full">
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-900">Suppliers List</h2>
      <p class="text-gray-500 text-sm mt-1">List dari para pemasok obat pada Apotek Lamtama</p>
    </div>

    <div
      v-if="error"
      class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm whitespace-pre-line"
    >
      {{ error }}
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
        <h3 class="text-lg font-semibold text-gray-800">Supplier Management</h3>

        <div class="flex items-center gap-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search suppliers..."
              class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 transition-shadow"
            />
          </div>

          <button
            @click="openAddModal"
            class="bg-[#11764B] hover:bg-[#158e5a] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add Supplier
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 w-16">No</th>
              <th class="px-6 py-4">Company Name</th>
              <th class="px-6 py-4">Contact Name</th>
              <th class="px-6 py-4">Phone</th>
              <th class="px-6 py-4">Address</th>
              <th class="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">Loading...</td>
            </tr>
            <tr v-else-if="filteredSuppliers.length === 0">
              <td colspan="6" class="px-6 py-8 text-center text-gray-500">No suppliers found</td>
            </tr>
            <tr
              v-for="(supplier, index) in filteredSuppliers"
              :key="supplier.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 font-medium text-gray-900">{{ showingStart + index }}</td>
              <td class="px-6 py-4 font-semibold text-gray-800">{{ supplier.companyName }}</td>
              <td class="px-6 py-4 text-gray-600">{{ supplier.contactName || '-' }}</td>
              <td class="px-6 py-4 text-gray-600">{{ supplier.phoneNumber }}</td>
              <td class="px-6 py-4 text-gray-500 truncate max-w-xs">{{ supplier.address }}</td>
              <td class="px-6 py-4 flex justify-center gap-3">
                <button
                  @click="openEditModal(supplier)"
                  class="text-orange-400 hover:text-orange-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                </button>
                <button
                  @click="handleDelete(supplier.id)"
                  class="text-red-400 hover:text-red-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
        <span class="text-sm text-gray-500">
          Showing {{ showingStart }} to {{ showingEnd }} of {{ totalItems }} results
        </span>
        <div class="flex items-center gap-1">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &lt;
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="[
              'px-3 py-1 border border-gray-300 rounded transition-colors',
              currentPage === page
                ? 'bg-gray-100 text-gray-800 font-medium'
                : 'text-gray-600 hover:bg-gray-50',
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity"
    >
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 class="font-bold text-lg text-gray-800">
            {{ isEditMode ? 'Edit Supplier' : 'Add New Supplier' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="p-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input
                v-model="form.companyName"
                type="text"
                placeholder="e.g., PT. Farma Jaya"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                required
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input
                  v-model="form.contactName"
                  type="text"
                  placeholder="e.g., Budi Santoso"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  v-model="form.phoneNumber"
                  type="text"
                  placeholder="e.g., 08123456789"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                  required
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Email</label>
                <input
                  v-model="form.supplierEmail"
                  type="email"
                  placeholder="e.g., supplier@example.com"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                <input
                  v-model="form.licenseNumber"
                  type="text"
                  placeholder="e.g., LIC-001"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
                  required
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                v-model="form.address"
                rows="2"
                placeholder="Full address (min. 7 characters)..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] resize-none"
                required
              ></textarea>
            </div>

            <div v-if="isEditMode">
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B]"
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          </div>

          <div class="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
            <button
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-[#11764B] hover:bg-[#158e5a] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ isSubmitting ? 'Saving...' : isEditMode ? 'Update Supplier' : 'Save Supplier' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import type { Datum, Meta } from '@/api-services/models/interfaces/suppliers.interface'
import { supplierApi } from '@/api-services/repositories/supplierApi'

// Helper to extract error message from axios/backend responses
function getErrorMessage(e: unknown, fallback: string): string {
  if (e && typeof e === 'object' && 'response' in e) {
    const data = (
      e as {
        response?: {
          data?: { message?: string; errors?: Array<{ property: string; errors: string[] }> }
        }
      }
    ).response?.data
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.map((err) => `• ${err.property}: ${err.errors.join(', ')}`).join('\n')
    }
    return data?.message || fallback
  }
  return e instanceof Error ? e.message : fallback
}

// --- MODAL STATE ---
const isModalOpen = ref(false)
const isEditMode = ref(false)
const isSubmitting = ref(false)
const editingId = ref<string | null>(null)

// --- DATA STATE ---
const suppliers = ref<Datum[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const meta = ref<Meta | null>(null)

// --- FORM STATE ---
const form = ref({
  companyName: '',
  contactName: '',
  phoneNumber: '',
  supplierEmail: '',
  address: '',
  licenseNumber: '',
  status: 'ACTIVE',
})

// --- PAGINATION STATE ---
const itemsPerPage = ref(10)
const currentPage = ref(1)

// --- METHODS ---
const fetchSuppliers = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await supplierApi.getAll(currentPage.value, itemsPerPage.value)
    suppliers.value = result.data ?? []
    meta.value = result.meta ?? null
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to fetch suppliers')
  } finally {
    loading.value = false
  }
}

const openAddModal = () => {
  isEditMode.value = false
  editingId.value = null
  form.value = {
    companyName: '',
    contactName: '',
    phoneNumber: '',
    supplierEmail: '',
    address: '',
    licenseNumber: '',
    status: 'ACTIVE',
  }
  isModalOpen.value = true
}

const openEditModal = (supplier: Datum) => {
  isEditMode.value = true
  editingId.value = supplier.id ?? null
  form.value = {
    companyName: supplier.companyName ?? '',
    contactName: supplier.contactName ?? '',
    phoneNumber: supplier.phoneNumber ?? '',
    supplierEmail: supplier.supplierEmail ?? '',
    address: supplier.address ?? '',
    licenseNumber: supplier.licenseNumber ?? '',
    status: supplier.status ?? 'ACTIVE',
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  editingId.value = null
}

const handleSubmit = async () => {
  isSubmitting.value = true
  error.value = null
  try {
    if (isEditMode.value && editingId.value) {
      await supplierApi.update(editingId.value, {
        companyName: form.value.companyName.trim(),
        contactName: form.value.contactName ? form.value.contactName.trim() : undefined,
        phoneNumber: form.value.phoneNumber.trim(),
        supplierEmail: form.value.supplierEmail ? form.value.supplierEmail.trim() : undefined,
        address: form.value.address.trim(),
        licenseNumber: form.value.licenseNumber.trim(),
        status: form.value.status,
      })
    } else {
      await supplierApi.create({
        companyName: form.value.companyName.trim(),
        phoneNumber: form.value.phoneNumber.trim(),
        contactName: form.value.contactName.trim(),
        supplierEmail: form.value.supplierEmail.trim(),
        address: form.value.address.trim(),
        licenseNumber: form.value.licenseNumber.trim(),
        status: form.value.status,
      })
    }
    closeModal()
    // Refresh the list to reflect changes
    await fetchSuppliers()
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to save supplier')
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id: string | undefined) => {
  if (!id) return
  if (!confirm('Are you sure you want to delete this supplier?')) return
  error.value = null
  try {
    await supplierApi.delete(id)
    // Refresh the list after deletion
    await fetchSuppliers()
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to delete supplier')
  }
}

// --- COMPUTED PROPERTIES ---
const filteredSuppliers = computed((): Datum[] => {
  if (!searchQuery.value) return suppliers.value
  const query = searchQuery.value.toLowerCase()
  return suppliers.value.filter(
    (s) =>
      s.companyName?.toLowerCase().includes(query) ||
      (s.contactName ?? '').toLowerCase().includes(query) ||
      s.phoneNumber?.includes(query),
  )
})

const totalItems = computed(() => {
  // When searching, use local filtered count; otherwise use API meta
  if (searchQuery.value) return filteredSuppliers.value.length
  return meta.value?.total ?? filteredSuppliers.value.length
})
const totalPages = computed(() => {
  if (searchQuery.value) return Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value))
  return meta.value?.lastPage ?? Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value))
})

const showingStart = computed(() => {
  if (totalItems.value === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  if (meta.value) {
    return Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
  }
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
})

// --- PAGINATION FUNCTIONS ---
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
}

// Reset to page 1 when searching
watch(searchQuery, () => {
  currentPage.value = 1
})

// Re-fetch when page changes
watch(currentPage, () => {
  fetchSuppliers()
})

// --- LIFECYCLE ---
onMounted(() => {
  fetchSuppliers()
})
</script>
