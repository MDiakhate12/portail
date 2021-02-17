import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import GlobalProvider from './store/providers/GlobalProvider'

// export const BASE_URL = "https://886cb7b29a02.ngrok.io"
export const BASE_URL = "https://faas-cloud-backend.mouhammad.ml"

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
