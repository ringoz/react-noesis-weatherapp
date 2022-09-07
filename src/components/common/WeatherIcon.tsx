import {
  WeatherDetailsModel,
  ConditionCode,
  CurrentWeatherDetailsModel,
} from '../../models';
import { FrameworkElement, Image, XamlAttributes } from '@ringozz/react-noesis';

type WeatherIconProps = {
  data: WeatherDetailsModel;
} & XamlAttributes<FrameworkElement>;

export function WeatherIcon({ data, ...rest }: WeatherIconProps) {
  const weatherCode = weatherCodes[data.conditionCode as ConditionCode];
  const timeCode =
    (data as CurrentWeatherDetailsModel).daylight !== false ? 'd' : 'n';
  return (
    <Image Source={`assets/icon_${weatherCode}${timeCode}.png`} {...rest} />
  );
}

export function weatherDesc(data: WeatherDetailsModel) {
  return data.conditionCode
    .replace(/([A-Z])/g, (x) => ' ' + x.toLowerCase())
    .replace(/^ /, '');
}

const weatherCodes: Record<ConditionCode, string> = {
  Clear: '01',
  Cloudy: '03',
  Dust: '50',
  Fog: '50',
  Haze: '50',
  MostlyClear: '01',
  MostlyCloudy: '04',
  PartlyCloudy: '02',
  ScatteredThunderstorms: '11',
  Smoke: '50',
  Breezy: '01',
  Windy: '01',
  Drizzle: '03',
  HeavyRain: '09',
  Rain: '09',
  Showers: '09',
  Flurries: '13',
  HeavySnow: '13',
  MixedRainAndSleet: '09',
  MixedRainAndSnow: '09',
  MixedRainfall: '09',
  MixedSnowAndSleet: '13',
  ScatteredShowers: '09',
  ScatteredSnowShowers: '13',
  Sleet: '09',
  Snow: '13',
  SnowShowers: '13',
  Blizzard: '13',
  BlowingSnow: '13',
  FreezingDrizzle: '03',
  FreezingRain: '09',
  Frigid: '01',
  Hail: '09',
  Hot: '01',
  Hurricane: '50',
  IsolatedThunderstorms: '11',
  SevereThunderstorms: '11',
  Thunderstorms: '11',
  Tornado: '50',
  TropicalStorm: '11',
};
