import {
  HorizontalAlignment,
  Image,
  StackPanel,
  TextBlock
} from '@ringozz/react-noesis';
import { HourlyWeatherDetailsModel, weatherIcon } from '../models';

type HourlyItemProps = {
  data: HourlyWeatherDetailsModel;
};

export function HourlyItem({ data }: HourlyItemProps) {
  return (
    <StackPanel>
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {new Date(data.forecastStart!).getHours()}:00
      </TextBlock>
      <Image
        Margin={8}
        Width={40}
        Height={40}
        Source={weatherIcon(data)}
      />
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {Math.round(data.temperature)}°
      </TextBlock>
    </StackPanel>
  );
}
