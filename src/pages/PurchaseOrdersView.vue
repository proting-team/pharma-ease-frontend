<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">

    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Medicine Order List</h1>
      <p class="text-sm text-gray-500 mt-1">Daftar Pemesanan Obat di Apotek Lamtama</p>
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
            <tr v-if="paginatedOrders.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">
                No orders found.
              </td>
            </tr>
            <tr v-for="order in paginatedOrders" :key="order.code" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ order.code }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ order.user }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ order.supplier }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ order.date }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ order.total }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  class="px-3 py-1 rounded-full text-xs font-medium border"
                  :class="order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : 'bg-green-100 text-green-700 border-green-200'"
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

                <button @click="handleDelete(order.code)" class="text-red-400 hover:text-red-600 transition-colors" title="Delete">
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
      <div class="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-sm text-gray-500">
          Showing {{ showingStart }} to {{ showingEnd }} of {{ filteredOrders.length }} results
        </span>
        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <button
            @click="goToPage(currentPage - 1)"
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
              currentPage === page ? 'bg-gray-100 text-gray-800 font-medium' : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            {{ page }}
          </button>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            &gt;
          </button>
        </div>
      </div>

    </div>

    <!-- Add/Edit Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 class="font-bold text-lg text-gray-800">{{ isEditMode ? 'Edit Order' : 'Add New Order' }}</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="p-5 space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Order Code</label>
              <input
                v-model="form.code"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245] bg-gray-50"
                readonly
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">User</label>
              <input
                v-model="form.user"
                type="text"
                placeholder="e.g., Rakha Fatih"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
              <input
                v-model="form.supplier"
                type="text"
                placeholder="e.g., PT. Pharma Jaya"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                v-model="form.date"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Total</label>
              <input
                v-model="form.total"
                type="text"
                placeholder="e.g., Rp 2.500.000"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#009245] focus:border-[#009245]"
                required
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
          <div class="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
            <button type="button" @click="closeModal" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="px-4 py-2 bg-[#009245] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-medium transition-colors"
            >
              {{ isSubmitting ? 'Saving...' : (isEditMode ? 'Update Order' : 'Save Order') }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// --- INTERFACE ---
interface OrderItem {
  code: string
  user: string
  supplier: string
  date: string
  total: string
  status: string
}

// --- MOCK DATA ---
const mockOrders: OrderItem[] = [
  { code: 'PO-001', user: 'Rakha Fatih', supplier: 'PT. Pharma Jaya', date: '2025-06-01', total: 'Rp 2.500.000', status: 'Completed' },
  { code: 'PO-002', user: 'Habib Akbar', supplier: 'CV. Medika Utama', date: '2025-06-03', total: 'Rp 1.200.000', status: 'Pending' },
  { code: 'PO-003', user: 'Siti Aminah', supplier: 'PT. Sehat Selalu', date: '2025-06-05', total: 'Rp 3.750.000', status: 'Completed' },
  { code: 'PO-004', user: 'Rakha Fatih', supplier: 'UD. Obat Rasa', date: '2025-06-07', total: 'Rp 800.000', status: 'Pending' },
  { code: 'PO-005', user: 'Dewi Lestari', supplier: 'PT. Farmasi Indonesia', date: '2025-06-10', total: 'Rp 5.200.000', status: 'Completed' },
  { code: 'PO-006', user: 'Habib Akbar', supplier: 'CV. Healthcare Plus', date: '2025-06-12', total: 'Rp 1.900.000', status: 'Pending' },
  { code: 'PO-007', user: 'Rakha Fatih', supplier: 'PT. Kimia Farma', date: '2025-06-14', total: 'Rp 4.300.000', status: 'Completed' },
  { code: 'PO-008', user: 'Siti Aminah', supplier: 'UD. Sumber Obat', date: '2025-06-16', total: 'Rp 2.100.000', status: 'Pending' },
  { code: 'PO-009', user: 'Dewi Lestari', supplier: 'PT. Indo Pharma', date: '2025-06-18', total: 'Rp 6.500.000', status: 'Completed' },
  { code: 'PO-010', user: 'Habib Akbar', supplier: 'CV. Apotek Kita', date: '2025-06-20', total: 'Rp 950.000', status: 'Pending' },
  { code: 'PO-011', user: 'Rakha Fatih', supplier: 'PT. Royal Pharma', date: '2025-06-22', total: 'Rp 3.200.000', status: 'Completed' },
  { code: 'PO-012', user: 'Siti Aminah', supplier: 'UD. Obat Herbal', date: '2025-06-24', total: 'Rp 1.750.000', status: 'Pending' },
]

// --- STATE ---
const orders = ref<OrderItem[]>([])
const searchQuery = ref('')

// --- PAGINATION ---
const itemsPerPage = ref(8)
const currentPage = ref(1)

// --- MODAL STATE ---
const isModalOpen = ref(false)
const isEditMode = ref(false)
const editingCode = ref<string | null>(null)
const isSubmitting = ref(false)
const form = ref<OrderItem>({ code: '', user: '', supplier: '', date: '', total: '', status: 'Pending' })

// --- COMPUTED ---
const filteredOrders = computed(() => {
  if (!searchQuery.value) return orders.value
  const q = searchQuery.value.toLowerCase()
  return orders.value.filter(
    o =>
      o.code.toLowerCase().includes(q) ||
      o.user.toLowerCase().includes(q) ||
      o.supplier.toLowerCase().includes(q) ||
      o.status.toLowerCase().includes(q)
  )
})

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  return filteredOrders.value.slice(start, start + itemsPerPage.value)
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredOrders.value.length / itemsPerPage.value)))

const showingStart = computed(() => {
  if (filteredOrders.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredOrders.value.length)
})

// --- METHODS ---
const fetchOrders = async () => {
  await new Promise(r => setTimeout(r, 300))
  orders.value = [...mockOrders]
}

const generateCode = () => {
  const maxNum = orders.value.reduce((max, o) => {
    const num = parseInt(o.code.replace('PO-', ''), 10)
    return num > max ? num : max
  }, 0)
  return `PO-${String(maxNum + 1).padStart(3, '0')}`
}

const openAddModal = () => {
  isEditMode.value = false
  editingCode.value = null
  form.value = { code: generateCode(), user: '', supplier: '', date: new Date().toISOString().split('T')[0] ?? '', total: '', status: 'Pending' }
  isModalOpen.value = true
}

const openEditModal = (order: OrderItem) => {
  isEditMode.value = true
  editingCode.value = order.code
  form.value = { ...order }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  editingCode.value = null
}

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await new Promise(r => setTimeout(r, 300))
    if (isEditMode.value && editingCode.value) {
      const idx = orders.value.findIndex(o => o.code === editingCode.value)
      if (idx !== -1) orders.value[idx] = { ...form.value }
    } else {
      orders.value.unshift({ ...form.value })
    }
    closeModal()
  } finally {
    isSubmitting.value = false
  }
}

const handleDelete = (code: string) => {
  if (!confirm('Are you sure you want to delete this order?')) return
  orders.value = orders.value.filter(o => o.code !== code)
}

const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// Reset to page 1 when search changes
watch(searchQuery, () => {
  currentPage.value = 1
})

// --- LIFECYCLE ---
onMounted(fetchOrders)
</script>
