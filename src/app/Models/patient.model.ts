import { Condition } from './condition.model';
import { Gender } from './gender.model';
import { Account } from './account.model';
import { CivilStatus } from './civil-status.model';
import { Profession } from './profession.model';

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
    condition:Condition;
    civilStatus:CivilStatus;
    profession:Profession;

    liveAlone:boolean;
    liveWithFamily:boolean;
    familyMembers:number;

    runningWater:boolean;
    hotWater:boolean;
    sewageDisposal:boolean;

    singleRoom:boolean;

    handicap:boolean;
    handicap_physical:boolean;
    handicap_intellectual:boolean;

    traveled:boolean;
    country:string;
    contactPersonReturningFromTrip:boolean;
    countryPersonReturningFromTrip:string;
    sameHomePersonReturningFromTrip:boolean;

    COVIDtested:boolean;
    CVIDtestedResult:string;

    account:Account;
    constructor(){}
}