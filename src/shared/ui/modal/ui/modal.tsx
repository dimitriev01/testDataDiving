import { ReactNode, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/shared/lib/hooks";

interface IModalProps {
  title: string;
  children: ReactNode;
}

export const Modal = (props: IModalProps) => {
  const { title, children, } = props;
  const modals = useAppSelector(state => state.appSlice)
  const dispatch = useAppDispatch();


  return (
    <>
      {modals.modalCreationUser &&
        <>modalCreationUser</>
      }
      {modals.modalConfirmDeleteUser &&
        <>modalConfirmDeleteUser</>
      }
      {modals.modalEditionUser &&
        <>modalEditionUser</>
      }
    </>
  )
}