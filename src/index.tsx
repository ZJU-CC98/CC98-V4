import 'src/config/axios'
import React from 'react'
import ReactDom from 'react-dom'

import './stylesheets/main.scss'
import App from 'src/App'
import { initIndexedDb } from 'src/utils/indexedDb'
import cacheConfigs from 'src/config/cache'
import envConfig from 'src/config/env'

// need top-level await
initIndexedDb(cacheConfigs).finally(() => {
  const root = document.getElementById('app')

  // DO NOT ADD ANY COMPONENT HERE
  // or it will cause react-hot-loader stop work
  // add component to App.tsx instead
  ReactDom.render(<App />, root)
})

// TODO: remove
console.log(envConfig)
