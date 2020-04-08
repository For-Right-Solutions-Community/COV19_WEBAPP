import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { SymptomService } from '../../../Services/symptom.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Symptom } from '../../../Models/symptom.model';

@Component({
  selector: 'ngx-patient-symptom-historic',
  templateUrl: './patient-symptom-historic.component.html',
  styleUrls: ['./patient-symptom-historic.component.scss']
})
export class PatientSymptomHistoricComponent implements OnInit {
  patients: Patient[] = [];
  symptoms: Symptom[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  errorMessage = '';
  @Input()patient:Patient;
  constructor(private symptomService: SymptomService,private patientService: PatientService) { }
  ngOnInit() {
    this.getPatientsList();
    if(this.patient!=undefined){
      this.getPatientSymptoms(this.patient.id);
    }
  }

  getPatientSymptoms(id:number) {
    this.symptomService.getPatientSymptomsList(id)
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
    this.patientService.showlistsymptom = false ;
  }
}
