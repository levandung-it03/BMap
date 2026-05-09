export class AuthPageConstants {
  static readonly API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'
  static readonly AUTH_STORAGE_KEY = 'unireview_authorized'
  static readonly AUTH_ACCOUNT_PATH = '/api/public/auth/account'
  static readonly OAUTH_PATH = '/api/public/oauth2'
}
