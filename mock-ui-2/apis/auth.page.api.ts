import { AuthPageConstants } from '@/constants/auth.page.constants'
import {
  AuthRes,
  LoginReq,
  OAuthCallbackReq,
  OAuthUrlRes,
  RegisterReq,
} from '@/dtos/auth.page.dto'
import { AxiosHelper } from '@/util/axios.helper'

export class AuthPageAPI {
  static async loginWithEmail(request: LoginReq): Promise<AuthRes> {
    const response = await AxiosHelper.instance.post<AuthRes>(
      `${AuthPageConstants.AUTH_ACCOUNT_PATH}/authenticate`,
      request,
    )
    return response.data
  }

  static async registerWithEmail(request: RegisterReq): Promise<AuthRes> {
    const response = await AxiosHelper.instance.post<AuthRes>(
      `${AuthPageConstants.AUTH_ACCOUNT_PATH}/register`,
      request,
    )
    return response.data
  }

  static async getOAuthRedirectUrl(provider: 'google' | 'facebook'): Promise<OAuthUrlRes> {
    const response = await AxiosHelper.instance.get<OAuthUrlRes>(
      `${AuthPageConstants.OAUTH_PATH}/authorize`,
      { params: { provider } },
    )
    return response.data
  }

  static async handleOAuthCallback(request: OAuthCallbackReq): Promise<AuthRes> {
    const response = await AxiosHelper.instance.get<AuthRes>(
      `${AuthPageConstants.OAUTH_PATH}/callback`,
      { params: request },
    )
    return response.data
  }
}
