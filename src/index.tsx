import React from 'react'
import ReactDom from 'react-dom'

import './stylesheets/main.scss'
import App from './App'

const root = document.getElementById('app')

// DO NOT ADD ANY COMPONENT HERE
// or it will cause react-hot-loader stop work
// add component to App.tsx instead
ReactDom.render(<App />, root)
