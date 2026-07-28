export interface Salon {
  readonly id: string;
  readonly name: string;
}

export interface SalonUser {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
}
