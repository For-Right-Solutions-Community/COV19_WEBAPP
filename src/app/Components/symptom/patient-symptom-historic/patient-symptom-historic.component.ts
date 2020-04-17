import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Symptom } from '../../../Models/symptom.model';
import { Intervention } from '../../../Models/intervention.model';

@Component({
  selector: 'ngx-patient-symptom-historic',
  templateUrl: './patient-symptom-historic.component.html',
  styleUrls: ['./patient-symptom-historic.component.scss']
})
export class PatientSymptomHistoricComponent implements OnInit {
  patients: Patient[] = [];
  symptoms: Symptom[] = [];
  interventions: Intervention[]=[];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  errorMessage = '';
  @Output() createdSymptom = new EventEmitter();
  @Input()patient:Patient;
  constructor(private patientService: PatientService) { }
  ngOnInit() {
    this.getPatientsList();
    this.symptoms= [];
    this.interventions= [];
    if(this.patient!=undefined){
      this.getPatientSymptoms(this.patient.id);
      this.getPatientInterventions(this.patient.id);
    }
  }

  getPatientSymptoms(id:number) {
    this.patientService.getPatientSymptomsList(id)
    .subscribe(result => {
     this.symptoms = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }

  getPatientInterventions(id:number) {
    this.patientService.getPatientInterventionsList(id)
    .subscribe(result => {
     this.interventions = result ;
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
    this.patientService.showlistsymptom = false ;
    this.reloadPatientListData();
  }
  goBackToList(){
    this.patientService.showlist = true;
    this.patientService.showlistsymptom = false ;
  }
}
