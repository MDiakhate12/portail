import {
  SNACK_CLOSE,
  SNACK_OPEN,
} from "../actions/actions_types";

export const snackbarInitialState = {
  open: false,
  message: "",
  severity: "info",
};

export const snackbarReducer = (action, state) => {
  switch (action) {
    case SNACK_OPEN:
      return {
        open: true,
        ...action.payload,
      };
    case SNACK_CLOSE:
      return {
        open: false,
        ...state,
      };
    default:
      break;
  }
};
