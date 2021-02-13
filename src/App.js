import React, { useReducer, createContext } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import reducer, { initialState } from './store/reducers/form'
import Dashboard from './components/Dashboard'

export const AppContext = createContext('')

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  let value = { state, dispatch }

  return (
    <AppContext.Provider value={value}>
      <BrowserRouter>
        <Route path="/" component={Dashboard} />
      </BrowserRouter>
    </AppContext.Provider>
  )
}

export default App
