import { Component, input } from '@angular/core';

import { Icon, IconName } from '../icon/icon';

/** Página en construcción: se usa en las secciones aún no implementadas. */
@Component({
  selector: 'app-page-placeholder',
  imports: [Icon],
  template: `
    <section class="placeholder">
      <header class="placeholder__header">
        <h1>{{ heading() }}</h1>
        <p>{{ description() }}</p>
      </header>

      <div class="hd-card placeholder__card">
        <span class="placeholder__icon"><app-icon [name]="icon()" /></span>
        <p class="placeholder__title">Sección en construcción</p>
        <p class="placeholder__text">
          Estamos preparando esta parte de HairDesk. Muy pronto podrás gestionarla desde aquí.
        </p>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
      max-width: 72rem;
      margin-inline: auto;
    }

    .placeholder__header {
      display: grid;
      gap: 0.25rem;
      margin-bottom: 1.5rem;
    }

    .placeholder__header h1 {
      font-size: 1.5rem;
      letter-spacing: -0.01em;
    }

    .placeholder__header p {
      color: var(--hd-text-muted);
    }

    .placeholder__card {
      display: grid;
      justify-items: center;
      gap: 0.5rem;
      padding: 3rem 1.5rem;
      text-align: center;
    }

    .placeholder__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--hd-accent-soft);
      color: var(--hd-accent);
    }

    .placeholder__title {
      font-weight: 600;
    }

    .placeholder__text {
      max-width: 42ch;
      color: var(--hd-text-muted);
    }
  `,
})
export class PagePlaceholder {
  readonly heading = input.required<string>();
  readonly description = input.required<string>();
  readonly icon = input.required<IconName>();
}
