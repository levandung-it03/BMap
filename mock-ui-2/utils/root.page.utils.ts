import { RootPageConstants } from '@/constants/root.page.constants'

export class RootPageUtils {
  static getSavedAuthorization(storage: Storage): boolean {
    return storage.getItem(RootPageConstants.AUTH_STORAGE_KEY) === 'true'
  }

  static parseTabFromHash(hash: string): string | null {
    if (!hash.includes('-')) {
      return null
    }

    const hashParts = hash.split('-')
    return hashParts[1] || null
  }

  static isSignInHash(hash: string): boolean {
    return hash.startsWith(RootPageConstants.SIGN_IN_HASH_PREFIX)
  }
}
