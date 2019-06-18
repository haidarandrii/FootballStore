import { IProduct } from '../interfaces/product';

export class Product implements IProduct {
    name: string;
    price: number;
    category: string;
    image: string;
    brands: string;
    descriptions?: string;
    id?: number;
    constructor(product?: IProduct) {
        const {
            name = '',
            category = '',
            price = 0,
            image = '',
            brands = '',
            descriptions = ''
        } = product || {};
        this.name = name;
        this.category = category;
        this.price = price;
        this.image = image;
        this.brands = brands;
        this.descriptions = descriptions;
    }
}
