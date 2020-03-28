import { Patient } from './patient.model';

export class Antecedent{
    id:number;
    cancer:boolean;
    cancerTypeORL:boolean;
    cancerTypeLiver:boolean;
    cancerTypeLung:boolean;
    cancerTypeOther:boolean;
    cancerTreatmentChemotherapy:boolean;
    cancerTreatmentRadiotherapy:boolean;
    cancerTreatmentSurgery:boolean;
    diabetic:boolean;
    diabeticMonths:number;
    diabeticComplications:boolean;
    diabeticComplicationsHeart:boolean;
    diabeticComplicationsFeet:boolean;
    diabeticComplicationsNerves:boolean;
    diabeticComplicationsKidneys:boolean;
    diabeticComplicationsEyes:boolean;
    diabeticComplicationsOther:boolean;
    hypertension:boolean;
    hypertensionMonths:number;
    renalFailure:boolean;
    renalFailureHemodialysis:boolean;
    immuneDisease:boolean;
    heartDisease:boolean;
    heartDiseaseCoronarien:boolean;
    heartDiseaseFailure:boolean;
    heartDiseaseOther:boolean;
    respiratory:boolean;
    respiratoryAsthma:boolean;
    respiratoryBPCO:boolean;
    respiratoryThorax:boolean;
    respiratoryOther:boolean;
    patient:Patient;
    constructor(){}
}