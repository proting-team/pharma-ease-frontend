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
        <RouterLink to="/" class="block px-4 py-3 rounded-lg hover:bg-[#1a8a5b] transition-colors">
          Dashboard
        </RouterLink>
        <RouterLink to="/supplier" class="block px-4 py-3 rounded-lg bg-[#21a870] font-semibold transition-colors">
          Suppliers
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