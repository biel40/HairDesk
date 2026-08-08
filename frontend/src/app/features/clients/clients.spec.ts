import { TestBed } from '@angular/core/testing';

import { ClientRepository } from '../../core/services/client.repository';
import { Clients } from './clients';

describe('Clients', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Clients],
      providers: [ClientRepository],
    }).compileComponents();
  });

  it('shows the client summary and mock records', () => {
    const fixture = TestBed.createComponent(Clients);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[data-testid="client-count"]').textContent).toContain(
      '8 clientes',
    );
    expect(fixture.nativeElement.querySelectorAll('.client-row')).toHaveLength(8);
    expect(fixture.nativeElement.textContent).toContain('Carmen Aguilar');
  });

  it('shows a local portrait for every client', () => {
    const fixture = TestBed.createComponent(Clients);
    fixture.detectChanges();

    const portraits = Array.from(
      fixture.nativeElement.querySelectorAll('.client-identity__portrait'),
    ) as HTMLImageElement[];

    expect(portraits).toHaveLength(8);
    expect(portraits.every((portrait) => portrait.src.includes('/images/clients/'))).toBe(true);
    expect(portraits.every((portrait) => portrait.alt === '')).toBe(true);
  });

  it('filters clients by name, phone or email', () => {
    const fixture = TestBed.createComponent(Clients);
    fixture.detectChanges();

    const search = fixture.nativeElement.querySelector('#client-search') as HTMLInputElement;
    search.value = 'carmen@example.com';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.client-row')).toHaveLength(1);
    expect(fixture.nativeElement.textContent).toContain('Carmen Aguilar');
    expect(fixture.nativeElement.textContent).not.toContain('Javier Molina');
  });

  it('shows an empty result without losing the search control', () => {
    const fixture = TestBed.createComponent(Clients);
    fixture.detectChanges();

    const search = fixture.nativeElement.querySelector('#client-search') as HTMLInputElement;
    search.value = 'cliente inexistente';
    search.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('.client-row')).toHaveLength(0);
    expect(fixture.nativeElement.textContent).toContain('No hay clientes que coincidan');
    expect(fixture.nativeElement.querySelector('#client-search')).toBeTruthy();
  });
});