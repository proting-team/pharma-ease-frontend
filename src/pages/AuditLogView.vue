<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="px-6 py-5 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-800">Audit Log</h1>
        <p class="text-sm text-gray-500 mt-1">
          Manage your pharmacy operations efficiently — secure tracking of employee activities and
          system changes.
        </p>
      </div>

      <div class="p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search activities..."
              class="pl-3 pr-10 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 w-64"
            />
          </div>

          <select
            v-model="selectedAction"
            class="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="">All Actions</option>
            <option>Login</option>
            <option>Created</option>
            <option>Updated</option>
            <option>Deleted</option>
          </select>

          <select
            v-model="selectedModule"
            class="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white"
          >
            <option value="">All Modules</option>
            <option>Authentication</option>
            <option>User Management</option>
            <option>Medicine Inventory</option>
            <option>Suppliers</option>
            <option>Transaction</option>
          </select>
        </div>

        <div class="relative group">
          <button
            class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              ></path>
            </svg>
            Export Log
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <div
            class="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
          >
            <div class="py-1">
              <button
                @click="exportPDF"
                class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg
                  class="w-4 h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>Export as PDF</span>
              </button>
              <button
                @click="exportExcel"
                class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg
                  class="w-4 h-4 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>Export as Excel</span>
              </button>
              <button
                @click="exportCSV"
                class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <svg
                  class="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <span>Export as CSV</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="px-6 py-12 text-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-500 border-r-transparent"
        ></div>
        <p class="mt-3 text-sm text-gray-500">Loading audit logs...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="px-6 py-12 text-center">
        <p class="text-sm text-red-500">{{ error }}</p>
        <button
          @click="fetchLogs"
          class="mt-3 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm transition-colors cursor-pointer"
        >
          Retry
        </button>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-white">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Timestamp
              </th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Action
              </th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Module
              </th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="log in filteredLogs"
              :key="log.id"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.timestamp }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ log.user }}</td>
              <td class="px-6 py-4 text-sm capitalize text-gray-600">{{ log.role }}</td>
              <td class="px-6 py-4 text-sm">
                <span
                  :class="getActionBadgeClass(log.action)"
                  class="px-2.5 py-1 rounded-full text-xs font-semibold border"
                >
                  {{ log.action }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <span :class="getModuleBadgeClass(log.module)">
                  {{ log.module }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.details }}</td>
            </tr>
            <tr v-if="filteredLogs.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-gray-400 text-sm">
                No audit logs found matching your filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        class="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ paginationStart }}</span> to
          <span class="font-medium">{{ paginationEnd }}</span> of
          <span class="font-medium">{{ totalItems }}</span> results
        </p>

        <div
          v-if="totalPages > 1"
          class="flex border border-gray-300 rounded-md overflow-hidden bg-white"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            &lt;
          </button>

          <template v-for="page in visiblePages" :key="page">
            <span v-if="page === -1" class="px-3 py-1 border-r border-gray-300 text-gray-400"
              >...</span
            >
            <button
              v-else
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 border-r border-gray-300 transition-colors',
                page === currentPage
                  ? 'bg-gray-100 text-gray-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { activityLogApi } from '@/api-services/repositories/activityLogApi'
import { employeeApi } from '@/api-services/repositories/employeeApi'
import type { ActivityLogs, Datum } from '@/api-services/models/interfaces/activity_logs.interface'

// Tipe data untuk struktur log yang ditampilkan di UI
interface AuditLog {
  id: string
  timestamp: string
  user: string
  role: string
  action: string
  module: string
  details: string
}

// --- DATA STATE ---
const auditLogs = ref<AuditLog[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// --- EMPLOYEE MAPPING STATE ---
const employeeMap = ref(new Map<string, { name: string; role: string }>())

// --- PAGINATION STATE (server-side) ---
const currentPage = ref(1)
const itemsPerPage = 10
const meta = ref<ActivityLogs['meta'] | null>(null)

// --- FILTER STATE ---
const searchQuery = ref('')
const selectedAction = ref('')
const selectedModule = ref('')

// --- FORMAT HELPERS ---
const formatTimestamp = (dateInput: string | Date): string => {
  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const s = String(date.getSeconds()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

const formatAction = (action: string): string => {
  // Capitalize first letter, lowercase the rest (e.g., "CREATE" → "Created")
  const lower = action.toLowerCase()
  if (lower === 'create') return 'Created'
  if (lower === 'update') return 'Updated'
  if (lower === 'delete') return 'Deleted'
  if (lower === 'login') return 'Login'
  return action.charAt(0).toUpperCase() + action.slice(1).toLowerCase()
}

const mapApiToAuditLog = (item: Datum): AuditLog => {
  const empInfo = employeeMap.value.get(item.employeeId)
  return {
    id: item.id,
    timestamp: formatTimestamp(item.createdAt),
    user: empInfo ? empInfo.name : 'Unknown',
    role: empInfo ? empInfo.role.toLowerCase() : '-',
    action: formatAction(item.action),
    module: item.resourceType ?? '-',
    details: item.payloadData
      ? typeof item.payloadData === 'object' && item.payloadData !== null
        ? ((item.payloadData as Record<string, any>).message ?? JSON.stringify(item.payloadData))
        : String(item.payloadData)
      : '-',
  }
}

// --- FETCH DATA ---
const fetchEmployees = async () => {
  try {
    const res = await employeeApi.getAll(1, 1000)
    const employees = res.data || []
    employees.forEach((emp) => {
      if (emp.id && emp.name) {
        employeeMap.value.set(emp.id, {
          name: emp.name,
          role: emp.role || 'employee',
        })
      }
    })
  } catch (err) {
    console.error('Failed to load employees for lookup:', err)
  }
}

const fetchLogs = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await activityLogApi.getAll(currentPage.value, itemsPerPage)
    auditLogs.value = result.data.map(mapApiToAuditLog)
    meta.value = result.meta
  } catch (e: any) {
    error.value = e?.response?.data?.message || e?.message || 'Failed to fetch audit logs'
    auditLogs.value = []
    meta.value = null
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await fetchEmployees()
  await fetchLogs()
})

// Refetch when page changes
watch(currentPage, () => {
  fetchLogs()
})

// --- COMPUTED: Filtered Logs (client-side filtering on current page data) ---
const filteredLogs = computed(() => {
  return auditLogs.value.filter((log) => {
    const matchesSearch =
      !searchQuery.value ||
      log.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesAction = !selectedAction.value || log.action === selectedAction.value
    const matchesModule =
      !selectedModule.value || log.module.toLowerCase().includes(selectedModule.value.toLowerCase())

    return matchesSearch && matchesAction && matchesModule
  })
})

// --- COMPUTED: Pagination helpers (server-side) ---
const totalPages = computed(() => {
  return meta.value?.lastPage ?? 1
})

const totalItems = computed(() => {
  return meta.value?.total ?? 0
})

const paginationStart = computed(() => {
  if (totalItems.value === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, totalItems.value)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
  } else {
    pages.push(1)
    if (current > 3) pages.push(-1) // ellipsis sentinel

    const start = Math.max(2, current - 1)
    const end = Math.min(total - 1, current + 1)

    for (let i = start; i <= end; i++) pages.push(i)

    if (current < total - 2) pages.push(-1)
    pages.push(total)
  }

  return pages
})

// --- PAGINATION METHODS ---
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
}

// Reset to page 1 when filters change
watch([searchQuery, selectedAction, selectedModule], () => {
  currentPage.value = 1
})

// --- EXPORT FUNCTIONS ---
const getExportFilename = (extension: string) => {
  const now = new Date()
  const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  return `audit-log-${dateStr}.${extension}`
}

const downloadBlob = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

const exportCSV = () => {
  const headers = ['Timestamp', 'User', 'Role', 'Action', 'Module', 'Details']
  const rows = filteredLogs.value.map((log) => [
    log.timestamp,
    log.user,
    log.role,
    log.action,
    log.module,
    log.details,
  ])

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
  ].join('\n')

  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  downloadBlob(blob, getExportFilename('csv'))
}

const exportExcel = () => {
  const headers = ['Timestamp', 'User', 'Role', 'Action', 'Module', 'Details']
  const data = [
    headers,
    ...filteredLogs.value.map((log) => [
      log.timestamp,
      log.user,
      log.role,
      log.action,
      log.module,
      log.details,
    ]),
  ]

  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Audit Log')
  XLSX.writeFile(wb, getExportFilename('xlsx'))
}

const exportPDF = () => {
  const doc = new jsPDF()

  doc.setFontSize(16)
  doc.text('Audit Log Report', 14, 20)

  doc.setFontSize(10)
  doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 28)
  doc.text(`Total Records: ${filteredLogs.value.length}`, 14, 34)

  const headers = [['Timestamp', 'User', 'Role', 'Action', 'Module', 'Details']]
  const rows = filteredLogs.value.map((log) => [
    log.timestamp,
    log.user,
    log.role,
    log.action,
    log.module,
    log.details,
  ])

  autoTable(doc, {
    head: headers,
    body: rows,
    startY: 40,
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [22, 163, 74], textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [245, 245, 245] },
    margin: { top: 10 },
  })

  doc.save(getExportFilename('pdf'))
}

// --- FUNCTION: Action badge color ---
const getActionBadgeClass = (action: string) => {
  const lower = action.toLowerCase()
  if (lower.includes('login') || lower.includes('sign-in')) {
    return 'bg-emerald-50 text-emerald-700 border-emerald-200'
  }
  if (lower.includes('create') || lower.includes('add') || lower.includes('post')) {
    return 'bg-blue-50 text-blue-700 border-blue-200'
  }
  if (
    lower.includes('update') ||
    lower.includes('edit') ||
    lower.includes('patch') ||
    lower.includes('modify')
  ) {
    return 'bg-amber-50 text-amber-700 border-amber-200'
  }
  if (lower.includes('delete') || lower.includes('remove')) {
    return 'bg-rose-50 text-rose-700 border-rose-200'
  }
  return 'bg-indigo-50 text-indigo-700 border-indigo-200'
}

// --- FUNCTION: Module badge color ---
const getModuleBadgeClass = (moduleName: string) => {
  const lower = moduleName.toLowerCase()
  if (lower.includes('medicine') || lower.includes('inventory') || lower.includes('storage')) {
    return 'bg-emerald-50 text-emerald-700 border border-emerald-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  if (lower.includes('category')) {
    return 'bg-teal-50 text-teal-700 border border-teal-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  if (lower.includes('supplier')) {
    return 'bg-cyan-50 text-cyan-700 border border-cyan-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  if (lower.includes('order')) {
    return 'bg-purple-50 text-purple-700 border border-purple-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  if (lower.includes('transaction') || lower.includes('cashier') || lower.includes('sale')) {
    return 'bg-rose-50 text-rose-700 border border-rose-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  if (lower.includes('user') || lower.includes('employee') || lower.includes('management')) {
    return 'bg-orange-50 text-orange-700 border border-orange-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  if (lower.includes('auth') || lower.includes('authentication') || lower.includes('profile')) {
    return 'bg-sky-50 text-sky-700 border border-sky-100 font-medium px-2 py-0.5 rounded-md text-xs'
  }
  return 'bg-gray-50 text-gray-600 border border-gray-100 font-medium px-2 py-0.5 rounded-md text-xs'
}
</script>
