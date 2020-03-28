import { Role } from './role.model';

export class AppUser{
    id:number;
    firstname:string;
	lastname:string;
    email:string;
	cin:string;
	passport:string;
	username:string;
	password:string;
	role: Role;
	constructor() {
	}
	
}