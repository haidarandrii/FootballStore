import { IProduct } from './product';

export interface IOrder {
    products: Array<IProduct>;
    orderData: {};
    id?: number;
    status: string;
}
