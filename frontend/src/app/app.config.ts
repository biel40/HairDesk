import {
  ApplicationConfig,
  DOCUMENT,
  inject,
  provideBrowserGlobalErrorListeners,
} from '@angular/core';
import { ActivatedRouteSnapshot, provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';

/** Marca aplicada a `<html>` mientras dura la transición de acceso. */
const AUTH_TRANSITION_CLASS = 'hd-vt-auth';

/**
 * `onViewTransitionCreated` recibe los snapshots RAÍZ, no la ruta activada
 * final, así que hay que descender hasta la hoja para conocer la pantalla real.
 */
function leafPath(snapshot: ActivatedRouteSnapshot): string {
  let node = snapshot;

  while (node.firstChild) {
    node = node.firstChild;
  }

  return node.routeConfig?.path ?? '';
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: ({ transition, from, to }) => {
          const root = inject(DOCUMENT).documentElement;

          if (leafPath(from) !== 'login' || leafPath(to) === 'login') {
            return;
          }

          root.classList.add(AUTH_TRANSITION_CLASS);

          const cleanUp = () => root.classList.remove(AUTH_TRANSITION_CLASS);

          transition.finished.then(cleanUp, cleanUp);
        },
      }),
    ),
  ],
};
