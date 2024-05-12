import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ReactComponent as CrossIcon } from '../assets/cross-icon.svg'

interface IModalProps {
  title: string;
  children: ReactNode;
  isOpened: boolean;
  setShowModal: (visible: boolean) => void;
}

export const Modal = (props: IModalProps) => {
  const { setShowModal, children, title, isOpened } = props;

  const handleOutsideClick = (event: MouseEvent) => {
    if (event.target instanceof Element && event.target.closest('.modal')) {
      return;
    }
    setShowModal(false);
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = 'auto';
    };
  }, [handleOutsideClick, isOpened, setShowModal]);

  if (!isOpened) {
    return null;
  }

  return createPortal(
    <div className="fixed p-5 inset-0 w-full h-full flex items-center justify-center bg-gray-900/50 overflow-hidden">
      <div className="flex flex-col justify-center modal bg-white p-6 rounded-lg shadow-lg w-full overflow-x-hidden overflow-y-auto" style={{
        maxHeight: '80vh', maxWidth: '56.25rem'
      }}>
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setShowModal(false)}
          >
            <CrossIcon />
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.body
  );
};