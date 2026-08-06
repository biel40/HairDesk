import { Component, computed, input } from '@angular/core';

import { AppointmentStatus } from '../../../core/models/appointment.model';

const STATUS_LABELS: Readonly<Record<AppointmentStatus, string>> = {
  confirmed: 'Confirmada',
  pending: 'Pendiente',
  completed: 'Completada',
  cancelled: 'Cancelada',
};

@Component({
  selector: 'app-status-badge',
  template: `<span class="badge" [class]="'badge--' + status()">{{ label() }}</span>`,
  styles: `
    :host {
      display: inline-flex;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      padding: 0.2rem 0.6rem;
      border-radius: 999px;
      font-size: 0.8125rem;
      font-weight: 600;
      white-space: nowrap;
    }

    .badge--confirmed {
      background-color: var(--hd-success-bg);
      color: var(--hd-success-text);
    }

    .badge--pending {
      background-color: var(--hd-warning-bg);
      color: var(--hd-warning-text);
    }

    .badge--completed,
    .badge--cancelled {
      background-color: var(--hd-neutral-bg);
      color: var(--hd-neutral-text);
    }
  `,
})
export class StatusBadge {
  readonly status = input.required<AppointmentStatus>();

  protected readonly label = computed(() => STATUS_LABELS[this.status()]);
}
