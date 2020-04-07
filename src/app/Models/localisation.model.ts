import { AppUser } from './user.model';

export class Localisation{
    id:number;
    longitude:number;
	latitude:number;
	accuaracy:number;
    date:Date;
    user:AppUser;
    constructor(){}
}