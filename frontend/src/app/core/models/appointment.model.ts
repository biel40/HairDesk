export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  readonly id: string;
  readonly clientName: string;
  readonly clientPhone: string;
  readonly serviceName: string;
  /** Fecha local en formato YYYY-MM-DD. */
  readonly date: string;
  /** Hora de inicio en formato HH:mm (24 h). */
  readonly startTime: string;
  readonly durationMinutes: number;
  readonly status: AppointmentStatus;
  readonly notes: string;
}

export type NewAppointment = Omit<Appointment, 'id'>;
