export interface BeforeCreate {
  id: number
  email: string
  phone: string
}

export interface CreateUser {
  id: number
  email: string
  phone: string
  password: string
  lastname: string
  created_at: Date
  updated_at: Date
  firstname: string
  verified: boolean
  account_id: string
  middlename: string
}
