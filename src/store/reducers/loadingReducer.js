import { LOADING_CHANGE } from "../actions/actions_types";

export const loadingInitialState = false

export const loadingReducer = (state, action) => {
    switch (action.type) {
        case LOADING_CHANGE:
            return action.payload
        default:
            break;
    }
}