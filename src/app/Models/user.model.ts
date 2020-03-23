import { Role } from './role.model';

export class Account{
    id:number;
    fistname:string;
	lastname:string;
    email:string;
	cin:string;
	passport:string;
	username:string;
	password:string;
	role: Role;
	constructor(){}	
}