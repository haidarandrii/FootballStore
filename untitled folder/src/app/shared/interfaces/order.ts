import { IProduct } from './product';

export interface IOrder {
    products: Array<IProduct>;
    firstName: string;
    secondName: string;
    address: string;
    id: number;
    status: string;
}
