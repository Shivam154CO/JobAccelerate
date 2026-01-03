"use client"

import React, { Component, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  onReset?: () => void
  sectionName?: string
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`ErrorBoundary caught an error in ${this.props.sectionName || 'unknown section'}:`, error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })
  }

  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset()
    }
    
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
    
    if (!this.props.onReset) {
      window.location.reload()
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[300px] flex items-center justify-center p-6 bg-background rounded-lg border border-destructive/20">
          <div className="max-w-md w-full text-center space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-destructive/10 text-destructive">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">
                {this.props.sectionName ? `${this.props.sectionName} Error` : 'Something went wrong'}
              </h2>
              <p className="text-sm text-muted-foreground">
                We apologize for the inconvenience. Please try again or contact support if the problem persists.
              </p>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="mt-3 p-3 bg-muted/50 rounded text-left">
                  <p className="text-xs font-medium">Error Details (Dev only):</p>
                  <p className="text-xs text-muted-foreground mt-1 font-mono break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <button
                onClick={this.resetErrorBoundary}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Try Again
              </button>
              
              <button
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground px-4 py-2"
              >
                <Home className="w-3 h-3 mr-2" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}