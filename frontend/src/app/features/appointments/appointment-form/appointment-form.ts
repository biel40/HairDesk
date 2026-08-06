import { Component, output, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

import { AppointmentStatus, NewAppointment } from '../../../core/models/appointment.model';
import { AppointmentDialog } from '../ui/appointment-dialog/appointment-dialog';

interface AppointmentFormModel {
  clientName: string;
  clientPhone: string;
  serviceName: string;
  date: string;
  startTime: string;
  durationMinutes: string;
  status: AppointmentStatus;
  notes: string;
}

function localDate(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function initialModel(): AppointmentFormModel {
  return {
    clientName: '',
    clientPhone: '',
    serviceName: '',
    date: localDate(),
    startTime: '',
    durationMinutes: '60',
    status: 'pending',
    notes: '',
  };
}

@Component({
  selector: 'app-appointment-form',
  imports: [AppointmentDialog, FormField, FormRoot],
  templateUrl: './appointment-form.html',
  styleUrl: './appointment-form.scss',
})
export class AppointmentForm {
  private readonly initialValue = initialModel();

  readonly saved = output<NewAppointment>();
  readonly closed = output<void>();

  protected readonly model = signal<AppointmentFormModel>({ ...this.initialValue });
  protected readonly appointmentForm = form(
    this.model,
    (path) => {
      required(path.clientName, { message: 'Ingresa el nombre del cliente.' });
      required(path.clientPhone, { message: 'Ingresa un teléfono de contacto.' });
      required(path.serviceName, { message: 'Selecciona un servicio.' });
      required(path.date, { message: 'Selecciona una fecha.' });
      required(path.startTime, { message: 'Selecciona una hora.' });
    },
    { submission: { action: () => this.save() } },
  );

  protected requestClose(): void {
    const hasChanges = JSON.stringify(this.model()) !== JSON.stringify(this.initialValue);
    if (hasChanges && !confirm('Hay cambios sin guardar. ¿Quieres cerrar de todos modos?')) {
      return;
    }

    this.closed.emit();
  }

  private async save(): Promise<void> {
    if (this.appointmentForm().invalid()) {
      return;
    }

    const { durationMinutes, ...appointment } = this.model();
    this.saved.emit({ ...appointment, durationMinutes: Number(durationMinutes) });
  }
}
