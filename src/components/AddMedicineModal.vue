<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-opacity">
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
      
      <div class="px-6 py-4 border-b border-gray-100 flex justify-between items-start">
        <div>
          <h3 class="text-lg font-bold text-gray-900">Add New Medicine</h3>
          <p class="text-xs text-gray-500 mt-1">Enter the medicine details to add to inventory.</p>
        </div>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <div class="p-6 space-y-4">
        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Medicine Name</label>
          <input type="text" placeholder="e.g., Paracetamol 500mg" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">SKU / Code</label>
            <input type="text" placeholder="e.g., MED001" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Price (Rp)</label>
            <input type="number" placeholder="e.g., 50000" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
        </div>

        <div>
          <label class="block text-xs font-medium text-gray-700 mb-1">Description</label>
          <textarea rows="2" placeholder="Optional description..." class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none"></textarea>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="">Select...</option>
              <option value="1">Painkillers</option>
              <option value="2">Antibiotics</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Supplier</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white">
              <option value="">Select...</option>
              <option value="1">PharmaCorp</option>
              <option value="2">MediSupply</option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" placeholder="100" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label class="block text-xs font-medium text-gray-700 mb-1">Expiry</label>
            <input type="date" class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-gray-600" />
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
        <button @click="$emit('close')" class="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
          Cancel
        </button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
          Add Medicine
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean
}>()

defineEmits(['close'])
</script>