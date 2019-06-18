import { ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/admin.actions';

const initialState = {
    brand: null,
    editProduct: undefined,
    addProduct: undefined,
    addCategory: undefined,
    update: false
};
export function adminReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.ADD_BRAND:
            return {
                ...state,
                brand: action.payload
            };
        case ACTIONS.START_EDIT_PRODUCT:
            return {
                ...state,
                editProduct: action.payload,
                update: true
            };
        case ACTIONS.EDITED_PRODUCT:
            return {
                ...state,
                editProduct: undefined,
                update: false
            };
        case ACTIONS.ADD_CATEGORY:
            return {
                ...state,
                addCategory: action.payload
            };
        case ACTIONS.ADD_PRODUCT:
            return {
                ...state,
                addProduct: action.payload
            };
        default:
            return state;
    }
}
