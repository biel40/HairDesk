import { Component, inject, signal } from '@angular/core';
import { email, form, FormField, FormRoot, minLength, required } from '@angular/forms/signals';
import { Router } from '@angular/router';

import { Icon } from '../../../shared/ui/icon/icon';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Pantalla de acceso. Valida el formulario con Signal Forms y simula una
 * autenticación (aún no hay backend): solo la cuenta de demostración entra.
 */
@Component({
  selector: 'app-login',
  imports: [FormField, FormRoot, Icon],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private readonly router = inject(Router);

  protected readonly credentials = signal({ email: '', password: '' });
  protected readonly remember = signal(true);
  protected readonly showPassword = signal(false);
  protected readonly submitting = signal(false);
  protected readonly authError = signal<string | null>(null);
  protected readonly forgotNotice = signal<string | null>(null);

  protected readonly loginForm = form(
    this.credentials,
    (schemaPath) => {
      required(schemaPath.email, { message: 'Ingresa tu correo electrónico.' });
      email(schemaPath.email, { message: 'Escribe un correo válido.' });
      required(schemaPath.password, { message: 'Ingresa tu contraseña.' });
      minLength(schemaPath.password, 6, { message: 'Debe tener al menos 6 caracteres.' });
    },
    {
      submission: {
        action: () => this.authenticate(),
      },
    },
  );

  protected togglePasswordVisibility(): void {
    this.showPassword.update((visible) => !visible);
  }

  protected toggleRemember(checked: boolean): void {
    this.remember.set(checked);
  }

  protected requestPasswordReset(): void {
    this.forgotNotice.set('Escríbenos a soporte@hairdesk.com y te ayudamos a recuperar el acceso.');
  }

  private async authenticate(): Promise<void> {
    this.authError.set(null);
    this.submitting.set(true);

    try {
      await delay(250);
      await this.router.navigateByUrl('/dashboard');
    } finally {
      this.submitting.set(false);
    }
  }
}
