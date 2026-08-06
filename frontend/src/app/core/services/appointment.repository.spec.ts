import { AppointmentRepository } from './appointment.repository';

describe('AppointmentRepository', () => {
  beforeEach(() => localStorage.clear());

  it('creates a typed appointment and exposes it immediately', () => {
    const repository = new AppointmentRepository();

    const created = repository.create({
      clientName: 'Ana Torres',
      clientPhone: '+34 600 123 456',
      serviceName: 'Corte y peinado',
      date: '2026-08-04',
      startTime: '11:30',
      durationMinutes: 60,
      status: 'confirmed',
      notes: 'Prefiere capas largas.',
    });

    expect(created.id).toMatch(/^apt-/);
    expect(repository.appointments()).toContainEqual(created);
  });

  it('restores persisted appointments from localStorage', () => {
    const repository = new AppointmentRepository();
    const created = repository.create({
      clientName: 'Ana Torres',
      clientPhone: '+34 600 123 456',
      serviceName: 'Corte y peinado',
      date: '2026-08-04',
      startTime: '11:30',
      durationMinutes: 60,
      status: 'pending',
      notes: '',
    });

    const restoredRepository = new AppointmentRepository();

    expect(restoredRepository.appointments()).toContainEqual(created);
  });
});
