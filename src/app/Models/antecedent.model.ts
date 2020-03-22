import { Patient } from './patient.model';

export class Antecedent{
    id:number;
    cancer:boolean;
    diabetic:boolean;
    hypertension:boolean;
    renalFailure:boolean;
    kidneyDisease:boolean;
    patient:Patient;
    constructor(){}
}