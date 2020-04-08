import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEM_ADMIN: NbMenuItem[] = [ 
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
      {
        title: 'Cas traités',
        link: '/menu/patients/treatedPatient',
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
  }
];

export const MENU_ITEM_BENEVOLENT: NbMenuItem[] = [ 
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
      {
        title: 'Cas traités',
        link: '/menu/patients/treatedPatient',
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
];
