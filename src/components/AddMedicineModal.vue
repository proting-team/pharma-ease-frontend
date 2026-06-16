<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity p-4"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">
      <div
        class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl"
      >
        <h3 class="text-lg font-bold text-gray-800">
          {{ medicineToEdit ? 'Edit Medicine' : 'Add New Medicine' }}
        </h3>
        <button @click="closeModal" class="text-gray-400 hover:text-red-500 transition-colors">
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

      <div
        v-if="errorMsg"
        class="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md"
      >
        {{ errorMsg }}
      </div>

      <div class="p-6 overflow-y-auto flex-1">
        <form
          id="addMedicineForm"
          @submit.prevent="handleSubmit"
          class="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Medicine Name <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.medicineName"
              type="text"
              required
              placeholder="e.g. Paracetamol 500mg"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >SKU (Code) <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.sku"
              type="text"
              required
              placeholder="e.g. MED-001"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Expiry Date <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.expiredDate"
              type="date"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Category <span class="text-red-500">*</span></label
            >
            <select
              v-model="form.categoryId"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm bg-white"
            >
              <option value="" disabled>Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.categoryName }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Supplier <span class="text-red-500">*</span></label
            >
            <select
              v-model="form.supplierId"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm bg-white"
            >
              <option value="" disabled>Select Supplier</option>
              <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">
                {{ sup.companyName }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Initial Stock <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.stock"
              type="number"
              min="0"
              required
              placeholder="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1"
              >Price (IDR) <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.price"
              type="number"
              min="0"
              required
              placeholder="10000"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            />
          </div>

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              placeholder="Add short description or dosage information..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            ></textarea>
          </div>
        </form>
      </div>

      <div
        class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl"
      >
        <button
          type="button"
          @click="closeModal"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          :disabled="isSubmitting"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="addMedicineForm"
          class="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          :disabled="isSubmitting"
        >
          <svg
            v-if="isSubmitting"
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ isSubmitting ? 'Saving...' : medicineToEdit ? 'Update Medicine' : 'Save Medicine' }}
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'

const props = defineProps<{
  isOpen: boolean
  medicineToEdit?: any
}>()

const emit = defineEmits(['close', 'refresh'])

const isSubmitting = ref(false)
const errorMsg = ref<string | null>(null)

interface DropdownCategory {
  id: string
  categoryName: string
}

interface DropdownSupplier {
  id: string
  companyName: string
}

// Terapkan interface tersebut ke ref
const categories = ref<DropdownCategory[]>([])
const suppliers = ref<DropdownSupplier[]>([])

const form = reactive({
  medicineName: '',
  sku: '',
  description: '',
  stock: 0,
  price: 0,
  expiredDate: '',
  categoryId: '',
  supplierId: '',
})

const resetForm = () => {
  form.medicineName = ''
  form.sku = ''
  form.description = ''
  form.stock = 0
  form.price = 0
  form.expiredDate = ''
  form.categoryId = ''
  form.supplierId = ''
  errorMsg.value = null
}

const closeModal = () => {
  resetForm()
  emit('close')
}

import { medicineCategoryApi } from '@/api-services/repositories/medicineCategoryApi'
import { supplierApi } from '@/api-services/repositories/supplierApi'

const fetchDropdownData = async () => {
  try {
    const [catResponse, supResponse] = await Promise.all([
      medicineCategoryApi.getAll(1, 100).catch(() => ({ data: [] })),
      supplierApi.getAll(1, 100).catch(() => ({ data: [] })),
    ])

    categories.value = (catResponse.data || []).map((cat: any) => ({
      id: cat.id || '',
      categoryName: cat.categoryName || '',
    }))
    suppliers.value = (supResponse.data || []).map((sup: any) => ({
      id: sup.id || '',
      companyName: sup.companyName || '',
    }))
  } catch (error) {
    console.error('Gagal menarik data untuk dropdown', error)
  }
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      fetchDropdownData()
      if (props.medicineToEdit) {
        form.medicineName = props.medicineToEdit.medicineName || ''
        form.sku = props.medicineToEdit.sku || ''
        form.description = props.medicineToEdit.description || ''
        form.stock = props.medicineToEdit.stock || 0
        form.price = props.medicineToEdit.price || 0
        form.expiredDate = props.medicineToEdit.expiredDate
          ? new Date(props.medicineToEdit.expiredDate).toISOString().split('T')[0] || ''
          : ''
        form.categoryId = props.medicineToEdit.categoryId || ''
        form.supplierId = props.medicineToEdit.supplierId || ''
      } else {
        resetForm()
      }
    }
  },
)

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMsg.value = null

  try {
    const formattedDate = new Date(form.expiredDate).toISOString()

    const payload = {
      ...form,
      expiredDate: formattedDate,
      stock: Number(form.stock),
      price: Number(form.price),
    }

    if (props.medicineToEdit && props.medicineToEdit.id) {
      await medicineApi.update(props.medicineToEdit.id, payload)
    } else {
      await medicineApi.create(payload)
    }

    closeModal()
    emit('refresh')
  } catch (error: unknown) {
    // Kita harus mengecek tipe error-nya sebelum bisa membaca .message
    if (error instanceof Error) {
      errorMsg.value = error.message
    } else {
      errorMsg.value = 'Failed to create medicine. Please check your inputs.'
    }
    console.error(error)
  } finally {
    isSubmitting.value = false
  }
}
</script>
