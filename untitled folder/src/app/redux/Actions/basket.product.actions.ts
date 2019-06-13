import { ActionWithPayload } from '../app.state';
import { IProduct } from 'src/app/shared/interfaces/product';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const FAILED_LOAD_BASKET_PRODUCT = 'FAILED_LOAD_BASKET_PRODUCT';
    export const SUCCESS_LOAD_BASKET_PRODUCT = 'SUCCESS_LOAD_BASKET_PRODUCT';
    export const START_LOAD_BASKET_PRODUCT = 'START_LOAD_BASKET_PRODUCT';
}

export class FailedLoadBasketProduct implements ActionWithPayload {
    readonly type = ACTIONS.FAILED_LOAD_BASKET_PRODUCT;
    constructor(public payload: string) {}
}
export class SuccessLoadBaskerProduct implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS_LOAD_BASKET_PRODUCT;
    constructor(public payload: IProduct[]) {}
}
export class StartLoadBasketProduct implements ActionWithPayload {
    readonly type = ACTIONS.START_LOAD_BASKET_PRODUCT;
    constructor() {}
}
