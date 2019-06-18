import { ACTIONS } from '../Actions/actions';
import { ActionWithPayload } from '../app.state';

const initialState = {
    registrationStatus: false,
    singInStatus: false
};
export function actionReducer(state = initialState, action: ActionWithPayload) {
    switch (action.type) {
        case ACTIONS.SHOW_REGISTRATION:
            return {
                ...state,
                registrationStatus: !state.registrationStatus,
                singInStatus: false
            };
        case ACTIONS.SHOW_SING_IN:
            return {
                ...state,
                registrationStatus: false,
                singInStatus: !state.singInStatus
            };
        case ACTIONS.CLOSE_FORMS:
            return {
                ...state,
                registrationStatus: false,
                singInStatus: false
            };
        default:
            return state;
    }
}
