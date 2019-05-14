import { Data } from '@angular/router';
import { IOrder } from './order';
import { IProduct } from './product';

export interface IUser {
    firstName: string;
    secondName: string;
    dateOfBirth: Data;
    email: string;
    password: string;
    orders?: Array<IOrder>;
    id?: number;
    basket?: Array<IProduct>;
}