export interface DashboardStats {
  readonly todayAppointments: number;
  readonly weeklyClients: number;
  /** Ingresos estimados del día, en euros. */
  readonly estimatedRevenue: number;
  /** Hora de la próxima cita en formato HH:mm, o `null` si no hay ninguna. */
  readonly nextAppointmentTime: string | null;
}
