import { Border, DynamicResource } from '@ringozz/react-noesis';
import { CurrentWeatherDetailsModel, CurrentWeatherModel, HourlyWeatherDetailsModel } from '../models';
import { DetailsGrid } from './common';

type CurrentWeatherProps = {
  data: CurrentWeatherDetailsModel;
};

export const CurrentWeatherDetails = ({ data }: CurrentWeatherProps) => {
  const rainChance = (data as HourlyWeatherDetailsModel).precipitationChance;
  const rainIntensity = (data as CurrentWeatherModel).precipitationIntensity ?? 0;
  return (
    <Border Margin={8} Background={DynamicResource('Brush.TextBox.Focused')}>
      <DetailsGrid
        details={[
          (rainChance !== undefined) ? `Rain: ${Math.round(rainChance * 100)}%` : `Rain: ${rainIntensity} mm/h`,
          `Pressure: ${data.pressure}hPa`,
          `Humidity: ${Math.round(data.humidity * 100)}%`,
          `Visibility: ${data.visibility} km`,
          `Wind speed: ${Math.round(data.windSpeed)} m/s`,
        ]}
      />
    </Border>
  );
};
