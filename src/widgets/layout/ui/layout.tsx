import '../../../shared/styles/styles.scss'

interface ILayoutProps {
  children: JSX.Element;
}

export const Layout = (props: ILayoutProps) => {
  const { children } = props;

  return (
    <main className='p-5'>
      {children}
    </main>
  )
};

