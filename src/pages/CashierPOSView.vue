<template>
  <div class="h-[calc(100vh-120px)] flex flex-col lg:flex-row gap-4">
    <div class="flex-1 flex flex-col gap-4 h-full">
      <div class="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div class="relative">
          <svg
            class="absolute left-3 top-3 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            v-model="search"
            placeholder="Cari nama obat atau SKU..."
            class="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div class="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <div
            v-for="item in filteredMedicines"
            :key="item.no"
            @click="addToCart(item)"
            class="group bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between relative overflow-hidden"
          >
            <div
              class="absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-bold"
              :class="
                item.stock <= 10 ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'
              "
            >
              Stok: {{ item.stock }}
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 mb-1">{{ item.name }}</h4>
              <p class="text-xs text-gray-500 mb-2">{{ item.sku }}</p>
              <p class="text-xs text-blue-600 bg-blue-50 inline-block px-2 py-1 rounded">
                {{ item.category }}
              </p>
            </div>

            <div class="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
              <span class="font-bold text-lg text-gray-900">{{ item.price }}</span>
              <button
                class="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"
              >
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          </div>

          <div
            v-show="filteredMedicines.length === 0"
            class="col-span-full flex flex-col items-center justify-center py-12 text-gray-400"
          >
            <svg
              class="h-10 w-10 mb-2 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p>Obat tidak ditemukan.</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="w-full lg:w-[400px] bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col h-full"
    >
      <div class="p-4 border-b border-gray-200 bg-gray-50/30">
        <h3 class="font-semibold text-lg flex items-center gap-2 text-gray-800">
          <svg
            class="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          Current Order
        </h3>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div
          v-for="(cartItem, index) in cart"
          :key="cartItem.no"
          class="flex flex-col gap-2 p-3 rounded-lg border border-gray-200 bg-white"
        >
          <div class="flex justify-between items-start">
            <div>
              <h4 class="font-medium text-sm text-gray-900">{{ cartItem.name }}</h4>
              <p class="text-xs text-gray-500">{{ formatRupiah(cartItem.numericPrice) }}</p>
            </div>
            <p class="font-semibold text-sm text-gray-900">
              {{ formatRupiah(cartItem.numericPrice * cartItem.quantity) }}
            </p>
          </div>

          <div class="flex items-center justify-between mt-1">
            <div class="flex items-center gap-3 bg-gray-50 rounded-md p-1">
              <button
                @click="updateQty(index, -1)"
                class="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center hover:text-red-600 text-gray-600"
              >
                <svg
                  class="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20 12H4" />
                </svg>
              </button>
              <span class="text-sm font-medium w-6 text-center">{{ cartItem.quantity }}</span>
              <button
                @click="updateQty(index, 1)"
                class="w-6 h-6 rounded bg-white shadow-sm flex items-center justify-center hover:text-emerald-600 text-gray-600"
              >
                <svg
                  class="h-3 w-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
            <button
              @click="removeFromCart(index)"
              class="text-red-500 hover:text-red-700 text-xs flex items-center gap-1"
            >
              <svg
                class="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          v-show="cart.length === 0"
          class="h-full flex flex-col items-center justify-center text-gray-400 opacity-60"
        >
          <p class="text-sm">Keranjang kosong</p>
        </div>
      </div>

      <div class="p-4 border-t border-gray-200 bg-gray-50/10 space-y-4">
        <div class="flex justify-between text-lg font-bold text-gray-900">
          <span>Total</span>
          <span>{{ formatRupiah(grandTotal) }}</span>
        </div>

        <div class="space-y-2">
          <label class="text-xs font-medium uppercase text-gray-500">Uang Diterima</label>
          <div class="relative">
            <span class="absolute left-3 top-2.5 text-sm font-semibold text-gray-500">Rp</span>
            <input
              type="number"
              v-model.number="cashReceived"
              class="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 bg-white text-sm font-semibold outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div
          v-show="grandTotal > 0 && typeof cashReceived === 'number' && cashReceived >= grandTotal"
          class="flex justify-between items-center text-sm px-3 py-2 bg-emerald-100 rounded-md border border-emerald-200 text-emerald-800"
        >
          <span class="font-bold">Kembalian:</span>
          <span class="font-bold text-lg">{{ formatRupiah(kembalian) }}</span>
        </div>

        <button
          @click="submitTransaction()"
          :disabled="
            cart.length === 0 ||
            typeof cashReceived !== 'number' ||
            cashReceived < grandTotal ||
            isLoading
          "
          class="w-full h-11 flex items-center justify-center gap-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-show="!isLoading">Bayar & Cetak Struk</span>
          <span v-show="isLoading" class="flex items-center justify-center">
            <div
              class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
            ></div>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'
import { transactionApi } from '@/api-services/repositories/transactionApi'

interface Medicine {
  id: string
  no: number
  name: string
  sku: string
  category: string
  supplier: string
  stock: number
  status: string
  expiry: string
  price: string
}

interface CartItem extends Medicine {
  quantity: number
  numericPrice: number
}

const medicines = ref<Medicine[]>([])

const search = ref('')
const cart = ref<CartItem[]>([])
const cashReceived = ref<number | ''>('')
const isLoading = ref(false)

const parsePriceToNumber = (priceString: string): number => {
  const cleanStr = priceString.replace(/[^0-9]/g, '')
  return parseInt(cleanStr)
}

const formatRupiah = (number: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

const filteredMedicines = computed(() => {
  if (search.value === '') return medicines.value
  const keyword = search.value.toLowerCase()
  return medicines.value.filter((item) => {
    return item.name.toLowerCase().includes(keyword) || item.sku.toLowerCase().includes(keyword)
  })
})

const grandTotal = computed(() => {
  return cart.value.reduce((total, item) => total + item.numericPrice * item.quantity, 0)
})

const kembalian = computed(() => {
  if (typeof cashReceived.value === 'number') {
    return cashReceived.value - grandTotal.value
  }
  return 0
})

const addToCart = (item: Medicine) => {
  if (item.stock <= 0) {
    alert('Stok Habis!')
    return
  }

  const existingItem = cart.value.find((c) => c.no === item.no)
  const currentQtyInCart = existingItem ? existingItem.quantity : 0

  if (currentQtyInCart + 1 > item.stock) {
    alert('Stok tidak mencukupi!')
    return
  }

  if (existingItem) {
    existingItem.quantity++
  } else {
    cart.value.push({
      ...item,
      numericPrice: parsePriceToNumber(item.price),
      quantity: 1,
    })
  }
}

const updateQty = (index: number, amount: number) => {
  const item = cart.value[index]
  if (!item) return

  const newQty = item.quantity + amount
  if (newQty > 0 && newQty <= item.stock) {
    item.quantity = newQty
  } else if (newQty > item.stock) {
    alert('Maksimal stok tercapai')
  }
}

const removeFromCart = (index: number) => {
  cart.value.splice(index, 1)
}

const submitTransaction = async () => {
  if (cart.value.length === 0) return
  if (kembalian.value < 0) {
    alert('Uang yang diterima kurang!')
    return
  }
  if (!confirm('Proses transaksi ini?')) return

  isLoading.value = true

  try {
    const payload = {
      transactionDate: new Date().toISOString(),
      cashReceived: Number(cashReceived.value),
      medicines: cart.value.map((item) => ({
        medicineId: item.id,
        quantity: item.quantity,
        unitPrice: item.numericPrice,
      })),
    }

    await transactionApi.create(payload)

    alert(`Transaksi Berhasil!\nKembalian: ${formatRupiah(kembalian.value)}`)

    cart.value = []
    cashReceived.value = ''
    await fetchMedicines() // Refresh medicines to get updated stock
  } catch (error: any) {
    alert('Gagal memproses transaksi: ' + (error.response?.data?.message || error.message))
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const fetchMedicines = async () => {
  try {
    const response = await medicineApi.getAll(1, 1000)
    if (response.data) {
      medicines.value = response.data.map((item: any, index: number) => {
        const getStockLabel = (stock: number) => {
          if (stock <= 0) return 'Out of Stock'
          if (stock <= 20) return 'Low Stock'
          if (stock <= 50) return 'Medium'
          return 'In Stock'
        }

        return {
          id: item.id,
          no: index + 1,
          name: item.medicineName,
          sku: item.sku,
          category: item.category?.categoryName || '-',
          supplier: item.supplier?.supplierName || '-',
          stock: item.stock || 0,
          status: getStockLabel(item.stock || 0),
          expiry: item.expiredDate
            ? new Intl.DateTimeFormat('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              }).format(new Date(item.expiredDate))
            : '-',
          price: new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(
            item.price || 0,
          ),
        }
      })
    }
  } catch (error) {
    console.error('Failed to fetch medicines', error)
  }
}

onMounted(() => {
  fetchMedicines()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}
</style>
