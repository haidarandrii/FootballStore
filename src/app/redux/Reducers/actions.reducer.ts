import { ActionWithPayload } from 'untitled folder/src/app/redux/app.state';
import { ACTIONS } from '../Actions/actions';

const initialState = {
    registrationStatus: false,
    singInStatus: false
}
export function actionReducer(state = initialState, action: ActionWithPayload) {
    switch(action.type) {
        case ACTIONS.SHOW_REGISTRATION:
            return {
                ...state,
                registrationStatus: true,
                singInStatus: false
            }
        case ACTIONS.SHOW_SING_IN:
            return {
                ...state,
                registrationStatus: false,
                singInStatus: true
            }
        case ACTIONS.CLOSE_FORMS:
            return {
                ...state,
                registrationStatus: false,
                singInStatus: false
            }
        default:
            return state;
    }
}