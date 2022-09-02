import { StackPanel, TextBlock } from '@ringozz/react-noesis';
import { DailyWeatherDetailsModel } from '../models';

type DailyItemDetailsProps = {
  data: DailyWeatherDetailsModel;
};

export const DailyItemDetails = ({ data }: DailyItemDetailsProps) => {
  return (
    <StackPanel>
      <StackPanel>
        <StackPanel>
          <TextBlock>Rain:</TextBlock>
          <TextBlock>{data.rain.toFixed(2)}%</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Pressure:</TextBlock>
          <TextBlock>{data.pressure}hPa</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Humidity:</TextBlock>
          <TextBlock>{data.humidity}%</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Clouds:</TextBlock>
          <TextBlock>{data.clouds}%</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Wind speed:</TextBlock>
          <TextBlock>{data ? Math.round(data.wind_speed) : ''} m/s</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>UV Index:</TextBlock>
          <TextBlock>{data.uvi}</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Sunrise:</TextBlock>
          <TextBlock>
            {new Date(data.sunrise * 1000).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Sunset:</TextBlock>
          <TextBlock>
            {new Date(data.sunset * 1000).toLocaleString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })}
          </TextBlock>
        </StackPanel>
      </StackPanel>
    </StackPanel>
  );
};

export default DailyItemDetails;
