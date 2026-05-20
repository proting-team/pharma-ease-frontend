<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<template>
  <div class="flex h-screen bg-white font-sans text-gray-800">

    <aside class="w-64 bg-[#11764B] text-white flex flex-col">
      <div class="h-16 flex items-center px-6 mt-4 mb-4">
        <h1 class="text-xl font-bold flex items-center gap-2">
          <span class="text-2xl">⚡</span> Pharma Ease
        </h1>
      </div>

      <nav class="flex-1 px-4 space-y-2">
        <RouterLink to="/" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
          Dashboard
        </RouterLink>

        <RouterLink to="/supplier" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
          </svg>
          Suppliers
        </RouterLink>

        <RouterLink to="/user-management" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
          </svg>
          User Management
        </RouterLink>

        <RouterLink to="/audit-log" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
          </svg>
          Audit Log
        </RouterLink>

        <RouterLink to="/medicines" class="flex items-center px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors"
          exact-active-class="bg-[#21a870] font-semibold">
          <svg class="w-5 h-5 mr-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
          </svg>
          Medicine Storage
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
            🔔 </button>

          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[#11764B] text-white flex items-center justify-center font-bold">
              MF
            </div>
            <div class="text-sm">
              <p class="font-bold text-gray-700">Miss Felicia Ritchie MD</p>
              <p class="text-xs text-gray-500">Owner</p>
            </div>
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
/* Biarkan kosong, semua styling sudah di-handle Tailwind */
</style>