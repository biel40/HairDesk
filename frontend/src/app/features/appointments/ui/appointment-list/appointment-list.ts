import { Component, computed, input, output } from '@angular/core';

import { Appointment } from '../../../../core/models/appointment.model';
import { EmptyState } from '../../../../shared/ui/empty-state/empty-state';
import { Icon } from '../../../../shared/ui/icon/icon';
import { StatusBadge } from '../../../../shared/ui/status-badge/status-badge';

interface AppointmentRow {
  readonly appointment: Appointment;
  readonly durationLabel: string;
}

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;

  if (hours === 0) {
    return `${rest} min`;
  }

  return rest === 0 ? `${hours} h` : `${hours} h ${rest} min`;
}

@Component({
  selector: 'app-appointment-list',
  imports: [EmptyState, Icon, StatusBadge],
  templateUrl: './appointment-list.html',
  styleUrl: './appointment-list.scss',
})
export class AppointmentList {
  readonly appointments = input.required<readonly Appointment[]>();

  readonly createRequested = output<void>();
  readonly appointmentSelected = output<Appointment>();

  protected readonly rows = computed<readonly AppointmentRow[]>(() =>
    this.appointments().map((appointment) => ({
      appointment,
      durationLabel: formatDuration(appointment.durationMinutes),
    })),
  );

  protected selectAppointment(row: AppointmentRow, event?: Event): void {
    if (event instanceof KeyboardEvent && event.key !== 'Enter' && event.key !== ' ') {
      return;
    }

    event?.preventDefault();
    if (event?.currentTarget instanceof HTMLElement) {
      event.currentTarget.focus();
    }
    this.appointmentSelected.emit(row.appointment);
  }
}
