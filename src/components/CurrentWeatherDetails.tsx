import { Border, DynamicResource } from '@ringozz/react-noesis';
import { CurrentWeatherDetailsModel } from '../models';
import DetailsGrid from './common/DetailsGrid';

type CurrentWeatherProps = {
  data?: CurrentWeatherDetailsModel;
};

export const CurrentWeatherDetails = ({ data }: CurrentWeatherProps) => {
  return (
    <Border Margin={8} Background={DynamicResource('Brush.TextBox.Focused')}>
      <DetailsGrid
        details={[
          `Rain: ${data?.rain.toFixed(2)}%`,
          `Pressure: ${data?.pressure}hPa`,
          `Humidity: ${data?.humidity}%`,
          `Visibility: ${data?.visibility} km`,
          `Wind speed: ${data ? Math.round(data.wind_speed) : ''} m/s`,
        ]}
      />
    </Border>
  );
};

export default CurrentWeatherDetails;
