import { IUser } from 'src/app/shared/interfaces/user';
import { ActionWithPayload } from '../app.state';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const SING_UP = 'SING_UP';
    export const SING_IN = 'SING_IN';
    export const FAILED = 'FAILED';
    export const START_PROCCESS = 'START_PROCCESS';
}
export class StartProccess implements ActionWithPayload {
    readonly type = ACTIONS.START_PROCCESS;
    constructor() {}
}
export class SingUp implements ActionWithPayload {
    readonly type = ACTIONS.SING_UP;
    constructor(public payload?) {}
}
export class SingIn implements ActionWithPayload {
    readonly type = ACTIONS.SING_IN;
    constructor(public payload: IUser) {}
}
export class Failed implements ActionWithPayload {
    readonly type = ACTIONS.FAILED;
    constructor(public payload) {}
}
