import { useReducer, createContext } from "react";
import { formReducer, formInitialState } from "../reducers/formReducer";
import {
  loadingReducer,
  loadingInitialState,
} from "../reducers/loadingReducer";
import * as actionType from "../actions/actions_types";
import { vmListReducer } from "../reducers/vmListReducer";
import { handleChange } from "../actions/actions";
import {
  snackbarInitialState,
  snackbarReducer,
} from "../reducers/snackbarReducer";

export const GlobalContext = createContext();

export default function GlobalProvider({ children }) {
  const [snackbarState, snackbarDispatch] = useReducer(
    snackbarReducer,
    snackbarInitialState
  );
  const [formState, formDispatch] = useReducer(formReducer, formInitialState);

  const [loading, loadingDispatch] = useReducer(
    loadingReducer,
    loadingInitialState
  );
  const [vmList, vmListDispatch] = useReducer(vmListReducer, []);

  const setLoading = (payload) => {
    loadingDispatch({ type: actionType.LOADING_CHANGE, payload });
  };

  const setVmList = (payload) => {
    vmListDispatch({ type: actionType.ON_VM_LIST_UPDATE, payload });
  };

  const setApplicationType = (payload) => {
    formDispatch({ type: actionType.APPLICATION_TYPE_CHANGE, payload });
  };
  const setEnvironment = (payload) => {
    formDispatch({ type: actionType.EVIRONMENT_CHANGE, payload });
  };
  const setStack = (payload) => {
    formDispatch({ type: actionType.STACK_CHANGE, payload });
    switch (payload) {
      case "mern":
        formDispatch(
          handleChange({
            target: {
              name: "dependencies",
              value: ["nginx", "nodejs", "express", "mongodb", "react"],
            },
          })
        );
        break;
      case "sbam":
        formDispatch(
          handleChange({
            target: {
              name: "dependencies",
              value: ["nginx", "springboot", "mysql", "angular"],
            },
          })
        );
        break;
      default:
        break;
    }
  };

  const setFrontendOptions = (event) => {
    const { name, value } = event.target;
    formDispatch({
      type: actionType.FRONTEND_OPTIONS_CHANGE,
      payload: { name, value },
    });
  };

  const setBackendOptions = (event) => {
    const { name, value } = event.target;
    formDispatch({
      type: actionType.BACKEND_OPTIONS_CHANGE,
      payload: { name, value },
    });
  };

  const openSnackbar = (message, severity) => {
    console.log(snackbarState);
    snackbarDispatch({
      type: actionType.SNACK_OPEN,
      payload: { message, severity },
    });
  };

  const closeSnackbar = (event, reason) => {
    console.log(snackbarState);

    // if (reason === "clickaway") {
    //   return;
    // }
    // snackbarDispatch({
    //   type: actionType.SNACK_CLOSE,
    // });
  };
  return (
    <GlobalContext.Provider
      value={{
        snackbarState,
        formState,
        formDispatch,
        setApplicationType,
        setEnvironment,
        setStack,
        loading,
        setLoading,
        vmList,
        setVmList,
        openSnackbar,
        closeSnackbar,
        setFrontendOptions,
        setBackendOptions,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
