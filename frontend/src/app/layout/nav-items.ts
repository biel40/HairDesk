import { IconName } from '../shared/ui/icon/icon';

export interface NavItem {
  readonly label: string;
  readonly path: string;
  readonly icon: IconName;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Resumen', path: '/dashboard', icon: 'dashboard' },
  { label: 'Agenda', path: '/agenda', icon: 'calendar' },
  { label: 'Clientes', path: '/clientes', icon: 'users' },
  { label: 'Servicios', path: '/servicios', icon: 'scissors' },
  { label: 'Configuración', path: '/configuracion', icon: 'settings' },
];
