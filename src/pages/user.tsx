import { useCallback, useEffect } from "react";
import { Navigate, useParams, } from "react-router-dom";
import { setUser, useDeleteUserMutation, useGetUsersQuery, } from "src/entities/user";
import { UserCard } from "src/features/user-cards";
import { UserForm } from "src/features/user-form";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";
import { routes } from "src/shared/lib/routes";
import { Button } from "src/shared/ui/button";
import { FullName } from "src/shared/ui/full-name";
import { Modal, changeModalConfirmDeleteUser, changeModalEditionUser } from "src/shared/ui/modal";
import { Title } from "src/shared/ui/title";

export const UserPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state) => state.modalReducer)
  const { } = useGetUsersQuery();
  const { users, user } = useAppSelector((state) => state.userReducer);
  const [deleteUser, { isLoading: isLoadingDeletingUser }] = useDeleteUserMutation();
  const hasUser = users.find((user) => user.id === id);

  const changeVisibleModalEditionUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalEditionUser(isOpened))
  }, [dispatch])

  const onclickDeleteUser = useCallback((id: string) => {
    deleteUser(id)
      .catch((err) => console.log(err));
    dispatch(setUser(null))
    dispatch(changeModalConfirmDeleteUser(false))
  }, [deleteUser, dispatch])

  const changeVisibleModalConfirmDeleteUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalConfirmDeleteUser(isOpened))
  }, [dispatch])

  useEffect(() => {
    if (hasUser) {
      dispatch(setUser(hasUser));
    }
  }, [dispatch, hasUser]);

  if (!hasUser) {
    return <Navigate to={routes.main} />
  }

  if (!user) {
    return null
  }

  return (
    <>
      <Title>User detail</Title>
      <>
        <div className="mb-3 space-x-2">
          <Button onClick={() => changeVisibleModalConfirmDeleteUser(true)}>Delete user</Button>
        </div>
        <div className="cursor-pointer inline-block" onClick={() => changeVisibleModalEditionUser(true)}>
          <UserCard user={user} />
        </div>
      </>
      <Modal
        isOpened={modals.modalEditionUser}
        setShowModal={changeVisibleModalEditionUser}
        title={'Edition user'}
      >
        <UserForm />
      </Modal>
      <Modal
        isOpened={modals.modalConfirmDeleteUser}
        setShowModal={changeVisibleModalConfirmDeleteUser}
        title={'Are you sure delete this user?'}>
        <>
          <FullName firstName={user.firstName} middleName={user.middleName} lastName={user.lastName} />
          <Button isDisalbed={isLoadingDeletingUser} onClick={() => onclickDeleteUser(user.id)}>Delete user</Button>
        </>
      </Modal>
    </>
  )
}