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
	constructor(fistname:string,lastname: string, email: string,cin:string,passport:string,username: string,  password: string,role: Role) {
		this.fistname = fistname;
		this.lastname = lastname;
        this.username = username;
		this.email = email;
		this.cin = cin;
        this.passport = passport;
        this.password = password;
        this.role = role;
    }
}