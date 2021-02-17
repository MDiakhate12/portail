import { useReducer, createContext } from 'react'
import { formReducer, formInitialState } from '../reducers/formReducer'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const [formState , formDispatch] = useReducer(formReducer, formInitialState);

    return (
        <GlobalContext.Provider value={{
            formState,
            formDispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )

}