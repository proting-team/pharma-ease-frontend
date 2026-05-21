<template>
  <div class="min-h-screen bg-gray-50/80 font-sans text-gray-800">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Medicine Report</h1>
          <p class="text-sm text-gray-500 mt-1.5">Monitoring stock levels and medicine status</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search medicines..."
              class="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 bg-white transition-shadow"
            />
          </div>
          <button
            @click="handleExport"
            class="inline-flex items-center gap-2 rounded-lg bg-[#11764B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#158e5a] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export Excel
          </button>
        </div>
      </div>
    </div>

    <!-- Stat Cards -->
    <div class="grid gap-5 md:grid-cols-3 mb-8">
      <div class="group relative rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Total Items</p>
            <p class="text-2xl font-bold text-gray-900 mt-0.5 tabular-nums">{{ totalItems }}</p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>

      <div class="group relative rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Low Stock (&lt; 5)</p>
            <p class="text-2xl font-bold text-orange-600 mt-0.5 tabular-nums">{{ lowStockCount }}</p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>

      <div class="group relative rounded-xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-500">Expired</p>
            <p class="text-2xl font-bold text-red-600 mt-0.5 tabular-nums">{{ expiredCount }}</p>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/80">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Medicine Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Expiry Date</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex items-center justify-center gap-3">
                  <svg class="animate-spin h-5 w-5 text-[#11764B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span class="text-gray-400 text-sm">Loading data...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="paginatedMedicines.length === 0">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                  </svg>
                  <p class="text-gray-400 text-sm">No medicines found</p>
                  <p class="text-gray-300 text-xs">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="(item, index) in paginatedMedicines"
              :key="item.id"
              class="hover:bg-gray-50/60 transition-colors duration-150 even:bg-gray-50/30"
            >
              <td class="px-6 py-4 text-sm text-gray-400 font-mono">{{ showingStart + index }}</td>
              <td class="px-6 py-4">
                <div>
                  <p class="font-medium text-gray-900">{{ item.medicineName }}</p>
                  <p class="text-xs text-gray-400 font-mono mt-0.5">{{ item.sku }}</p>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 text-sm text-gray-600">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                  {{ item.category || '-' }}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <span
                    class="font-bold tabular-nums"
                    :class="{
                      'text-red-600': item.stock <= 5,
                      'text-orange-600': item.stock > 5 && item.stock <= 15,
                      'text-gray-900': item.stock > 15
                    }"
                  >
                    {{ item.stock }}
                  </span>
                  <div class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      class="h-full rounded-full transition-all duration-500"
                      :class="{
                        'bg-red-500': item.stock <= 5,
                        'bg-orange-500': item.stock > 5 && item.stock <= 15,
                        'bg-green-500': item.stock > 15
                      }"
                      :style="{ width: Math.min((item.stock / 50) * 100, 100) + '%' }"
                    ></div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.unit }}</td>
              <td class="px-6 py-4">
                <span
                  v-if="item.status === 'Critical'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200"
                >
                  <span class="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5 animate-pulse"></span>
                  Critical
                </span>
                <span
                  v-else-if="item.status === 'Expired'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200"
                >
                  <span class="w-1.5 h-1.5 bg-gray-400 rounded-full mr-1.5"></span>
                  Expired
                </span>
                <span
                  v-else-if="item.status === 'Low Stock'"
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200"
                >
                  <span class="w-1.5 h-1.5 bg-orange-500 rounded-full mr-1.5"></span>
                  Low Stock
                </span>
                <span
                  v-else
                  class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200"
                >
                  <span class="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                  Good
                </span>
              </td>
              <td class="px-6 py-4">
                <span
                  class="text-sm"
                  :class="{ 'text-red-600 font-semibold': item.status === 'Expired' }"
                >
                  {{ item.expiryDate }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-white">
        <span class="text-sm text-gray-500">
          Showing <span class="font-medium text-gray-700">{{ showingStart }}</span>
          to <span class="font-medium text-gray-700">{{ showingEnd }}</span>
          of <span class="font-medium text-gray-700">{{ filteredMedicines.length }}</span> results
        </span>
        <div class="flex items-center gap-1.5">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage <= 1"
            class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>

          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page === '...'"
              disabled
              class="px-2 py-1.5 text-sm text-gray-400 cursor-default"
            >
              ...
            </button>
            <button
              v-else
              @click="goToPage(Number(page))"
              :class="[
                'px-3 py-1.5 border rounded-lg text-sm transition-all duration-150',
                currentPage === page
                  ? 'bg-[#11764B] text-white border-[#11764B] shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage >= totalPages"
            class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'

// --- MOCK DATA ---
interface MedicineReportItem {
  id: string
  medicineName: string
  sku: string
  category: string
  stock: number
  unit: string
  status: 'Good' | 'Low Stock' | 'Critical' | 'Expired'
  expiryDate: string
}

const mockMedicines: MedicineReportItem[] = [
  { id: '1', medicineName: 'Paracetamol 500mg', sku: 'MED-001', category: 'Analgesic', stock: 120, unit: 'Tablet', status: 'Good', expiryDate: '15 Dec 2026' },
  { id: '2', medicineName: 'Amoxicillin 250mg', sku: 'MED-002', category: 'Antibiotic', stock: 2, unit: 'Capsule', status: 'Critical', expiryDate: '20 Jan 2027' },
  { id: '3', medicineName: 'Ibuprofen 400mg', sku: 'MED-003', category: 'Anti-inflammatory', stock: 45, unit: 'Tablet', status: 'Good', expiryDate: '10 Mar 2027' },
  { id: '4', medicineName: 'Omeprazole 20mg', sku: 'MED-004', category: 'Antacid', stock: 4, unit: 'Capsule', status: 'Critical', expiryDate: '05 Feb 2026' },
  { id: '5', medicineName: 'Cetirizine 10mg', sku: 'MED-005', category: 'Antihistamine', stock: 30, unit: 'Tablet', status: 'Good', expiryDate: '22 Apr 2027' },
  { id: '6', medicineName: 'Metformin 500mg', sku: 'MED-006', category: 'Antidiabetic', stock: 12, unit: 'Tablet', status: 'Low Stock', expiryDate: '18 Jun 2026' },
  { id: '7', medicineName: 'Simvastatin 10mg', sku: 'MED-007', category: 'Cholesterol', stock: 60, unit: 'Tablet', status: 'Good', expiryDate: '30 Aug 2026' },
  { id: '8', medicineName: 'Amlodipine 5mg', sku: 'MED-008', category: 'Antihypertensive', stock: 0, unit: 'Tablet', status: 'Critical', expiryDate: '12 Oct 2026' },
  { id: '9', medicineName: 'Ranitidine 150mg', sku: 'MED-009', category: 'Antacid', stock: 25, unit: 'Tablet', status: 'Good', expiryDate: '15 Jan 2025' },
  { id: '10', medicineName: 'Dexametasone 0.5mg', sku: 'MED-010', category: 'Corticosteroid', stock: 8, unit: 'Tablet', status: 'Low Stock', expiryDate: '28 Feb 2026' },
  { id: '11', medicineName: 'Salbutamol Inhaler', sku: 'MED-011', category: 'Respiratory', stock: 15, unit: 'Inhaler', status: 'Low Stock', expiryDate: '14 May 2027' },
  { id: '12', medicineName: 'Vitamin C 1000mg', sku: 'MED-012', category: 'Supplement', stock: 80, unit: 'Tablet', status: 'Good', expiryDate: '20 Dec 2027' },
  { id: '13', medicineName: 'Ciprofloxacin 500mg', sku: 'MED-013', category: 'Antibiotic', stock: 3, unit: 'Tablet', status: 'Critical', expiryDate: '08 Apr 2026' },
  { id: '14', medicineName: 'Lansoprazole 30mg', sku: 'MED-014', category: 'Antacid', stock: 35, unit: 'Capsule', status: 'Good', expiryDate: '19 Sep 2026' },
  { id: '15', medicineName: 'Prednisone 5mg', sku: 'MED-015', category: 'Corticosteroid', stock: 1, unit: 'Tablet', status: 'Critical', expiryDate: '03 Mar 2025' },
  { id: '16', medicineName: 'Bisoprolol 2.5mg', sku: 'MED-016', category: 'Antihypertensive', stock: 50, unit: 'Tablet', status: 'Good', expiryDate: '11 Jul 2026' },
  { id: '17', medicineName: 'Furosemide 40mg', sku: 'MED-017', category: 'Diuretic', stock: 6, unit: 'Tablet', status: 'Low Stock', expiryDate: '25 Nov 2026' },
  { id: '18', medicineName: 'Losartan 50mg', sku: 'MED-018', category: 'Antihypertensive', stock: 28, unit: 'Tablet', status: 'Good', expiryDate: '02 Jan 2027' },
  { id: '19', medicineName: 'Doxycycline 100mg', sku: 'MED-019', category: 'Antibiotic', stock: 20, unit: 'Capsule', status: 'Good', expiryDate: '16 Aug 2026' },
  { id: '20', medicineName: 'Methylprednisolone 4mg', sku: 'MED-020', category: 'Corticosteroid', stock: 10, unit: 'Tablet', status: 'Low Stock', expiryDate: '07 Oct 2025' },
  { id: '21', medicineName: 'Aspirin 80mg', sku: 'MED-021', category: 'Analgesic', stock: 100, unit: 'Tablet', status: 'Good', expiryDate: '14 Feb 2027' },
  { id: '22', medicineName: 'Diazepam 5mg', sku: 'MED-022', category: 'Sedative', stock: 18, unit: 'Tablet', status: 'Low Stock', expiryDate: '21 Jun 2026' },
  { id: '23', medicineName: 'Captopril 25mg', sku: 'MED-023', category: 'Antihypertensive', stock: 42, unit: 'Tablet', status: 'Good', expiryDate: '09 May 2026' },
  { id: '24', medicineName: 'Glibenclamide 5mg', sku: 'MED-024', category: 'Antidiabetic', stock: 55, unit: 'Tablet', status: 'Good', expiryDate: '30 Jan 2025' },
  { id: '25', medicineName: 'Chloramphenicol Eye Drop', sku: 'MED-025', category: 'Antibiotic', stock: 14, unit: 'Drops', status: 'Low Stock', expiryDate: '17 Mar 2026' },
]

// --- STATE ---
const medicines = ref<MedicineReportItem[]>([])
const loading = ref(true)
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// --- COMPUTED ---
const filteredMedicines = computed(() => {
  if (!searchQuery.value.trim()) return medicines.value
  const query = searchQuery.value.toLowerCase().trim()
  return medicines.value.filter(
    (m) =>
      m.medicineName.toLowerCase().includes(query) ||
      m.sku.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query)
  )
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredMedicines.value.length / itemsPerPage.value)))

const paginatedMedicines = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMedicines.value.slice(start, end)
})

const showingStart = computed(() => {
  if (filteredMedicines.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredMedicines.value.length)
})

const totalItems = computed(() => medicines.value.length)
const lowStockCount = computed(() => medicines.value.filter((m) => m.stock <= 5).length)
const expiredCount = computed(() => medicines.value.filter((m) => m.status === 'Expired').length)

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)

  if (current > 3) pages.push('...')

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  if (current < total - 2) pages.push('...')

  pages.push(total)
  return pages
})

// --- METHODS ---
const fetchMedicines = async () => {
  loading.value = true
  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 400))
    medicines.value = mockMedicines.map((m) => ({
      ...m,
      status: determineStatus(m.stock, m.expiryDate) as MedicineReportItem['status'],
    }))
  } catch {
    // Fallback to mock data even on error
    medicines.value = [...mockMedicines]
  } finally {
    loading.value = false
  }
}

const determineStatus = (stock: number, expiryDate: string): MedicineReportItem['status'] => {
  const expiry = new Date(expiryDate.replace(/(\d+)\s(\w+)\s(\d+)/, '$1 $2 $3'))
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (expiry < today) return 'Expired'
  if (stock <= 5) return 'Critical'
  if (stock <= 15) return 'Low Stock'
  return 'Good'
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleExport = () => {
  // Placeholder for export functionality
  alert('Export feature will be available once the backend is ready.')
}

// --- WATCH SEARCH TO RESET PAGE ---
watch(searchQuery, () => {
  currentPage.value = 1
})

// --- LIFECYCLE ---
onMounted(() => {
  fetchMedicines()
})
</script>
