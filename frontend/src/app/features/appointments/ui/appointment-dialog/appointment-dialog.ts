import {
  afterNextRender,
  Component,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';

import { Icon } from '../../../../shared/ui/icon/icon';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

@Component({
  selector: 'app-appointment-dialog',
  imports: [Icon],
  templateUrl: './appointment-dialog.html',
  styleUrl: './appointment-dialog.scss',
  host: {
    '(document:keydown)': 'handleKeydown($event)',
  },
})
export class AppointmentDialog implements OnDestroy {
  private readonly document = inject(DOCUMENT);
  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly previousOverflow = this.document.body.style.overflow;

  readonly title = input.required<string>();
  readonly description = input('');
  readonly closeRequested = output<void>();

  constructor() {
    this.document.body.style.overflow = 'hidden';
    afterNextRender(() => this.focusFirstControl());
  }

  ngOnDestroy(): void {
    this.document.body.style.overflow = this.previousOverflow;
  }

  protected requestBackdropClose(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeRequested.emit();
    }
  }

  protected handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeRequested.emit();
      return;
    }

    if (event.key === 'Tab') {
      this.keepFocusInside(event);
    }
  }

  private focusFirstControl(): void {
    const preferred = this.elementRef.nativeElement.querySelector<HTMLElement>('[autofocus]');
    const fallback = this.elementRef.nativeElement.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (preferred ?? fallback)?.focus();
  }

  private keepFocusInside(event: KeyboardEvent): void {
    const controls = Array.from(
      this.elementRef.nativeElement.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
    );
    const first = controls.at(0);
    const last = controls.at(-1);

    if (!first || !last) {
      return;
    }

    if (event.shiftKey && this.document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && this.document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
}
