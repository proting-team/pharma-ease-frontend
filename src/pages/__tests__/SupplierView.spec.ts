import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SupplierView from '../SupplierView.vue'
import { supplierApi } from '@/api-services/repositories/supplierApi'

// Mock supplierApi
vi.mock('@/api-services/repositories/supplierApi', () => ({
  supplierApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('SupplierView.vue Unit Tests', () => {
  const mockSuppliersResponse = {
    data: [
      {
        id: 'sup-1',
        companyName: 'PT Bio Farma',
        contactName: 'Asep',
        phoneNumber: '0812345',
        address: 'Bandung',
        licenseNumber: 'LIC-001',
        status: 'ACTIVE',
      },
      {
        id: 'sup-2',
        companyName: 'PT Kimia Farma',
        contactName: 'Budi',
        phoneNumber: '0854321',
        address: 'Jakarta',
        licenseNumber: 'LIC-002',
        status: 'INACTIVE',
      },
    ],
    meta: {
      total: 2,
      lastPage: 1,
      currentPage: 1,
      perPage: 10,
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(supplierApi.getAll).mockResolvedValue(mockSuppliersResponse as any)
  })

  it('fetches and lists suppliers on mount', async () => {
    const wrapper = mount(SupplierView)

    // Wait for API resolution
    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(supplierApi.getAll).toHaveBeenCalledWith(1, 10)
    expect(wrapper.text()).toContain('PT Bio Farma')
    expect(wrapper.text()).toContain('PT Kimia Farma')
    expect(wrapper.text()).toContain('Showing 1 to 2 of 2 results')
  })

  it('opens modal when clicking Add Supplier button and closes it on cancel', async () => {
    const wrapper = mount(SupplierView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Modal should not be open
    expect(wrapper.find('form').exists()).toBe(false)

    // Click Add Supplier
    const addBtn = wrapper.findAll('button').find((b) => b.text().includes('Add Supplier'))
    expect(addBtn).toBeDefined()
    await addBtn!.trigger('click')

    // Modal is open now
    expect(wrapper.find('form').exists()).toBe(true)
    expect(wrapper.text()).toContain('Add New Supplier')

    // Click Cancel
    const cancelBtn = wrapper.findAll('button').find((b) => b.text().includes('Cancel'))
    expect(cancelBtn).toBeDefined()
    await cancelBtn!.trigger('click')

    // Modal is closed
    expect(wrapper.find('form').exists()).toBe(false)
  })

  it('submits form to create new supplier', async () => {
    vi.mocked(supplierApi.create).mockResolvedValue({ id: 'sup-3' } as any)
    const wrapper = mount(SupplierView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Open Add Modal
    const addBtn = wrapper.findAll('button').find((b) => b.text().includes('Add Supplier'))
    await addBtn!.trigger('click')

    // Set input values
    await wrapper.find('input[placeholder="e.g., PT. Farma Jaya"]').setValue('PT Indo Farma')
    await wrapper.find('input[placeholder="e.g., Budi Santoso"]').setValue('Santi')
    await wrapper.find('input[placeholder="e.g., 08123456789"]').setValue('089999')
    await wrapper.find('input[placeholder="e.g., supplier@example.com"]').setValue('indo@farma.com')
    await wrapper.find('input[placeholder="e.g., LIC-001"]').setValue('LIC-003')
    await wrapper.find('textarea').setValue('Surabaya Barat')

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    expect(supplierApi.create).toHaveBeenCalledWith({
      companyName: 'PT Indo Farma',
      contactName: 'Santi',
      phoneNumber: '089999',
      supplierEmail: 'indo@farma.com',
      licenseNumber: 'LIC-003',
      address: 'Surabaya Barat',
      status: 'ACTIVE',
    })
  })

  it('submits form in edit mode to update supplier', async () => {
    vi.mocked(supplierApi.update).mockResolvedValue({ id: 'sup-1' } as any)
    const wrapper = mount(SupplierView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Find the edit button (represented by an orange edit svg button)
    const editBtn = wrapper.find('button.text-orange-400')
    expect(editBtn.exists()).toBe(true)
    await editBtn.trigger('click')

    // Modal is open in Edit mode
    expect(wrapper.text()).toContain('Edit Supplier')
    const companyInput = wrapper.find('input[placeholder="e.g., PT. Farma Jaya"]')
    expect((companyInput.element as HTMLInputElement).value).toBe('PT Bio Farma')

    // Change value and submit
    await companyInput.setValue('PT Bio Farma Updated')
    await wrapper.find('form').trigger('submit.prevent')

    expect(supplierApi.update).toHaveBeenCalledWith('sup-1', {
      companyName: 'PT Bio Farma Updated',
      contactName: 'Asep',
      phoneNumber: '0812345',
      supplierEmail: undefined,
      licenseNumber: 'LIC-001',
      address: 'Bandung',
      status: 'ACTIVE',
    })
  })

  it('calls delete supplier API when delete button is clicked', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(supplierApi.delete).mockResolvedValue(undefined)

    const wrapper = mount(SupplierView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Find the delete button (represented by a red trash svg button)
    const deleteBtn = wrapper.find('button.text-red-400')
    expect(deleteBtn.exists()).toBe(true)
    await deleteBtn.trigger('click')

    expect(window.confirm).toHaveBeenCalled()
    expect(supplierApi.delete).toHaveBeenCalledWith('sup-1')
  })
})
