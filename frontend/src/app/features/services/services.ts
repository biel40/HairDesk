import { Component } from '@angular/core';

import { PagePlaceholder } from '../../shared/ui/page-placeholder/page-placeholder';

@Component({
  selector: 'app-services',
  imports: [PagePlaceholder],
  template: `
    <app-page-placeholder
      heading="Servicios"
      description="Catálogo de servicios del salón con duración y precio."
      icon="scissors"
    />
  `,
})
export class Services {}
