import { TestBed } from '@angular/core/testing';

import { NewAppointment } from '../../../core/models/appointment.model';
import { AppointmentForm } from './appointment-form';

function setValue(element: HTMLInputElement | HTMLSelectElement, value: string): void {
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('AppointmentForm', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [AppointmentForm] }).compileComponents();
  });

  it('emits a valid appointment', () => {
    const fixture = TestBed.createComponent(AppointmentForm);
    const created: NewAppointment[] = [];
    fixture.componentInstance.saved.subscribe((appointment) => created.push(appointment));
    fixture.detectChanges();

    setValue(fixture.nativeElement.querySelector('#appointment-client-name'), 'Ana Torres');
    setValue(fixture.nativeElement.querySelector('#appointment-phone'), '+34 600 123 456');
    setValue(fixture.nativeElement.querySelector('#appointment-service'), 'Corte y peinado');
    setValue(fixture.nativeElement.querySelector('#appointment-date'), '2026-08-04');
    setValue(fixture.nativeElement.querySelector('#appointment-time'), '11:30');
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(created).toHaveLength(1);
    expect(created[0]).toMatchObject({
      clientName: 'Ana Torres',
      clientPhone: '+34 600 123 456',
      serviceName: 'Corte y peinado',
      status: 'pending',
    });
  });

  it('rejects an invalid form', () => {
    const fixture = TestBed.createComponent(AppointmentForm);
    const created: NewAppointment[] = [];
    fixture.componentInstance.saved.subscribe((appointment) => created.push(appointment));
    fixture.detectChanges();

    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(created).toHaveLength(0);
  });
});
