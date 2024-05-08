export interface IUser {
  id: string;
  creationDate: Date;
  avatar: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  about: string;
}

export interface IUserStore {
  users: IUser[];
}
