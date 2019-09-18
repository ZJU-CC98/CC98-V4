import * as Sentry from '@sentry/browser'

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://2ee68277137a44bfa9f0759702b1c53e@sentry.io/1373472',
    release: process.env.GIT_HEAD,
  })
}
