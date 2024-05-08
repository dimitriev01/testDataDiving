import { IUser } from "src/entities/user";
import avatar from '../assets/avatar.webp'

interface IUserCardProps {
  user: IUser;
}

export const UserCard = (props: IUserCardProps) => {
  const { user } = props;

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <img src={user.avatar || avatar} alt="Avatar" className="w-32 h-32 rounded-full mb-4" />
      <h2 className="text-2xl font-bold"> {user.firstName} {user.middleName} {user.lastName}</h2>
      <p>{user.email}</p>
    </div>
  );
};