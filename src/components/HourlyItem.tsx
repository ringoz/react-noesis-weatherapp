import {
  HorizontalAlignment,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';
import { WeatherKit } from '../models';
import { WeatherIcon } from './common/WeatherIcon';

type HourlyItemProps = {
  data: WeatherKit.HourWeatherConditions;
};

export function HourlyItem({ data }: HourlyItemProps) {
  return (
    <StackPanel>
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {new Date(data.forecastStart!).getHours()}:00
      </TextBlock>
      <WeatherIcon Margin={8} Width={40} Height={40} data={data} />
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {Math.round(data.temperature)}°
      </TextBlock>
    </StackPanel>
  );
}
