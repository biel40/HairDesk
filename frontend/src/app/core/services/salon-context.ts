import { Service, signal } from '@angular/core';

import { Salon, SalonUser } from '../models/salon.model';

/**
 * Contexto del salón y del usuario conectado.
 * De momento son datos simulados; 
 * Más adelante se cargarán tras la autenticación.
 */
@Service()
export class SalonContext {
  readonly salon = signal<Salon>({
    id: 'salon-01',
    name: 'Peluquería Bella',
  }).asReadonly();

  readonly currentUser = signal<SalonUser>({
    id: 'user-01',
    firstName: 'Gabriel',
    lastName: 'Borrás',
    role: 'Propietario',
  }).asReadonly();
}
