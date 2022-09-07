import { components as MK } from './MapKit';
export namespace MapKit {
  export type Place = MK['schemas']['Place'];
  export type Location = MK['schemas']['Location'];
}

import { components as WK } from './WeatherKit';
export namespace WeatherKit {
  export type Metadata = WK['schemas']['Metadata'];
  export type CurrentWeather = WK['schemas']['CurrentWeather'];
  export type HourlyForecast = WK['schemas']['HourlyForecast'];
  export type HourWeatherConditions = WK['schemas']['HourWeatherConditions'];
  export type CurrentWeatherConditions = CurrentWeather | HourWeatherConditions;
  export type DailyForecast = WK['schemas']['DailyForecast'];
  export type DayWeatherConditions = WK['schemas']['DayWeatherConditions'];
  export type WeatherConditions =
    | CurrentWeatherConditions
    | DayWeatherConditions;
  export type ConditionCode = WK['schemas']['ConditionCode'];
}
