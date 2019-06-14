import { ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/basket.action';

const initialState = {
    data: {
        firstName: '',
        secondName: '',
        address: ''
    }
};

export function addBasketReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.ADD_DATA_BASKET:
            return {
                ...state,
                data: action.payload
            };
        default:
            return state;
    }
}
