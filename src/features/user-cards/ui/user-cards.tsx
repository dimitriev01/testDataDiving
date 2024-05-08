import { IUser, useGetUsersQuery } from "src/entities/user"
import { UserCard } from "./user-card/ui/user-card"

export const UserCards = () => {
  const { data: users } = useGetUsersQuery();

  if (!users?.length) {
    return <div>No users</div>
  }

  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">User cards</h1>
      {[...users].sort((a: IUser, b: IUser) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()).map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>

  )
}
