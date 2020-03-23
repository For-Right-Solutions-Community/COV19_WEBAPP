import { Patient } from './patient.model';

export class Symptom{
    id:number;

    fever:boolean;
    fever_score:number=2;
    cough:boolean;
    cough_score:number=2;
    dyspnea:boolean;
    dyspnea_score:number=2;
    exposure:boolean;
    exposure_score:number=2;
    soreThroat:boolean;
    soreThroat_score:number=1;
    nausea:boolean;
    nausea_score:number=1;
    vomiting:boolean;
    vomiting_score:number=1;
    diarrhea:boolean;
    diarrhea_score:number=1;
    renalFailure:boolean;
    renalFailure_score:number=1;
    heartFailure:boolean;
    heartFailure_score:number=1;
    chronicRespiratory:boolean;
    chronicRespiratory_score:number=1;
    date:Date;
    patient:Patient;
    constructor(){}
}