export * from "./SettingsModel";

export * from "./LocationModel";
export * from "./LocationPositionModel";

import { components } from "./WeatherKit";
export type WeatherMetadataModel = components["schemas"]["Metadata"];
export type CurrentWeatherModel = components["schemas"]["CurrentWeather"];
export type CurrentWeatherDetailsModel = CurrentWeatherModel | HourlyWeatherDetailsModel;
export type HourlyWeatherModel = components["schemas"]["HourlyForecast"];
export type HourlyWeatherDetailsModel = components["schemas"]["HourWeatherConditions"];
export type DailyWeatherModel = components["schemas"]["DailyForecast"];
export type DailyWeatherDetailsModel = components["schemas"]["DayWeatherConditions"];
