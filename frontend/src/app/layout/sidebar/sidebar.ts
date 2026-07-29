import { Component, computed, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Salon, SalonUser } from '../../core/models/salon.model';
import { Icon } from '../../shared/ui/icon/icon';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, Icon],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  readonly salon = input.required<Salon>();
  readonly user = input.required<SalonUser>();

  /** Se emite al elegir una sección, para poder cerrar el menú móvil. */
  readonly navigated = output<void>();

  /** Se emite al pulsar "Cerrar sesión"; el contenedor decide cómo salir. */
  readonly loggedOut = output<void>();

  protected readonly navItems = NAV_ITEMS;

  protected readonly userInitials = computed(() => {
    const { firstName, lastName } = this.user();
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  });

  protected readonly userFullName = computed(() => {
    const { firstName, lastName } = this.user();
    return `${firstName} ${lastName}`;
  });

  protected logout(): void {
    // Cierra primero el drawer móvil para que la navegación no se vea
    // "detrás" del menú abierto, y luego delega el cierre de sesión real.
    this.navigated.emit();
    this.loggedOut.emit();
  }
}
