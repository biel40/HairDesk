import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Appointment } from '../../core/models/appointment.model';
import { AppointmentRepository } from '../../core/services/appointment.repository';
import { DashboardRepository } from '../../core/services/dashboard.repository';
import { SalonContext } from '../../core/services/salon-context';
import { Icon, IconName } from '../../shared/ui/icon/icon';
import { StatCard } from '../../shared/ui/stat-card/stat-card';
import { AppointmentList } from '../appointments/ui/appointment-list/appointment-list';

interface SummaryCard {
  readonly label: string;
  readonly value: string;
  readonly icon: IconName;
  readonly hint?: string;
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const DATE_FORMATTER = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

function buildGreeting(hour: number): string {
  if (hour < 13) {
    return 'Buenos días';
  }

  return hour < 21 ? 'Buenas tardes' : 'Buenas noches';
}

function capitalise(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

@Component({
  selector: 'app-dashboard',
  imports: [AppointmentList, Icon, StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  private readonly appointmentRepository = inject(AppointmentRepository);
  private readonly dashboardRepository = inject(DashboardRepository);
  private readonly salonContext = inject(SalonContext);

  protected readonly appointments = toSignal(this.appointmentRepository.findToday(), {
    initialValue: [] as readonly Appointment[],
  });

  private readonly stats = toSignal(this.dashboardRepository.findTodayStats(), {
    initialValue: null,
  });

  protected readonly greeting = computed(
    () => `${buildGreeting(new Date().getHours())}, ${this.salonContext.currentUser().firstName}`,
  );

  protected readonly todayLabel = capitalise(DATE_FORMATTER.format(new Date()));

  protected readonly summaryCards = computed<readonly SummaryCard[]>(() => {
    const stats = this.stats();

    if (stats === null) {
      return [];
    }

    return [
      {
        label: 'Citas de hoy',
        value: String(stats.todayAppointments),
        icon: 'calendar',
      },
      {
        label: 'Clientes esta semana',
        value: String(stats.weeklyClients),
        icon: 'users',
      },
      {
        label: 'Ingresos estimados',
        value: CURRENCY_FORMATTER.format(stats.estimatedRevenue),
        icon: 'scissors',
        hint: 'Estimación del día',
      },
      {
        label: 'Próxima cita',
        value: stats.nextAppointmentTime ?? 'Sin citas',
        icon: 'clock',
      },
    ];
  });

  protected readonly appointmentsCountLabel = computed(() => {
    const total = this.appointments().length;
    return total === 1 ? '1 cita programada' : `${total} citas programadas`;
  });

  protected readonly notice = signal('');

  protected createAppointment(): void {
    this.notice.set('La creación de citas estará disponible muy pronto.');
  }
}
