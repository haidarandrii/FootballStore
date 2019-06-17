import { ActionWithPayload } from '../app.state';

export namespace ACTIONS {
    export const SHOW_REGISTRATION = 'SHOW_REGISTRATION';
    export const SHOW_SING_IN = 'SHOW_SING_IN';
    export const CLOSE_FORMS = 'CLOSE_FORMS';
}

export class RegistrationStatus implements ActionWithPayload {
    readonly type = ACTIONS.SHOW_REGISTRATION;
    constructor() {}
}
export class SingInStatus implements ActionWithPayload {
    readonly type = ACTIONS.SHOW_SING_IN;
    constructor() {}
}
export class CloseForms implements ActionWithPayload {
    readonly type = ACTIONS.CLOSE_FORMS;
    constructor() {}
}