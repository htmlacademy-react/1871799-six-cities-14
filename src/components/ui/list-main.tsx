import { TMainItem } from '../blocks/main-block/main-block';

export type TListLocationProps = {
  itemsList: TMainItem[];
};

export function ListPlacesOptions({itemsList} : TListLocationProps): JSX.Element {
  return (
    <ul className='places__options places__options--custom places__options--opened'>
      {
        itemsList.map((item): JSX.Element => (
          <li className = {`places__option ${item.isActive ? 'places__option--active' : ''}`} key={item.title}>
            {item.title}
          </li>
        ))
      }
    </ul>
  );
}
