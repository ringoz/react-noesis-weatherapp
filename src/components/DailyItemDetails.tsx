import { DailyWeatherDetailsModel } from '../models';
import DetailsGrid from './common/DetailsGrid';

type DailyItemDetailsProps = {
  data: DailyWeatherDetailsModel;
};

export const DailyItemDetails = ({ data }: DailyItemDetailsProps) => {
  return (
    <DetailsGrid
      details={[
        `Rain: ${data.rain.toFixed(2)}%`,
        `Pressure: ${data.pressure}hPa`,
        `Humidity: ${data.humidity}%`,
        `Clouds: ${data.clouds}%`,
        `Wind speed: ${data ? Math.round(data.wind_speed) : ''} m/s`,
        `UV Index: ${data.uvi}`,
        `Sunrise: ${new Date(data.sunrise * 1000).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}`,
        `Sunset: ${new Date(data.sunset * 1000).toLocaleString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })}`,
      ]}
    />
  );
};

export default DailyItemDetails;
