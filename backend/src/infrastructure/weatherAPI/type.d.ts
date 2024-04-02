export declare namespace WeatherModule {
  interface Weather {
    city: string;
    lat?: number;
    lon?: number;
  }

  export interface GeoCoordinatesResponse {
    name: string;
    local_names?: { [key: string]: string };
    lat: number;
    lon: number;
    country: string;
    state: string;
  }

  export interface WeatherResponse {
    id: number;
    main: string;
    description: string;
    icon: string;
  }

  export interface Clouds {
    all: number;
  }

  export interface Coord {
    lon: number;
    lat: number;
  }

  export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  }

  export interface Rain {
    '1h': number;
  }

  export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  }

  export interface Wind {
    speed: number;
    deg: number;
    gust: number;
  }
}
