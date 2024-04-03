import { UsersModule } from '../../infrastructure/users/type';
import { UserClass } from '../../infrastructure/users/userModule';

export class DeleteUserByID {
  private readonly usersDB: UsersModule.UsersRepository;

  constructor(usersDB: UsersModule.UsersRepository) {
    this.usersDB = usersDB;
  }

  public async exec(id: string) {
    const user = new UserClass(this.usersDB);
    user.id = id;

    if (!user.id) return { Error: 'ID parameter is missing' };

    const userFind = await user.deleteUser();

    return userFind;
  }
}
