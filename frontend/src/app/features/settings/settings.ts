import { Component } from '@angular/core';

import { PagePlaceholder } from '../../shared/ui/page-placeholder/page-placeholder';

@Component({
  selector: 'app-settings',
  imports: [PagePlaceholder],
  template: `
    <app-page-placeholder
      heading="Configuración"
      description="Datos del salón, horarios de apertura y equipo de trabajo."
      icon="settings"
    />
  `,
})
export class Settings {}
