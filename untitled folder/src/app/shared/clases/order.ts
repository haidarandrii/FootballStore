import { IOrder } from '../interfaces/order';
import { IProduct } from '../interfaces/product';

export class Order implements IOrder {
    products: Array<IProduct>;
    firstName: string;
    secondName: string;
    address: string;
    id: number;
    status: string;
    constructor(products, firstName, secondName, address, status) {
        this.products = products;
        this.firstName = firstName;
        this.secondName = secondName;
        this.address = address;
        this.status = status;
    }
}
