import { authentication, random } from '../../helpers/authHelper';
import { UsersModule } from '../../infrastructure/users/type';
import { UserClass } from '../../infrastructure/users/userModule';

export class UserRegister {
  private readonly usersDB: UsersModule.UsersRepository;

  constructor(usersDB: UsersModule.UsersRepository) {
    this.usersDB = usersDB;
  }

  public async exec(
    username: string,
    password: string,
    email: string,
    phone_number: number,
    role: string
  ) {
    const salt = random();
    const user = new UserClass(this.usersDB);

    if (role) user.role = role;
    else user.role = 'Client';

    user.email = email;
    user.username = username;
    user.password = authentication(salt, password);
    user.salt = salt;
    user.phone_number = phone_number;
    user.authentication = {
      salt,
      password: user.password,
    };

    if (!user.email || !user.password || !user.username)
      return { Error: 'One of the parameters for register is missing' };

    const existingUser = await user.findUserByUsername();
    if ('Error' in existingUser) {
      if (existingUser.Error == 'User does not exist') {
        const createUser = await user.createUser();
        return createUser;
      }
    } else {
      return { Error: 'User already exists' };
    }
  }
}
