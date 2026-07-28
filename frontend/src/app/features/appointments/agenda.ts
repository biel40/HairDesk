import { Component } from '@angular/core';

import { PagePlaceholder } from '../../shared/ui/page-placeholder/page-placeholder';

@Component({
  selector: 'app-agenda',
  imports: [PagePlaceholder],
  template: `
    <app-page-placeholder
      heading="Agenda"
      description="Consulta y organiza las citas del salón por día y por profesional."
      icon="calendar"
    />
  `,
})
export class Agenda {}
