import { MigrationInterface, QueryRunner } from 'typeorm';
import { Participant } from '../entities/participant.js';

export class AddTestParticipants1630455400271 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const participants: Partial<Participant>[] = [
      {
        username: 'alice',
        email: 'alice@example.com',
        hashPassword: 'password',
        salt: 'salt',
      },
      {
        username: 'bob',
        email: 'bob@example.com',
        hashPassword: 'password',
        salt: 'salt',
      },
      {
        username: 'charlie',
        email: 'charlie@example.com',
        hashPassword: 'password',
        salt: 'salt',
      },
    ];
    
    await queryRunner.manager.getRepository(Participant).save(participants);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.getRepository(Participant).delete({
      username: 'alice',
    });
    await queryRunner.manager.getRepository(Participant).delete({
      username: 'bob',
    });
    await queryRunner.manager.getRepository(Participant).delete({
      username: 'charlie',
    });
  }
}
