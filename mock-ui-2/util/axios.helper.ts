import axios, { AxiosError, AxiosInstance } from 'axios'
import { AuthPageConstants } from '@/constants/auth.page.constants'

export class AxiosHelper {
  static readonly instance: AxiosInstance = axios.create({
    baseURL: AuthPageConstants.API_BASE_URL,
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  })

  static setupInterceptors(): void {
    AxiosHelper.instance.interceptors.request.use(
      (config) => config,
      (error) => Promise.reject(error),
    )

    AxiosHelper.instance.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => Promise.reject(error),
    )
  }
}

AxiosHelper.setupInterceptors()
