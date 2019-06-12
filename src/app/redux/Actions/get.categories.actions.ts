import { ActionWithPayload } from '../app.state';
import { ICategory } from 'src/app/store/shared/interface/ICategory';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const START_LOAD_CATEGORIES = 'START_LOAD_CATEGORIES';
    export const SUCCESS_LOAD_CATEGORIES = 'SUCCESS_LOAD_CATEGORIES';
    export const FAILED_LOAD_CATEGORIES = 'FAILED_LOAD_CATEGORIES';
}
export class StartLoadCategories implements ActionWithPayload {
    readonly type = ACTIONS.START_LOAD_CATEGORIES;
    constructor() {}
}
export class SuccessLoadCategories implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS_LOAD_CATEGORIES;
    constructor(public payload: ICategory[]) {}
}
export class FailedLoadCategories implements ActionWithPayload {
    readonly type = ACTIONS.FAILED_LOAD_CATEGORIES;
    constructor(public payload: string) {}
}
