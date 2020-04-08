import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { VitalService } from '../../../Services/vital.service';
import { Vital } from '../../../Models/vital.model';
import { PatientService } from '../../../Services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-create-vital',
  templateUrl: './create-vital.component.html',
  styleUrls: ['./create-vital.component.scss']
})
export class CreateVitalComponent implements OnInit {
  @Input()patient:Patient;
  patients: Patient[] = [];
  vitals: Vital[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdVital = new EventEmitter();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()vital:Vital=new Vital();
  submitted = false;
  constructor(private vitalService: VitalService,private patientService: PatientService) { }
  ngOnInit() {
    this.getVitalsList();
    this.getPatientsList();
    if(this.patient!=undefined){
      this.getLastPatientVitals(this.patient.id);
    }
  }
  getLastPatientVitals(id:number) {
    this.vitalService.getLastPatientVitals(id)
    .subscribe(result => {
     this.vital = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }
  onSubmit() {
    this.submitted = true;
    
    this.vital.patient=this.patient;
    this.vital.measurementDate=new Date();
    console.log(this.vital);
    this.vitalService.createVital(this.vital).subscribe(
      data => {
        console.log(data);
        this.createdVital.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','Les signes vitaux du patient sont mises à jour avec succés !');
        this.reset();
        this.reloadVitalListData();
        this.patientService.showcreatevital = false ;
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
   this.vital=new Vital();
   this.submitted = false;
  }
  getVitalsList() {
    this.vitalService.getVitalsList()
    .subscribe(result => {
     this.vitals = result ;
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
  reloadVitalListData() {
    this.vitalService.getVitalsList()
      .subscribe(result => {
        this.vitals = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  goBackToList(){
    this.patientService.showlist = true;
    this.patientService.showcreatevital = false ;
  }

}
