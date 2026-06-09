import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MedicineStorageView from '../MedicineStorageView.vue'
import { medicineApi } from '@/api-services/repositories/medicineApi'

// Mock medicineApi
vi.mock('@/api-services/repositories/medicineApi', () => ({
  medicineApi: {
    getAll: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('MedicineStorageView.vue Unit Tests', () => {
  const mockMedicinesResponse = {
    data: [
      {
        id: 'med-1',
        medicineName: 'Paracetamol',
        sku: 'PCT-001',
        stock: 20,
        price: 5000,
        expiredDate: '2026-06-20',
        category: { categoryName: 'Tablets' },
        supplier: { supplierName: 'PT Bio Farma' }
      },
      {
        id: 'med-2',
        medicineName: 'Amoxicillin',
        sku: 'AMX-001',
        stock: 5,
        price: 8000,
        expiredDate: '2027-12-31',
        category: { categoryName: 'Capsules' },
        supplier: { supplierName: 'PT Kimia Farma' }
      }
    ],
    meta: {
      total: 2,
      currentPage: 1,
      perPage: 10
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(medicineApi.getAll).mockResolvedValue(mockMedicinesResponse as any)
  })

  it('fetches and lists medicines on mount', async () => {
    const wrapper = mount(MedicineStorageView, {
      global: {
        stubs: {
          AddMedicineModal: true
        }
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(medicineApi.getAll).toHaveBeenCalledWith(1, 10, '')
    expect(wrapper.text()).toContain('Paracetamol')
    expect(wrapper.text()).toContain('Amoxicillin')
    expect(wrapper.text()).toContain('PCT-001')
    expect(wrapper.text()).toContain('AMX-001')
    expect(wrapper.text()).toContain('Showing 1 to 2 of 2 entries')
  })

  it('opens modal on Add New Medicine click', async () => {
    const wrapper = mount(MedicineStorageView, {
      global: {
        stubs: {
          AddMedicineModal: true
        }
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Find and click the add button
    const addBtn = wrapper.findAll('button').find(b => b.text().includes('Add New Medicine'))
    expect(addBtn).toBeDefined()
    await addBtn!.trigger('click')

    // Expect the modal open ref to be true
    expect(wrapper.vm.isModalOpen).toBe(true)
    expect(wrapper.vm.selectedMedicine).toBeNull()
  })

  it('opens edit modal on edit button click', async () => {
    const wrapper = mount(MedicineStorageView, {
      global: {
        stubs: {
          AddMedicineModal: true
        }
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Find edit button (the orange edit button)
    const editBtn = wrapper.find('button.text-orange-400')
    expect(editBtn.exists()).toBe(true)
    await editBtn.trigger('click')

    expect(wrapper.vm.isModalOpen).toBe(true)
    expect(wrapper.vm.selectedMedicine).toEqual(mockMedicinesResponse.data[0])
  })

  it('calls delete medicine API when delete button is clicked', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(medicineApi.delete).mockResolvedValue(undefined)

    const wrapper = mount(MedicineStorageView, {
      global: {
        stubs: {
          AddMedicineModal: true
        }
      }
    })

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    const deleteBtn = wrapper.find('button.text-red-400')
    expect(deleteBtn.exists()).toBe(true)
    await deleteBtn.trigger('click')

    expect(window.confirm).toHaveBeenCalled()
    expect(medicineApi.delete).toHaveBeenCalledWith('med-1')
  })
})
