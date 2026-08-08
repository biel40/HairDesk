import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Client, ClientTag } from '../../core/models/client.model';
import { ClientRepository } from '../../core/services/client.repository';
import { EmptyState } from '../../shared/ui/empty-state/empty-state';
import { Icon } from '../../shared/ui/icon/icon';

interface ClientRow {
  readonly client: Client;
  readonly fullName: string;
  readonly lastVisitLabel: string;
  readonly nextAppointmentLabel: string;
  readonly totalSpentLabel: string;
  readonly tagLabel: string;
}

const DATE_FORMATTER = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const APPOINTMENT_FORMATTER = new Intl.DateTimeFormat('es-ES', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

const CURRENCY_FORMATTER = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

const TAG_LABELS: Record<ClientTag, string> = {
  vip: 'VIP',
  new: 'Nuevo',
  regular: 'Habitual',
};

function normalise(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

function formatDate(value: string | null, formatter: Intl.DateTimeFormat): string {
  return value === null ? 'Sin registro' : formatter.format(new Date(value));
}

@Component({
  selector: 'app-clients',
  imports: [EmptyState, Icon, NgOptimizedImage],
  templateUrl: './clients.html',
  styleUrl: './clients.scss',
})
export class Clients {
  private readonly clientRepository = inject(ClientRepository);

  private readonly clients = toSignal(this.clientRepository.findAll(), {
    initialValue: [] as readonly Client[],
  });

  protected readonly searchTerm = signal('');

  protected readonly rows = computed<readonly ClientRow[]>(() => {
    const query = normalise(this.searchTerm().trim());

    return this.clients()
      .filter((client) => {
        const searchable = normalise(
          `${client.firstName} ${client.lastName} ${client.phone} ${client.email}`,
        );
        return searchable.includes(query);
      })
      .map((client) => ({
        client,
        fullName: `${client.firstName} ${client.lastName}`,
        lastVisitLabel: formatDate(client.lastVisitAt, DATE_FORMATTER),
        nextAppointmentLabel:
          client.nextAppointmentAt === null
            ? 'Sin cita'
            : APPOINTMENT_FORMATTER.format(new Date(client.nextAppointmentAt)),
        totalSpentLabel: CURRENCY_FORMATTER.format(client.totalSpent),
        tagLabel: TAG_LABELS[client.tag],
      }));
  });

  protected readonly clientCountLabel = computed(() => {
    const count = this.clients().length;
    return count === 1 ? '1 cliente' : `${count} clientes`;
  });

  protected readonly upcomingCount = computed(
    () => this.clients().filter((client) => client.nextAppointmentAt !== null).length,
  );

  protected readonly vipCount = computed(
    () => this.clients().filter((client) => client.tag === 'vip').length,
  );

  protected updateSearch(event: Event): void {
    if (event.target instanceof HTMLInputElement) {
      this.searchTerm.set(event.target.value);
    }
  }

  protected clearSearch(): void {
    this.searchTerm.set('');
  }
}
