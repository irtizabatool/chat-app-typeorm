import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../chat/user.entity';

define(User, (faker: typeof Faker) => {
  const name = faker.name.findName();

  const user = new User();
  user.name = name;
  return user;
});
