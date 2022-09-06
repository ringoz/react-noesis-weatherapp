import {
  HorizontalAlignment,
  Image,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';
import { HourlyWeatherDetailsModel, SettingsModel } from '../models';

type HourlyItemProps = {
  settings: SettingsModel;
  data: HourlyWeatherDetailsModel;
};

export const HourlyItem = ({ settings, data }: HourlyItemProps) => {
  const weatherCode = /*data.conditionCode ||*/ '01d';
  const unitSymbol = settings.unit === 'metric' ? 'C' : 'F';
  return (
    <StackPanel>
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {new Date(data.forecastStart!).getHours()}:00
      </TextBlock>
      <Image
        Margin={8}
        Width={40}
        Height={40}
        Source={`assets/icon_${weatherCode}.png`}
      />
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {Math.round(data.temperature)}°{unitSymbol}
      </TextBlock>
    </StackPanel>
  );
};
export default HourlyItem;
