import { UsersModule } from './type';

export class UserClass implements UsersModule.User {
  private readonly storage: UsersModule.UsersRepository;

  public _id: any;
  public id: string | undefined;
  public username: string | undefined;
  public email: string | undefined;
  public password: string | undefined;
  public authentication: UsersModule.Authentication | undefined;
  public sessionToken: string | undefined;
  public phone_number: number | undefined;
  public salt: string | undefined;

  constructor(storage: UsersModule.UsersRepository) {
    this.storage = storage;
  }

  public async createUser(): Promise<UsersModule.User> {
    const user = await this.storage.createUser({
      username: this.username,
      email: this.email,
      authentication: {
        password: this.password,
        salt: this.salt,
      },
      phone_number: this.phone_number,
    });
    return user as unknown as UsersModule.User;
  }

  public async findUserByUsernameLogin(): Promise<
    UsersModule.UserFromMongoose | UsersModule.Error
  > {
    const user = await this.storage.getUserByUsernameLogin(
      this.username!,
      this.password!
    );
    return user;
  }

  public async findUserByUsername(): Promise<
    UsersModule.UserFromMongoose | UsersModule.Error
  > {
    const user = await this.storage.getUserByUsername(this.username!);
    return user;
  }

  public async findUserBySessionToken(): Promise<UsersModule.User> {
    const user = await this.storage.getUserBySessionToken(this.sessionToken!);
    return user;
  }

  public async findUserByID(): Promise<UsersModule.User> {
    const user = await this.storage.getUserByID(this.id!);
    return user;
  }

  public async deleteUser(): Promise<UsersModule.User> {
    const user = await this.storage.deleteUserById(this.id!);
    return user;
  }

  public async updateUser(): Promise<UsersModule.User> {
    const user = await this.storage.updateUserById(this.id!, {
      username: this.username,
      email: this.email,
      password: this.password,
    });
    return user;
  }
}
