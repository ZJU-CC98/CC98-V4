import 'src/config/axios'
import React from 'react'
import ReactDom from 'react-dom'

// 库的css导入放在scss与app之前，方便覆盖
import 'rc-notification/assets/index.css'
import './stylesheets/main.scss'

import App from 'src/App'
import { initIndexedDb } from 'src/utils/indexedDb'

// need top-level await
initIndexedDb().finally(() => {
  const root = document.getElementById('app')

  // DO NOT ADD ANY COMPONENT HERE
  // or it will cause react-hot-loader stop work
  // add component to App.tsx instead
  ReactDom.render(<App />, root)
})
