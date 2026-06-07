<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterView, RouterLink, useRoute, useRouter } from 'vue-router'
// import { useAuthStore } from './stores/auth'

import { useAuthStore } from '@/stores/auth'
import { ActivityIcon } from 'lucide-vue-next'

const router = useRouter()
const reportsOpen = ref(false)
const userManagementOpen = ref(false)
const route = useRoute()
const authStore = useAuthStore()

const isReportsActive = computed(() => route.path.startsWith('/reports/'))
const isUserManagementActive = computed(() => route.path === '/supplier' || route.path === '/user-management')
const isLoginPage = computed(() => route.path === '/login')

// Auto-open reports dropdown if on a reports page
if (isReportsActive.value) {
  reportsOpen.value = true
}

function handleLogout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <!-- Login page: full-screen without sidebar -->
  <RouterView v-if="isLoginPage" />

  <!-- Main app layout: with sidebar & header -->
  <div v-else class="flex h-screen bg-white font-sans text-gray-800">

    <aside class="w-64 bg-[#11764B] text-white flex flex-col">
      <div class="px-6 pt-6 pb-4 border-b border-white/20">
        <h1 class="text-xl font-bold flex items-center gap-2">
          <ActivityIcon class="h-7 w-7 text-white" stroke-width="2.5" />
          Pharma Ease
        </h1>
      </div>

      <nav class="flex-1 px-4 pt-4 space-y-2">
        <RouterLink to="/" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Dashboard
        </RouterLink>

        <RouterLink to="/medicines" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
          Medicine Inventory
        </RouterLink>

        <RouterLink to="/purchase-orders" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
          </svg>
          Medicine Resupply
        </RouterLink>

        <RouterLink to="/cashier" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
          </svg>
          Cashier / POS
        </RouterLink>

        <div>
          <button @click="userManagementOpen = !userManagementOpen"
            class="flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
            :class="{ 'bg-[#21a870] font-semibold': isUserManagementActive }">
            <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
            </svg>
            User Management
            <svg class="w-4 h-4 ml-auto transition-transform duration-200"
              :class="{ 'rotate-180': userManagementOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <transition name="dropdown">
            <div v-if="userManagementOpen" class="ml-4 mt-1 space-y-1 border-l border-green-600/30 pl-3">
              <RouterLink to="/supplier" class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-[#1a8a5b] transition-colors"
                exact-active-class="bg-[#21a870] font-semibold">
                <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
                </svg>
                Supplier Management
              </RouterLink>
              <RouterLink to="/user-management" class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-[#1a8a5b] transition-colors"
                exact-active-class="bg-[#21a870] font-semibold">
                <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
                Employee Management
              </RouterLink>
            </div>
          </transition>
        </div>

        <div>
          <button @click="reportsOpen = !reportsOpen"
            class="flex items-center w-full px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
            :class="{ 'bg-[#21a870] font-semibold': isReportsActive }">
            <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Reports
            <svg class="w-4 h-4 ml-auto transition-transform duration-200"
              :class="{ 'rotate-180': reportsOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          <transition name="dropdown">
            <div v-if="reportsOpen" class="ml-4 mt-1 space-y-1 border-l border-green-600/30 pl-3">
              <RouterLink to="/reports/operational"
                class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-[#1a8a5b] transition-colors"
                exact-active-class="bg-[#21a870] font-semibold">
                <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Operational Report
              </RouterLink>
              <RouterLink to="/reports/financial"
                class="flex items-center px-3 py-2 text-sm rounded-lg hover:bg-[#1a8a5b] transition-colors"
                exact-active-class="bg-[#21a870] font-semibold">
                <svg class="w-4 h-4 mr-2 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m4-12H8c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2z"/>
                </svg>
                Financial Report
              </RouterLink>
            </div>
          </transition>
        </div>

        <RouterLink to="/audit-log" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
          Audit Log
        </RouterLink>
      </nav>

      <div class="p-4 text-xs text-center text-green-200 opacity-70 border-t border-green-800">
        © 2026 Pharma Ease v1.0.0
      </div>
    </aside>

    <div class="flex-1 flex flex-col overflow-hidden">

      <header class="h-16 bg-white border-b border-gray-100 flex items-center justify-end px-8 shadow-sm">
        <div class="flex items-center gap-6">
          <button class="text-gray-400 hover:text-gray-600">
            🔔
          </button>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#11764B] text-white flex items-center justify-center font-bold">
              {{ authStore.userInitials }}
            </div>
            <div class="text-sm">
              <p class="font-bold text-gray-700">{{ authStore.userName }}</p>
              <p class="text-xs text-gray-500 capitalize">{{ authStore.userRole }}</p>
            </div>
            <button @click="handleLogout" class="ml-2 text-gray-400 hover:text-red-500 transition-colors" title="Logout">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-white p-8">
        <RouterView />
      </main>
    </div>

  </div>
</template>

<style>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
