
<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">

    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Medicine Storage</h1>
      <p class="text-sm text-gray-500 mt-1">Tempat Penyimpanan Obat Apotek Lamtama</p>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
      {{ error }}
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200">

      <div class="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 class="text-lg font-medium text-gray-800">Inventory Management</h2>

        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input
              v-model="searchQuery"
              @input="handleSearch"
              type="text"
              placeholder="Search medicines..."
              class="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-64"
            />
          </div>

          <button class="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>

          <button @click="isModalOpen = true" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            + Add New Medicine
          </button>

          <router-link to="/medicines/categories" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Category
          </router-link>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/50">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">No</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">SKU</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Supplier</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Expiry Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="loading">
              <td colspan="10" class="px-6 py-8 text-center text-gray-500">Loading inventory data...</td>
            </tr>
            <tr v-else-if="medicines.length === 0">
              <td colspan="10" class="px-6 py-8 text-center text-gray-500">No medicines found.</td>
            </tr>
            <tr v-else v-for="(item, index) in medicines" :key="item.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600">{{ getRowNumber(index) }}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ item.medicineName }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.sku }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.category?.categoryName || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.supplier?.supplierName || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-600 font-semibold">{{ item.stock }}</td>
              <td class="px-6 py-4 text-sm">
                <span :class="getStockBadgeClass(item.stock || 0)" class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ getStockLabel(item.stock || 0) }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(item.expiredDate) }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ formatCurrency(item.price || 0) }}</td>
              <td class="px-6 py-4 text-sm text-right space-x-3">
                <button class="text-orange-400 hover:text-orange-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button @click="handleDelete(item.id)" class="text-red-400 hover:text-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <span class="text-sm text-gray-500">
          Showing {{ showingStart }} to {{ showingEnd }} of {{ totalItems }} entries
        </span>
        <div class="flex gap-2">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 border rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Prev</button>
          <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 border rounded text-sm disabled:opacity-50 hover:bg-gray-50 transition-colors">Next</button>
        </div>
      </div>
    </div>

    <AddMedicineModal :is-open="isModalOpen" @close="isModalOpen = false" @refresh="fetchMedicines" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
// Pastikan path AddMedicineModal benar sesuai letak filenya
import AddMedicineModal from '../../components/AddMedicineModal.vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'
import type { Datum } from '@/api-services/models/interfaces/medicine.interface'

const isModalOpen = ref(false)
const medicines = ref<Datum[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// State Pagination & Search
const currentPage = ref(1)
const itemsPerPage = ref(10)
const totalItems = ref(0)
const searchQuery = ref('')
let searchTimeout: ReturnType<typeof setTimeout> | null = null

// --- FUNGSI API ---
const fetchMedicines = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await medicineApi.getAll(currentPage.value, itemsPerPage.value, searchQuery.value)

    // Asumsikan payload data dari API tersimpan dalam property "data"
    medicines.value = response.data || []

    if (response.meta) {
      totalItems.value = response.meta.total || 0
      currentPage.value = response.meta.currentPage || 1
    }
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Failed to load medicines'
  } finally {
    loading.value = false
  }
}

const handleDelete = async (id: string | undefined) => {
  if (!id) return
  if (!confirm('Are you sure you want to delete this medicine?')) return
  try {
    await medicineApi.delete(id)
    fetchMedicines() // Auto refresh tabel setelah hapus
  } catch (err: unknown) {
    alert(err instanceof Error ? err.message : 'Failed to delete medicine')
  }
}

// --- FUNGSI FORMATTING ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount)
}

const formatDate = (dateValue: Date | string | undefined) => {
  if (!dateValue) return '-'
  return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateValue as string))
}

// --- FUNGSI STATUS STOCK ---
const getStockLabel = (stock: number) => {
  if (stock <= 0) return 'Out of Stock'
  if (stock <= 20) return 'Low Stock'
  if (stock <= 50) return 'Medium'
  return 'In Stock'
}

const getStockBadgeClass = (stock: number) => {
  if (stock <= 0) return 'bg-red-100 text-red-700 border border-red-200'
  if (stock <= 20) return 'bg-orange-100 text-orange-700 border border-orange-200'
  if (stock <= 50) return 'bg-blue-100 text-blue-700 border border-blue-200'
  return 'bg-green-100 text-green-700 border border-green-200'
}

const totalPages = computed(() => Math.max(1, Math.ceil(totalItems.value / itemsPerPage.value)))
const showingStart = computed(() => totalItems.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1)
const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value))

const getRowNumber = (index: number) => showingStart.value + index

const prevPage = () => { if (currentPage.value > 1) { currentPage.value--; fetchMedicines() } }
const nextPage = () => { if (currentPage.value < totalPages.value) { currentPage.value++; fetchMedicines() } }

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchMedicines()
  }, 500)
}

// --- LIFECYCLE ---
onMounted(() => {
  fetchMedicines()
})
</script>
