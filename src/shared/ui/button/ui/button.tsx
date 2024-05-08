import { ReactNode } from "react";

interface IButtonProps {
  isDisalbed?: boolean,
  type?: 'submit' | 'button'
  children: ReactNode,
  onClick?: () => void;
}

export const Button = (props: IButtonProps) => {
  const { isDisalbed, children, type = 'button', onClick } = props;
  return (
    <button type={type} disabled={isDisalbed} className="p-2 bg-blue-500 text-white rounded-md" onClick={onClick}>
      {children}
    </button>
  )
}