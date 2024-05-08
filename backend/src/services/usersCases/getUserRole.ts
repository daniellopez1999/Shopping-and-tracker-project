import { UsersModule } from '../../infrastructure/users/type';
import { UserClass } from '../../infrastructure/users/userModule';

export class GetUserRole {
  private readonly usersDB: UsersModule.UsersRepository;

  constructor(usersDB: UsersModule.UsersRepository) {
    this.usersDB = usersDB;
  }

  public async exec(user_id: string) {
    const user = new UserClass(this.usersDB);
    user.id = user_id;

    const userFind = await user.findUserByID();

    const role = userFind.role!;

    return role;
  }
}
