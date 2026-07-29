import { Component, ElementRef, afterRenderEffect, inject, signal, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Auth } from '../../core/services/auth';
import { SalonContext } from '../../core/services/salon-context';
import { Icon } from '../../shared/ui/icon/icon';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Icon, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class MainLayout {
  private readonly salonContext = inject(SalonContext);
  private readonly auth = inject(Auth);

  protected readonly salon = this.salonContext.salon;
  protected readonly user = this.salonContext.currentUser;

  protected readonly menuOpen = signal(false);

  private readonly toggleButton = viewChild<ElementRef<HTMLButtonElement>>('toggleButton');
  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');
  private focusHandled = false;

  constructor() {
    // Mueve el foco al abrir/cerrar el menú móvil, una vez actualizado el DOM.
    afterRenderEffect(() => {
      const open = this.menuOpen();

      if (!this.focusHandled) {
        this.focusHandled = true;
        return;
      }

      const target = open ? this.closeButton() : this.toggleButton();
      target?.nativeElement.focus();
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected async logout(): Promise<void> {
    this.closeMenu();
    await this.auth.logout();
  }
}
