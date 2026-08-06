import { computed, Service, signal } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Appointment, AppointmentStatus, NewAppointment } from '../models/appointment.model';

const STORAGE_KEY = 'hairdesk.appointments';
const APPOINTMENT_STATUSES: readonly AppointmentStatus[] = [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
];

function localDate(date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function isAppointment(value: unknown): value is Appointment {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const appointment = value as Partial<Appointment>;
  return (
    typeof appointment.id === 'string' &&
    typeof appointment.clientName === 'string' &&
    typeof appointment.clientPhone === 'string' &&
    typeof appointment.serviceName === 'string' &&
    typeof appointment.date === 'string' &&
    typeof appointment.startTime === 'string' &&
    typeof appointment.durationMinutes === 'number' &&
    typeof appointment.status === 'string' &&
    APPOINTMENT_STATUSES.includes(appointment.status as AppointmentStatus) &&
    typeof appointment.notes === 'string'
  );
}

function readPersistedAppointments(): readonly Appointment[] | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.every(isAppointment) ? parsed : null;
  } catch {
    return null;
  }
}

function createSeedAppointments(date: string): readonly Appointment[] {
  return [
    ['apt-01', '09:00', 'Marta Ruiz', 'Corte y peinado', 45, 'completed'],
    ['apt-02', '09:45', 'Elena Navarro', 'Tinte raíz', 45, 'completed'],
    ['apt-03', '10:30', 'Carmen Aguilar', 'Mechas balayage', 120, 'confirmed'],
    ['apt-04', '12:30', 'Javier Molina', 'Corte caballero', 30, 'confirmed'],
    ['apt-05', '13:00', 'Lucía Pardo', 'Recogido de novia', 90, 'pending'],
    ['apt-06', '16:00', 'Rosa Giménez', 'Lavado y secado', 30, 'confirmed'],
    ['apt-07', '17:00', 'Nuria Cabrera', 'Tratamiento de keratina', 75, 'pending'],
    ['apt-08', '18:30', 'Sofía Beltrán', 'Corte infantil', 30, 'confirmed'],
  ].map(([id, startTime, clientName, serviceName, durationMinutes, status]) => ({
    id: String(id),
    clientName: String(clientName),
    clientPhone: '+34 600 000 000',
    serviceName: String(serviceName),
    date,
    startTime: String(startTime),
    durationMinutes: Number(durationMinutes),
    status: status as AppointmentStatus,
    notes: '',
  }));
}

/**
 * Fuente de datos simulada y aislada de la UI. Su API puede conservarse al
 * sustituir la persistencia local por una implementación HTTP.
 */
@Service()
export class AppointmentRepository {
  private readonly appointmentState = signal<readonly Appointment[]>(
    readPersistedAppointments() ?? createSeedAppointments(localDate()),
  );

  readonly appointments = this.appointmentState.asReadonly();
  readonly todayAppointments = computed(() => {
    const today = localDate();
    return this.appointments()
      .filter((appointment) => appointment.date === today)
      .sort((left, right) => left.startTime.localeCompare(right.startTime));
  });

  findToday(): Observable<readonly Appointment[]> {
    return of(this.todayAppointments());
  }

  create(appointment: NewAppointment): Appointment {
    const created: Appointment = {
      ...appointment,
      id: `apt-${crypto.randomUUID()}`,
    };

    this.appointmentState.update((appointments) => [...appointments, created]);
    this.persist();
    return created;
  }

  findById(id: string): Appointment | undefined {
    return this.appointments().find((appointment) => appointment.id === id);
  }

  private persist(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.appointments()));
    } catch {
      // El estado en memoria sigue operativo si el navegador bloquea el almacenamiento.
    }
  }
}
