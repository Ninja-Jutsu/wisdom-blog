import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import CurrentUserProvider from './components/CurrentUserProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <App />
    </CurrentUserProvider>
  </React.StrictMode>
)
