import { ActionWithPayload, IDeleteBasketProduct } from '../app.state';
import { ACTIONS } from '../Actions/delete.basket.product.actions';

const initialState: IDeleteBasketProduct = {
    loading: false
};

export function deleteBasketProductReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.START_DELETE_BASKET_PRODUCT:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.SUCCESS_DELETE_BASKET_PRODUCT:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}
