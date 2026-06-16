export interface OperationalReport {
  status: number
  message: string
  data: Data
  meta: null
}

export interface Data {
  metadata: Metadata
  stats: Stats
  medicines: Medicine[]
  activityLogs: ActivityLog[]
}

export interface ActivityLog {
  id: string
  action: string
  employeeId: string
  resourceType: string
  resourceId: string
  payloadData: PayloadData
  createdAt: Date
  employee: Employee
}

export interface Employee {
  name: string
  empId: string
  role: string
}

export interface PayloadData {
  email: string
  password: string
}

export interface Medicine {
  id: string
  medicineName: string
  sku: string
  description: string
  categoryId: string
  supplierId: string
  stock: number
  price: number
  expiredDate: Date
  createdAt: Date
  updatedAt: Date
  category: Category
  supplier: Supplier
}

export interface Category {
  id: string
  categoryName: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export interface Supplier {
  id: string
  companyName: string
  phoneNumber: string
  contactName: string
  supplierEmail: string
  status: Status
  address: string
  licenseNumber: string
  createdAt: Date
  updatedAt: Date
}

export enum Status {
  Active = 'ACTIVE',
  InActive = 'INCATIVE',
}

export interface Metadata {
  generatedAt: Date
  filter: Filter
}

export interface Filter {
  startDate: null
  endDate: null
}

export interface Stats {
  totalMedicines: number
  lowStockMedicines: number
  outOfStockMedicines: number
  expiredMedicines: number
  totalActivityLogs: number
}
