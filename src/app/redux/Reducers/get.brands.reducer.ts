import { IGetBrandsState, ActionWithPayload } from '../app.state';
import { ACTIONS } from '../Actions/get.brands.action';

const initialState: IGetBrandsState = {
    error: null,
    loading: false,
    brands: null
};
export function getBrandsReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.FAILED_LOAD_BRANDS:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ACTIONS.START_LOAD_BRADNS:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.SUCCESS_LOAD_BRADNS:
            return {
                ...state,
                brands: action.payload,
                loading: false,
                error: null
            };
    default:
        return state;
    }
}
