import { ReactNode } from "react";
import { Button } from "../../button";

interface IModalProps {
  title: string;
  children: ReactNode;
  isOpened: boolean;
  setShowModal: (isOpened: boolean) => void;
}

export const Modal = (props: IModalProps) => {
  const { setShowModal, isOpened, children, title } = props;

  return (
    <>
      {isOpened ? (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">{title}</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => setShowModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              {children}
              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                <Button onClick={() => setShowModal(false)}>Close</Button>
                <Button onClick={() => setShowModal(false)}>Submit</Button>
              </div>
            </div>
          </div>
        </div>) : null}
    </>
  );
}