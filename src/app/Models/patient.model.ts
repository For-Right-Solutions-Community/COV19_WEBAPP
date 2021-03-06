import { Condition } from './condition.model';
import { Gender } from './gender.model';
import { CivilStatus } from './civil-status.model';
import { Profession } from './profession.model';
import { SocialCoverage } from './social-coverage.model';
import { Address } from './address.model';
import { AppUser } from './user.model';
import { Antecedent } from './antecedent.model';
import { Exposure } from './exposure.model';
import { Localisation } from './localisation.model';
import { Symptom } from './symptom.model';
import { Vital } from './vital.model';
import { PriseEnCharge } from './prise-en-charge.model';
import { Intervention } from './intervention.model';
import { PriseEnChargeSAMU } from './prise-en-charge-samu.model';

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
    intellecHandicap:boolean;
	socialCoverage:SocialCoverage;
    backupPhone:string;
    address:Address;
    user:AppUser;
    antecedentRecord:Antecedent;
    exposure:Exposure;
    covidscore:number;
    location:Localisation;
    symptomRecords:Symptom[]=[];
    vitalsRecords:Vital[]=[];
    interventions:Intervention[]=[];
    date:Date;
    priseencharge:PriseEnCharge;
    autonomy:boolean;
    autonomous:boolean;
    dependant:boolean;
    alteredCompletely:boolean;
    priseenchargesamu:PriseEnChargeSAMU
    constructor(){}
}