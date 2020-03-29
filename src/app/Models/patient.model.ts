import { Condition } from './condition.model';
import { Gender } from './gender.model';
import { Account } from './account.model';
import { CivilStatus } from './civil-status.model';
import { Profession } from './profession.model';
import { Intervention } from './intervention.model';

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
    familySize:number;

    runningWater:boolean;
    hotWater:boolean;
    sewageDisposal:boolean;

    singleRoom:boolean;

    //handicap:boolean;
    physicalHandicap:boolean;
    intellecHandicap:boolean;

    //traveled:boolean;
    visitedCountry:string;
    //contactPersonReturningFromTrip:boolean;
    countryPersonReturningFromTrip:string;
    sameHomePersonReturningFromTrip:boolean;

    //COVIDtested:boolean;
    covidTestResult:string;
    interventions: Intervention[]

    account:Account;
    constructor(){}
}