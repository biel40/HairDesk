import { Component, computed, DOCUMENT, inject, OnDestroy, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Appointment, NewAppointment } from '../../core/models/appointment.model';
import { AppointmentRepository } from '../../core/services/appointment.repository';
import { DashboardRepository } from '../../core/services/dashboard.repository';
import { SalonContext } from '../../core/services/salon-context';
import { Icon, IconName } from '../../shared/ui/icon/icon';
import { StatCard } from '../../shared/ui/stat-card/stat-card';
import { AppointmentDetail } from '../appointments/appointment-detail/appointment-detail';
import { AppointmentForm } from '../appointments/appointment-form/appointment-form';
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
  imports: [AppointmentDetail, AppointmentForm, AppointmentList, Icon, StatCard],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly appointmentRepository = inject(AppointmentRepository);
  private readonly dashboardRepository = inject(DashboardRepository);
  private readonly salonContext = inject(SalonContext);

  protected readonly appointments = this.appointmentRepository.todayAppointments;

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
        value: String(this.appointments().length),
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
        value: this.nextAppointment()?.startTime ?? 'Sin citas',
        icon: 'clock',
      },
    ];
  });

  protected readonly appointmentsCountLabel = computed(() => {
    const total = this.appointments().length;
    return total === 1 ? '1 cita programada' : `${total} citas programadas`;
  });

  private readonly nextAppointment = computed(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    return this.appointments().find(
      (appointment) =>
        appointment.status !== 'completed' &&
        appointment.status !== 'cancelled' &&
        appointment.startTime >= currentTime,
    );
  });

  protected readonly creatingAppointment = signal(false);
  protected readonly selectedAppointment = signal<Appointment | null>(null);
  protected readonly notice = signal('');
  private triggerElement: HTMLElement | null = null;
  private noticeTimer: ReturnType<typeof setTimeout> | null = null;

  protected createAppointment(event?: Event): void {
    this.triggerElement = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    this.creatingAppointment.set(true);
  }

  protected openAppointmentDetail(appointment: Appointment, event?: Event): void {
    this.triggerElement =
      event?.currentTarget instanceof HTMLElement
        ? event.currentTarget
        : this.document.activeElement instanceof HTMLElement
          ? this.document.activeElement
          : null;
    this.selectedAppointment.set(appointment);
  }

  ngOnDestroy(): void {
    if (this.noticeTimer !== null) {
      clearTimeout(this.noticeTimer);
    }
  }

  protected saveAppointment(appointment: NewAppointment): void {
    this.appointmentRepository.create(appointment);
    this.closeCreatePanel();
    this.showNotice('Cita creada correctamente.');
  }

  protected closeCreatePanel(): void {
    this.creatingAppointment.set(false);
    this.restoreFocus();
  }

  protected closeDetailPanel(): void {
    this.selectedAppointment.set(null);
    this.restoreFocus();
  }

  private restoreFocus(): void {
    const trigger = this.triggerElement;
    this.triggerElement = null;
    queueMicrotask(() => trigger?.focus());
  }

  private showNotice(message: string): void {
    if (this.noticeTimer !== null) {
      clearTimeout(this.noticeTimer);
    }
    this.notice.set(message);
    this.noticeTimer = setTimeout(() => this.notice.set(''), 4000);
  }
}
