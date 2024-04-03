import { UsersModule } from '../../infrastructure/users/type';
import { UserClass } from '../../infrastructure/users/userModule';

export class UserLogin {
  private readonly usersDB: UsersModule.UsersRepository;

  constructor(usersDB: UsersModule.UsersRepository) {
    this.usersDB = usersDB;
  }

  public async exec(username: string, password: string) {
    const user = new UserClass(this.usersDB);
    user.username = username;
    user.password = password;

    if (!user.username || !user.password)
      return { Error: 'One of the parameters for register is missing' };

    const userFind = await user.findUserByUsernameLogin();

    return userFind;
  }
}
