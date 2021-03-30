import { User } from 'src/chat/user.entity';
import { UserSeed } from 'src/seeds/user.seed';
import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';

export class UserSeeds1617131059954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const userRepository = await getRepository(User);
    for (const [key, value] of Object.entries(UserSeed)) {
      const user = userRepository.create();
      const source = { id: key, name: value };
      Object.assign(user, source);
      console.log(user);
      await userRepository.save(user);
    }
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
