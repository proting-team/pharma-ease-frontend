<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity p-4"
  >
    <div class="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh]">

      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-xl">
        <h3 class="text-lg font-bold text-gray-800">Add New Medicine</h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-red-500 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <div v-if="errorMsg" class="mx-6 mt-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
        {{ errorMsg }}
      </div>

      <div class="p-6 overflow-y-auto flex-1">
        <form id="addMedicineForm" @submit.prevent="handleSubmit" class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-1">Medicine Name <span class="text-red-500">*</span></label>
            <input
              v-model="form.medicineName"
              type="text"
              required
              placeholder="e.g. Paracetamol 500mg"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">SKU (Code) <span class="text-red-500">*</span></label>
            <input
              v-model="form.sku"
              type="text"
              required
              placeholder="e.g. MED-001"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Expiry Date <span class="text-red-500">*</span></label>
            <input
              v-model="form.expiredDate"
              type="date"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Category <span class="text-red-500">*</span></label>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">Supplier <span class="text-red-500">*</span></label>
            <select
              v-model="form.supplierId"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm bg-white"
            >
              <option value="" disabled>Select Supplier</option>
              <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">
                {{ sup.supplierName }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Initial Stock <span class="text-red-500">*</span></label>
            <input
              v-model="form.stock"
              type="number"
              min="0"
              required
              placeholder="0"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            >
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price (IDR) <span class="text-red-500">*</span></label>
            <input
              v-model="form.price"
              type="number"
              min="0"
              required
              placeholder="10000"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 text-sm"
            >
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

      <div class="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
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
          <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {{ isSubmitting ? 'Saving...' : 'Save Medicine' }}
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'
import { httpClient } from '@/api-services/providers/providers'

// 1. Dapatkan sinyal isOpen dari parent dan siapkan fungsi pemancar sinyal (emit)
const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close', 'refresh'])

// 2. State UI
const isSubmitting = ref(false)
const errorMsg = ref<string | null>(null)

// 3. State Data Referensi Dropdown (Categories & Suppliers)
const categories = ref<any[]>([])
const suppliers = ref<any[]>([])

// 4. Form Payload Object (Sesuaikan dengan CreateMedicinePayload di medicineApi)
const form = reactive({
  medicineName: '',
  sku: '',
  description: '',
  stock: 0,
  price: 0,
  expiredDate: '',
  categoryId: '',
  supplierId: ''
})

// Fungsi Reset Form
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

// 5. Fungsi Fetch Data Dropdown
// Dipanggil setiap kali modal terbuka agar datanya selalu up to date
const fetchDropdownData = async () => {
  try {
    // Kita menembak langsung ke endpoint API menggunakan httpClient dari providers
    // (Ubah path URL di bawah ini jika endpoint bawaan timmu berbeda)
    const [catResponse, supResponse] = await Promise.all([
      httpClient('/medicine-data/categories').catch(() => ({ data: [] })),
      // Path di bawah mengikuti struktur folder supplier di NestJS-mu
      httpClient('/user-manage/suppliers').catch(() => ({ data: [] }))
    ])

    categories.value = catResponse.data || []
    suppliers.value = supResponse.data || []
  } catch (error) {
    console.error("Gagal menarik data untuk dropdown", error)
  }
}

// Pantau jika modal dibuka (isOpen berubah jadi true), tarik data Category & Supplier!
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    fetchDropdownData()
  }
})

// 6. Fungsi Submit Data
const handleSubmit = async () => {
  isSubmitting.value = true
  errorMsg.value = null

  try {
    // Format tanggal ke bentuk ISO-8601 (NestJS Prisma biasanya minta format ini: YYYY-MM-DDTHH:mm:ss.sssZ)
    const formattedDate = new Date(form.expiredDate).toISOString()

    const payload = {
      ...form,
      expiredDate: formattedDate,
      // Pastikan stock dan price dikirim sebagai angka murni, bukan string
      stock: Number(form.stock),
      price: Number(form.price),
    }

    // Tembak API Create!
    await medicineApi.create(payload)

    // Jika sukses: Tutup modal dan minta halaman utama (MedicineStorageView) refresh tabel
    closeModal()
    emit('refresh')

  } catch (error: any) {
    // Tangkap pesan error panjang dari class-validator NestJS
    if (error.message && typeof error.message === 'string') {
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
