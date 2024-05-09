import { useCallback, useEffect } from "react";
import { resetUser, } from "src/entities/user";
import { UserCard } from "src/features/user-cards";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";
import { Modal, changeModalConfirmDeleteUser, changeModalEditionUser } from "src/shared/ui/modal";

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state) => state.modalReducer)
  const { user, } = useAppSelector((state) => state.userReducer);

  const changeVisibleModalEditionUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalEditionUser(isOpened))
  }, [dispatch])

  const changeVisibleModalDeleteUser = useCallback((isOpened: boolean) => {
    dispatch(changeModalConfirmDeleteUser(isOpened))
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(resetUser())
    }
  }, [dispatch])

  return (
    <>
      {user &&
        <UserCard user={user} />
      }
      <Modal isOpened={modals.modalEditionUser} setShowModal={() => changeVisibleModalEditionUser(modals.modalEditionUser)} title={'Edition user'}>
        modalEditionUser
      </Modal>
      <Modal isOpened={modals.modalConfirmDeleteUser} setShowModal={() => changeVisibleModalDeleteUser(modals.modalConfirmDeleteUser)} title={'Confirm delele user'}>
        modalConfirmDeleteUser
      </Modal>
    </>
  )
}