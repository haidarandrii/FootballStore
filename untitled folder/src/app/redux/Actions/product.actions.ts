import { ActionWithPayload } from '../app.state';
import { IProduct } from 'src/app/shared/interfaces/product';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const START_LOAD_PRODUCT = 'START_LOAD_PRODUCT';
    export const SUCCESS_LOAD_PRODUCT = 'SUCCESS_LOAD_PRODUCT';
    export const FAILED_LOAD_PRODUCT = 'FAILED_LOAD_PRODUCT';
}

export class StartLoadProduct implements ActionWithPayload {
    readonly type = ACTIONS.START_LOAD_PRODUCT;
    constructor() {}
}
export class SuccessLoadProduct implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS_LOAD_PRODUCT;
    constructor(public payload: Array<IProduct>) {}
}
export class FailedLoadProduct implements ActionWithPayload {
    readonly type = ACTIONS.FAILED_LOAD_PRODUCT;
    constructor(public payload: string) {}
}
