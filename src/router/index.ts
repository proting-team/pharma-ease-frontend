import { createRouter, createWebHistory } from 'vue-router'
// import { useAuthStore } from '@/stores/auth'
import { useAuthStore } from '../stores/auth'
import HomeView from '../pages/HomeView.vue'
import AuditLogView from '../pages/AuditLogView.vue'
import MedicineStorageView from '../pages/medicine/MedicineStorageView.vue'
import MedicineCategoryView from '../pages/medicine/MedicineCategoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/LoginView.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/supplier',
      name: 'supplier',
      component: () => import('../pages/SupplierView.vue'),
      meta: { requiresAuth: true, roles: ['OWNER', 'PHARMACIST'] }
    },
    {
      path: '/user-management',
      name: 'user-management',
      component: () => import('../pages/UserManagementView.vue'),
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER'] }
    },
    {
      path: '/audit-log',
      name: 'audit-log',
      component: AuditLogView,
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER'] }
    },
    {
      path: '/medicines',
      name: 'medicines',
      component: MedicineStorageView,
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER', 'PHARMACIST'] }
    },
    {
      path: '/medicines/categories',
      name: 'medicine-categories',
      component: MedicineCategoryView,
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER', 'PHARMACIST'] }
    },
    {
      path: '/cashier',
      name: 'cashier',
      component: () => import('../pages/CashierPOSView.vue'),
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER', 'CASHIER'] }
    },
    {
      path: '/purchase-orders',
      name: 'purchase-orders',
      component: () => import('../pages/PurchaseOrdersView.vue'),
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER', 'PHARMACIST'] }
    },
    {
      path: '/reports/operational',
      name: 'operational-report',
      component: () => import('../pages/reports/OperationalReportView.vue'),
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER'] }
    },
    {
      path: '/reports/financial',
      name: 'financial-report',
      component: () => import('../pages/reports/FinancialReportView.vue'),
      meta: { requiresAuth: true, roles: ['ADMIN', 'OWNER'] }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.isAuthenticated) {
      next('/login')
    } else {
      const allowedRoles = (to.meta as any).roles as string[] | undefined
      if (allowedRoles && !allowedRoles.includes(authStore.userRole ?? '')) {
        next('/')
      } else {
        next()
      }
    }
  } else if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
