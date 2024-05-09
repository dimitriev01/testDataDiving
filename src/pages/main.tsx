
import { useCallback } from "react";
import { useDeleteUserMutation } from "src/entities/user";
import { UserCards } from "src/features/user-cards";
import { UserForm } from "src/features/user-form";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";
import { Button } from "src/shared/ui/button";
import { Modal, changeModalConfirmDeleteUser, changeModalCreationUser } from "src/shared/ui/modal";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(state => state.modalReducer)
  const { users, selectedIdUsers } = useAppSelector(state => state.userReducer);
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const nameUsers = users.filter(user => selectedIdUsers.includes(user.id));

  const changeVisibleModalCreationUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalCreationUser(isOpened))
  }, [dispatch]);

  const changeVisibleModalConfirmDeleteUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalConfirmDeleteUser(isOpened))
  }, [dispatch])

  const onclickDeleteUsers = useCallback((ids: string[]) => {
    ids.forEach((id: string) => {
      deleteUser(id);
    });
    dispatch(changeModalConfirmDeleteUser(false))
  }, [deleteUser, dispatch])

  return (
    <>
      <div className="mb-3 space-x-2">
        <Button onClick={() => changeVisibleModalCreationUser(true)}>Create user</Button>
        {selectedIdUsers.length ? (
          <Button onClick={() => changeVisibleModalConfirmDeleteUser(true)}>Delete users</Button>
        ) : null}
      </div>
      <UserCards />
      <Modal isOpened={modals.modalCreationUser} setShowModal={changeVisibleModalCreationUser} title={'Creation user'}>
        <UserForm />
      </Modal>
      <Modal isOpened={modals.modalConfirmDeleteUser} setShowModal={changeVisibleModalConfirmDeleteUser} title={'Are you sure delete those users?'}>
        {nameUsers.map((user) => <div className="mb-4" key={user.id}>{`${user.firstName} ${user.middleName} ${user.lastName}`}</div>)}
        <Button isDisalbed={isLoading} onClick={() => onclickDeleteUsers(selectedIdUsers)}>Delete users</Button>
      </Modal>
    </>
  )
}