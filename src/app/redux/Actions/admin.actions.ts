import { ActionWithPayload } from '../app.state';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ICategory } from 'src/app/store/shared/interface/ICategory';

export namespace ACTIONS {
    export const ADD_BRAND = 'ADD_BRAND';
    export const START_EDIT_PRODUCT = 'START_EDIT_PRODUCT';
    export const EDITED_PRODUCT = 'EDITED_PRODUCT';
    export const ADD_CATEGORY = 'ADD_CATEGORY';
    export const ADD_PRODUCT = 'ADD_PRODUCT';
}
export class AddBrand implements ActionWithPayload {
    readonly type = ACTIONS.ADD_BRAND;
    constructor(public payload: string) {}
}
export class StartEditProduct implements ActionWithPayload {
    readonly type = ACTIONS.START_EDIT_PRODUCT;
    constructor(public payload: IProduct) {}
}
export class EditedProduct implements ActionWithPayload {
    readonly type = ACTIONS.EDITED_PRODUCT;
    constructor() {}
}
export class AddCategory implements ActionWithPayload {
    readonly type = ACTIONS.ADD_CATEGORY;
    constructor(public payload: ICategory) {}
}
export class AddProduct implements ActionWithPayload {
    readonly type = ACTIONS.ADD_PRODUCT;
    constructor(public payload: IProduct) {}
}
