export type AppointmentStatus = 'confirmada' | 'pendiente' | 'completada';

export interface Appointment {
  readonly id: string;
  /** Hora de inicio en formato HH:mm (24 h). */
  readonly startTime: string;
  readonly clientName: string;
  readonly serviceName: string;
  readonly durationMinutes: number;
  readonly status: AppointmentStatus;
}
