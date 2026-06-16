export interface ActivityLogs {
  status: number
  message: string
  data: Datum[]
  meta: Meta
}

export interface Datum {
  id: string
  action: string
  employeeId: string
  resourceType: string
  resourceId: string
  payloadData: PayloadData
  createdAt: Date
}

export interface PayloadData {
  email: string
  password: string
}

export interface Meta {
  total: number
  lastPage: number
  currentPage: number
  perPage: number
  prev: null
  next: null
}
