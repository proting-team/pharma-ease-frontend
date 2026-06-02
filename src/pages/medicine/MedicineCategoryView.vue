<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">
    
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Medicine Category</h1>
      <p class="text-sm text-gray-500 mt-1">Kategori Obat yang tersedia di Apotek Lamtama</p>
    </div>

    <!-- Error Alert -->
    <div v-if="error" class="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-start">
      <div class="flex-shrink-0">
        <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
        </svg>
      </div>
      <div class="ml-3">
        <p class="text-sm text-red-700 whitespace-pre-wrap">{{ error }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      
      <div class="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 class="text-lg font-medium text-gray-800">Category List</h2>
        
        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input v-model="searchQuery" type="text" placeholder="Search categories..." class="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-56" />
          </div>
          
          <button @click="openAddModal" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            + Add Category
          </button>
          
          <router-link to="/medicines" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Medicine
          </router-link>
        </div>
      </div>

      <div class="overflow-x-auto relative">
        <div v-if="loading" class="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>

        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/50">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-16">No</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-1/4">Category Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="filteredCategories.length === 0" class="hover:bg-gray-50 transition-colors">
              <td colspan="4" class="px-6 py-8 text-center text-sm text-gray-500">
                No categories found.
              </td>
            </tr>
            <tr v-for="(cat, index) in filteredCategories" :key="cat.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600">{{ showingStart + index }}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ cat.categoryName }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 truncate max-w-xl">{{ cat.description || '-' }}</td>
              <td class="px-6 py-4 text-sm text-right space-x-3">
                <button @click="openEditModal(cat)" class="text-orange-400 hover:text-orange-600" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button @click="handleDelete(cat.id)" class="text-red-400 hover:text-red-600" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <p class="text-sm text-gray-600">Showing {{ showingStart }} to {{ showingEnd }} of {{ totalItems }} results</p>
        <div class="flex border border-gray-300 rounded-md overflow-hidden bg-white">
          <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 hover:bg-gray-50 border-r border-gray-300 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">&lt;</button>
          <button class="px-3 py-1 bg-gray-100 border-r border-gray-300 text-gray-800 font-medium">{{ currentPage }}</button>
          <button @click="nextPage" :disabled="currentPage === totalPages || totalPages === 0" class="px-3 py-1 hover:bg-gray-50 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed">&gt;</button>
        </div>
      </div>
      
    </div>

    <!-- Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold text-gray-900">{{ isEditMode ? 'Edit Category' : 'Add New Category' }}</h3>
            <p class="text-xs text-gray-500 mt-1">{{ isEditMode ? 'Update existing category details.' : 'Add a new medicine category to organize your inventory.' }}</p>
          </div>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Category Name</label>
              <input v-model="form.categoryName" type="text" placeholder="e.g., Painkillers" required class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" />
            </div>
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <textarea v-model="form.description" rows="3" placeholder="Optional description..." class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"></textarea>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
            <button type="button" @click="closeModal" class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" :disabled="isSubmitting" class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Category' : 'Add Category') }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { medicineCategoryApi } from '@/api-services/repositories/medicineCategoryApi'
import type { Datum, Meta } from '@/api-services/models/interfaces/medicine_categories.interface'

// Helper to extract error message
function getErrorMessage(e: unknown, fallback: string): string {
  if (e && typeof e === 'object' && 'response' in e) {
    const data = (e as any).response?.data
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      return data.errors.map((err: any) =>
        `• ${err.property}: ${err.errors.join(', ')}`
      ).join('\n')
    }
    return data?.message || fallback
  }
  return e instanceof Error ? e.message : fallback
}

// State
const categories = ref<Datum[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')
const meta = ref<Meta | null>(null)

// Modal State
const isModalOpen = ref(false)
const isEditMode = ref(false)
const isSubmitting = ref(false)
const editingId = ref<string | null>(null)

const form = ref({
  categoryName: '',
  description: '',
})

// Pagination
const itemsPerPage = ref(10)
const currentPage = ref(1)

// Fetch Categories
const fetchCategories = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await medicineCategoryApi.getAll(currentPage.value, itemsPerPage.value)
    categories.value = result.data ?? []
    meta.value = result.meta ?? null
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to fetch categories')
  } finally {
    loading.value = false
  }
}

// Modal Actions
const openAddModal = () => {
  isEditMode.value = false
  editingId.value = null
  form.value = { categoryName: '', description: '' }
  isModalOpen.value = true
}

const openEditModal = (cat: Datum) => {
  isEditMode.value = true
  editingId.value = cat.id ?? null
  form.value = {
    categoryName: cat.categoryName ?? '',
    description: cat.description ?? '',
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
    const payload = {
      categoryName: form.value.categoryName.trim(),
      description: form.value.description ? form.value.description.trim() : undefined,
    }

    if (isEditMode.value && editingId.value) {
      await medicineCategoryApi.update(editingId.value, payload)
    } else {
      await medicineCategoryApi.create(payload)
    }
    closeModal()
    await fetchCategories()
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to save category')
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id: string | undefined) => {
  if (!id) return
  if (!confirm('Are you sure you want to delete this category?')) return
  error.value = null
  try {
    await medicineCategoryApi.delete(id)
    await fetchCategories()
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to delete category')
  }
}

// Computed
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value
  const query = searchQuery.value.toLowerCase()
  return categories.value.filter(cat => 
    cat.categoryName?.toLowerCase().includes(query) ||
    cat.description?.toLowerCase().includes(query)
  )
})

const totalItems = computed(() => {
  if (searchQuery.value) return filteredCategories.value.length
  return meta.value?.total ?? filteredCategories.value.length
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
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
})

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

watch(searchQuery, () => {
  currentPage.value = 1
})

watch(currentPage, () => {
  fetchCategories()
})

onMounted(() => {
  fetchCategories()
})
</script>
