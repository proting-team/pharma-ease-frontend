import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MedicineCategoryView from '../MedicineCategoryView.vue'
import { medicineCategoryApi } from '@/api-services/repositories/medicineCategoryApi'

// Mock medicineCategoryApi
vi.mock('@/api-services/repositories/medicineCategoryApi', () => ({
  medicineCategoryApi: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('MedicineCategoryView.vue Unit Tests', () => {
  const mockCategoriesResponse = {
    data: [
      { id: 'cat-1', categoryName: 'Tablets', description: 'Tablet medicines' },
      { id: 'cat-2', categoryName: 'Syrups', description: 'Liquid syrup medicines' }
    ],
    meta: {
      total: 2,
      lastPage: 1,
      currentPage: 1,
      perPage: 10
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(medicineCategoryApi.getAll).mockResolvedValue(mockCategoriesResponse as any)
  })

  it('fetches and lists categories on mount', async () => {
    const wrapper = mount(MedicineCategoryView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    expect(medicineCategoryApi.getAll).toHaveBeenCalledWith(1, 10)
    expect(wrapper.text()).toContain('Tablets')
    expect(wrapper.text()).toContain('Syrups')
    expect(wrapper.text()).toContain('Showing 1 to 2 of 2 results')
  })

  it('opens modal on Add Category click and submits creation form', async () => {
    vi.mocked(medicineCategoryApi.create).mockResolvedValue({ id: 'cat-3' } as any)
    const wrapper = mount(MedicineCategoryView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Click Add Category
    const addBtn = wrapper.findAll('button').find(b => b.text().includes('Add Category'))
    await addBtn!.trigger('click')

    // Expect modal is shown
    expect(wrapper.text()).toContain('Add New Category')

    // Enter values
    await wrapper.find('input[placeholder="e.g., Painkillers"]').setValue('Capsules')
    await wrapper.find('textarea').setValue('Capsule medications')

    // Submit form
    await wrapper.find('form').trigger('submit.prevent')

    expect(medicineCategoryApi.create).toHaveBeenCalledWith({
      categoryName: 'Capsules',
      description: 'Capsule medications'
    })
  })

  it('opens edit modal and submits update form', async () => {
    vi.mocked(medicineCategoryApi.update).mockResolvedValue({ id: 'cat-1' } as any)
    const wrapper = mount(MedicineCategoryView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    // Find the edit button (first action button)
    const editBtn = wrapper.find('button[title="Edit"]')
    await editBtn.trigger('click')

    expect(wrapper.text()).toContain('Edit Category')
    const categoryInput = wrapper.find('input[placeholder="e.g., Painkillers"]')
    expect((categoryInput.element as HTMLInputElement).value).toBe('Tablets')

    // Modify category name and submit
    await categoryInput.setValue('Tablets Updated')
    await wrapper.find('form').trigger('submit.prevent')

    expect(medicineCategoryApi.update).toHaveBeenCalledWith('cat-1', {
      categoryName: 'Tablets Updated',
      description: 'Tablet medicines'
    })
  })

  it('calls delete API when delete button is clicked', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.mocked(medicineCategoryApi.delete).mockResolvedValue(undefined)
    const wrapper = mount(MedicineCategoryView)

    await new Promise((resolve) => setTimeout(resolve, 10))
    await wrapper.vm.$nextTick()

    const deleteBtn = wrapper.find('button[title="Delete"]')
    await deleteBtn.trigger('click')

    expect(window.confirm).toHaveBeenCalled()
    expect(medicineCategoryApi.delete).toHaveBeenCalledWith('cat-1')
  })
})
