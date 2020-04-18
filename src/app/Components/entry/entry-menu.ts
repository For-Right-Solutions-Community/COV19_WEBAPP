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
        title: 'Patients en attente',
        link: '/menu/patients/enattentePatient',
      },
      {
        title: 'Patients critiques',
        link: '/menu/patients/criticalPatient',
      },
      {
        title: 'Patients suivis',
        link: '/menu/patients/treatedPatient',
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
        title: 'Patients en attente',
        link: '/menu/patients/enattentePatient',
      },
      {
        title: 'Patients critiques',
        link: '/menu/patients/criticalPatient',
      },
      {
        title: 'Patients suivis',
        link: '/menu/patients/treatedPatient',
      },
    ],
  },
];
