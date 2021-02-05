import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <Route path="/" component={Dashboard} />
    </BrowserRouter>
  )
}

export default App
