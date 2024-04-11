export declare namespace UsersModule {
  interface User {
    _id?: string;
    username?: string;
    email?: string;
    authentication?: Authentication;
    phone_number?: number;
    role?: string;
    __v?: string;
    orders?: string[];
  }

  interface UserFromMongoose {
    authentication: {
      password: string | undefined;
      salt: string | null | undefined;
      sessionToken: string | undefined;
    };
    _id: Types.ObjectId;
    username: string;
    email: string;
    createdAt: NativeDate;
    updatedAt: NativeDate;
    role?: string;
    __v: any;
    orders: string[];
  }

  interface Authentication {
    password: string;
    salt: string;
    sessionToken?: string;
  }

  interface Error {
    Error: string;
  }

  interface UsersRepository {
    public getUserByUsernameLogin(
      username: string,
      password: string
    ): Promise<UsersModule.UserFromMongoose | UsersModule.Error>;
    public getUserBySessionToken(
      sessionToken: string
    ): Promise<UsersModule.User>;
    public getUserByID(id: string): Promise<UsersModule.User>;
    public createUser(values: Record<string, any>): Promise<UsersModule.User>;
    public deleteUserById(id: string): Promise<UsersModule.User>;
    public updateUserById(
      id: string,
      values: Record<string, any>
    ): Promise<UsersModule.User>;
    public getUserByUsername(
      username: string
    ): Promise<UsersModule.UserFromMongoose | UsersModule.Error>;
    public addOrderToUser(
      user_id: string,
      order_id: string
    ): Promise<UsersModule.UserFromMongoose | UsersModule.Error>;
  }
}
