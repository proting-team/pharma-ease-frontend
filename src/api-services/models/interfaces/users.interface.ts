export type Users = {
  status?: number
  message?: string
  data?: Datum[]
  meta?: Meta
}

export type Datum = {
  id?: string
  name?: string
  empId?: string
  email?: string
  password?: string
  phoneNumber?: string | null
  role?: string
  shift?: string
  status?: string
  dateOfBirth?: string | null
  alamat?: string | null
  profileAvatar?: string | null
  salary?: number
  startDate?: string | Date
  createdAt?: string | Date
  updatedAt?: string | Date
}

export type Meta = {
  total?: number
  lastPage?: number
  currentPage?: number
  perPage?: number
  prev?: number | null
  next?: number | null
}
