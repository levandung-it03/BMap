export class LoginReq {
  email: string
  password: string

  constructor(email: string, password: string) {
    this.email = email
    this.password = password
  }
}

export class RegisterReq {
  email: string
  password: string
  fullName: string

  constructor(email: string, password: string, fullName: string) {
    this.email = email
    this.password = password
    this.fullName = fullName
  }
}

export class OAuthCallbackReq {
  code: string
  state: string

  constructor(code: string, state: string) {
    this.code = code
    this.state = state
  }
}

export interface AccountRes {
  id?: string
  email: string
  fullName: string
}

export interface AuthRes {
  success?: boolean
  data?: AccountRes
  message?: string
}

export interface OAuthUrlRes {
  redirectUrl: string
}

export interface ApiRes<T> {
  success: boolean
  data?: T
  error?: string
}
