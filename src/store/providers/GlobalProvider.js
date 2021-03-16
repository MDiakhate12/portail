import { useReducer, createContext } from 'react'
import { formReducer, formInitialState } from '../reducers/formReducer'
import { loadingReducer, loadingInitialState } from '../reducers/loadingReducer';
import * as actionType from '../actions/actions_types';
import { vmListReducer } from '../reducers/vmListReducer';

export const GlobalContext = createContext()

export default function GlobalProvider({ children }) {

    const [formState, formDispatch] = useReducer(formReducer, formInitialState);
    const [loading, loadingDispatch] = useReducer(loadingReducer, loadingInitialState);
    const [vmList, vmListDispatch] = useReducer(vmListReducer, []);

    const setLoading = (payload) => {
        loadingDispatch({ type: actionType.LOADING_CHANGE, payload })
    }

    const setVmList = (payload) => {
        vmListDispatch({ type: actionType.ON_VM_LIST_UPDATE, payload })
    }

    const setApplicationType = (payload) => {
        formDispatch({ type: actionType.APPLICATION_TYPE_CHANGE, payload })
    }
    const setEnvironment = (payload) => {
        formDispatch({ type: actionType.EVIRONMENT_CHANGE, payload })
    }
    const setStack = (payload) => {
        formDispatch({ type: actionType.STACK_CHANGE, payload })
    }
    return (
        <GlobalContext.Provider value={{
            formState,
            formDispatch,
            setApplicationType,
            setEnvironment,
            setStack,
            loading,
            setLoading,
            vmList,
            setVmList
        }}>
            {children}
        </GlobalContext.Provider>
    )

}