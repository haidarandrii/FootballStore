import { IGetCategories, ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/get.categories.actions';

const initialState: IGetCategories = {
    loading: false,
    error: null,
    categories: null
};
export function getCategoriesReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.FAILED_LOAD_CATEGORIES:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ACTIONS.START_LOAD_CATEGORIES:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.SUCCESS_LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.payload,
                loading: false,
                error: null
            };
    default:
        return state;
    }
}
