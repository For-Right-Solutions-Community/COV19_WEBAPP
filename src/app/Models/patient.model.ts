import { Status } from './status.model';
import { Gender } from './gender.model';
import { Account } from './account.model';

export class Patient{
    id:number;
    email:string;
	cin:string;
	firstname:string;
	lastname:string;
    phone:string;
    age:number;
    weight:number;
    height:number;
    gender:Gender;
    status:Status;
    account:Account;
    constructor(){}
}