import { Condition } from './condition.model';
import { Gender } from './gender.model';
import { Account } from './account.model';
import { CivilStatus } from './civil-status.model';
import { Profession } from './profession.model';
import { SocialCoverage } from './social-coverage.model';
import { Address } from './address.model';
import { AppUser } from './user.model';

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
    physicalHandicap:boolean;
	socialCoverage:SocialCoverage;
    backupPhone:string;
    address:Address;
    user:AppUser;
    constructor(){}
}