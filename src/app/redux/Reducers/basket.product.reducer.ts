import { IBasketProduct, ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/basket.product.actions';

const initialState: IBasketProduct = {
    loading: false,
    error: null,
    basketProduct: undefined
};

export function basketProductReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.START_LOAD_BASKET_PRODUCT:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.FAILED_LOAD_BASKET_PRODUCT:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ACTIONS.SUCCESS_LOAD_BASKET_PRODUCT:
            return {
                ...state,
                loading: false,
                basketProduct: action.payload
            };
    }
}
