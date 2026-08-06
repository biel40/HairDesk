import { TestBed } from '@angular/core/testing';

import { Appointment } from '../../../../core/models/appointment.model';
import { AppointmentList } from './appointment-list';

const CONFIRMED_APPOINTMENT: Appointment = {
  id: 'apt-confirmed',
  clientName: 'Ana Torres',
  clientPhone: '+34 600 123 456',
  serviceName: 'Corte y peinado',
  date: '2026-08-04',
  startTime: '11:30',
  durationMinutes: 60,
  status: 'confirmed',
  notes: 'Prefiere capas largas.',
};

describe('AppointmentList', () => {
  it('applies the confirmed row class', async () => {
    await TestBed.configureTestingModule({ imports: [AppointmentList] }).compileComponents();
    const fixture = TestBed.createComponent(AppointmentList);
    fixture.componentRef.setInput('appointments', [CONFIRMED_APPOINTMENT]);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.appointment--confirmed')).toBeTruthy();
  });

  it('selects an appointment once by click or keyboard', async () => {
    await TestBed.configureTestingModule({ imports: [AppointmentList] }).compileComponents();
    const fixture = TestBed.createComponent(AppointmentList);
    fixture.componentRef.setInput('appointments', [CONFIRMED_APPOINTMENT]);
    const selected: Appointment[] = [];
    fixture.componentInstance.appointmentSelected.subscribe((appointment) =>
      selected.push(appointment),
    );
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.appointment') as HTMLElement;
    row.click();
    row.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    row.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));

    expect(selected).toEqual([CONFIRMED_APPOINTMENT, CONFIRMED_APPOINTMENT, CONFIRMED_APPOINTMENT]);
  });
});
