import { NUMBER_OF_STARS, Sorting, TOTAL_PERCENTEGE } from '../const';
import { TOffers } from '../types/types';

export function capitalize(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}

export function addPluralEnging(count: number) {
  return count !== 1 ? 's' : '';
}

export function getDate(data:string) {
  const date = new Date(data);
  const mounth = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const newMounth = capitalize(mounth);

  return (`${newMounth} ${year}`);
}

export function addZero(num: number) {
  if (num >= 0 && num <= 9) {
    return `${0}num`;
  } else {
    return num;
  }
}

export function getDateTime(data: string) {
  const date = new Date(data);
  return (`${addZero(date.getFullYear())}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`);
}

export function conversionToPercentage(rating: number) {
  const ratingRound = Math.round(rating);
  return (`${ratingRound * TOTAL_PERCENTEGE / NUMBER_OF_STARS}%`);
}

type TAcc = {
  [key: string]: TOffers;
}

export function transformArray(data: TOffers) {
  const objectData = data.reduce(
    (acc:TAcc, object) => {
      const city: string = object.city.name;

      acc[city] ??= [];
      acc[city].push(object);
      return acc;
    },
    {},
  );

  return objectData;
}

export function sortedOffers(sorting: Sorting, offersPopular:TOffers, offers:TOffers): TOffers {
  if(sorting === Sorting.TopRated) {
    return offers.sort((best, worst) => worst.rating - best.rating);
  } else if(sorting === Sorting.HighToLow) {
    return offers.sort((high, low) => low.price - high.price);
  } else if (sorting === Sorting.LowToHigh) {
    return offers.sort((high, low) => high.price - low.price);
  } else {
    return offersPopular;
  }
}

export function getRandomArrayElement<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}
