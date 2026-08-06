import { TestBed } from '@angular/core/testing';

import { AppointmentRepository } from '../../core/services/appointment.repository';
import { DashboardRepository } from '../../core/services/dashboard.repository';
import { SalonContext } from '../../core/services/salon-context';
import { Dashboard } from './dashboard';

function setValue(element: HTMLInputElement | HTMLSelectElement, value: string): void {
  element.value = value;
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.dispatchEvent(new Event('change', { bubbles: true }));
}

describe('Dashboard appointments', () => {
  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [AppointmentRepository, DashboardRepository, SalonContext],
    }).compileComponents();
  });

  it('opens appointment details from a row', () => {
    const fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();

    const row = fixture.nativeElement.querySelector('.appointment') as HTMLElement;
    row.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-appointment-detail')).toBeTruthy();
  });

  it('updates the dashboard count after creating an appointment for today', async () => {
    const fixture = TestBed.createComponent(Dashboard);
    fixture.detectChanges();

    (fixture.nativeElement.querySelector('.page-header .hd-button') as HTMLElement).click();
    fixture.detectChanges();
    setValue(fixture.nativeElement.querySelector('#appointment-client-name'), 'Ana Torres');
    setValue(fixture.nativeElement.querySelector('#appointment-phone'), '+34 600 123 456');
    setValue(fixture.nativeElement.querySelector('#appointment-service'), 'Corte y peinado');
    setValue(fixture.nativeElement.querySelector('#appointment-time'), '11:30');
    fixture.nativeElement
      .querySelector('form')
      .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.appointments__count').textContent).toContain(
      '9 citas programadas',
    );
    expect(fixture.nativeElement.querySelectorAll('.appointment')).toHaveLength(9);
    expect(fixture.nativeElement.querySelector('[role="status"]').textContent).toContain(
      'Cita creada',
    );
  });
});
