interface IFullNameProps {
  firstName: string;
  middleName: string;
  lastName?: string;
}

export const FullName = (props: IFullNameProps) => {
  const { firstName, middleName, lastName = '' } = props;

  return (
    <div className="mb-4">{`${firstName} ${middleName} ${lastName}`}</div>
  )
}