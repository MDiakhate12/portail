import { ON_VM_LIST_UPDATE } from "../actions/actions_types";

export const vmListReducer = (state, action) => {
    switch (action.type) {
        case ON_VM_LIST_UPDATE:
            return action.payload
        default:
            break;
    }
}