import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import GlobalProvider from './store/providers/GlobalProvider'

function App() {
    return (
        <GlobalProvider>
            <BrowserRouter>
                <Route path="/" component={Dashboard} />
            </BrowserRouter>
        </GlobalProvider>
    )
}

export default App
