import { Component, input } from '@angular/core';

import { Icon, IconName } from '../icon/icon';

@Component({
  selector: 'app-stat-card',
  imports: [Icon],
  template: `
    <article class="hd-card stat">
      <span class="stat__icon"><app-icon [name]="icon()" /></span>
      <h3 class="stat__label">{{ label() }}</h3>
      <p class="stat__value">{{ value() }}</p>
      @if (hint(); as hintText) {
        <p class="stat__hint">{{ hintText }}</p>
      }
    </article>
  `,
  styles: `
    :host {
      display: block;
      height: 100%;
    }

    .stat {
      display: grid;
      gap: 0.25rem;
      height: 100%;
      padding: 1.15rem;
    }

    .stat__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 2.25rem;
      height: 2.25rem;
      margin-bottom: 0.35rem;
      border-radius: 50%;
      background-color: var(--hd-accent-soft);
      color: var(--hd-accent);
    }

    .stat__label {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--hd-text-muted);
    }

    .stat__value {
      font-size: 1.75rem;
      font-weight: 700;
      line-height: 1.2;
      letter-spacing: -0.01em;
    }

    .stat__hint {
      font-size: 0.8125rem;
      color: var(--hd-text-muted);
    }
  `,
})
export class StatCard {
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly icon = input.required<IconName>();
  readonly hint = input<string>();
}
