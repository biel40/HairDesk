import { Component, input } from '@angular/core';

export type IconName =
  | 'dashboard'
  | 'calendar'
  | 'users'
  | 'scissors'
  | 'settings'
  | 'menu'
  | 'close'
  | 'plus'
  | 'clock'
  | 'calendar-off'
  | 'search'
  | 'mail'
  | 'lock'
  | 'eye'
  | 'eye-off'
  | 'logout';

/**
 * Iconografía decorativa en SVG inline. Siempre `aria-hidden`:
 * el significado lo aporta el texto que acompaña al icono.
 */
@Component({
  selector: 'app-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.75"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      @switch (name()) {
        @case ('dashboard') {
          <rect x="3" y="3" width="7" height="9" rx="1.5" />
          <rect x="14" y="3" width="7" height="5" rx="1.5" />
          <rect x="14" y="12" width="7" height="9" rx="1.5" />
          <rect x="3" y="16" width="7" height="5" rx="1.5" />
        }
        @case ('calendar') {
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        }
        @case ('users') {
          <path d="M16 20v-1.5a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4V20" />
          <circle cx="9" cy="7" r="3.25" />
          <path d="M17 4.5a3.25 3.25 0 0 1 0 6.3M22 20v-1.5a4 4 0 0 0-3-3.85" />
        }
        @case ('scissors') {
          <circle cx="6" cy="6" r="2.75" />
          <circle cx="6" cy="18" r="2.75" />
          <path d="M8.1 7.9 20 20M20 4 8.1 16.1" />
        }
        @case ('settings') {
          <circle cx="12" cy="12" r="3" />
          <path
            d="M19.4 15a1.6 1.6 0 0 0 .32 1.77l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.6 1.6 0 0 0-1.77-.32 1.6 1.6 0 0 0-1 1.47V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1.05-1.46 1.6 1.6 0 0 0-1.77.32l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.6 1.6 0 0 0 .32-1.77 1.6 1.6 0 0 0-1.47-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.46-1.05 1.6 1.6 0 0 0-.32-1.77l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.6 1.6 0 0 0 1.77.32H9a1.6 1.6 0 0 0 1-1.47V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.47 1.6 1.6 0 0 0 1.77-.32l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.6 1.6 0 0 0-.32 1.77V9a1.6 1.6 0 0 0 1.47 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1Z"
          />
        }
        @case ('menu') {
          <path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('close') {
          <path d="M6 6l12 12M18 6 6 18" />
        }
        @case ('plus') {
          <path d="M12 5v14M5 12h14" />
        }
        @case ('clock') {
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        }
        @case ('calendar-off') {
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4M9.5 15.5h5" />
        }
        @case ('search') {
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        }
        @case ('lock') {
          <rect x="4" y="11" width="16" height="10" rx="2" />
          <path d="M7.5 11V7.5a4.5 4.5 0 0 1 9 0V11" />
        }
        @case ('eye') {
          <path d="M2 12s3.75-7 10-7 10 7 10 7-3.75 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="2.75" />
        }
        @case ('eye-off') {
          <path
            d="M16.6 16.6A9.9 9.9 0 0 1 12 18c-6.25 0-10-6-10-6a17.9 17.9 0 0 1 4.6-5.2M9.15 4.6A9.1 9.1 0 0 1 12 4c6.25 0 10 6 10 6a17.6 17.6 0 0 1-2 2.9M14.1 14.1a2.75 2.75 0 0 1-3.9-3.9"
          />
          <path d="M2 2l18 18" />
        }
        @case ('logout') {
          <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
          <path d="M16 16l4-4-4-4" />
          <path d="M20 12H9" />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-flex;
      flex: none;
      width: 1.25rem;
      height: 1.25rem;
    }

    svg {
      width: 100%;
      height: 100%;
    }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
