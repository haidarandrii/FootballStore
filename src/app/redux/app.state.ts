import { IUser } from '../shared/interfaces/user';
import { Action } from '@ngrx/store';
import { IProduct } from '../shared/interfaces/product';
import { IBrand } from '../store/shared/interface/IBrand';
import { ICategory } from '../store/shared/interface/ICategory';

export interface AppState {
    registerPage: IRegisterState;
    productPage: IProductState;
    basketProductPage: IBasketProduct;
    deleteBasketProductPage: IDeleteBasketProduct;
    getBrandsPage: IGetBrandsState;
    getCategoriesPage: IGetCategories;
    filterCategoryPage: IFilterCategory;
    basketPage;
    actionsPage;
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
export interface IDeleteBasketProduct {
    loading: boolean;
}
export interface IGetBrandsState {
    error: string;
    loading: boolean;
    brands?: Array<IBrand>;
}
export interface IGetCategories {
    error: string;
    loading: boolean;
    categories?: Array<ICategory>;
}
export interface IFilterCategory {
    categories: Array<string>;
    brands: Array<string>;
    imageCategory: string;
    priceFilter: string;
    valueInput: string;
}

