import { IProductState, ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/product.actions';

const initialState: IProductState = {
    error: null,
    loading: false,
    products: undefined
};

export function productReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.FAILED_LOAD_PRODUCT:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ACTIONS.START_LOAD_PRODUCT:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.SUCCESS_LOAD_PRODUCT:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            };
    default:
        return state;
    }
}
