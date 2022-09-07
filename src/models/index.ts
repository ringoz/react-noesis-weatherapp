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

export function weatherConditionDescription(conditionCode: string) {
  return conditionCode.replace(/([A-Z])/g, (x) => " " + x.toLowerCase()).replace(/^ /, "");
}

export function weatherIcon(details: CurrentWeatherDetailsModel | DailyWeatherDetailsModel) {
  let weatherCode;
  switch (details.conditionCode) {
    case "Clear": weatherCode = '01'; break;
    case "Cloudy": weatherCode = '03'; break;
    case "Dust": weatherCode = '50'; break;
    case "Fog": weatherCode = '50'; break;
    case "Haze": weatherCode = '50'; break;
    case "MostlyClear": weatherCode = '01'; break;
    case "MostlyCloudy": weatherCode = '04'; break;
    case "PartlyCloudy": weatherCode = '02'; break;
    case "ScatteredThunderstorms": weatherCode = '11'; break;
    case "Smoke": weatherCode = '50'; break;
    case "Breezy": weatherCode = '01'; break;
    case "Windy": weatherCode = '01'; break;
    case "Drizzle": weatherCode = '03'; break;
    case "HeavyRain": weatherCode = '09'; break;
    case "Rain": weatherCode = '09'; break;
    case "Showers": weatherCode = '09'; break;
    case "Flurries": weatherCode = '13'; break;
    case "HeavySnow": weatherCode = '13'; break;
    case "MixedRainAndSleet": weatherCode = '09'; break;
    case "MixedRainAndSnow": weatherCode = '09'; break;
    case "MixedRainfall": weatherCode = '09'; break;
    case "MixedSnowAndSleet": weatherCode = '13'; break;
    case "ScatteredShowers": weatherCode = '09'; break;
    case "ScatteredSnowShowers": weatherCode = '13'; break;
    case "Sleet": weatherCode = '09'; break;
    case "Snow": weatherCode = '13'; break;
    case "SnowShowers": weatherCode = '13'; break;
    case "Blizzard": weatherCode = '13'; break;
    case "BlowingSnow": weatherCode = '13'; break;
    case "FreezingDrizzle": weatherCode = '03'; break;
    case "FreezingRain": weatherCode = '09'; break;
    case "Frigid": weatherCode = '01'; break;
    case "Hail": weatherCode = '09'; break;
    case "Hot": weatherCode = '01'; break;
    case "Hurricane": weatherCode = '50'; break;
    case "IsolatedThunderstorms": weatherCode = '11'; break;
    case "SevereThunderstorms": weatherCode = '11'; break;
    case "Thunderstorms": weatherCode = '11'; break;
    case "Tornado": weatherCode = '50'; break;
    case "TropicalStorm": weatherCode = '11'; break;
  }

  let timeCode = 'd';
  if ((details as CurrentWeatherDetailsModel).daylight === false)
    timeCode = 'n';

  return `assets/icon_${weatherCode}${timeCode}.png`;
}
