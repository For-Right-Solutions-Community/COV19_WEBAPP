import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Symptom } from '../../../Models/symptom.model';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { SymptomService } from '../../../Services/symptom.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { Exposure } from '../../../Models/exposure.model';

@Component({
  selector: 'ngx-create-symptom',
  templateUrl: './create-symptom.component.html',
  styleUrls: ['./create-symptom.component.scss']
})
export class CreateSymptomComponent implements OnInit {
  @Input()patient:Patient;
  checkexposure:boolean=false;
  exposure:Exposure;
  patients: Patient[] = [];
  symptoms: Symptom[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdSymptom = new EventEmitter();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()symptom:Symptom=new Symptom();
  submitted = false;
  constructor(private symptomService: SymptomService,private patientService: PatientService) { }
  ngOnInit() {
    this.getSymptomsList();
    this.exposure=this.patient.exposure;
    this.getPatientsList();
    if(this.patient!=undefined){
      this.getLastPatientSymptoms(this.patient.id);
    }
    
    if(this.exposure!=undefined){
      this.checkexposure=true;
    }
  }

  
  getLastPatientSymptoms(id:number) {
    this.symptomService.getLastPatientSymptoms(id)
    .subscribe(result => {
     this.symptom = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }

  
  onSubmit() {
  this.submitted = true;
  this.patient.exposure=this.exposure;
  this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
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
    this.symptom.patient=this.patient;
    this.symptom.date=new Date();
    this.symptom.id=null;
    console.log(this.symptom);
    this.symptomService.createSymptom(this.symptom).subscribe(
      data => {
        console.log(data);
        this.createdSymptom.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','Les symptômes du patient sont mises à jour avec succés !');
        this.reset();
        this.reloadSymptomListData();
        this.patientService.showcreatesymptom = false ;
        this.patientService.showlist = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }


  reset(){
   this.symptom=new Symptom();
   this.submitted = false;
  } 
  getSymptomsList() {
    this.symptomService.getSymptomsList()
    .subscribe(result => {
     this.symptoms = result ;
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
  reloadSymptomListData() {
    this.symptomService.getSymptomsList()
      .subscribe(result => {
        this.symptoms = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  goBackToList(){
    this.patientService.showlist = true;
    this.patientService.showcreatesymptom = false ;
  }

}
