import { IUser, addSelectedUserId } from "src/entities/user";
import { useAppDispatch } from "src/shared/lib/hooks";
import AvatarImg from '../assets/avatar.webp'

interface IUserCardProps {
  user: IUser;
}

export const UserCard = (props: IUserCardProps) => {
  const { user } = props;
  const dispatch = useAppDispatch();

  const onchangeCheckId = (id: string) => {
    dispatch(addSelectedUserId(id));
  }

  return (
    <li className="bg-grey p-4 rounded shadow-md flex justify-between items-center">
      <div>
        <img src={user.avatar || AvatarImg} alt="Avatar" className="w-32 h-32 rounded-full mb-4" />
        <h2 className="text-2xl font-bold"> {user.firstName} {user.middleName} {user.lastName}</h2>
        <p>{user.email}</p>
      </div>
      <div>
        <input type="checkbox" onChange={() => onchangeCheckId(user.id)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
      </div>
    </li>
  );
};