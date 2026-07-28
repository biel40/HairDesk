import { Component, input, output } from '@angular/core';

import { Icon, IconName } from '../icon/icon';

/** Estado vacío reutilizable para listados sin datos. */
@Component({
  selector: 'app-empty-state',
  imports: [Icon],
  template: `
    <div class="empty">
      <span class="empty__icon"><app-icon [name]="icon()" /></span>
      <p class="empty__title">{{ title() }}</p>
      @if (description(); as text) {
        <p class="empty__description">{{ text }}</p>
      }
      @if (actionLabel(); as label) {
        <button type="button" class="hd-button hd-button--ghost" (click)="action.emit()">
          {{ label }}
        </button>
      }
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .empty {
      display: grid;
      justify-items: center;
      gap: 0.5rem;
      padding: 2.5rem 1.25rem;
      text-align: center;
    }

    .empty__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: var(--hd-surface-muted);
      color: var(--hd-text-muted);
    }

    .empty__title {
      font-weight: 600;
    }

    .empty__description {
      max-width: 34ch;
      color: var(--hd-text-muted);
      font-size: 0.9375rem;
    }

    .empty button {
      margin-top: 0.5rem;
    }
  `,
})
export class EmptyState {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly actionLabel = input<string>();
  readonly icon = input<IconName>('calendar-off');

  readonly action = output<void>();
}
