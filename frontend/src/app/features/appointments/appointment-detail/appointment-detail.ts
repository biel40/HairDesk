import { Component, computed, input, output } from '@angular/core';

import { Appointment } from '../../../core/models/appointment.model';
import { StatusBadge } from '../../../shared/ui/status-badge/status-badge';
import { AppointmentDialog } from '../ui/appointment-dialog/appointment-dialog';

const DATE_FORMATTER = new Intl.DateTimeFormat('es-ES', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours === 0) {
    return `${remainingMinutes} minutos`;
  }
  return remainingMinutes === 0
    ? `${hours} ${hours === 1 ? 'hora' : 'horas'}`
    : `${hours} h ${remainingMinutes} min`;
}

function calculateEndTime(startTime: string, durationMinutes: number): string {
  const [hours = 0, minutes = 0] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}

@Component({
  selector: 'app-appointment-detail',
  imports: [AppointmentDialog, StatusBadge],
  templateUrl: './appointment-detail.html',
  styleUrl: './appointment-detail.scss',
})
export class AppointmentDetail {
  readonly appointment = input.required<Appointment>();
  readonly closed = output<void>();

  protected readonly dateLabel = computed(() =>
    DATE_FORMATTER.format(new Date(`${this.appointment().date}T00:00:00`)),
  );
  protected readonly endTime = computed(() =>
    calculateEndTime(this.appointment().startTime, this.appointment().durationMinutes),
  );
  protected readonly durationLabel = computed(() =>
    formatDuration(this.appointment().durationMinutes),
  );
}
