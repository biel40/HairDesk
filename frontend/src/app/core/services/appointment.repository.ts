import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Appointment } from '../models/appointment.model';

/**
 * Repositorio de citas con datos simulados.
 * Devuelve observables para poder sustituir `of(...)` por llamadas de `HttpClient`
 * sin cambiar la interfaz pública ni los componentes que la consumen.
 */
@Service()
export class AppointmentRepository {
  private readonly todayAppointments: readonly Appointment[] = [
    {
      id: 'apt-01',
      startTime: '09:00',
      clientName: 'Marta Ruiz',
      serviceName: 'Corte y peinado',
      durationMinutes: 45,
      status: 'completada',
    },
    {
      id: 'apt-02',
      startTime: '09:45',
      clientName: 'Elena Navarro',
      serviceName: 'Tinte raíz',
      durationMinutes: 45,
      status: 'completada',
    },
    {
      id: 'apt-03',
      startTime: '10:30',
      clientName: 'Carmen Aguilar',
      serviceName: 'Mechas balayage',
      durationMinutes: 120,
      status: 'confirmada',
    },
    {
      id: 'apt-04',
      startTime: '12:30',
      clientName: 'Javier Molina',
      serviceName: 'Corte caballero',
      durationMinutes: 30,
      status: 'confirmada',
    },
    {
      id: 'apt-05',
      startTime: '13:00',
      clientName: 'Lucía Pardo',
      serviceName: 'Recogido de novia',
      durationMinutes: 90,
      status: 'pendiente',
    },
    {
      id: 'apt-06',
      startTime: '16:00',
      clientName: 'Rosa Giménez',
      serviceName: 'Lavado y secado',
      durationMinutes: 30,
      status: 'confirmada',
    },
    {
      id: 'apt-07',
      startTime: '17:00',
      clientName: 'Nuria Cabrera',
      serviceName: 'Tratamiento de keratina',
      durationMinutes: 75,
      status: 'pendiente',
    },
    {
      id: 'apt-08',
      startTime: '18:30',
      clientName: 'Sofía Beltrán',
      serviceName: 'Corte infantil',
      durationMinutes: 30,
      status: 'confirmada',
    },
  ];

  findToday(): Observable<readonly Appointment[]> {
    return of(this.todayAppointments);
  }
}
