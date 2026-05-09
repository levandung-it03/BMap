import { RootAuthorizeReq, RootAuthorizeRes } from '@/dto/root.page.dto'
import { RootPageAPI } from '@/services/root.page.api'
import { RootPageUtils } from '@/utils/root.page.utils'

export class RootPageService {
  static getAuthorizationState(storage: Storage): boolean {
    return RootPageUtils.getSavedAuthorization(storage)
  }

  static authorizeByHash(hash: string, storage: Storage): RootAuthorizeRes {
    const response = RootPageAPI.authorizeFromHash(new RootAuthorizeReq(hash), storage)

    if (!response.success || !response.data) {
      return { shouldAuthorize: false, tab: null }
    }

    return response.data
  }
}
