
import { UserCards } from "src/features/user-cards";
import { UserForm } from "src/features/user-form";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";
import { Button } from "src/shared/ui/button";
import { Modal, changeModalConfirmDeleteUser, changeModalCreationUser } from "src/shared/ui/modal";

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector(state => state.modalReducer)
  const { selectedIdUsers } = useAppSelector(state => state.userReducer);

  const changeVisibleModalCreationUser = (isOpened: boolean) => {
    dispatch(changeModalCreationUser(isOpened))
  }

  const changeVisibleModalConfirmDeleteUser = (isOpened: boolean) => {
    dispatch(changeModalConfirmDeleteUser(isOpened))
  }

  return (
    <>
      <Button onClick={() => changeVisibleModalCreationUser(true)}>Создать пользователя</Button>
      {selectedIdUsers.length ? (
        <Button onClick={() => changeVisibleModalConfirmDeleteUser(true)}>Удалить пользователя</Button>
      ) : null}
      <UserCards />
      <Modal isOpened={modals.modalCreationUser} setShowModal={changeVisibleModalCreationUser} title={'Creation user'}>
        <UserForm />
      </Modal>
      <Modal isOpened={modals.modalConfirmDeleteUser} setShowModal={changeVisibleModalConfirmDeleteUser} title={'Confirm delete user'}>
        Code
      </Modal>
    </>
  )
}