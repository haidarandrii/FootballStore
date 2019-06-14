import { ACTIONS } from '../Actions/register.action';
import { IRegisterState, ActionWithPayload } from '../app.state';


const initialState: IRegisterState = {
    success: false,
    error: null,
    loading: false,
    currentUser: undefined
};

export function registerReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.START_PROCCESS:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.SING_UP:
            return {
                ...state,
                loading: false,
            };
        case ACTIONS.SING_IN:
            return {
                ...state,
                loading: false,
                error: null,
                currentUser: action.payload
            };
        case ACTIONS.FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        case ACTIONS.LOG_OUT:
            return {
                ...state,
                currentUser: undefined
            };
        default:
            return state;
    }
}
