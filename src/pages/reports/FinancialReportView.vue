<template>
  <div class="min-h-screen bg-gray-50/80 font-sans text-gray-800">
    <!-- Header -->
    <div class="mb-8">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Financial Report</h1>
          <p class="text-sm text-gray-500 mt-1.5">Revenue, expenses, and profit analysis</p>
        </div>
        <div class="flex items-center gap-3">
          <div class="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1.5 shadow-sm">
            <button
              @click="selectedPeriod = 'daily'"
              :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                selectedPeriod === 'daily'
                  ? 'bg-[#11764B] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >Daily</button>
            <button
              @click="selectedPeriod = 'monthly'"
              :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                selectedPeriod === 'monthly'
                  ? 'bg-[#11764B] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >Monthly</button>
            <button
              @click="selectedPeriod = 'yearly'"
              :class="[
                'px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-150',
                selectedPeriod === 'yearly'
                  ? 'bg-[#11764B] text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-100'
              ]"
            >Yearly</button>
          </div>

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
      <div class="grid gap-5 md:grid-cols-4 mt-6">
        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-green-50 rounded-xl text-green-600 group-hover:bg-green-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m4-12H8c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Total Revenue</p>
              <p class="text-xl font-bold text-green-600 mt-0.5 tabular-nums">{{ formatCurrency(totalRevenue) }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-red-50 rounded-xl text-red-600 group-hover:bg-red-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Total Expenses</p>
              <p class="text-xl font-bold text-red-600 mt-0.5 tabular-nums">{{ formatCurrency(totalExpenses) }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-red-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 group-hover:bg-blue-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Net Profit</p>
              <p class="text-xl font-bold mt-0.5 tabular-nums" :class="netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'">
                {{ formatCurrency(netProfit) }}
              </p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>

        <div class="group relative rounded-xl bg-white p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
          <div class="flex items-center gap-3">
            <div class="p-2.5 bg-purple-50 rounded-xl text-purple-600 group-hover:bg-purple-100 group-hover:scale-110 transition-all duration-300">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500">Transactions</p>
              <p class="text-xl font-bold text-gray-900 mt-0.5 tabular-nums">{{ totalTransactions }}</p>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 h-1 bg-purple-500 rounded-b-xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </div>
      </div>

      <!-- Mini Chart -->
      <div class="grid gap-5 md:grid-cols-2 mt-2">
        <div class="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <h4 class="text-sm font-semibold text-gray-700 mb-4">Revenue Trend</h4>
          <div class="h-36 flex items-end justify-between gap-2">
            <div
              v-for="(item, i) in revenueChartData"
              :key="i"
              class="flex-1 flex flex-col items-center gap-1.5 group/chart"
            >
              <span class="text-[10px] text-gray-400 font-medium opacity-0 group-hover/chart:opacity-100 transition-opacity">{{ formatCurrencyShort(item.value) }}</span>
              <div
                class="w-full rounded-t-md transition-all duration-500 group-hover/chart:opacity-80"
                :class="item.type === 'revenue' ? 'bg-green-400' : 'bg-red-400'"
                :style="{ height: getChartHeight(item.value, maxChartValue) + '%' }"
              ></div>
              <span class="text-[10px] text-gray-400 mt-1">{{ item.label }}</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl bg-white p-5 shadow-sm border border-gray-100">
          <h4 class="text-sm font-semibold text-gray-700 mb-4">Profit Margin</h4>
          <div class="flex items-center justify-center h-36">
            <div class="relative w-32 h-32">
              <svg class="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#f3f4f6" stroke-width="3" />
                <circle
                  cx="18" cy="18" r="15.9"
                  fill="none" stroke="currentColor" stroke-width="3"
                  stroke-dasharray="100"
                  :stroke-dashoffset="100 - profitMarginPercent"
                  class="text-[#11764B] transition-all duration-1000 ease-out"
                  stroke-linecap="round"
                />
              </svg>
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="text-center">
                  <p class="text-2xl font-bold text-gray-900">{{ profitMarginPercent.toFixed(0) }}%</p>
                  <p class="text-[10px] text-gray-400 font-medium">Margin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="rounded-xl bg-white shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h3 class="text-sm font-semibold text-gray-700">Transaction History</h3>
        <div class="relative">
          <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search transactions..."
            class="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 bg-white transition-shadow"
          />
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50/80">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">#</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Cashier</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Items</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-center">Status</th>
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
            <tr v-else-if="paginatedTransactions.length === 0">
              <td colspan="7" class="px-6 py-12 text-center">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m4-12H8c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2z"></path>
                  </svg>
                  <p class="text-gray-400 text-sm">No transactions found</p>
                  <p class="text-gray-300 text-xs">Try adjusting your search criteria</p>
                </div>
              </td>
            </tr>
            <tr
              v-for="(trx, index) in paginatedTransactions"
              :key="trx.id"
              class="hover:bg-gray-50/60 transition-colors duration-150 even:bg-gray-50/30"
            >
              <td class="px-6 py-4 text-sm text-gray-400 font-mono">{{ showingStart + index }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="text-sm text-gray-600">{{ trx.date }}</span>
              </td>
              <td class="px-6 py-4">
                <span class="font-mono text-xs font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{{ trx.code }}</span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-700">{{ trx.cashier }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ trx.items }}</td>
              <td class="px-6 py-4 text-right">
                <span class="font-medium tabular-nums" :class="trx.type === 'revenue' ? 'text-green-600' : 'text-red-600'">
                  {{ trx.type === 'revenue' ? '' : '-' }}{{ formatCurrency(trx.amount) }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <span
                  class="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border"
                  :class="trx.status === 'completed' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'"
                >
                  <span class="w-1.5 h-1.5 rounded-full" :class="trx.status === 'completed' ? 'bg-green-500' : 'bg-yellow-500'"></span>
                  {{ trx.status === 'completed' ? 'Completed' : 'Pending' }}
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
          of <span class="font-medium text-gray-700">{{ filteredTransactions.length }}</span> results
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
            >...</button>
            <button
              v-else
              @click="goToPage(Number(page))"
              :class="[
                'px-3 py-1.5 border rounded-lg text-sm transition-all duration-150',
                currentPage === page
                  ? 'bg-[#11764B] text-white border-[#11764B] shadow-sm'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-800'
              ]"
            >{{ page }}</button>
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
import { financialReportApi } from '@/api-services/repositories/financialReportApi'

// --- TYPES ---
interface Transaction {
  id: number
  date: string
  code: string
  cashier: string
  items: number
  amount: number
  type: 'revenue' | 'expense'
  status: 'completed' | 'pending'
}

// --- MOCK DATA ---
const mockTransactions: Transaction[] = [
  { id: 1, date: '20 May 2026', code: 'TRX-2026-0582', cashier: 'Siti Aminah', items: 3, amount: 450000, type: 'revenue', status: 'completed' },
  { id: 2, date: '20 May 2026', code: 'TRX-2026-0581', cashier: 'Dewi Lestari', items: 1, amount: 125000, type: 'revenue', status: 'completed' },
  { id: 3, date: '20 May 2026', code: 'PO-2026-0027', cashier: 'Rakha Fatih', items: 50, amount: 2800000, type: 'expense', status: 'completed' },
  { id: 4, date: '19 May 2026', code: 'TRX-2026-0580', cashier: 'Siti Aminah', items: 5, amount: 780000, type: 'revenue', status: 'completed' },
  { id: 5, date: '19 May 2026', code: 'TRX-2026-0579', cashier: 'Dewi Lestari', items: 2, amount: 340000, type: 'revenue', status: 'completed' },
  { id: 6, date: '19 May 2026', code: 'TRX-2026-0578', cashier: 'Siti Aminah', items: 4, amount: 560000, type: 'revenue', status: 'pending' },
  { id: 7, date: '18 May 2026', code: 'TRX-2026-0577', cashier: 'Budi Santoso', items: 1, amount: 95000, type: 'revenue', status: 'completed' },
  { id: 8, date: '18 May 2026', code: 'TRX-2026-0576', cashier: 'Dewi Lestari', items: 6, amount: 1250000, type: 'revenue', status: 'completed' },
  { id: 9, date: '18 May 2026', code: 'PO-2026-0026', cashier: 'Rakha Fatih', items: 30, amount: 1500000, type: 'expense', status: 'completed' },
  { id: 10, date: '17 May 2026', code: 'TRX-2026-0575', cashier: 'Siti Aminah', items: 2, amount: 210000, type: 'revenue', status: 'completed' },
  { id: 11, date: '17 May 2026', code: 'TRX-2026-0574', cashier: 'Budi Santoso', items: 3, amount: 475000, type: 'revenue', status: 'completed' },
  { id: 12, date: '17 May 2026', code: 'PO-2026-0025', cashier: 'Habib Akbar', items: 40, amount: 3200000, type: 'expense', status: 'pending' },
  { id: 13, date: '16 May 2026', code: 'TRX-2026-0573', cashier: 'Dewi Lestari', items: 2, amount: 165000, type: 'revenue', status: 'completed' },
  { id: 14, date: '16 May 2026', code: 'TRX-2026-0572', cashier: 'Siti Aminah', items: 7, amount: 980000, type: 'revenue', status: 'completed' },
  { id: 15, date: '16 May 2026', code: 'PO-2026-0024', cashier: 'Rakha Fatih', items: 25, amount: 1750000, type: 'expense', status: 'completed' },
  { id: 16, date: '15 May 2026', code: 'TRX-2026-0571', cashier: 'Budi Santoso', items: 1, amount: 85000, type: 'revenue', status: 'completed' },
  { id: 17, date: '15 May 2026', code: 'TRX-2026-0570', cashier: 'Dewi Lestari', items: 4, amount: 620000, type: 'revenue', status: 'completed' },
  { id: 18, date: '15 May 2026', code: 'TRX-2026-0569', cashier: 'Siti Aminah', items: 3, amount: 390000, type: 'revenue', status: 'pending' },
  { id: 19, date: '14 May 2026', code: 'TRX-2026-0568', cashier: 'Rakha Fatih', items: 2, amount: 280000, type: 'revenue', status: 'completed' },
  { id: 20, date: '14 May 2026', code: 'PO-2026-0023', cashier: 'Habib Akbar', items: 60, amount: 4500000, type: 'expense', status: 'completed' },
  { id: 21, date: '14 May 2026', code: 'TRX-2026-0567', cashier: 'Budi Santoso', items: 1, amount: 150000, type: 'revenue', status: 'completed' },
  { id: 22, date: '13 May 2026', code: 'TRX-2026-0566', cashier: 'Dewi Lestari', items: 5, amount: 710000, type: 'revenue', status: 'completed' },
  { id: 23, date: '13 May 2026', code: 'TRX-2026-0565', cashier: 'Siti Aminah', items: 2, amount: 195000, type: 'revenue', status: 'completed' },
  { id: 24, date: '13 May 2026', code: 'PO-2026-0022', cashier: 'Rakha Fatih', items: 35, amount: 2100000, type: 'expense', status: 'pending' },
  { id: 25, date: '12 May 2026', code: 'TRX-2026-0564', cashier: 'Budi Santoso', items: 3, amount: 420000, type: 'revenue', status: 'completed' },
]

// --- STATE ---
const transactions = ref<Transaction[]>([])
const loading = ref(true)
const searchQuery = ref('')
const selectedPeriod = ref('daily')
const currentPage = ref(1)
const itemsPerPage = ref(8)

// --- PERIOD HELPERS ---
const getPeriodDateRange = (period: string) => {
  const today = new Date()
  let startDate: string | undefined
  let endDate: string | undefined

  if (period === 'daily') {
    const start = new Date(today)
    start.setHours(0, 0, 0, 0)
    const end = new Date(today)
    end.setHours(23, 59, 59, 999)
    startDate = start.toISOString()
    endDate = end.toISOString()
  } else if (period === 'monthly') {
    const start = new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0, 0)
    const end = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999)
    startDate = start.toISOString()
    endDate = end.toISOString()
  } else if (period === 'yearly') {
    const start = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0)
    const end = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999)
    startDate = start.toISOString()
    endDate = end.toISOString()
  }

  return { startDate, endDate }
}

// Transactions filtered by period only (for stats & chart)
const periodFilteredTransactions = computed(() => {
  return transactions.value
})

// Transactions filtered by period AND search query (for table)
const filteredTransactions = computed(() => {
  let result = periodFilteredTransactions.value
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    result = result.filter(
      (t) =>
        t.code.toLowerCase().includes(q) ||
        t.cashier.toLowerCase().includes(q) ||
        t.date.toLowerCase().includes(q)
    )
  }
  return result
})

const totalPages = computed(() => Math.max(1, Math.ceil(filteredTransactions.value.length / itemsPerPage.value)))

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredTransactions.value.slice(start, end)
})

const showingStart = computed(() => {
  if (filteredTransactions.value.length === 0) return 0
  return (currentPage.value - 1) * itemsPerPage.value + 1
})

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, filteredTransactions.value.length)
})

const totalRevenue = computed(() =>
  periodFilteredTransactions.value.filter((t) => t.type === 'revenue').reduce((sum, t) => sum + t.amount, 0)
)
const totalExpenses = computed(() =>
  periodFilteredTransactions.value.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0)
)
const netProfit = computed(() => totalRevenue.value - totalExpenses.value)
const totalTransactions = computed(() => periodFilteredTransactions.value.length)
const profitMarginPercent = computed(() =>
  totalRevenue.value > 0 ? ((netProfit.value / totalRevenue.value) * 100) : 0
)

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

// --- CHART DATA ---
interface ChartItem {
  label: string
  value: number
  type: 'revenue' | 'expense'
}

const revenueChartData = computed<ChartItem[]>(() => {
  // Group transactions by date for the last 7 days
  const dateMap = new Map<string, { revenue: number; expense: number }>()

  // Get last 7 days — format consistent with t.date format "20 May 2026"
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const key = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    dateMap.set(key, { revenue: 0, expense: 0 })
  }

  // Filter transactions for the last 7 days
  const sevenDaysAgo = new Date(today)
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6)

  periodFilteredTransactions.value.forEach((t) => {
    // Only include revenue transactions for the chart
    if (t.type !== 'revenue') return
    const key = t.date // format: "20 May 2026"
    if (dateMap.has(key)) {
      const entry = dateMap.get(key)!
      entry.revenue += t.amount
    }
  })

  const result: ChartItem[] = []
  dateMap.forEach((value, key) => {
    result.push({ label: key.replace(/ \d{4}$/, ''), value: value.revenue, type: 'revenue' })
  })

  return result
})

const maxChartValue = computed(() => {
  return Math.max(...revenueChartData.value.map((d) => d.value), 1)
})

const getChartHeight = (value: number, max: number): number => {
  return (value / max) * 100
}

// --- METHODS ---
const fetchTransactions = async () => {
  loading.value = true
  try {
    const { startDate, endDate } = getPeriodDateRange(selectedPeriod.value)
    const result = await financialReportApi.getData(startDate, endDate)

    // Map incomeBreakdown
    const income: Transaction[] = (result.incomeBreakdown ?? []).map((t) => {
      const d = t.transactionDate ? new Date(t.transactionDate) : new Date()
      return {
        id: t.id ?? '',
        date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        rawDate: d,
        code: t.transactionCode ?? '-',
        cashier: t.employee?.name ?? '-',
        items: t.transactionDetails?.reduce((s: number, det: any) => s + (det.quantity ?? 0), 0) ?? 0,
        amount: t.totalPrice ?? 0,
        type: 'revenue' as const,
        status: 'completed' as const
      }
    })

    // Map expenseBreakdown
    const expenses: Transaction[] = (result.expenseBreakdown ?? []).map((o) => {
      const d = o.orderDate ? new Date(o.orderDate) : new Date()
      return {
        id: o.id ?? '',
        date: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        rawDate: d,
        code: o.orderCode ?? '-',
        cashier: o.employee?.name ?? '-',
        items: o.orderDetails?.reduce((s: number, det: any) => s + (det.quantity ?? 0), 0) ?? 0,
        amount: o.totalPrice ?? 0,
        type: 'expense' as const,
        status: 'completed' as const
      }
    })

    const all = [...income, ...expenses]
    all.sort((a, b) => b.rawDate.getTime() - a.rawDate.getTime())
    transactions.value = all
  } catch (e) {
    console.error('Failed to fetch financial report:', e)
    transactions.value = []
  } finally {
    loading.value = false
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleExport = async (format: 'excel' | 'pdf' | 'csv') => {
  try {
    const { startDate, endDate } = getPeriodDateRange(selectedPeriod.value)
    const blob = await financialReportApi.exportReport(format, startDate, endDate)
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    const extension = format === 'excel' ? 'xlsx' : format === 'pdf' ? 'pdf' : 'csv'
    const dateRangeStr = startDate || endDate
      ? `_from_${startDate ? startDate.substring(0, 10) : 'start'}_to_${endDate ? endDate.substring(0, 10) : 'end'}`
      : '_all_time'

    link.setAttribute('download', `financial_report${dateRangeStr}.${extension}`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (e) {
    console.error('Failed to export financial report:', e)
    alert('Failed to export financial report.')
  }
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.abs(value))
}

const formatCurrencyShort = (value: number): string => {
  if (value >= 1000000) return 'Rp' + (value / 1000000).toFixed(1) + 'jt'
  if (value >= 1000) return 'Rp' + (value / 1000).toFixed(0) + 'rb'
  return 'Rp' + value
}

// --- WATCH ---
watch(searchQuery, () => {
  currentPage.value = 1
})

watch(selectedPeriod, () => {
  currentPage.value = 1
  fetchTransactions()
})

// --- LIFECYCLE ---
onMounted(() => {
  fetchTransactions()
})
</script>
