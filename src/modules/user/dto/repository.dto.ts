export interface BeforeCreate {
  id: number
  email: string
  phone: string
}

export interface CreateUser {
  id: number
  email: string
  phone: string
  lastName: string
  createdAt: Date
  updatedAt: Date
  firstName: string
  verified: boolean
  middleName: string
}
