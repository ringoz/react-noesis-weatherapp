import { components as MapKit } from "./MapKit";
export type LocationModel = MapKit["schemas"]["Place"];
export type LocationPositionModel = MapKit["schemas"]["Location"];

import { components as WeatherKit } from "./WeatherKit";
export type WeatherMetadataModel = WeatherKit["schemas"]["Metadata"];
export type CurrentWeatherModel = WeatherKit["schemas"]["CurrentWeather"];
export type CurrentWeatherDetailsModel = CurrentWeatherModel | HourlyWeatherDetailsModel;
export type HourlyWeatherModel = WeatherKit["schemas"]["HourlyForecast"];
export type HourlyWeatherDetailsModel = WeatherKit["schemas"]["HourWeatherConditions"];
export type DailyWeatherModel = WeatherKit["schemas"]["DailyForecast"];
export type DailyWeatherDetailsModel = WeatherKit["schemas"]["DayWeatherConditions"];

export function conditionCodeToLabel(code: string) {
  return code.replace(/([A-Z])/g, (x) => " " + x.toLowerCase()).replace(/^ /, "");
}
