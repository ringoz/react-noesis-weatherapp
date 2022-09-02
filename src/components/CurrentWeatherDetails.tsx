import { StackPanel, TextBlock } from '@ringozz/react-noesis';
import { CurrentWeatherDetailsModel } from '../models';

type CurrentWeatherProps = {
  data?: CurrentWeatherDetailsModel;
};

export const CurrentWeatherDetails = ({ data }: CurrentWeatherProps) => {
  return (
    <StackPanel>
      <StackPanel>
        <StackPanel>
          <TextBlock>Rain:</TextBlock>
          <TextBlock>{data?.rain.toFixed(2)}%</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Pressure:</TextBlock>
          <TextBlock>{data?.pressure}hPa</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Humidity:</TextBlock>
          <TextBlock>{data?.humidity}%</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Visibility:</TextBlock>
          <TextBlock>{data?.visibility} km</TextBlock>
        </StackPanel>
        <StackPanel>
          <TextBlock>Wind speed:</TextBlock>
          <TextBlock>{data ? Math.round(data.wind_speed) : ''} m/s</TextBlock>
        </StackPanel>
      </StackPanel>
    </StackPanel>
  );
};

export default CurrentWeatherDetails;
