import { RootPageConstants } from '@/constants/root.page.constants'
import { APIResponse } from '@/dto/api.page.dto'
import { RootAuthorizeReq, RootAuthorizeRes } from '@/dto/root.page.dto'
import { RootPageUtils } from '@/utils/root.page.utils'

export class RootPageAPI {
  static authorizeFromHash(
    request: RootAuthorizeReq,
    storage: Storage,
  ): APIResponse<RootAuthorizeRes> {
    if (!RootPageUtils.isSignInHash(request.hash)) {
      return { success: true, data: { shouldAuthorize: false, tab: null } }
    }

    storage.setItem(RootPageConstants.AUTH_STORAGE_KEY, 'true')

    return {
      success: true,
      data: {
        shouldAuthorize: true,
        tab: RootPageUtils.parseTabFromHash(request.hash),
      },
    }
  }
}
