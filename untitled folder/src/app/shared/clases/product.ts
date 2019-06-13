import { IProduct } from '../interfaces/product';

export class Product implements IProduct {
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    brands: string;
    descriptions?: string;
    constructor(id, name, price, category, image, brand, description ) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.image = image;
        this.brands = brand;
        this.descriptions = description;
    }
}
