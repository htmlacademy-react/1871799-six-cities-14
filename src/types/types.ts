export type TCity = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
}

export type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type TPoint = {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
};

export type TPointOffer = {
  id: number;
  location: TLocation;
}

export type TPoints = TPoint[];

export type TIconToMap = {
  iconUrl: string;
  iconSize: [number, number];
  iconAnchor: [number, number];
}

export type TCities = string[]
