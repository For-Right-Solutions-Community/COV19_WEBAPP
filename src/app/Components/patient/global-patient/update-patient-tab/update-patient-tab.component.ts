import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Address } from '../../../../Models/address.model';
import { SocialCoverage } from '../../../../Models/social-coverage.model';
import { Patient } from '../../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { Profession } from '../../../../Models/profession.model';
import { Condition } from '../../../../Models/condition.model';
import { CivilStatus } from '../../../../Models/civil-status.model';
import { Gender } from '../../../../Models/gender.model';
import { Vital } from '../../../../Models/vital.model';
import { Symptom } from '../../../../Models/symptom.model';
import { Antecedent } from '../../../../Models/antecedent.model';
import { Exposure } from '../../../../Models/exposure.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VitalService } from '../../../../Services/vital.service';
import { SymptomService } from '../../../../Services/symptom.service';
import { PatientService } from '../../../../Services/patient.service';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-update-patient-tab',
  templateUrl: './update-patient-tab.component.html',
  styleUrls: ['./update-patient-tab.component.scss']
})
export class UpdatePatientTabComponent implements OnInit {
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
  vital:Vital=new Vital();;
  symptom:Symptom=new Symptom();
  antecedent:Antecedent;
  address:Address;
  exposure:Exposure;
  submittedPatient:any;
  submitted = false;
  registerForm: FormGroup;
  constructor(private vitalService: VitalService,private symptomService: SymptomService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.reloadPatientListData();
    this.address=this.patient.address;
    this.exposure=this.patient.exposure;
    this.antecedent=this.patient.antecedentRecord;
    if(this.patient!=undefined){
      if(this.patient.physicalHandicap===true||this.patient.intellecHandicap===true){
        this.handicape=true;
      }
      this.getLastPatientSymptoms(this.patient.id);
      this.getLastPatientVitals(this.patient.id);
    }
    
    if(this.exposure!=undefined){
      this.checkexposure=true;
    }
    this.registerForm = this.formBuilder.group({
    gender: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    civilStatus: ['', Validators.required],
    age: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    this.patient.address=this.address;
    this.patient.antecedentRecord=this.antecedent;
    this.patient.exposure=this.exposure;
    this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
      data => {
        console.log(data);
        this.createdPatient.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.reloadPatientListData();
        this.patientService.showedit = false ;
        this.patientService.showlist = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 

    if(this.patient!=undefined&&this.patient.id!=null){
      //add symptom
    this.symptom.patient=this.patient;
    this.symptomService.updateSymptom(this.symptom.id,this.symptom).subscribe(
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
    this.vital.patient=this.patient;
    this.vitalService.updateVital(this.vital.id,this.vital).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','La fiche patient est modifiée avec succés !');
        this.reset();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
    }
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

  getLastPatientSymptoms(id:number) {
    this.patientService.getLastPatientSymptoms(id)
    .subscribe(result => {
      if(result!= undefined){
        this.symptom = result;
      }   
  },
  err => console.log("Message erreur" +  err.message  ))
  }

  getLastPatientVitals(id:number) {
    this.patientService.getLastPatientVitals(id)
    .subscribe(result => {
      if(result!= undefined){
        this.vital = result ;
      } 
  },
  err => console.log("Message erreur" +  err.message  ))
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

  doRefreshData(){
    this.patientService.showlist = true;
    this.patientService.showedit = false ;
    this.reloadPatientListData();
  }
  goBackToList(){
    this.patientService.showlist = true;
    this.patientService.showedit = false ;
  }

}
