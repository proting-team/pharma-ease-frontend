import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../pages/HomeView.vue'
import AuditLogView from '../pages/AuditLogView.vue'
import MedicineStorageView from '../pages/medicine/MedicineStorageView.vue'
import MedicineCategoryView from '../pages/medicine/MedicineCategoryView.vue'

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
    },
    {
      path: '/cashier',
      name: 'cashier',
      component: () => import('../pages/CashierPOSView.vue')
    },
    {
      path: '/purchase-orders',
      name: 'purchase-orders',
      component: () => import('../pages/PurchaseOrdersView.vue')
    },
    {
      path: '/reports/medicine',
      name: 'medicine-report',
      component: () => import('../pages/medicine/MedicineReportView.vue')
    },
    {
      path: '/reports/operational',
      name: 'operational-report',
      component: () => import('../pages/reports/OperationalReportView.vue')
    },
    {
      path: '/reports/financial',
      name: 'financial-report',
      component: () => import('../pages/reports/FinancialReportView.vue')
    }
  ],
})

export default router
