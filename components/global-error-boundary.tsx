"use client"

import React, { useEffect } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'
import { AlertTriangle } from 'lucide-react'

export function GlobalErrorBoundary({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error caught:', event.error)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
    }

    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  return (
    <ErrorBoundary
      sectionName="Application"
      fallback={
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="w-10 h-10" />
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">Application Error</h1>
              <p className="text-muted-foreground">
                The application encountered an unexpected error. Please refresh the page or try again later.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
              >
                Refresh Application
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2"
              >
                Go to Homepage
              </button>
            </div>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  )
}