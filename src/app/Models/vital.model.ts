import { Patient } from './patient.model';

export class Vital{
    id:number;
    temperature:number;
    bloodPressure:number;
    pulse:number;
    respiratoryRate:number;
    measurementDate:Date;
    patient:Patient;
    constructor(){}
}