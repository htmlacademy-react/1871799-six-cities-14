type TUserStatus = {
  pro: boolean;
}

export function UserStatus({pro}:TUserStatus):JSX.Element {
  return (
    <span className="offer__user-status">
      {pro ? 'Pro' : ''}
    </span>
  );
}
