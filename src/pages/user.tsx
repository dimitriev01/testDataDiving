import { useEffect } from "react";
import { resetUser, } from "src/entities/user";
import { UserCard } from "src/features/user-cards/ui/user-card";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";
import { Modal, changeModalEditionUser, changeModalConfirmDeleteUser } from "src/shared/ui/modal"

export const UserPage = () => {
  const dispatch = useAppDispatch();
  const modals = useAppSelector((state) => state.modalReducer)
  const { user } = useAppSelector(state => state.userReducer);

  const changeVisibleModalEditionUser = (isOpened: boolean) => {
    dispatch(changeModalEditionUser(isOpened))
  }

  const changeVisibleModalDeleteUser = (isOpened: boolean) => {
    dispatch(changeModalConfirmDeleteUser(isOpened))
  }

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
      <Modal isOpened={modals.modalEditionUser} setShowModal={changeVisibleModalEditionUser} title={'Edition user'}>
        modalEditionUser
      </Modal>
      <Modal isOpened={modals.modalConfirmDeleteUser} setShowModal={changeVisibleModalDeleteUser} title={'Confirm delele user'}>
        modalEditionUser
      </Modal>
    </>
  )
}