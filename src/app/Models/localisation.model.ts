import { Account } from './account.model';
export class Localisation{
    id:number;
    longitude:number;
	latitude:number;
	accuaracy:number;
    date:Date;
    account:Account;
    constructor(){}
}