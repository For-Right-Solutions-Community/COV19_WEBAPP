import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [ 
  {
    title: 'Patients',
    icon: 'layout-outline',
    children: [
      {
        title: 'Ajouter un patient',
        link: '/menu/patients/createPatient',
      },
      {
        title: 'Liste des patients',
        link: '/menu/patients/patientList',
      },
      {
        title: 'Cas critiques',
        link: '/menu/patients/criticalPatient',
      },
    ],
  },
  {
    title: 'Suivi des patients',
    icon: 'browser-outline',
    children: [
      {
        title: 'Ajouter une fiche de suivi',
        link: '/menu/interventions/createIntervention',
      },
      {
        title: 'Liste des fiches de suivi',
        link: '/menu/interventions/interventionList',
      },
    ],
  },
  {
    title: 'Antécédents',
    icon: 'edit-2-outline',
    children: [
      {
        title: 'Ajouter un antécédent',
        link: '/menu/antecedents/createAntecedent',
      },
      {
        title: 'Liste des antécédents',
        link: '/menu/antecedents/antecedentList',
      },
    ],
  },
  {
    title: 'Symptômes',
    icon: 'keypad-outline',
    children: [
      {
        title: 'Ajouter un symptôme',
        link: '/menu/symptoms/createSymptom',
      },
      {
        title: 'Liste des symptômes',
        link: '/menu/symptoms/symptomList',
      },
    ],
  },
  {
    title: 'Signes vitaux',
    icon: 'browser-outline',
    children: [
      {
        title: 'Ajouter un signe',
        link: '/menu/vitals/createVital',
      },
      {
        title: 'Liste des signes',
        link: '/menu/vitals/vitalList',
      },
    ],
  },
  {
    title: 'Utilisateurs',
    icon: 'people-outline',
    children: [
      {
        title: 'Ajouter un utilisateur',
        link: '/menu/users/createUser',
      },
      {
        title: 'Liste des utilisateurs',
        link: '/menu/users/userList',
      },
    ],
  }/*,
  {
    title: 'Localisation des patients',
    icon: 'home-outline',
    link: '/menu/localisation',
  },*/
];
