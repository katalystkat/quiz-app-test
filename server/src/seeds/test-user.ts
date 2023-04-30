import { getRepository } from 'typeorm';
import { Participant } from '../entities/participant.js';
import { AppDataSource } from '../data-source.js';

const participantRepository = AppDataSource.getRepository(Participant);
const participants: Partial<Participant>[] = [
  {
    username: 'testuser1',
    email: 'testuser1@example.com',
    hashPassword: 'testpassword1',
    salt: 'salt1',
  },
  {
    username: 'testuser2',
    email: 'testuser2@example.com',
    hashPassword: 'testpassword2',
    salt: 'salt2',
  },
  {
    username: 'testuser3',
    email: 'testuser3@example.com',
    hashPassword: 'testpassword3',
    salt: 'salt3',
  },
];

export const seedUserData = async () => {
  for (const participant of participants) {
    const newParticipant = participantRepository.create(participant);
    await participantRepository.save(newParticipant);
  }
}
