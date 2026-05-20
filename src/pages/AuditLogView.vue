<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      
      <div class="px-6 py-5 border-b border-gray-200">
        <h1 class="text-2xl font-bold text-gray-800">Audit Log</h1>
        <p class="text-sm text-gray-500 mt-1">
          Manage your pharmacy operations efficiently — secure tracking of employee activities and system changes.
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
          
          <select v-model="selectedAction" class="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white">
            <option value="">All Actions</option>
            <option>Login</option>
            <option>Created</option>
            <option>Updated</option>
            <option>Deleted</option>
          </select>

          <select v-model="selectedModule" class="py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-white">
            <option value="">All Modules</option>
            <option>Authentication</option>
            <option>User Management</option>
            <option>Medicine Inventory</option>
            <option>Suppliers</option>
            <option>Transaction</option>
          </select>
        </div>

        <button class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export Log
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-white">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Module</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">IP Address</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="log in paginatedLogs" :key="log.id" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.timestamp }}</td>
              <td class="px-6 py-4 text-sm font-medium text-gray-900">{{ log.user }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.role }}</td>
              <td class="px-6 py-4 text-sm">
                <span :class="getActionBadgeClass(log.action)" class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ log.action }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.module }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.details }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ log.ip }}</td>
            </tr>
            <tr v-if="filteredLogs.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">
                No audit logs found matching your filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-gray-600">
          Showing <span class="font-medium">{{ paginationStart }}</span> to <span class="font-medium">{{ paginationEnd }}</span> of <span class="font-medium">{{ filteredLogs.length }}</span> results
        </p>

        <div v-if="totalPages > 1" class="flex border border-gray-300 rounded-md overflow-hidden bg-white">
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >&lt;</button>

          <template v-for="page in visiblePages" :key="page">
            <span v-if="page === -1" class="px-3 py-1 border-r border-gray-300 text-gray-400">...</span>
            <button
              v-else
              @click="goToPage(page)"
              :class="[
                'px-3 py-1 border-r border-gray-300 transition-colors',
                page === currentPage
                  ? 'bg-gray-100 text-gray-800 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              ]"
            >{{ page }}</button>
          </template>

          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >&gt;</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

// Tipe data untuk struktur log
interface AuditLog {
  id: number;
  timestamp: string;
  user: string;
  role: string;
  action: 'Login' | 'Created' | 'Updated' | 'Deleted';
  module: string;
  details: string;
  ip: string;
}

// Data dummy (nantinya akan diisi dari API backend kamu)
const auditLogs = ref<AuditLog[]>([
  { id: 1, timestamp: '2026-05-20 08:19:52', user: 'Miss Felicia Ritchie MD', role: 'owner', action: 'Login', module: 'Authentication', details: 'Successful login', ip: '103.194.173.97' },
  { id: 2, timestamp: '2026-05-16 20:29:56', user: 'Miss Felicia Ritchie MD', role: 'owner', action: 'Login', module: 'Authentication', details: 'Successful login', ip: '103.194.173.98' },
  { id: 3, timestamp: '2026-05-13 14:51:19', user: 'Gertrude Ortiz Jr.', role: 'cashier', action: 'Created', module: 'Medicine Sales Transaction Management', details: 'Created new data: #', ip: '103.194.173.102' },
  { id: 4, timestamp: '2026-05-13 14:51:19', user: 'Gertrude Ortiz Jr.', role: 'cashier', action: 'Updated', module: 'Medicine Inventory', details: 'Updated data: #', ip: '103.194.173.102' },
  { id: 5, timestamp: '2026-05-13 14:51:19', user: 'Gertrude Ortiz Jr.', role: 'cashier', action: 'Created', module: 'Transaction Details Management', details: 'Created new data: #', ip: '103.194.173.102' },
  { id: 6, timestamp: '2026-05-13 14:51:19', user: 'Gertrude Ortiz Jr.', role: 'cashier', action: 'Updated', module: 'Medicine Sales Transaction Management', details: 'Updated data: #', ip: '103.194.173.102' },
  { id: 7, timestamp: '2026-05-13 14:43:21', user: 'Gertrude Ortiz Jr.', role: 'cashier', action: 'Login', module: 'Authentication', details: 'Successful login', ip: '103.194.173.101' },
  { id: 8, timestamp: '2026-05-13 13:49:29', user: 'Name Connelly', role: 'pharmacist', action: 'Login', module: 'Authentication', details: 'Successful login', ip: '103.194.173.98' },
  { id: 9, timestamp: '2026-05-11 16:13:12', user: 'Miss Felicia Ritchie MD', role: 'owner', action: 'Deleted', module: 'Medicine Inventory', details: 'Deleted data: #', ip: '103.233.100.198' },
]);

// --- FILTER STATE ---
const searchQuery = ref('')
const selectedAction = ref('')
const selectedModule = ref('')

// --- PAGINATION STATE ---
const currentPage = ref(1)
const itemsPerPage = 5

// --- COMPUTED: Filtered Logs ---
const filteredLogs = computed(() => {
  return auditLogs.value.filter(log => {
    const matchesSearch = !searchQuery.value ||
      log.user.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesAction = !selectedAction.value || log.action === selectedAction.value
    const matchesModule = !selectedModule.value || log.module === selectedModule.value

    return matchesSearch && matchesAction && matchesModule
  })
})

// --- COMPUTED: Paginated Logs ---
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredLogs.value.slice(start, end)
})

// --- COMPUTED: Pagination helpers ---
const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredLogs.value.length / itemsPerPage))
})

const paginationStart = computed(() => {
  if (filteredLogs.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage + 1
})

const paginationEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage, filteredLogs.value.length)
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

// --- FUNCTION: Action badge color ---
const getActionBadgeClass = (action: string) => {
  switch (action) {
    case 'Login':
      return 'bg-green-100 text-green-700';
    case 'Created':
      return 'bg-blue-100 text-blue-700';
    case 'Updated':
      return 'bg-yellow-100 text-yellow-700';
    case 'Deleted':
      return 'bg-purple-100 text-purple-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
};
</script>