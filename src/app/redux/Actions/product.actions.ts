import { ActionWithPayload } from '../app.state';
import { IProduct } from 'src/app/shared/interfaces/product';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const START = 'START';
    export const SUCCESS = 'SUCCESS';
    export const FAILED = 'FAILED';
}

export class StartLoadProduct implements ActionWithPayload {
    readonly type = ACTIONS.START;
    constructor() {}
}
export class SuccessLoadProduct implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS;
    constructor(public payload: Array<IProduct>) {}
}
export class FailedLoadProduct implements ActionWithPayload {
    readonly type = ACTIONS.FAILED;
    constructor(public payload: string) {}
}
