import { Patient } from './patient.model';
import { Exposure } from './exposure.model';

export class Symptom{
    id:number;
    fever:boolean;
    cough:boolean;
    dyspnea:boolean;
    severeDyspnea:boolean;
    soreThroat:boolean;
    nauseaOrVomiting:boolean;
    unableToSpeak:boolean;
    diarrhea:boolean;
    deteriorationOfGC:boolean;
    chestPain:boolean;
    epigastralgia:boolean;
    senseDisorder:boolean;
    arthalgia:boolean;
	temperature:number;
	duration:number;
    date:Date;
    patient:Patient;
    constructor(){}
}