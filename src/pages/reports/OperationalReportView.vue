<template>
  <div class="min-h-screen bg-gray-50/80 font-sans text-gray-800">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Operational Report</h1>
          <p class="text-sm text-gray-500 mt-1.5">Apothecary activities and inventory changes</p>
        </div>

        <!-- Date Filters & Export -->
        <div class="flex flex-wrap items-center gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div class="flex items-center gap-2">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider">From</label>
            <input
              type="date"
              v-model="startDate"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] bg-white"
            />
          </div>
          <div class="flex items-center gap-2">
            <label class="text-xs font-semibold text-gray-500 uppercase tracking-wider">To</label>
            <input
              type="date"
              v-model="endDate"
              class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] bg-white"
            />
          </div>

          <div class="h-6 w-px bg-gray-200"></div>

          <div class="relative group">
            <button
              class="inline-flex items-center gap-2 rounded-lg bg-[#11764B] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#158e5a] transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.97]"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              Export Report
              <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div class="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div class="py-1">
                <button @click="handleExport('excel')" class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  <span>Excel Format</span>
                </button>
                <button @click="handleExport('pdf')" class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  <span>PDF Format</span>
                </button>
                <button @click="handleExport('csv')" class="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left">
                  <span>CSV Format</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stat Cards -->
      <div class="grid gap-5 md:grid-cols-4 mt-8">
        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Total Activities</p>
              <p class="text-xl font-bold text-gray-900 mt-0.5 tabular-nums">{{ stats.totalActivityLogs }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Total Medicines</p>
              <p class="text-xl font-bold text-gray-900 mt-0.5 tabular-nums">{{ stats.totalMedicines }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-orange-50 rounded-xl text-orange-600 group-hover:bg-orange-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Low Stock Items</p>
              <p class="text-xl font-bold text-orange-600 mt-0.5 tabular-nums">{{ stats.lowStockMedicines }}</p>
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
              <p class="text-xs font-medium text-gray-500">Expired Items</p>
              <p class="text-xl font-bold text-red-600 mt-0.5 tabular-nums">{{ stats.expiredMedicines }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </div>
    </div>

    <!-- Main Container -->
    <div class="rounded-xl bg-white shadow-sm border border-gray-200 overflow-hidden">
      <!-- Tabs -->
      <div class="border-b border-gray-200 bg-gray-50/30 px-6">
        <nav class="-mb-px flex space-x-6" aria-label="Tabs">
          <button
            @click="activeTab = 'activities'"
            :class="[
              activeTab === 'activities'
                ? 'border-[#11764B] text-[#11764B]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-150 cursor-pointer'
            ]"
          >
            Employee Activities
          </button>
          <button
            @click="activeTab = 'inventory'"
            :class="[
              activeTab === 'inventory'
                ? 'border-[#11764B] text-[#11764B]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm transition-all duration-150 cursor-pointer'
            ]"
          >
            Medicine Inventory Status
          </button>
        </nav>
      </div>

      <!-- Filters & Content -->
      <div class="p-6">
        <div v-show="activeTab === 'activities'" class="space-y-4">
          <!-- Activities Filters -->
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
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
                  class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 bg-white transition-shadow"
                />
              </div>

              <select
                v-model="selectedAction"
                class="py-2 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] bg-white"
              >
                <option value="">All Actions</option>
                <option value="created">Created</option>
                <option value="updated">Updated</option>
                <option value="deleted">Deleted</option>
                <option value="login">Login</option>
              </select>
            </div>
          </div>

          <!-- Activities Table -->
          <div class="overflow-x-auto border border-gray-100 rounded-lg">
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
                      <span class="text-gray-400 text-sm">Loading activities...</span>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="filteredLogs.length === 0">
                  <td colspan="6" class="px-6 py-12 text-center text-gray-400 text-sm">
                    No activities found.
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(log, index) in paginatedLogs"
                  :key="log.id"
                  class="hover:bg-gray-50/60 transition-colors duration-150"
                >
                  <td class="px-6 py-4 text-sm text-gray-400 font-mono">{{ activitiesShowingStart + index }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="text-sm text-gray-600">{{ log.timestamp }}</span>
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
                  <td class="px-6 py-4 text-sm text-gray-600">{{ log.module }}</td>
                  <td class="px-6 py-4">
                    <p class="text-sm text-gray-700 max-w-xs truncate" :title="log.description">{{ log.description }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Activities Pagination -->
          <div class="flex items-center justify-between mt-4">
            <span class="text-sm text-gray-500">
              Showing {{ activitiesShowingStart }} to {{ activitiesShowingEnd }} of {{ filteredLogs.length }} results
            </span>
            <div class="flex items-center gap-1.5">
              <button
                @click="activitiesCurrentPage = Math.max(1, activitiesCurrentPage - 1)"
                :disabled="activitiesCurrentPage <= 1"
                class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              <button
                v-for="page in activitiesTotalPages"
                :key="page"
                @click="activitiesCurrentPage = page"
                :class="[
                  'px-3 py-1.5 border rounded-lg text-sm',
                  activitiesCurrentPage === page
                    ? 'bg-[#11764B] text-white border-[#11764B]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="activitiesCurrentPage = Math.min(activitiesTotalPages, activitiesCurrentPage + 1)"
                :disabled="activitiesCurrentPage >= activitiesTotalPages"
                class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'inventory'" class="space-y-4">
          <!-- Inventory Filters -->
          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                v-model="medicineSearchQuery"
                type="text"
                placeholder="Search medicines..."
                class="pl-9 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 bg-white transition-shadow"
              />
            </div>
          </div>

          <!-- Inventory Table -->
          <div class="overflow-x-auto border border-gray-100 rounded-lg">
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
                      <span class="text-gray-400 text-sm">Loading inventory...</span>
                    </div>
                  </td>
                </tr>
                <tr v-else-if="filteredMedicines.length === 0">
                  <td colspan="7" class="px-6 py-12 text-center text-gray-400 text-sm">
                    No medicines found.
                  </td>
                </tr>
                <tr
                  v-else
                  v-for="(item, index) in paginatedMedicines"
                  :key="item.id"
                  class="hover:bg-gray-50/60 transition-all duration-200"
                >
                  <td class="px-6 py-4 text-sm font-mono text-gray-400">{{ medicineShowingStart + index }}</td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex flex-col">
                      <span class="text-sm font-semibold text-gray-900">{{ item.medicineName }}</span>
                      <span class="text-xs text-gray-400 mt-0.5">{{ item.sku }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-sm text-gray-500">{{ item.category }}</td>
                  <td class="px-6 py-4 text-sm text-gray-900 font-medium tabular-nums">{{ item.stock }}</td>
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
                  <td class="px-6 py-4 text-sm text-gray-500">
                    <span :class="{ 'text-red-600 font-semibold': item.status === 'Expired' }">
                      {{ item.expiryDate }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Inventory Pagination -->
          <div class="flex items-center justify-between mt-4">
            <span class="text-sm text-gray-500">
              Showing {{ medicineShowingStart }} to {{ medicineShowingEnd }} of {{ filteredMedicines.length }} results
            </span>
            <div class="flex items-center gap-1.5">
              <button
                @click="medicineCurrentPage = Math.max(1, medicineCurrentPage - 1)"
                :disabled="medicineCurrentPage <= 1"
                class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &lt;
              </button>
              <button
                v-for="page in medicineTotalPages"
                :key="page"
                @click="medicineCurrentPage = page"
                :class="[
                  'px-3 py-1.5 border rounded-lg text-sm',
                  medicineCurrentPage === page
                    ? 'bg-[#11764B] text-white border-[#11764B]'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="medicineCurrentPage = Math.min(medicineTotalPages, medicineCurrentPage + 1)"
                :disabled="medicineCurrentPage >= medicineTotalPages"
                class="px-3 py-1.5 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { operationalReportApi } from '@/api-services/repositories/operationalReportApi'

interface OperationalLog {
  id: number
  timestamp: string
  user: string
  role: string
  action: 'created' | 'updated' | 'deleted' | 'login'
  module: string
  description: string
}

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

// --- STATE ---
const route = useRoute()
const activeTab = ref(route.query.tab === 'inventory' ? 'inventory' : 'activities')
const loading = ref(true)
const error = ref<string | null>(null)

// Date Filters
const startDate = ref('')
const endDate = ref('')

// Summary Stats
const stats = ref({
  totalMedicines: 0,
  lowStockMedicines: 0,
  outOfStockMedicines: 0,
  expiredMedicines: 0,
  totalActivityLogs: 0,
})

// Data Lists
const logs = ref<OperationalLog[]>([])
const medicines = ref<MedicineReportItem[]>([])

// Activities Filters & Pagination
const searchQuery = ref('')
const selectedAction = ref('')
const activitiesCurrentPage = ref(1)
const itemsPerPage = ref(10)

// Medicine Filters & Pagination
const medicineSearchQuery = ref('')
const medicineCurrentPage = ref(1)

// --- FORMAT HELPERS ---
const formatTimestamp = (isoDate: string): string => {
  const date = new Date(isoDate)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const d = date.getDate()
  const m = months[date.getMonth()]
  const y = date.getFullYear()
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${d} ${m} ${y} ${h}:${min}`
}

const determineStatus = (stock: number, expiryDate: string | Date | undefined): MedicineReportItem['status'] => {
  if (!expiryDate) return 'Good'
  const expiry = new Date(expiryDate)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (expiry < today) return 'Expired'
  if (stock <= 5) return 'Critical'
  if (stock <= 15) return 'Low Stock'
  return 'Good'
}

// --- FETCH DATA ---
const fetchReportData = async () => {
  loading.value = true
  error.value = null
  try {
    const result = await operationalReportApi.getData(startDate.value || undefined, endDate.value || undefined)

    // 1. Map Stats
    stats.value = {
      totalMedicines: result.stats.totalMedicines || 0,
      lowStockMedicines: result.stats.lowStockMedicines || 0,
      outOfStockMedicines: result.stats.outOfStockMedicines || 0,
      expiredMedicines: result.stats.expiredMedicines || 0,
      totalActivityLogs: result.stats.totalActivityLogs || 0,
    }

    // 2. Map Activity Logs
    logs.value = result.activityLogs.map((item) => {
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
    })

    // 3. Map Medicines
    medicines.value = result.medicines.map((item) => ({
      id: item.id,
      medicineName: item.medicineName || 'Unknown',
      sku: item.sku || '-',
      category: item.category?.categoryName || '-',
      stock: item.stock || 0,
      unit: 'Pcs',
      status: determineStatus(item.stock || 0, item.expiredDate),
      expiryDate: item.expiredDate ? new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(item.expiredDate)) : '-'
    }))

  } catch (e: any) {
    error.value = e?.response?.data?.message || e?.message || 'Failed to fetch operational report'
    logs.value = []
    medicines.value = []
  } finally {
    loading.value = false
  }
}

// --- COMPUTED PROPERTIES ---

// Employee Activities Tab Filters & Pagination
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

const activitiesTotalPages = computed(() => Math.max(1, Math.ceil(filteredLogs.value.length / itemsPerPage.value)))

const paginatedLogs = computed(() => {
  const start = (activitiesCurrentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredLogs.value.slice(start, end)
})

const activitiesShowingStart = computed(() => {
  if (filteredLogs.value.length === 0) return 0
  return (activitiesCurrentPage.value - 1) * itemsPerPage.value + 1
})

const activitiesShowingEnd = computed(() => {
  return Math.min(activitiesCurrentPage.value * itemsPerPage.value, filteredLogs.value.length)
})

// Medicine Inventory Tab Filters & Pagination
const filteredMedicines = computed(() => {
  if (!medicineSearchQuery.value.trim()) return medicines.value
  const query = medicineSearchQuery.value.toLowerCase().trim()
  return medicines.value.filter(
    (m) =>
      m.medicineName.toLowerCase().includes(query) ||
      m.sku.toLowerCase().includes(query) ||
      m.category.toLowerCase().includes(query)
  )
})

const medicineTotalPages = computed(() => Math.max(1, Math.ceil(filteredMedicines.value.length / itemsPerPage.value)))

const paginatedMedicines = computed(() => {
  const start = (medicineCurrentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredMedicines.value.slice(start, end)
})

const medicineShowingStart = computed(() => {
  if (filteredMedicines.value.length === 0) return 0
  return (medicineCurrentPage.value - 1) * itemsPerPage.value + 1
})

const medicineShowingEnd = computed(() => {
  return Math.min(medicineCurrentPage.value * itemsPerPage.value, filteredMedicines.value.length)
})

// --- EXPORT FUNCTION ---
const handleExport = async (format: 'excel' | 'pdf' | 'csv') => {
  try {
    const blob = await operationalReportApi.exportReport(format, startDate.value || undefined, endDate.value || undefined)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    const extension = format === 'excel' ? 'xlsx' : format === 'pdf' ? 'pdf' : 'csv'
    const dateRangeStr = startDate.value || endDate.value
      ? `_from_${startDate.value || 'start'}_to_${endDate.value || 'end'}`
      : '_all_time'

    link.setAttribute('download', `operational_report${dateRangeStr}.${extension}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Failed to export operational report:', e)
    alert('Failed to export operational report.')
  }
}

// --- UTILS ---
const getUserInitials = (name: string): string => {
  if (!name || name === 'System/Unknown') return 'SYS'
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}

const getActionBadgeClass = (action: string) => {
  switch (action) {
    case 'created':
      return 'bg-green-50 text-green-700 border-green-200'
    case 'deleted':
      return 'bg-red-50 text-red-700 border-red-200'
    case 'login':
      return 'bg-blue-50 text-blue-700 border-blue-200'
    default:
      return 'bg-orange-50 text-orange-700 border-orange-200'
  }
}

const getActionDotClass = (action: string) => {
  switch (action) {
    case 'created':
      return 'bg-green-500'
    case 'deleted':
      return 'bg-red-500'
    case 'login':
      return 'bg-blue-500'
    default:
      return 'bg-orange-500'
  }
}

// --- WATCHERS ---
watch([searchQuery, selectedAction], () => {
  activitiesCurrentPage.value = 1
})

watch(medicineSearchQuery, () => {
  medicineCurrentPage.value = 1
})

// Refetch report data when date filters change
watch([startDate, endDate], () => {
  fetchReportData()
})

watch(() => route.query.tab, (newTab) => {
  if (newTab === 'inventory' || newTab === 'activities') {
    activeTab.value = newTab as string
  }
})

// --- LIFECYCLE ---
onMounted(() => {
  fetchReportData()
})
</script>
