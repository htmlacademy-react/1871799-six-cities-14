import { CityMap } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { changeLocation, filtrationCity, getOffers, getPopularOffers, gettingSortValue } from '../../../store/action';
import { v4 as uuidv4 } from 'uuid';
import style from './list-location.module.css';
import { TOffers } from '../../../types/types';
import { memo } from 'react';

export function ListLocation(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeCity = useAppSelector((state)=> state.city);
  const sortingValue = useAppSelector((state) => state.sorting);
  const allData = useAppSelector((state) => state.allData);
  const cities = Object.values(CityMap);
  type TCityProps = string;
  function changeCity (city:TCityProps) {
    const offersFilter: TOffers = allData.filter((item) => item.city.name === city);
    dispatch(filtrationCity(city));
    dispatch(getPopularOffers(offersFilter));
    dispatch(getOffers(offersFilter));
    dispatch(gettingSortValue(sortingValue));
    dispatch(changeLocation(offersFilter[0].city));
  }
  return (
    <ul className={'locations__list tabs__list'}>
      {
        cities.map((item): JSX.Element => (
          <li className={ 'locations__item' } key={uuidv4()}>
            <button className={`locations__item-link tabs__item ${style.button} ${item.name === activeCity.name && 'tabs__item--active'}`} onClick={()=>changeCity(item.name)} type='button'>
              <span>{ item.name }</span>
            </button>
          </li>
        ))
      }
    </ul>
  );
}

const MemorizedListLocation = memo(ListLocation);
export default MemorizedListLocation;
