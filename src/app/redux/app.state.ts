import { IUser } from '../shared/interfaces/user';
import { Action } from '@ngrx/store';
import { IProduct } from '../shared/interfaces/product';

export interface AppState {
    registerPage: IRegisterState;
    productPage: IProductState;
    basketProductPage: IBasketProduct;
}
export interface ActionWithPayload extends Action {
    payload?: any;
}
export interface IProductState {
    error: string;
    loading: boolean;
    products?: Array<IProduct>;
}
export interface IRegisterState {
    success: boolean;
    error: string;
    loading: boolean;
    currentUser: IUser;
}
export interface IBasketProduct {
    error: string;
    loading: boolean;
    basketProduct: Array<IProduct>;
}
