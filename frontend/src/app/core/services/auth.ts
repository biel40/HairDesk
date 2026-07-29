import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Gestiona el cierre de sesión. Todavía no hay backend real: de momento
 * solo redirige a /login, pero centraliza el flujo para cuando exista
 * autenticación real (limpiar tokens, notificar al backend, etc.).
 */
@Service()
export class Auth {
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    await this.router.navigateByUrl('/login');
  }
}
