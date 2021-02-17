import React, { useReducer, createContext } from 'react'
import { formReducer, formInitialState } from './store/reducers/form'

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const [{ formState }, formDispatch] = useReducer(formReducer, formInitialState);

    return (
        <GlobalContext.Provider value={{
            formState,
            formDispatch
        }}>
            {children}
        </GlobalContext.Provider>
    )

}