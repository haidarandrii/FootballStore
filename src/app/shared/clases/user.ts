import { IUser } from '../interfaces/user';
import { Data } from '@angular/router';
import { IOrder } from '../interfaces/order';
import { IProduct } from '../interfaces/product';

export class User implements IUser {
    firstName: string;
    secondName: string;
    dateOfBirth: Data;
    email: string;
    password: string;
    id?: number;
    orders?: Array<IOrder>;
    basket?: Array<IProduct>;
    constructor({ firstName, secondName, dateOfBirth, email, password }) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.dateOfBirth = dateOfBirth;
        this.email = email;
        this.password = password;
    }
}
