<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">Manage your pharmacy operations efficiently</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start"
      >
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Medicines</p>
          <h3 class="text-3xl font-bold text-gray-900" v-if="!loading">{{ totalMedicines }}</h3>
          <div v-else class="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            ></path>
          </svg>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start"
      >
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Low Stock Items</p>
          <h3 class="text-3xl font-bold text-gray-900" v-if="!loading">{{ lowStockCount }}</h3>
          <div v-else class="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
          <p class="text-xs text-orange-600 mt-2 font-medium" v-if="!loading && lowStockCount > 0">
            Requires immediate attention
          </p>
        </div>
        <div class="p-2 bg-orange-50 rounded-lg text-orange-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            ></path>
          </svg>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start"
      >
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
          <h3
            class="text-xl font-bold text-gray-900 truncate max-w-[180px]"
            :title="formatCurrency(totalRevenue)"
            v-if="!loading"
          >
            {{ formatCurrency(totalRevenue) }}
          </h3>
          <div v-else class="h-7 w-32 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div class="p-2 bg-green-50 rounded-lg text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m4-12H8c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2z"
            ></path>
          </svg>
        </div>
      </div>

      <div
        class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start"
      >
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Transactions</p>
          <h3 class="text-3xl font-bold text-gray-900" v-if="!loading">{{ totalTransactions }}</h3>
          <div v-else class="h-9 w-20 bg-gray-200 animate-pulse rounded"></div>
        </div>
        <div class="p-2 bg-purple-50 rounded-lg text-purple-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h4 class="text-md font-bold mb-6">Sales Chart (Last 30 Days)</h4>
        <div class="h-48 flex items-end justify-between relative group">
          <svg class="w-full h-full text-blue-500" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,20"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,20 V40 H0 Z"
              fill="url(#blueGradient)"
              fill-opacity="0.1"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="currentColor" />
                <stop offset="100%" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
          <div
            class="absolute w-2 h-2 bg-blue-600 rounded-full border-2 border-white shadow"
            style="left: 80%; top: 35%"
          ></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h4 class="text-md font-bold mb-6">Transaction Chart (Last 30 Days)</h4>
        <div class="h-48 flex items-end justify-between relative group">
          <svg class="w-full h-full text-green-500" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path
              d="M0,30 Q15,35 30,28 T50,25 T70,18 T100,12"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
            <path
              d="M0,30 Q15,35 30,28 T50,25 T70,18 T100,12 V40 H0 Z"
              fill="url(#greenGradient)"
              fill-opacity="0.1"
            />
            <defs>
              <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="currentColor" />
                <stop offset="100%" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
          <div
            class="absolute w-2 h-2 bg-green-600 rounded-full border-2 border-white shadow"
            style="left: 70%; top: 45%"
          ></div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <h4 class="text-md font-bold">Medicines Nearing Expiry</h4>
      </div>
      <div class="p-4">
        <div v-if="loading" class="flex justify-center p-6">
          <svg
            class="animate-spin h-6 w-6 text-[#11764B]"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
        <div v-else-if="nearingExpiry.length === 0" class="p-6 text-center text-gray-500">
          No medicines are nearing expiry within the next 30 days.
        </div>
        <div v-else class="space-y-3">
          <div
            v-for="(item, index) in nearingExpiry"
            :key="index"
            class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100"
          >
            <div class="flex items-center gap-4">
              <div
                class="p-2 rounded-lg"
                :class="
                  item.daysLeft <= 14 ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                "
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  ></path>
                </svg>
              </div>
              <div>
                <h5 class="text-sm font-bold text-gray-900">{{ item.name }}</h5>
                <p class="text-xs text-gray-400 font-medium">Expires: {{ item.date }}</p>
              </div>
            </div>
            <span
              class="text-sm font-bold"
              :class="item.daysLeft <= 14 ? 'text-red-600' : 'text-orange-600'"
              >{{ item.daysLeft }} days left</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'
import { transactionApi } from '@/api-services/repositories/transactionApi'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const loading = ref(true)

const totalMedicines = ref(0)
const lowStockCount = ref(0)
const totalRevenue = ref(0)
const totalTransactions = ref(0)

const nearingExpiry = ref<{ name: string; date: string; daysLeft: number }[]>([])

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value)
}

onMounted(async () => {
  loading.value = true
  try {
    const hasMedicineAccess = ['ADMIN', 'OWNER', 'PHARMACIST'].includes(authStore.userRole ?? '')
    const hasTransactionAccess = ['ADMIN', 'OWNER', 'CASHIER'].includes(authStore.userRole ?? '')

    // 1. Fetch Medicines Data
    if (hasMedicineAccess) {
      const medResponse = await medicineApi.getAll(1, 1000)
      const medicines = medResponse.data || []

      totalMedicines.value = medResponse.meta?.total || medicines.length

      // Calculate low stock (stock <= 15)
      lowStockCount.value = medicines.filter((m) => (m.stock ?? 0) <= 15).length

      // Calculate nearing expiry (within next 30 days)
      const today = new Date()
      const nextMonth = new Date()
      nextMonth.setDate(today.getDate() + 30)

      const expiring = medicines
        .filter((m) => {
          if (!m.expiredDate) return false
          const exp = new Date(m.expiredDate)
          return exp >= today && exp <= nextMonth
        })
        .sort((a, b) => new Date(a.expiredDate!).getTime() - new Date(b.expiredDate!).getTime())

      nearingExpiry.value = expiring.slice(0, 5).map((m) => {
        const expDate = new Date(m.expiredDate!)
        const daysLeft = Math.ceil((expDate.getTime() - today.getTime()) / (1000 * 3600 * 24))
        return {
          name: m.medicineName || 'Unknown',
          date: expDate.toISOString().split('T')[0],
          daysLeft,
        }
      })
    }

    // 2. Fetch Transactions Data
    if (hasTransactionAccess) {
      const txResponse = await transactionApi.getAll(1, 1000)
      const transactions = txResponse.data || []

      totalTransactions.value = txResponse.meta?.total || transactions.length

      // Sum total price of all transactions
      totalRevenue.value = transactions.reduce(
        (sum: number, tx: any) => sum + (tx.totalPrice || 0),
        0,
      )
    }
  } catch (error) {
    console.error('Failed to load dashboard data:', error)
  } finally {
    loading.value = false
  }
})
</script>
