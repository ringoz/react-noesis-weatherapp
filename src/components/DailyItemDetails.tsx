import { DailyWeatherDetailsModel } from '../models';
import { DetailsGrid } from './common';

type DailyItemDetailsProps = {
  data: DailyWeatherDetailsModel;
};

export function DailyItemDetails({ data }: DailyItemDetailsProps) {
  return (
    <DetailsGrid
      details={[
        `Rain: ${Math.round(data.precipitationChance * 100)}%`,
        `Pressure: ${0}hPa`,
        `Humidity: ${Math.round(data.daytimeForecast!.humidity * 100)}%`,
        `Clouds: ${Math.round(data.daytimeForecast!.cloudCover * 100)}%`,
        `Wind speed: ${data.daytimeForecast!.windSpeed} m/s`,
        `UV Index: ${data.maxUvIndex}`,
        `Sunrise: ${new Date(data.sunrise!).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}`,
        `Sunset: ${new Date(data.sunset!).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}`,
      ]}
    />
  );
}
