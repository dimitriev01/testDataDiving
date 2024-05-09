import clsx from "clsx";
import { ReactNode } from "react";

interface IButtonProps {
  isDisalbed?: boolean,
  type?: 'submit' | 'button'
  children: ReactNode,
  onClick?: () => void;
  className?: string;
}

export const Button = (props: IButtonProps) => {
  const { isDisalbed, children, type = 'button', onClick, className } = props;
  return (
    <button type={type} disabled={isDisalbed} className={clsx(className, "p-2 bg-blue-500 text-white rounded-md")} onClick={onClick}>
      {children}
    </button>
  )
}