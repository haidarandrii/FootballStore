import { ActionWithPayload, IFilterCategory } from '../app.state';
import { ACTIONS } from '../Actions/filterCategory.action';

const initialState: IFilterCategory = {
    categories: [],
    brands: [],
    imageCategory: undefined,
    priceFilter: 'DOLLAR',
    valueInput: ''
};
export function addCategoryReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.ADD_CATEGORY:
            return {
                ...state,
                categories: action.payload
            };
        case ACTIONS.ADD_BRAND:
            return {
                ...state,
                brands: action.payload
            };
        case ACTIONS.ADD_IMAGE_CATEGORY:
            return {
                ...state,
                imageCategory: action.payload
            };
        case ACTIONS.PRICE_FILTER:
            return {
                ...state,
                priceFilter: action.payload
            };
        case ACTIONS.VALUE_INPUT:
            return {
                ...state,
                valueInput: action.payload
            };
        default:
            return state;
    }
}
