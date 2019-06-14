import { ActionWithPayload } from '../app.state';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const ADD_CATEGORY = 'ADD_CATEGORY';
    export const ADD_BRAND = 'ADD_BRAND';
    export const ADD_IMAGE_CATEGORY = 'ADD_IMAGE_CATEGORY';
    export const PRICE_FILTER = 'PRICE_FILTER';
    export const VALUE_INPUT = 'VALUE_INPUT';
}
export class AddCategory implements ActionWithPayload {
    readonly type = ACTIONS.ADD_CATEGORY;
    constructor(public payload: string[]) {}
}
export class AddBrand implements ActionWithPayload {
    readonly type = ACTIONS.ADD_BRAND;
    constructor(public payload: string[]) {}
}
export class AddImageCategory implements ActionWithPayload {
    readonly type = ACTIONS.ADD_IMAGE_CATEGORY;
    constructor(public payload: string) {}
}
export class PriceFilter implements ActionWithPayload {
    readonly type = ACTIONS.PRICE_FILTER;
    constructor(public payload: string) {}
}
export class ValueInput implements ActionWithPayload {
    readonly type = ACTIONS.VALUE_INPUT;
    constructor(public payload: string) {}
}
