import { ActionWithPayload } from '../app.state';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const START_DELETE_BASKET_PRODUCT = 'START_DELETE_BASKET_PRODUCT';
    export const SUCCESS_DELETE_BASKET_PRODUCT = 'SUCCESS_DELETE_BASKET_PRODUCT';
}
export class StartDeleteBasketProduct implements ActionWithPayload {
    readonly type = ACTIONS.START_DELETE_BASKET_PRODUCT;
    constructor() {}
}
export class SuccessDeleteBasketProduct implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS_DELETE_BASKET_PRODUCT;
    constructor() {}
}
