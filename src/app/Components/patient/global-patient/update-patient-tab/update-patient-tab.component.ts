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
import { PatientService } from '../../../../Services/patient.service';
import Swal from 'sweetalert2';
import { LocalDataSource } from 'ng2-smart-table';
import { Intervention } from '../../../../Models/intervention.model';
import { InterventionService } from '../../../../Services/intervention.service';

@Component({
  selector: 'ngx-update-patient-tab',
  templateUrl: './update-patient-tab.component.html',
  styleUrls: ['./update-patient-tab.component.scss']
})
export class UpdatePatientTabComponent implements OnInit {
  testResulttrue:boolean=false;
  testResultfalse:boolean=false;
  travelertestResulttrue:boolean=false;
  travelertestResultfalse:boolean=false;

  liveonly:boolean=false;
  livefamily:boolean=false;
  selfhometrue:boolean=false;
  selfhomefalse:boolean=false;

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
  intervention=new Intervention();
  vital:Vital=new Vital();
  symptom:Symptom=new Symptom();
  antecedent:Antecedent;
  address:Address;
  exposure:Exposure;
  submittedPatient:any;
  submitted = false;
  registerForm: FormGroup;
  constructor(private interventionService: InterventionService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.reloadPatientListData();
    this.address=this.patient.address;
    
    this.antecedent=this.patient.antecedentRecord;
    if(this.patient!=undefined){
      if(this.patient.exposure!=null&&this.patient.exposure.testResult){
        this.testResulttrue=true;
      }else{
        this.testResultfalse=true;
      }
      if(this.patient.exposure!=null&&this.patient.exposure.contactedTravellerTestResult){
        this.travelertestResulttrue=true;
      }else{
        this.travelertestResultfalse=true;
      }

      if(this.patient.singleRoom ){
        this.selfhometrue=true;
      }else{
        this.selfhomefalse=true;
      }

      if(this.patient.liveAlone){
        this.liveonly=true;
      }
      if(this.patient.liveWithFamily){
        this.livefamily=true;
      }

      if(this.patient.physicalHandicap===true||this.patient.intellecHandicap===true){
        this.handicape=true;
      }
      this.getLastPatientSymptoms(this.patient.id);
      this.getLastPatientVitals(this.patient.id);
      this.getLastPatientInterventions(this.patient.id);
    }
    this.exposure=this.patient.exposure;
    if(this.exposure!=undefined&&(this.exposure.contactWithInfectedPerson||this.exposure.withSuspiciousGroup||
      this.exposure.visitRegion||this.exposure.hasmakingtest||this.exposure.contactWithTraveler||this.exposure.traveler)){
      this.checkexposure=true;
    }else{
      this.checkexposure=false;
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Vérifier les champs à remplir !'
      });
      return;
  }
  if(this.selfhometrue){
    this.patient.singleRoom=true;
  }
  if(this.liveonly){
    this.patient.liveAlone=true;
  }
  if(this.livefamily){
    this.patient.liveWithFamily=true;
  }
    this.patient.address=this.address;
    this.patient.antecedentRecord=this.antecedent;
    if(this.checkexposure){
      this.patient.exposure=this.exposure;
      if(this.testResulttrue){
        this.patient.exposure.testResult=true;
      }
      if(this.travelertestResulttrue){
        this.patient.exposure.contactedTravellerTestResult=true;
      }
    }else{
      this.patient.exposure=new Exposure();
    }
    this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
      data => {
        console.log(data);
        this.createdPatient.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;

      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
    // 
    //update intervention
    this.intervention.patient=this.patient;
    if(this.intervention.id!=null&&this.intervention.id!=undefined){
      this.interventionService.updateIntervention(this.intervention.id,this.intervention).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.reloadPatientListData();
          Swal.fire('','La fiche patient est modifiée avec succés !');
          this.patientService.showedit = false ;
          this.patientService.showlist = true;
        },
        error => {
          console.log(error);
          this.errorMessage = error.error.message;
          this.isSignUpFailed = true;
        }
      ); 
    }else{
      this.interventionService.createIntervention(this.intervention).subscribe(
        data => {
          console.log(data);
          this.isSignedUp = true;
          this.isSignUpFailed = false;
          this.reloadPatientListData();
          Swal.fire('','La fiche patient est modifiée avec succés !');
          this.patientService.showedit = false;
          this.patientService.showlist = true;
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
   this.intervention=new Intervention();
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

  getLastPatientInterventions(id:number) {
    this.patientService.getLastPatientInterventions(id)
    .subscribe(result => {
      if(result!= undefined){
        this.intervention = result ;
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
