import { BrowserRouter, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import GlobalProvider from './store/providers/GlobalProvider'
import { ThemeProvider, CssBaseline } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';

export const BASE_URL = "http://localhost:8080"
// export const BASE_URL = "https://faas-cloud-backend.mouhammad.ml"



const theme = createMuiTheme({
    typography: {
        body1: {
            fontSize: '1.3rem'
        },
        body2: {
            fontSize: '1.1rem'
        },
        subtitle1: {
            fontSize: '1.2rem'
        },
        button: {
            fontSize: '0.85rem'
        },
        h1: {
            fontSize: '1.5rem',
        }

    },
    palette: {
        type: "dark",
        primary: {
            // light: will be calculated from palette.primary.main,
            main: '#F16E00',
            // dark: will be calculated from palette.primary.main,
            // contrastText: will be calculated to contrast with palette.primary.main
        },
        // Used by `getContrastText()` to maximize the contrast between
        // the background and the text.
        contrastThreshold: 3,
        // Used by the functions below to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,
    },
});

function App() {

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalProvider>
                <BrowserRouter>
                    <Route path="/" component={Dashboard} />
                    {/* <Route path="/login" component={SignIn} />
                    <Route path="/register" component={SignUp} /> */}
                </BrowserRouter>
            </GlobalProvider>
        </ThemeProvider>
    )
}

export default App
