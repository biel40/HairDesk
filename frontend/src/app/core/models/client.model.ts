export type ClientTag = 'vip' | 'new' | 'regular';

export interface Client {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatarUrl: string;
  readonly phone: string;
  readonly email: string;
  readonly lastVisitAt: string | null;
  readonly nextAppointmentAt: string | null;
  readonly visitCount: number;
  readonly totalSpent: number;
  readonly tag: ClientTag;
  readonly notes: string;
}