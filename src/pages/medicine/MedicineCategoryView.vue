<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">
    
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Medicine Category</h1>
      <p class="text-sm text-gray-500 mt-1">Kategori Obat yang tersedia di Apotek Lamtama</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      
      <div class="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 class="text-lg font-medium text-gray-800">Category List</h2>
        
        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input type="text" placeholder="Search categories..." class="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-56" />
          </div>
          
          <button @click="isModalOpen = true" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            + Add Category
          </button>
          
          <router-link to="/medicines" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Medicine
          </router-link>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/50">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-16">No</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase w-1/4">Category Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right w-24">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="cat in categories" :key="cat.no" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600">{{ cat.no }}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ cat.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-500 truncate max-w-xl">{{ cat.description }}</td>
              <td class="px-6 py-4 text-sm text-right space-x-3">
                <button class="text-orange-400 hover:text-orange-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button class="text-red-400 hover:text-red-600">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
        <p class="text-sm text-gray-600">Showing 1 to 15 of 20 results</p>
        <div class="flex border border-gray-300 rounded-md overflow-hidden bg-white">
          <button class="px-3 py-1 hover:bg-gray-50 border-r border-gray-300 text-gray-600">&lt;</button>
          <button class="px-3 py-1 bg-gray-100 border-r border-gray-300 text-gray-800 font-medium">1</button>
          <button class="px-3 py-1 hover:bg-gray-50 border-r border-gray-300 text-gray-600">2</button>
          <button class="px-3 py-1 hover:bg-gray-50 text-gray-600">&gt;</button>
        </div>
      </div>
      
    </div>

    <!-- Add Category Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Add New Category</h3>
            <p class="text-xs text-gray-500 mt-1">Add a new medicine category to organize your inventory.</p>
          </div>
          <button @click="isModalOpen = false" class="text-gray-400 hover:text-gray-600 transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="p-6 space-y-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Category Name</label>
            <input type="text" placeholder="e.g., Painkillers" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
            <textarea rows="3" placeholder="Optional description..." class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 resize-none"></textarea>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
          <button @click="isModalOpen = false" class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button class="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 transition-colors">
            Add Category
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

const categories = ref([
  { no: 1, name: 'alias', description: 'Repellat eum vitae unde et et. Eaque velit in nostrum invent...' },
  { no: 2, name: 'ullam', description: 'Voluptas vero voluptates magnam aut atque non beatae. Dolore...' },
  { no: 3, name: 'voluptatem', description: 'Quas est aut doloremque autem animi id. Ea nesciunt nulla no...' },
  { no: 4, name: 'voluptatem', description: 'Adipisci eveniet vero numquam temporibus et odio sit. Vel ve...' },
  { no: 5, name: 'quae', description: 'Est temporibus aliquam recusandae. Ut dolore ad optio sit. V...' },
])
</script>
