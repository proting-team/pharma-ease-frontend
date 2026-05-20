<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans">
    
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900">Medicine Storage</h1>
      <p class="text-sm text-gray-500 mt-1">Tempat Penyimpanan Obat Apotek Lamtama</p>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
      
      <div class="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 class="text-lg font-medium text-gray-800">Inventory Management</h2>
        
        <div class="flex items-center gap-3">
          <div class="relative">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input type="text" placeholder="Search medicines..." class="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-500 w-64" />
          </div>
          
          <button class="p-2 border border-gray-300 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
          </button>
          
          <button @click="isModalOpen = true" class="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            + Add New Medicine
          </button>
          
          <router-link to="/medicines/categories" class="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
            Category
          </router-link>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50/50">
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">No</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">SKU</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Supplier</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Expiry Date</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Price</th>
              <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="item in medicines" :key="item.no" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.no }}</td>
              <td class="px-6 py-4 text-sm text-gray-900 font-medium">{{ item.name }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.sku }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.category }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.supplier }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.stock }}</td>
              <td class="px-6 py-4 text-sm">
                <span :class="getStatusBadgeClass(item.status)" class="px-3 py-1 rounded-full text-xs font-medium">
                  {{ item.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.expiry }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ item.price }}</td>
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
    </div>

    <AddMedicineModal :is-open="isModalOpen" @close="isModalOpen = false" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AddMedicineModal from '../../components/AddMedicineModal.vue'

const isModalOpen = ref(false)

// Dummy Data
const medicines = ref([
  { no: 1, name: 'ewqewdsa', sku: '231', category: 'eveniet', supplier: 'deleniti', stock: 30, status: 'Medium', expiry: '07 Jan 2027', price: 'Rp.10,000.00' },
  { no: 2, name: 'sint', sku: 'MED-6133', category: 'possimus', supplier: 'iure', stock: 22, status: 'Medium', expiry: '10 Jan 2026', price: 'Rp.38,466.00' },
  { no: 3, name: 'accusamus', sku: 'MED-1173', category: 'veritatis', supplier: 'natus', stock: 38, status: 'Medium', expiry: '10 Jan 2026', price: 'Rp.16,447.00' },
  { no: 4, name: 'rerum', sku: 'MED-2690', category: 'eveniet', supplier: 'natus', stock: 21, status: 'Medium', expiry: '11 Jan 2026', price: 'Rp.32,480.00' },
  { no: 5, name: 'illo', sku: 'MED-0036', category: 'tenetur', supplier: 'natus', stock: 59, status: 'In Stock', expiry: '10 Jan 2026', price: 'Rp.32,644.00' },
])

const getStatusBadgeClass = (status: string) => {
  return status === 'Medium' 
    ? 'bg-orange-100 text-orange-700 border border-orange-200' 
    : 'bg-green-100 text-green-700 border border-green-200';
}
</script>
