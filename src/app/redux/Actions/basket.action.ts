import { ActionWithPayload } from '../app.state';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const ADD_DATA_BASKET = 'ADD_DATA_BASKET';
}
export class AddDataBasket implements ActionWithPayload {
    readonly type = ACTIONS.ADD_DATA_BASKET;
    constructor(public payload: {}) {}
}

