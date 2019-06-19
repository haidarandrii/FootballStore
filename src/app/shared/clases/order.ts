import { IOrder } from '../interfaces/order';
import { IProduct } from '../interfaces/product';

export class Order implements IOrder {
    products: Array<IProduct>;
    orderData: {};
    id?: number;
    status: string;
    constructor(products, orderData, status) {
        this.products = products;
        this.orderData = orderData;
        this.status = status;
    }
}
