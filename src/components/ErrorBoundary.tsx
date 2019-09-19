import React, { ErrorInfo } from 'react'
import * as Sentry from '@sentry/browser'

interface IErrorBoundaryState {
  hasError: boolean
  eventId: string
}

export default class ErrorBoundary extends React.Component<{}, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    hasError: false,
    eventId: '',
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo)
      const eventId = Sentry.captureException(error)
      this.setState({ eventId })
    })
  }

  // eslint-disable-next-line class-methods-use-this
  handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault()
    // eslint-disable-next-line no-restricted-globals
    location.reload(true)
  }

  render() {
    const { children } = this.props
    const { hasError, eventId } = this.state

    if (hasError) {
      const style: React.CSSProperties = {
        cursor: 'pointer',
        color: '#0000ee',
      }

      return (
        <div style={{ paddingLeft: '2rem' }}>
          <h1>Something went wrong</h1>
          <p>
            you can
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#" style={style} onClick={this.handleClick}>
              refresh
            </a>
            to retry.
          </p>
          <p>
            if this still happens, please contact with
            <a style={style} href="mailto:contact@cc98.org">
              contact@cc98.org
            </a>
            .
          </p>
          <button type="button" onClick={() => Sentry.showReportDialog({ eventId })}>
            Report feedback
          </button>
        </div>
      )
    }

    return children
  }
}
