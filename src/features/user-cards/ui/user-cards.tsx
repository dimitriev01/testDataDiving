import { useGetUsersQuery } from "src/entities/user"
import { UserCard } from "./user-card";

export const UserCards = () => {
  const { data: users, isLoading: isLoadingUsers, isError: isErrorLoadingUsers } = useGetUsersQuery();

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
    <>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">User cards</h1>
      <ul>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </ul>
    </>

  )
}
