import { Patient } from './patient.model';

export class Antecedent{
    id:number;
    cancer:boolean;
    cancer_type_ORL:boolean;
    cancer_type_liver:boolean;
    cancer_type_lung:boolean;
    cancer_type_other:boolean;
    cancer_treatment_chemotherapy:boolean;
    cancer_treatment_radiotherapy:boolean;
    cancer_treatment_surgery:boolean;
    diabetic:boolean;
    diabetic_months:number;
    diabetic_complications:boolean;
    diabetic_complications_heart:boolean;
    diabetic_complications_feet:boolean;
    diabetic_complications_nerves:boolean;
    diabetic_complications_kidneys:boolean;
    diabetic_complications_eyes:boolean;
    diabetic_complications_other:boolean;
    hypertension:boolean;
    hypertension_months:number;
    renalFailure:boolean;
    renalFailure_hemodialysis:boolean;
    immuneDisease:boolean;
    heartDisease:boolean;
    heartDisease_Coronarien:boolean;
    heartDisease_failure:boolean;
    heartDisease_other:boolean;
    respiratory:boolean;
    respiratory_asthma:boolean;
    respiratory_BPCO:boolean;
    respiratory_thorax:boolean;
    respiratory_other:boolean;
    patient:Patient;
    constructor(){}
}