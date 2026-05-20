<template>
  <div class="p-8 bg-gray-50 min-h-screen font-sans text-gray-800">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p class="text-sm text-gray-500 mt-1">Manage your pharmacy operations efficiently</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Medicines</p>
          <h3 class="text-3xl font-bold text-gray-900">1,284</h3>
          <p class="text-xs text-green-600 mt-2 flex items-center font-medium">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            +12% <span class="text-gray-400 ml-1 font-normal">from last month</span>
          </p>
        </div>
        <div class="p-2 bg-blue-50 rounded-lg text-blue-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Low Stock Items</p>
          <h3 class="text-3xl font-bold text-gray-900">23</h3>
          <p class="text-xs text-orange-600 mt-2 font-medium">Requires immediate attention</p>
        </div>
        <div class="p-2 bg-orange-50 rounded-lg text-orange-500">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Revenue</p>
          <h3 class="text-3xl font-bold text-gray-900">$186,450</h3>
          <p class="text-xs text-green-600 mt-2 flex items-center font-medium">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            +8% <span class="text-gray-400 ml-1 font-normal">from last month</span>
          </p>
        </div>
        <div class="p-2 bg-green-50 rounded-lg text-green-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m4-12H8c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2V7c0-1.104-.896-2-2-2z"></path></svg>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500 mb-1">Total Transactions</p>
          <h3 class="text-3xl font-bold text-gray-900">1,745</h3>
          <p class="text-xs text-green-600 mt-2 flex items-center font-medium">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            +7% <span class="text-gray-400 ml-1 font-normal">from last month</span>
          </p>
        </div>
        <div class="p-2 bg-purple-50 rounded-lg text-purple-600">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h4 class="text-md font-bold mb-6">Sales Chart (Last 30 Days)</h4>
        <div class="h-48 flex items-end justify-between relative group">
          <svg class="w-full h-full text-blue-500" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,20" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,20 V40 H0 Z" fill="url(#blueGradient)" fill-opacity="0.1" />
            <defs>
              <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="currentColor"/>
                <stop offset="100%" stop-color="white"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute w-2 h-2 bg-blue-600 rounded-full border-2 border-white shadow" style="left: 80%; top: 35%;"></div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h4 class="text-md font-bold mb-6">Transaction Chart (Last 30 Days)</h4>
        <div class="h-48 flex items-end justify-between relative group">
          <svg class="w-full h-full text-green-500" viewBox="0 0 100 40" preserveAspectRatio="none">
            <path d="M0,30 Q15,35 30,28 T50,25 T70,18 T100,12" fill="none" stroke="currentColor" stroke-width="1.5" />
            <path d="M0,30 Q15,35 30,28 T50,25 T70,18 T100,12 V40 H0 Z" fill="url(#greenGradient)" fill-opacity="0.1" />
            <defs>
              <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="currentColor"/>
                <stop offset="100%" stop-color="white"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="absolute w-2 h-2 bg-green-600 rounded-full border-2 border-white shadow" style="left: 70%; top: 45%;"></div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <h4 class="text-md font-bold">Medicines Nearing Expiry</h4>
      </div>
      <div class="p-4">
        <div class="space-y-3">
          <div class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
            <div class="flex items-center gap-4">
              <div class="p-2 bg-red-100 text-red-600 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <div>
                <h5 class="text-sm font-bold text-gray-900">Paracetamol 500mg</h5>
                <p class="text-xs text-gray-400 font-medium">Expires: 2023-11-15</p>
              </div>
            </div>
            <span class="text-sm font-bold text-red-600">26 days left</span>
          </div>

          <div class="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
            <div class="flex items-center gap-4">
              <div class="p-2 bg-red-100 text-red-600 rounded-lg opacity-60">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <div>
                <h5 class="text-sm font-bold text-gray-900">Amoxicillin 250mg</h5>
                <p class="text-xs text-gray-400 font-medium">Expires: 2023-11-30</p>
              </div>
            </div>
            <span class="text-sm font-bold text-gray-500">31 days left</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Di sini kamu bisa menambahkan logic untuk mengambil data dari store/API nantinya
</script>