import { AuthPageConstants } from '@/constants/auth.page.constants'
import { LoginReq, OAuthCallbackReq } from '@/dtos/auth.page.dto'
import { AuthPageAPI } from '@/apis/auth.page.api'

export class AuthPageService {
  static isAuthorized(storage: Storage): boolean {
    return storage.getItem(AuthPageConstants.AUTH_STORAGE_KEY) === 'true'
  }

  static setAuthorized(storage: Storage): void {
    storage.setItem(AuthPageConstants.AUTH_STORAGE_KEY, 'true')
  }

  static async login(email: string, password: string): Promise<void> {
    await AuthPageAPI.loginWithEmail(new LoginReq(email, password))
  }

  static async loginWithOAuth(provider: 'google' | 'facebook'): Promise<string> {
    const response = await AuthPageAPI.getOAuthRedirectUrl(provider)
    return response.redirectUrl
  }

  static async completeOAuthCallback(code: string, state: string): Promise<void> {
    await AuthPageAPI.handleOAuthCallback(new OAuthCallbackReq(code, state))
  }
}
