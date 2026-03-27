<template>
  <div class="w-full">
    
    <div class="mb-6">
      <h2 class="text-3xl font-bold text-gray-900">Suppliers List</h2>
      <p class="text-gray-500 text-sm mt-1">List dari para pemasok obat pada Apotek Lamtama</p>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      
      <div class="p-5 border-b border-gray-200 flex justify-between items-center bg-white">
        <h3 class="text-lg font-semibold text-gray-800">Supplier Management</h3>
        
        <div class="flex items-center gap-4">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input type="text" placeholder="Search suppliers..." class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#11764B] focus:border-[#11764B] w-64 transition-shadow" />
          </div>
          
          <button @click="isModalOpen = true" class="bg-[#11764B] hover:bg-[#158e5a] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
            Add Supplier
            </button>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-gray-600">
          <thead class="bg-gray-50 text-gray-700 font-semibold border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 w-16">No</th>
              <th class="px-6 py-4">Supplier Name</th>
              <th class="px-6 py-4">Contact Person</th>
              <th class="px-6 py-4">Phone</th>
              <th class="px-6 py-4">Address</th>
              <th class="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 bg-white">
            
            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-medium text-gray-900">1</td>
              <td class="px-6 py-4 font-semibold text-gray-800">dolores</td>
              <td class="px-6 py-4 text-gray-600">Dr. Lorenza Marks</td>
              <td class="px-6 py-4 text-gray-600">1-605-687-5824</td>
              <td class="px-6 py-4 text-gray-500 truncate max-w-xs">3843 Garrison Lakes Apt. 637 Williamsonview, HI 77...</td>
              <td class="px-6 py-4 flex justify-center gap-3">
                <button class="text-orange-400 hover:text-orange-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button class="text-red-400 hover:text-red-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 font-medium text-gray-900">2</td>
              <td class="px-6 py-4 font-semibold text-gray-800">eos</td>
              <td class="px-6 py-4 text-gray-600">Otha Mayer</td>
              <td class="px-6 py-4 text-gray-600">626-828-1985</td>
              <td class="px-6 py-4 text-gray-500 truncate max-w-xs">382 Ariel Via Suite 182 Brekkestad, WA 82312-5059</td>
              <td class="px-6 py-4 flex justify-center gap-3">
                <button class="text-orange-400 hover:text-orange-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button class="text-red-400 hover:text-red-600 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex items-center justify-between bg-white">
        <span class="text-sm text-gray-500">Showing 1 to 15 of 35 results</span>
        <div class="flex items-center gap-1">
          <button class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">&lt;</button>
          <button class="px-3 py-1 border border-gray-300 rounded bg-gray-100 text-gray-800 font-medium">1</button>
          <button class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">2</button>
          <button class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">3</button>
          <button class="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-50 transition-colors">&gt;</button>
        </div>
      </div>

    </div>
  </div>
  <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
      
      <div class="bg-white rounded-xl shadow-xl w-full max-w-lg mx-4 overflow-hidden">
        
        <div class="flex justify-between items-center p-5 border-b border-gray-100">
          <h3 class="font-bold text-lg text-gray-800">Add New Supplier</h3>
          <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-700 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="p-5 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
            <input type="text" placeholder="e.g., PT. Farma Jaya" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input type="text" placeholder="e.g., Budi Santoso" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input type="text" placeholder="e.g., 08123456789" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea rows="3" placeholder="Full address..." class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
          </div>
        </div>

        <div class="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button @click="isModalOpen = false" class="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors">
            Cancel
          </button>
          <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
            Save Supplier
          </button>
        </div>

      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Variabel untuk mengontrol modal terbuka/tertutup
// false = tertutup, true = terbuka
const isModalOpen = ref(false)
</script>