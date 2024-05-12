import { useParams, } from "react-router-dom";
import { IUser, addSelectedUsersId } from "src/entities/user";
import { useAppDispatch } from "src/shared/lib/hooks";
import { dogAPIUrl } from "src/entities/dog";
import AvatarImg from '../assets/avatar.webp'

interface IUserCardProps {
  user: IUser;
}

export const UserCard = (props: IUserCardProps) => {
  const { user } = props;
  const dispatch = useAppDispatch();
  const { id } = useParams()

  const onChangeCheckedId = (id: string) => {
    dispatch(addSelectedUsersId(id));
  }

  return (
    <article className="flex flex-col justify-between items-center space-x-4 rounded shadow-md p-5 gap-5 h-full">
      <div>
        <div className="flex justify-center">
          <img
            src={user.avatar ? `${dogAPIUrl}/${user.avatar}` : AvatarImg}
            alt="Avatar"
            className="w-32 h-32 rounded-full mb-4 object-cover" />
        </div>
        <h2 className="text-2xl font-bold"> {user.firstName} {user.middleName} {user.lastName}</h2>
        <p>{user.email}</p>
        {id && <p>{user.about}</p>}
        <p>{user.about}</p>
      </div>
      <div>
        {!id &&
          <input
            type="checkbox"
            onChange={() => onChangeCheckedId(user.id)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        }
      </div>
    </article>
  );
};