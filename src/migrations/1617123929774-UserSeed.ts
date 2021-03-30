import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { User } from 'src/chat/user.entity';
import { UserSeed } from 'src/seeds/user.seed';

export class UserSeed1617123929774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    //const userRepository = await getRepository(User);
    for (const [key, value] of Object.entries(UserSeed)) {
      const id = parseInt(key);
      await queryRunner.query(
        `INSERT INTO "user"(id, name) VALUES (${id},'${value}')`,
      );
      //   const user = new User();
      //   user.name = value;
      //   console.log(user);
      //   const newUser = userRepository.create(user);
      //   console.log(newUser);
      //   //   console.log(key);
      //   //   console.log(value);
      //   //   const user = userRepository.create();
      //   //   const source = { id: key, name: value };
      //   //   Object.assign(user, source);
      //   //   console.log(user.id);
      //   await userRepository.save(newUser);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
