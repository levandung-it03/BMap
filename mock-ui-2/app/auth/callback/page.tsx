'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { AuthPageService } from '@/services/auth.page.service'
import { GeneralHelper } from '@/util/general.helper'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState('')

  useEffect(() => {
    const completeLogin = async () => {
      const code = searchParams.get('code')
      const state = searchParams.get('state')

      if (!code || !state) {
        setError('OAuth callback is missing required parameters.')
        return
      }

      try {
        await AuthPageService.completeOAuthCallback(code, state)
        AuthPageService.setAuthorized(localStorage)
        router.replace('/')
      } catch (callbackError) {
        setError(GeneralHelper.formatErrorResponse(callbackError))
      }
    }

    void completeLogin()
  }, [router, searchParams])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 text-center">
        {error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <div className="flex items-center justify-center gap-3 text-foreground">
            <Spinner />
            Completing authentication...
          </div>
        )}
      </Card>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <Card className="w-full max-w-md p-8 text-center">
            <div className="flex items-center justify-center gap-3 text-foreground">
              <Spinner />
              Completing authentication...
            </div>
          </Card>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}
