import { ActionWithPayload } from '../app.state';
import { IBrand } from 'src/app/store/shared/interface/IBrand';

// tslint:disable-next-line:no-namespace
export namespace ACTIONS {
    export const START_LOAD_BRADNS = 'START_LOAD_BRADNS';
    export const SUCCESS_LOAD_BRADNS = 'SUCCESS_LOAD_BRADNS';
    export const FAILED_LOAD_BRANDS = 'FAILED_LOAD_BRADNS';
}
export class StartLoadBrands implements ActionWithPayload {
    readonly type = ACTIONS.START_LOAD_BRADNS;
    constructor() {}
}
export class SuccessLoadBrands implements ActionWithPayload {
    readonly type = ACTIONS.SUCCESS_LOAD_BRADNS;
    constructor(public payload: IBrand[]) {}
}
export class FailedLoadBrands implements ActionWithPayload {
    readonly type = ACTIONS.FAILED_LOAD_BRANDS;
    constructor(public payload: string) {}
}
