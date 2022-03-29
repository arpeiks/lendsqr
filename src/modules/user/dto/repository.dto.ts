export interface BeforeCreate {
  id: number
  email: string
  phone: string
}

export interface VerifyFindUser {
  id: number
  otp: number
}

export interface LoginFindUser {
  id: number
  email: string
  password: string
  verified: boolean
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
