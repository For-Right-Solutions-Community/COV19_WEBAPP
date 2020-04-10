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
import { LocalDataSource } from 'ng2-smart-table';
import { Localisation } from '../../../../Models/localisation.model';

@Component({
  selector: 'ngx-details-patient-tab',
  templateUrl: './details-patient-tab.component.html',
  styleUrls: ['./details-patient-tab.component.scss']
})
export class DetailsPatientTabComponent implements OnInit {
  localisation:Localisation=new Localisation();
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
    this.getPatientsList();
    this.address=this.patient.address;
    this.exposure=this.patient.exposure;
    this.antecedent=this.patient.antecedentRecord;
    if(this.patient!=undefined){
      if(this.patient.physicalHandicap===true||this.patient.intellecHandicap===true){
        this.handicape=true;
      }
      if(this.patient.location!=undefined&&this.patient.location.lat!=null&&this.patient.location.lng!=null){
        this.localisation=this.patient.location;
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

  getLastPatientSymptoms(id:number) {
    this.symptomService.getLastPatientSymptoms(id)
    .subscribe(result => {
      if(result!= undefined){
        this.symptom = result;
      }   
  },
  err => console.log("Message erreur" +  err.message  ))
  }

  getLastPatientVitals(id:number) {
    this.vitalService.getLastPatientVitals(id)
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
    this.patientService.showdetails = false ;
    this.reloadPatientListData();
  }
  goBackToList(){
    this.patientService.showlist = true;
    this.patientService.showdetails = false ;
  }


}
