import { UsersModule } from '../../infrastructure/users/type';
import { UserClass } from '../../infrastructure/users/userModule';

export class FindUserByUsername {
  private readonly usersDB: UsersModule.UsersRepository;

  constructor(usersDB: UsersModule.UsersRepository) {
    this.usersDB = usersDB;
  }

  public async exec(username: string) {
    const user = new UserClass(this.usersDB);
    user.username = username;

    if (!user.username) return { Error: 'Username parameter is missing' };

    const userFind = await user.findUserByUsername();

    return userFind;
  }
}
