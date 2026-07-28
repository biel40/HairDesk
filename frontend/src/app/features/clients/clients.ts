import { Component } from '@angular/core';

import { PagePlaceholder } from '../../shared/ui/page-placeholder/page-placeholder';

@Component({
  selector: 'app-clients',
  imports: [PagePlaceholder],
  template: `
    <app-page-placeholder
      heading="Clientes"
      description="Ficha de cada cliente, historial de servicios y preferencias."
      icon="users"
    />
  `,
})
export class Clients {}
