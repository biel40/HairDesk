import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Client } from '../models/client.model';

const CLIENTS: readonly Client[] = [
  {
    id: 'client-01',
    firstName: 'Carmen',
    lastName: 'Aguilar',
    avatarUrl: '/images/clients/carmen.jpg',
    phone: '+34 612 348 572',
    email: 'carmen@example.com',
    lastVisitAt: '2026-08-01T10:30:00',
    nextAppointmentAt: '2026-08-12T10:30:00',
    visitCount: 18,
    totalSpent: 1240,
    tag: 'vip',
    notes: 'Prefiere productos sin sulfatos.',
  },
  {
    id: 'client-02',
    firstName: 'Javier',
    lastName: 'Molina',
    avatarUrl: '/images/clients/javier.jpg',
    phone: '+34 644 821 190',
    email: 'javier.molina@example.com',
    lastVisitAt: '2026-07-29T12:30:00',
    nextAppointmentAt: '2026-08-08T12:30:00',
    visitCount: 9,
    totalSpent: 315,
    tag: 'regular',
    notes: '',
  },
  {
    id: 'client-03',
    firstName: 'Lucía',
    lastName: 'Pardo',
    avatarUrl: '/images/clients/lucia.jpg',
    phone: '+34 677 514 903',
    email: 'lucia.pardo@example.com',
    lastVisitAt: '2026-07-25T13:00:00',
    nextAppointmentAt: '2026-08-15T13:00:00',
    visitCount: 12,
    totalSpent: 890,
    tag: 'vip',
    notes: 'Preparación de recogido para boda.',
  },
  {
    id: 'client-04',
    firstName: 'Rosa',
    lastName: 'Giménez',
    avatarUrl: '/images/clients/rosa.jpg',
    phone: '+34 699 265 418',
    email: 'rosa.gimenez@example.com',
    lastVisitAt: '2026-08-03T16:00:00',
    nextAppointmentAt: null,
    visitCount: 7,
    totalSpent: 280,
    tag: 'regular',
    notes: '',
  },
  {
    id: 'client-05',
    firstName: 'Nuria',
    lastName: 'Cabrera',
    avatarUrl: '/images/clients/nuria.jpg',
    phone: '+34 623 907 116',
    email: 'nuria.cabrera@example.com',
    lastVisitAt: '2026-07-18T17:00:00',
    nextAppointmentAt: null,
    visitCount: 5,
    totalSpent: 410,
    tag: 'regular',
    notes: 'Cabello sensible al calor.',
  },
  {
    id: 'client-06',
    firstName: 'Sofía',
    lastName: 'Beltrán',
    avatarUrl: '/images/clients/sofia.jpg',
    phone: '+34 688 432 750',
    email: 'sofia.beltran@example.com',
    lastVisitAt: '2026-08-05T18:30:00',
    nextAppointmentAt: '2026-08-22T11:00:00',
    visitCount: 3,
    totalSpent: 145,
    tag: 'new',
    notes: '',
  },
  {
    id: 'client-07',
    firstName: 'Elena',
    lastName: 'Navarro',
    avatarUrl: '/images/clients/elena.jpg',
    phone: '+34 611 578 329',
    email: 'elena.navarro@example.com',
    lastVisitAt: '2026-07-30T09:45:00',
    nextAppointmentAt: null,
    visitCount: 14,
    totalSpent: 760,
    tag: 'regular',
    notes: 'Fórmula habitual de tinte: 6.1.',
  },
  {
    id: 'client-08',
    firstName: 'Marina',
    lastName: 'Santos',
    avatarUrl: '/images/clients/marina.jpg',
    phone: '+34 655 140 862',
    email: 'marina.santos@example.com',
    lastVisitAt: null,
    nextAppointmentAt: '2026-08-18T17:30:00',
    visitCount: 0,
    totalSpent: 0,
    tag: 'new',
    notes: 'Primera visita.',
  },
];

/**
 * Fuente de datos simulada. La UI solo depende de este contrato público, por lo
 * que la implementación puede migrarse a HttpClient sin cambiar la feature.
 */
@Service()
export class ClientRepository {
  findAll(): Observable<readonly Client[]> {
    return of(CLIENTS);
  }
}