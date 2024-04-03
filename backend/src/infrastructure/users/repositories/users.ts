import { UsersModule } from '../type';
import User from '../model/users.model';
import { authentication, random } from '../../../helpers/authHelper';

export class UsersMongoose implements UsersModule.UsersRepository {
  public async getUserByUsername(
    username: string
  ): Promise<UsersModule.UserFromMongoose | UsersModule.Error> {
    const user = await User.findOne({ username });

    if (!user)
      return { Error: 'User does not exist' } as unknown as UsersModule.Error;

    return user as unknown as UsersModule.UserFromMongoose;
  }
  public async getUserByUsernameLogin(
    username: string,
    password: string
  ): Promise<UsersModule.UserFromMongoose | UsersModule.Error> {
    const user = await User.findOne({ username }).select(
      '+authentication.salt +authentication.password'
    );

    if (!user)
      return { Error: 'User does not exist' } as unknown as UsersModule.Error;

    const expectedHash = authentication(user.authentication?.salt!, password);

    if (user.authentication?.password !== expectedHash)
      return { Error: 'Error...' } as unknown as UsersModule.Error;

    const salt = random();
    user.authentication!.sessionToken! = authentication(
      salt,
      user._id.toString()
    );

    await user.save();

    const userWithCookie = {
      authentication: {
        password: user.authentication?.password,
        salt: user.authentication?.salt,
        sessionToken: user.authentication?.sessionToken,
      },
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      __v: user.__v,
    };
    return userWithCookie as unknown as UsersModule.UserFromMongoose;
  }

  public async getUserBySessionToken(
    sessionToken: string
  ): Promise<UsersModule.User> {
    const user = await User.findOne({
      'authentication.sessionToken': sessionToken,
    });
    return user as unknown as UsersModule.User;
  }

  public async getUserByID(id: string): Promise<UsersModule.User> {
    const user = await User.findById(id);
    return user as unknown as UsersModule.User;
  }

  public async get(id: string): Promise<UsersModule.User> {
    const user = await User.findById(id);
    return user as unknown as UsersModule.User;
  }

  public async createUser(
    values: Record<string, any>
  ): Promise<UsersModule.User> {
    const user = await new User(values).save().then((user) => user.toObject());
    return user as unknown as UsersModule.User;
  }

  public async deleteUserById(id: string): Promise<UsersModule.User> {
    const user = await User.findOneAndDelete({ _id: id });
    return user as unknown as UsersModule.User;
  }

  public async updateUserById(
    id: string,
    values: Record<string, any>
  ): Promise<UsersModule.User> {
    const user = await User.findByIdAndUpdate(id, values);
    return user as unknown as UsersModule.User;
  }
}
