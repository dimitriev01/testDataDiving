import { Link } from "react-router-dom";
import { useGetUsersQuery } from "src/entities/user"
import { useAppSelector } from "src/shared/lib/hooks";
import { Title } from "src/shared/ui/title";
import { routes } from "src/shared/lib/routes";
import { UserCard } from "./user-card";

export const UserCards = () => {
  const { isLoading: isLoadingUsers, isError: isErrorLoadingUsers } = useGetUsersQuery();
  const { users } = useAppSelector((state) => state.userReducer);

  if (isErrorLoadingUsers) {
    return <div>Error loading users!</div>
  }

  if (isLoadingUsers) {
    return <div>Loading...</div>
  }

  if (!users?.length) {
    return <div>No users</div>
  }

  return (
    <section>
      <Title>User cards</Title>
      <ul className="grid grid-cols-[repeat(auto-fill,_minmax(18.75rem,_1fr))] gap-5">
        {users.map((user) => (
          <li key={user.id} className="h-full">
            <Link to={`${routes.main}${user.id}`}>
              <UserCard user={user} />
            </Link>
          </li>
        ))}
      </ul>
    </section>

  )
}
