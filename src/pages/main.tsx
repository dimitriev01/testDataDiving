
import { useCallback } from "react";
import { useDeleteUsersMutation } from "src/entities/user";
import { UserCards } from "src/features/user-cards";
import { UserForm } from "src/features/user-form";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";
import { Button } from "src/shared/ui/button";
import { FullName } from "src/shared/ui/full-name";
import { Modal, changeModalConfirmDeleteUser, changeModalCreationUser } from "src/shared/ui/modal";
import { ToolTip } from "src/shared/ui/tooltip";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(state => state.modalReducer)
  const { users, selectedIdUsers } = useAppSelector(state => state.userReducer);
  const [deleteUsers, { isLoading }] = useDeleteUsersMutation();
  const nameUsers = users.filter(user => selectedIdUsers.includes(user.id));

  const changeVisibleModalCreationUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalCreationUser(isOpened))
  }, [dispatch]);

  const changeVisibleModalConfirmDeleteUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalConfirmDeleteUser(isOpened))
  }, [dispatch])

  const onclickDeleteUsers = useCallback((ids: string[]) => {
    ids.forEach((id: string) => {
      deleteUsers(id)
        .catch((err) => console.log(err));
    });
    dispatch(changeModalConfirmDeleteUser(false))
  }, [deleteUsers, dispatch])

  return (
    <>
      <div className="mb-3 space-x-2">
        <Button onClick={() => changeVisibleModalCreationUser(true)}>Create user</Button>
        {selectedIdUsers.length ? (
          <Button onClick={() => changeVisibleModalConfirmDeleteUser(true)}>Delete users</Button>
        ) : null}
        <ToolTip title={"Wubba Lubba Dub-Dub!"} text={"Some text"} delay={1000} />
        <ToolTip title={"Wubba Lubba Dub-Dub! x2"} text={"Anything text"} delay={1000} />
      </div>
      <UserCards />
      <Modal isOpened={modals.modalCreationUser} setShowModal={changeVisibleModalCreationUser} title={'Creation user'}>
        <UserForm />
      </Modal>
      <Modal
        isOpened={modals.modalConfirmDeleteUser}
        setShowModal={changeVisibleModalConfirmDeleteUser}
        title={'Are you sure delete those users?'}>
        {nameUsers.map((user) =>
          <FullName
            key={user.id} firstName={user.firstName}
            middleName={user.middleName}
            lastName={user.lastName} />
        )}
        <Button isDisalbed={isLoading} onClick={() => onclickDeleteUsers(selectedIdUsers)}>Delete users</Button>
      </Modal>
    </>
  )
}