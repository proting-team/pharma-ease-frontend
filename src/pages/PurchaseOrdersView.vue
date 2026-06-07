<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">

    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Medicine Order List</h1>
      <p class="text-sm text-gray-500 mt-1">Daftar Pemesanan Obat di Apotek Lamtama</p>
    </div>

    <div v-if="error" class="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm whitespace-pre-line">
      {{ error }}
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200">

      <div class="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 class="text-lg font-medium text-gray-800">Medicine Order List</h2>

        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative w-full md:w-auto">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search orders..."
              class="w-full md:w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
            />
          </div>

          <button @click="openAddModal" class="flex items-center gap-2 bg-[#009245] hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Order
          </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/50">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Total</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">Loading...</td>
            </tr>
            <tr v-else-if="paginatedOrders.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">No orders found.</td>
            </tr>
            <tr v-for="order in paginatedOrders" :key="order.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ order.orderCode }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ order.employee?.name || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ order.supplier?.companyName || '-' }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ formatDate(order.orderDate) }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ formatPrice(order.totalPrice) }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium border capitalize"
                  :class="statusClass(order.status)"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-right space-x-3">
                <button @click="openEditModal(order)" class="text-orange-400 hover:text-orange-600 transition-colors" title="Edit">
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                  </svg>
                </button>
                <button @click="handleDelete(order.id)" class="text-red-400 hover:text-red-600 transition-colors" title="Delete">
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="meta" class="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-sm text-gray-500">
          Showing {{ showingStart }} to {{ showingEnd }} of {{ meta.total ?? orders.length }} results
        </span>
        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <button
            @click="goToPage((meta?.currentPage ?? 1) - 1)"
            :disabled="!meta?.prev"
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
              (meta?.currentPage ?? 1) === page ? 'bg-gray-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="goToPage((meta?.currentPage ?? 1) + 1)"
            :disabled="!meta?.next"
            class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>

    </div>

    <!-- Add/Edit Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 class="font-bold text-lg text-gray-800">{{ isEditMode ? 'Edit Order' : 'Add New Order' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="p-5 overflow-y-auto">
          <div v-if="formError" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {{ formError }}
          </div>

          <form id="orderForm" @submit.prevent="handleSubmit" class="space-y-4">
            <!-- Order Code (readonly untuk edit) -->
            <div v-if="isEditMode">
              <label class="block text-sm font-medium text-gray-700 mb-1">Order Code</label>
              <input
                :value="editingOrderCode"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-500"
                readonly
              />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Employee <span class="text-red-500">*</span></label>
                <select
                  v-model="form.employeeId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                  required
                >
                  <option value="" disabled>Select Employee</option>
                  <option v-for="emp in usersList" :key="emp.id" :value="emp.id">
                    {{ emp.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier <span class="text-red-500">*</span></label>
                <select
                  v-model="form.supplierId"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                  required
                >
                  <option value="" disabled>Select Supplier</option>
                  <option v-for="sup in suppliersList" :key="sup.id" :value="sup.id">
                    {{ sup.companyName }}
                  </option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Order Date <span class="text-red-500">*</span></label>
                <input
                  v-model="form.orderDate"
                  type="date"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="form.status"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                >
                  <option value="PENDING">Pending</option>
                  <option value="COMPLETED">Completed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </div>
            </div>

            <!-- Medicines Section -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <label class="block text-sm font-medium text-gray-700">Medicines <span class="text-red-500">*</span></label>
                <button
                  type="button"
                  @click="addMedicineRow"
                  class="text-xs text-[#009245] hover:text-green-700 font-medium flex items-center gap-1"
                >
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                  Add Medicine
                </button>
              </div>

              <div v-if="form.medicines.length === 0" class="p-3 bg-gray-50 rounded-lg text-center text-sm text-gray-400">
                No medicines added yet. Click "Add Medicine" to add items.
              </div>

              <div
                v-for="(item, idx) in form.medicines"
                :key="idx"
                class="grid grid-cols-12 gap-2 mb-2 items-end"
              >
                <div class="col-span-5">
                  <select
                    v-model="item.medicineId"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                    required
                  >
                    <option value="" disabled>Select Medicine</option>
                    <option v-for="med in medicinesList" :key="med.id" :value="med.id">
                      {{ med.medicineName }} (Stock: {{ med.stock }})
                    </option>
                  </select>
                </div>
                <div class="col-span-2">
                  <input
                    v-model.number="item.quantity"
                    type="number"
                    min="1"
                    placeholder="Qty"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                    required
                  />
                </div>
                <div class="col-span-3">
                  <input
                    v-model.number="item.unitPrice"
                    type="number"
                    min="0"
                    placeholder="Unit Price"
                    class="w-full px-2 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                    required
                  />
                </div>
                <div class="col-span-2 flex items-center gap-1 pb-1">
                  <span class="text-xs text-gray-500">{{ formatPrice((item.quantity || 0) * (item.unitPrice || 0)) }}</span>
                  <button
                    type="button"
                    @click="removeMedicineRow(idx)"
                    class="text-red-400 hover:text-red-600 transition-colors ml-auto"
                    title="Remove"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                  </button>
                </div>
              </div>

              <div v-if="form.medicines.length > 0" class="text-right text-sm font-semibold text-gray-700 pt-2 border-t border-gray-200">
                Grand Total: {{ formatPrice(grandTotal) }}
              </div>
            </div>
          </form>
        </div>

        <div class="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button type="button" @click="closeModal" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button
            form="orderForm"
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 bg-[#009245] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
          >
            {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Order' : 'Save Order') }}
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { supplierApi } from '@/api-services/repositories/supplierApi'
import { employeeApi } from '@/api-services/repositories/employeeApi'
import { medicineApi } from '@/api-services/repositories/medicineApi'
import { medicineOrderApi, type CreateMedicineOrderPayload } from '@/api-services/repositories/medicineOrderApi'
import type { Datum as Order } from '@/api-services/models/interfaces/medicine_order.interface'
import type { Datum as Supplier } from '@/api-services/models/interfaces/suppliers.interface'
import type { Datum as Employee } from '@/api-services/models/interfaces/users.interface'
import type { Datum as Medicine } from '@/api-services/models/interfaces/medicine.interface'
import type { Meta } from '@/api-services/models/interfaces/medicine_order.interface'

// --- HELPERS ---
function formatDate(d?: Date | string): string {
  if (!d) return '-'
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatPrice(v?: number): string {
  if (v === undefined || v === null) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(v)
}

function statusClass(status?: string): string {
  if (status === 'COMPLETED') return 'bg-green-100 text-green-700 border-green-200'
  if (status === 'CANCELLED') return 'bg-red-100 text-red-700 border-red-200'
  return 'bg-yellow-100 text-yellow-700 border-yellow-200'
}

function getErrorMessage(e: unknown, fallback: string): string {
  if (e && typeof e === 'object' && 'response' in e) {
    const axiosErr = e as { response?: { data?: Record<string, unknown>; status?: number } }
    const data = axiosErr.response?.data
    if (!data) return fallback

    // NestJS validation errors: { message: string | string[], statusCode, error }
    if (Array.isArray(data.message)) {
      return (data.message as string[]).join('; ')
    }
    if (typeof data.message === 'string') {
      return data.message
    }

    // NestJS custom errors: { errors: [{ property, errors }] }
    if (Array.isArray(data.errors)) {
      return (data.errors as Array<{ property: string; errors: string[] }>)
        .map((err) => `• ${err.property}: ${err.errors.join(', ')}`)
        .join('\n')
    }

    return `[${axiosErr.response?.status ?? ''}] ${JSON.stringify(data)}`
  }
  if (e instanceof Error) {
    return e.message
  }
  return fallback
}

// --- STATE ---
const orders = ref<Order[]>([])
const meta = ref<Meta | undefined>(undefined)
const loading = ref(false)
const error = ref<string | null>(null)
const searchQuery = ref('')

// --- DROPDOWN DATA ---
const usersList = ref<Employee[]>([])
const suppliersList = ref<Supplier[]>([])
const medicinesList = ref<Medicine[]>([])

// --- PAGINATION ---
const itemsPerPage = ref(10)
const currentPage = ref(1)

// --- MODAL STATE ---
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingId = ref<string | null>(null)
const editingOrderCode = ref('')
const isSubmitting = ref(false)
const formError = ref<string | null>(null)

interface MedicineRow {
  medicineId: string
  quantity: number
  unitPrice: number
}

interface OrderForm {
  employeeId: string
  supplierId: string
  orderDate: string
  status: string
  medicines: MedicineRow[]
}

const form = ref<OrderForm>({
  employeeId: '',
  supplierId: '',
  orderDate: '',
  status: 'PENDING',
  medicines: [],
})

// --- COMPUTED ---
const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value
  const q = searchQuery.value.toLowerCase()
  return orders.value.filter(
    o =>
      o.orderCode?.toLowerCase().includes(q) ||
      o.employee?.name?.toLowerCase().includes(q) ||
      o.supplier?.companyName?.toLowerCase().includes(q) ||
      o.status?.toLowerCase().includes(q)
  )
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredOrders.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => {
  if (meta.value?.lastPage) return meta.value.lastPage
  return Math.max(1, Math.ceil(filteredOrders.value.length / itemsPerPage.value))
})

const showingStart = computed(() => {
  if ((meta.value?.total ?? 0) === 0) return 0
  return ((meta.value?.currentPage ?? 1) - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  return Math.min((meta.value?.currentPage ?? 1) * itemsPerPage.value, meta.value?.total ?? filteredOrders.value.length)
})

const grandTotal = computed(() => {
  return form.value.medicines.reduce((sum, item) => sum + (item.quantity || 0) * (item.unitPrice || 0), 0)
})

// --- METHODS ---
const fetchOrders = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await medicineOrderApi.getAll(currentPage.value, itemsPerPage.value)
    orders.value = result.data ?? []
    meta.value = result.meta ?? undefined
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to load orders')
  } finally {
    loading.value = false
  }
}

const fetchDropdownData = async () => {
  // Fetch each API independently so one failure doesn't block others
  try {
    const userResult = await employeeApi.getAll(1, 100)
    usersList.value = userResult.data ?? []
  } catch (e) {
    console.error('Failed to fetch employees:', e)
  }

  try {
    const supplierResult = await supplierApi.getAll(1, 100)
    suppliersList.value = supplierResult.data ?? []
  } catch (e) {
    console.error('Failed to fetch suppliers:', e)
  }

  try {
    const medicineResult = await medicineApi.getAll(1, 100)
    medicinesList.value = medicineResult.data ?? []
  } catch (e) {
    console.error('Failed to fetch medicines:', e)
  }
}

const addMedicineRow = () => {
  form.value.medicines.push({ medicineId: '', quantity: 1, unitPrice: 1000 })
}

const removeMedicineRow = (idx: number) => {
  form.value.medicines.splice(idx, 1)
}

const openAddModal = () => {
  isEditMode.value = false
  editingId.value = null
  editingOrderCode.value = ''
  formError.value = null
  form.value = {
    employeeId: '',
    supplierId: '',
    orderDate: new Date().toISOString().split('T')[0] ?? '',
    status: 'PENDING',
    medicines: [{ medicineId: '', quantity: 1, unitPrice: 1000 }],
  }
  isModalOpen.value = true
}

const openEditModal = async (order: Order) => {
  isEditMode.value = true
  editingId.value = order.id ?? null
  editingOrderCode.value = order.orderCode ?? ''
  formError.value = null
  isModalOpen.value = true

  // Show modal immediately, then try to fetch full detail
  try {
    const detail = await medicineOrderApi.getById(order.id!)
    const empData = detail.employee ?? {}
    const supData = detail.supplier ?? {}

    form.value = {
      employeeId: empData.id ?? '',
      supplierId: supData.id ?? '',
      orderDate: detail.orderDate ? new Date(detail.orderDate).toISOString().split('T')[0] ?? '' : '',
      status: detail.status ?? 'PENDING',
      // Note: medicine order details editing not supported in this version
      medicines: [{ medicineId: '', quantity: 1, unitPrice: 1000 }],
    }
  } catch {
    // Fallback: use the list data if detail fetch fails
    form.value = {
      employeeId: '',
      supplierId: '',
      orderDate: order.orderDate ? new Date(order.orderDate).toISOString().split('T')[0] ?? '' : '',
      status: order.status ?? 'PENDING',
      medicines: [{ medicineId: '', quantity: 1, unitPrice: 1000 }],
    }
  }
}

const closeModal = () => {
  isModalOpen.value = false
  isEditMode.value = false
  editingId.value = null
  editingOrderCode.value = ''
  formError.value = null
}

const handleSubmit = async () => {
  // Validate medicines
  const invalidMeds = form.value.medicines.filter(m => !m.medicineId || m.quantity < 1 || m.unitPrice <= 0)
  if (invalidMeds.length > 0) {
    formError.value = 'Please complete all medicine fields (select medicine, quantity >= 1, unit price > 0).'
    return
  }

  isSubmitting.value = true
  formError.value = null
  try {
    const payload: CreateMedicineOrderPayload = {
      orderDate: new Date(form.value.orderDate).toISOString(),
      employeeId: form.value.employeeId,
      supplierId: form.value.supplierId,
      status: form.value.status,
      medicines: form.value.medicines.map(m => ({
        medicineId: m.medicineId,
        quantity: m.quantity,
        unitPrice: m.unitPrice,
      })),
    }

    if (isEditMode.value && editingId.value) {
      // Update only basic fields (status, orderDate) — medicines changes not supported via update
      await medicineOrderApi.update(editingId.value, {
        orderDate: payload.orderDate,
        status: payload.status,
      })
    } else {
      await medicineOrderApi.create(payload)
    }
    closeModal()
    await fetchOrders()
  } catch (e) {
    formError.value = getErrorMessage(e, 'Failed to save order')
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = async (id?: string) => {
  if (!id) return
  if (!confirm('Are you sure you want to delete this order?')) return
  error.value = null
  try {
    await medicineOrderApi.delete(id)
    await fetchOrders()
  } catch (e) {
    error.value = getErrorMessage(e, 'Failed to delete order')
  }
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  fetchOrders()
}

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// --- LIFECYCLE ---
onMounted(async () => {
  await fetchDropdownData()
  await fetchOrders()
})
</script>
