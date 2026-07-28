import { Service } from '@angular/core';
import { Observable, of } from 'rxjs';

import { DashboardStats } from '../models/dashboard-stats.model';

/**
 * Repositorio de métricas del resumen con datos simulados.
 * Sustituir `of(...)` por `HttpClient` cuando exista la API.
 */
@Service()
export class DashboardRepository {
  private readonly stats: DashboardStats = {
    todayAppointments: 8,
    weeklyClients: 31,
    estimatedRevenue: 640,
    nextAppointmentTime: '10:30',
  };

  findTodayStats(): Observable<DashboardStats> {
    return of(this.stats);
  }
}
