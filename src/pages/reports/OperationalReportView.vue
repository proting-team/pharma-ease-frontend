<template>
  <div class="min-h-screen bg-gray-50/80 font-sans text-gray-800">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Operational Report</h1>
          <p class="text-sm text-gray-500 mt-1.5">Audit trails and system activities</p>
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
              placeholder="Search activities..."
              class="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 bg-white transition-shadow"
            />
          </div>

          <select
            v-model="selectedAction"
            class="py-2.5 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] bg-white"
          >
            <option value="">All Actions</option>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="deleted">Deleted</option>
            <option value="login">Login</option>
          </select>

          <button
            @click="handleExport"
            class="inline-flex items-center gap-2 rounded-lg bg-[#11764B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#158e5a] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
            Export Log
          </button>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid gap-5 md:grid-cols-4 mt-6">
        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Total Activities</p>
              <p class="text-xl font-bold text-gray-900 mt-0.5 tabular-nums">{{ totalLogs }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Today</p>
              <p class="text-xl font-bold text-gray-900 mt-0.5 tabular-nums">{{ todayCount }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Updates</p>
              <p class="text-xl font-bold text-orange-600 mt-0.5 tabular-nums">{{ updateCount }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Deletions</p>
              <p class="text-xl font-bold text-red-600 mt-0.5 tabular-nums">{{ deleteCount }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/80">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Module</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-if="loading">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex items-center justify-center gap-3">
                  <svg class="animate-spin h-5 w-5 text-[#11764B]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                  <span class="text-gray-400 text-sm">Loading data...</span>
                </div>
              </td>
            </tr>
            <tr v-else-if="error">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <p class="text-red-500 text-sm">{{ error }}</p>
                  <button @click="fetchLogs" class="mt-2 text-[#11764B] hover:underline text-sm">Try again</button>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredLogs.length === 0">
              <td colspan="6" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
                  </svg>
                  <p class="text-gray-400 text-sm">No activities found</p>
                  <p class="text-gray-300 text-xs">Try adjusting your search or filter criteria</p>
                </div>
              </td>
            </tr>
            <tr
              v-else
              v-for="(log, index) in filteredLogs"
              :key="log.id"
              class="hover:bg-gray-50/60 transition-colors duration-150 even:bg-gray-50/30"
            >
              <td class="px-6 py-4 text-sm text-gray-400 font-mono">{{ showingStart + index }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span class="text-sm text-gray-600">{{ log.timestamp }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-[#11764B]/10 text-[#11764B] flex items-center justify-center text-xs font-bold shrink-0">
                    {{ getUserInitials(log.user) }}
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 text-sm">{{ log.user }}</p>
                    <p class="text-xs text-gray-400 capitalize">{{ log.role }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
                  :class="getActionBadgeClass(log.action)"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="getActionDotClass(log.action)"></span>
                  {{ log.action }}
                </span>
              </td>
              <td class="px-6 py-4">
                <span class="text-sm text-gray-600">{{ log.module }}</span>
              </td>
              <td class="px-6 py-4">
                <p class="text-sm text-gray-700 max-w-xs truncate" :title="log.description">{{ log.description }}</p>
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
          of <span class="font-medium text-gray-700">{{ totalLogs }}</span> results
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
import { activityLogApi, type ActivityLogResponse, type PaginatedResult } from '@/api-services/repositories/activityLogApi'
import * as XLSX from 'xlsx'

// --- TYPES ---
interface OperationalLog {
  id: string
  timestamp: string
  user: string
  role: string
  action: string
  module: string
  description: string
}

// --- STATE ---
const logs = ref<OperationalLog[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedAction = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const meta = ref<PaginatedResult<ActivityLogResponse>['meta'] | null>(null)
const error = ref<string | null>(null)

// --- FORMAT HELPERS ---
const formatTimestamp = (isoDate: string): string => {
  const date = new Date(isoDate);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const d = date.getDate();
  const m = months[date.getMonth()];
  const y = date.getFullYear();
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${d} ${m} ${y} ${h}:${min}`;
};

const mapApiToLog = (item: ActivityLogResponse): OperationalLog => {
  const rawAction = item.action.toLowerCase()
  let displayAction = rawAction
  if (rawAction === 'create') displayAction = 'created'
  if (rawAction === 'update') displayAction = 'updated'
  if (rawAction === 'delete') displayAction = 'deleted'

  return {
    id: item.id,
    timestamp: formatTimestamp(item.createdAt),
    user: item.employee?.name ?? 'Unknown',
    role: item.employee?.role?.toLowerCase() ?? '-',
    action: displayAction,
    module: item.resourceType ?? '-',
    description: item.payloadData
      ? (typeof item.payloadData === 'object' && item.payloadData !== null
          ? (item.payloadData as Record<string, any>).message ?? JSON.stringify(item.payloadData)
          : String(item.payloadData))
      : '-',
  }
}

// --- COMPUTED ---
const filteredLogs = computed(() => {
  return logs.value.filter((log) => {
    const matchesSearch =
      !searchQuery.value.trim() ||
      log.user.toLowerCase().includes(searchQuery.value.toLowerCase().trim()) ||
      log.module.toLowerCase().includes(searchQuery.value.toLowerCase().trim()) ||
      log.description.toLowerCase().includes(searchQuery.value.toLowerCase().trim())

    const matchesAction = !selectedAction.value || log.action === selectedAction.value

    return matchesSearch && matchesAction
  })
})

const totalPages = computed(() => meta.value?.lastPage ?? 1)
const totalLogs = computed(() => meta.value?.total ?? 0)

const showingStart = computed(() => {
  if (totalLogs.value === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalLogs.value)
})

// Stats (calculated based on current page data since API doesn't provide these aggregates)
const todayCount = computed(() => {
  const today = new Date().toDateString()
  return logs.value.filter((l) => new Date(l.timestamp).toDateString() === today).length
})
const updateCount = computed(() => logs.value.filter((l) => l.action === 'updated').length)
const deleteCount = computed(() => logs.value.filter((l) => l.action === 'deleted').length)

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
const fetchLogs = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await activityLogApi.getAll(currentPage.value, itemsPerPage.value)
    logs.value = result.data.map(mapApiToLog)
    meta.value = result.meta
  } catch (e: any) {
    error.value = e?.message || 'Failed to fetch operational logs'
    logs.value = []
    meta.value = null
  } finally {
    loading.value = false
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleExport = () => {
  // 1. Stats Data
  const statsData = [
    ['Operational Report Summary'],
    [],
    ['Total Activities', totalLogs.value],
    ['Today', todayCount.value],
    ['Updates', updateCount.value],
    ['Deletions', deleteCount.value],
    [],
    ['Detailed Activity Logs'],
    ['Timestamp', 'User', 'Role', 'Action', 'Module', 'Description']
  ];

  // 2. Table Data
  const tableData = filteredLogs.value.map(log => [
    log.timestamp,
    log.user,
    log.role,
    log.action,
    log.module,
    log.description
  ]);

  // Combine
  const worksheetData = [...statsData, ...tableData];

  // Create workbook and worksheet
  const ws = XLSX.utils.aoa_to_sheet(worksheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Operational Report');

  // Generate filename
  const now = new Date();
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const filename = `operational-report-${dateStr}.xlsx`;

  // Download
  XLSX.writeFile(wb, filename);
}

const getUserInitials = (name: string): string => {
  if (!name || name === 'Unknown') return 'UN'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const getActionBadgeClass = (action: string) => {
  const lower = action.toLowerCase()
  if (lower === 'created' || lower === 'create') return 'bg-green-50 text-green-700 border-green-200'
  if (lower === 'deleted' || lower === 'delete') return 'bg-red-50 text-red-700 border-red-200'
  if (lower === 'login') return 'bg-blue-50 text-blue-700 border-blue-200'
  return 'bg-orange-50 text-orange-700 border-orange-200'
}

const getActionDotClass = (action: string) => {
  const lower = action.toLowerCase()
  if (lower === 'created' || lower === 'create') return 'bg-green-500'
  if (lower === 'deleted' || lower === 'delete') return 'bg-red-500'
  if (lower === 'login') return 'bg-blue-500'
  return 'bg-orange-500'
}

// --- WATCH ---
watch([searchQuery, selectedAction], () => {
  currentPage.value = 1
})

watch(currentPage, () => {
  fetchLogs()
})

// --- LIFECYCLE ---
onMounted(() => {
  fetchLogs()
})
</script>
