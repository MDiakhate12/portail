import { useReducer, createContext } from 'react'
import { formReducer, formInitialState } from '../reducers/formReducer'
import { loadingReducer, loadingInitialState } from '../reducers/loadingReducer';
import { LOADING_CHANGE } from '../actions/actions_types';

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const [formState, formDispatch] = useReducer(formReducer, formInitialState);
    const [loading, loadingDispatch] = useReducer(loadingReducer, loadingInitialState);

    const setLoading = (payload) => {
        loadingDispatch({ type: LOADING_CHANGE, payload })
    }
    return (
        <GlobalContext.Provider value={{
            formState,
            formDispatch,
            loading,
            setLoading
        }}>
            {children}
        </GlobalContext.Provider>
    )

}