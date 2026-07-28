import { Routes } from '@angular/router';

import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        title: 'Resumen · HairDesk',
        loadComponent: () => import('./features/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'agenda',
        title: 'Agenda · HairDesk',
        loadComponent: () => import('./features/appointments/agenda').then((m) => m.Agenda),
      },
      {
        path: 'clientes',
        title: 'Clientes · HairDesk',
        loadComponent: () => import('./features/clients/clients').then((m) => m.Clients),
      },
      {
        path: 'servicios',
        title: 'Servicios · HairDesk',
        loadComponent: () => import('./features/services/services').then((m) => m.Services),
      },
      {
        path: 'configuracion',
        title: 'Configuración · HairDesk',
        loadComponent: () => import('./features/settings/settings').then((m) => m.Settings),
      },
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];
