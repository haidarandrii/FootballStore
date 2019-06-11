import { ActionWithPayload } from '../app.state';
import { IProduct } from 'src/app/shared/interfaces/product';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const FAILED = 'FAILED';
    export const SUCCESS = 'SUCCESS';
    export const START = 'START';
}

export class FailedLoadBasketProduct implements ActionWithPayload {
    readonly type = ACTIONS.FAILED;
    constructor(public payload: string) {}
}
export class SuccessLoadBaskerProduct implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS;
    constructor(public payload: IProduct[]) {}
}
export class StartLoadBasketProduct implements ActionWithPayload {
    readonly type = ACTIONS.START;
    constructor() {}
}
