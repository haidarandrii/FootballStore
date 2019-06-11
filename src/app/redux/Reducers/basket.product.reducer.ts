import { IBasketProduct, ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/basket.product.actions';

const initialState: IBasketProduct = {
    loading: false,
    error: null,
    basketProduct: undefined
};

export function basketProductReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.START:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ACTIONS.SUCCESS:
            return {
                ...state,
                loading: false,
                basketProduct: action.payload
            };
    }
}
