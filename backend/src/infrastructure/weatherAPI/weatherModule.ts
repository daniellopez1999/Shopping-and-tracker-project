import { WeatherModule } from './type';
import { badWeatherLibrary } from './weatherLibrary';

export class Weather implements WeatherModule.Weather {
  public city!: string;
  public lat: number | undefined;
  public lon: number | undefined;
  public possibleBadWeathers: string[];

  constructor(city: string) {
    this.city = city;
    this.possibleBadWeathers = badWeatherLibrary;
  }

  public async getCoordinates(): Promise<WeatherModule.GeoCoordinatesResponse> {
    const limit = 5;
    const res = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=${limit}&appid=${process.env.WEATHER_API_KEY}`
    );
    const coordinates = await res.json();
    return coordinates[0];
  }

  public async getWeather(): Promise<WeatherModule.WeatherResponse> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${process.env.WEATHER_API_KEY}`
    );
    const { weather } = await res.json();

    return weather[0];
  }
}
