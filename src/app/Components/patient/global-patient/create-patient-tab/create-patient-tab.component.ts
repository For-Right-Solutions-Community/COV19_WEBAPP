import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Address } from '../../../../Models/address.model';
import { SocialCoverage } from '../../../../Models/social-coverage.model';
import { Patient } from '../../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { Profession } from '../../../../Models/profession.model';
import { Condition } from '../../../../Models/condition.model';
import { CivilStatus } from '../../../../Models/civil-status.model';
import { Gender } from '../../../../Models/gender.model';
import { PatientService } from '../../../../Services/patient.service';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
import { Vital } from '../../../../Models/vital.model';
import { Exposure } from '../../../../Models/exposure.model';
import { Symptom } from '../../../../Models/symptom.model';
import { Antecedent } from '../../../../Models/antecedent.model';
import { SymptomService } from '../../../../Services/symptom.service';
import { VitalService } from '../../../../Services/vital.service';

@Component({
  selector: 'ngx-create-patient-tab',
  templateUrl: './create-patient-tab.component.html',
  styleUrls: ['./create-patient-tab.component.scss']
})
export class CreatePatientTabComponent implements OnInit {
  gouvernorats:string[]=["Ariana","Béja","Ben Arous","Bizerte","Gabès","Gafsa","Jendouba","Kairouan",
  "Kasserine","Kébili","Kef","Mahdia","Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid",
  "Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"];
  checkexposure:boolean=false;
  socialOptions : SocialCoverage[]= Object.keys(SocialCoverage).map(key => SocialCoverage[key]).filter(value => typeof(value) === "string");
  handicape:boolean=false;
  patients: Patient[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdPatient = new EventEmitter();
  professionOptions : Profession[]= Object.keys(Profession).map(key => Profession[key]).filter(value => typeof(value) === "string");
  conditionOptions : Condition[]= Object.keys(Condition).map(key => Condition[key]).filter(value => typeof(value) === "string");
  civilOptions : CivilStatus[]= Object.keys(CivilStatus).map(key => CivilStatus[key]).filter(value => typeof(value) === "string");
  genderOptions : Gender[]= Object.keys(Gender).map(key => Gender[key]).filter(value => typeof(value) === "string");
  
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()patient:Patient;
  vital:Vital;
  symptom:Symptom;
  antecedent:Antecedent;
  address:Address;
  exposure:Exposure;
  submittedPatient:any;
  submitted = false;
  registerForm: FormGroup;
  constructor(private vitalService: VitalService,private symptomService: SymptomService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.reloadPatientListData();
    this.patient=new Patient();
    this.address=new Address();
    this.exposure=new Exposure();
    this.symptom=new Symptom();
    this.antecedent=new Antecedent();
    this.vital=new Vital();
    this.registerForm = this.formBuilder.group({
    gender: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    civilStatus: ['', Validators.required],
    age: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }
  createPatient(){
    this.patient.address=this.address;
    this.patient.antecedentRecord=this.antecedent;
    this.patient.exposure=this.exposure;
    return this.patientService.createPatient(this.patient).toPromise()
.then(      data => {
        this.createdPatient.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.reloadPatientListData();
        return data;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    //add patient
    this.createPatient().then(  
      data=>{
        this.submittedPatient=data;
        if(this.submittedPatient!=undefined&&this.submittedPatient.id!=null){
          //add symptom
        this.symptom.patient=this.submittedPatient;
        this.symptom.date=new Date();
        this.symptomService.createSymptom(this.symptom).subscribe(
          data => {
            console.log(data);
            this.isSignedUp = true;
            this.isSignUpFailed = false;
          },
          error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isSignUpFailed = true;
          }
        );
        //add vital
        this.vital.patient=this.submittedPatient;
        this.vital.measurementDate=new Date();
        this.vitalService.createVital(this.vital).subscribe(
          data => {
            console.log(data);
            this.isSignedUp = true;
            this.isSignUpFailed = false;
            Swal.fire('','La fiche patient est ajoutée avec succés !');
            this.reset();
          },
          error => {
            console.log(error);
            this.errorMessage = error.error.message;
            this.isSignUpFailed = true;
          }
        ); 
        }else{
          Swal.fire('','La fiche patient est ajoutée sans symptomes ou signes vitaux ! il y a un problème !'); 
        }
      }
    )
    console.log(this.submittedPatient);
    
  }
  reset(){
   this.vital=new Vital();
   this.symptom=new Symptom(); 
   this.patient=new Patient();
   this.address=new Address();
   this.antecedent=new Antecedent();
   this.submitted = false;
   this.registerForm.reset();
  }

  getPatientsList() {
    this.patientService.getPatientsList()
    .subscribe(result => {
     this.patients = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }
  reloadPatientListData() {
    this.patientService.getPatientsList()
      .subscribe(result => {
        this.patients = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

}
