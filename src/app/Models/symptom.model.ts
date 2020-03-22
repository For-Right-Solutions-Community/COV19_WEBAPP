import { Patient } from './patient.model';

export class Symptom{
    id:number;
    fever:boolean;
    cough:boolean;
    headache:boolean;
    sensesDisorder:boolean;
    soreThroat:boolean;
    diarrhea:boolean;
    fatigue:boolean;
    dyspnea:boolean;
    date:Date;
    patient:Patient;
    constructor(){}
}