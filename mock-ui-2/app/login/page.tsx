'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { AuthPageService } from '@/services/auth.page.service'
import { GeneralHelper } from '@/util/general.helper'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'google' | 'facebook' | null>(null)

  const handleEmailLogin = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      await AuthPageService.login(email, password)
      AuthPageService.setAuthorized(localStorage)
      router.push('/')
    } catch (loginError) {
      setError(GeneralHelper.formatErrorResponse(loginError))
    } finally {
      setLoading(false)
    }
  }

  const handleOAuthLogin = async (provider: 'google' | 'facebook') => {
    setError('')
    setOauthLoading(provider)

    try {
      const redirectUrl = await AuthPageService.loginWithOAuth(provider)
      window.location.href = redirectUrl
    } catch (oauthError) {
      setError(GeneralHelper.formatErrorResponse(oauthError))
    } finally {
      setOauthLoading(null)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back</h1>
          <p className="text-slate-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              disabled={loading}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Spinner className="mr-2" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-600">Or continue with</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin('google')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'google' ? (
              <>
                <Spinner className="mr-2" />
                Connecting...
              </>
            ) : (
              'Google'
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => handleOAuthLogin('facebook')}
            disabled={oauthLoading !== null}
          >
            {oauthLoading === 'facebook' ? (
              <>
                <Spinner className="mr-2" />
                Connecting...
              </>
            ) : (
              'Facebook'
            )}
          </Button>
        </div>

        <p className="text-center text-slate-600">
          No account yet?{' '}
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            Go to home
          </Link>
        </p>
      </Card>
    </div>
  )
}
