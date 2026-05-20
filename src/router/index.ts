import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import AuditLogView from '../pages/AuditLogView.vue'
import MedicineStorageView from '../pages/MedicineStorageView.vue'
import MedicineCategoryView from '../pages/MedicineCategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../pages/AboutView.vue'),
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('../pages/SupplierView.vue')
    },
    {
      path: '/user-management', 
      name: 'user-management',
      component: () => import('../pages/UserManagementView.vue')
    },
    {
      path: '/audit-log',
      name: 'audit-log',
      component: AuditLogView
    },
    {
      path: '/medicines',
      name: 'medicines',
      component: MedicineStorageView
    },
    {
      path: '/medicines/categories',
      name: 'medicine-categories',
      component: MedicineCategoryView
    }
  ],
})

export default router
