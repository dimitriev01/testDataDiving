import '../../../shared/styles/styles.scss'
import cls from './layout.module.scss'

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <div className={cls.layout}>
      {children}
    </div>
  )
};

