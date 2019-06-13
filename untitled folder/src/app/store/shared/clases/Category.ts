import { ICategory } from '../interface/ICategory';

export class Category implements ICategory {
    name: string;
    img: string;
    constructor(name, img) {
        this.name = name;
        this.img = img;
    }
}
