import {
  HorizontalAlignment,
  Image,
  StackPanel,
  TextBlock,
} from '@ringozz/react-noesis';
import { CurrentWeatherModel, SettingsModel } from '../models';

type HourlyItemProps = {
  settings: SettingsModel;
  data: CurrentWeatherModel;
};

export const HourlyItem = ({ settings, data }: HourlyItemProps) => {
  const weatherCode =
    settings.theme === 'dark'
      ? `${data.weather.icon}_n`
      : `${data.weather.icon}`;
  const unitSymbol = settings.unit === 'metric' ? 'C' : 'F';
  return (
    <StackPanel>
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {new Date(data.dt * 1000).getHours()}:00
      </TextBlock>
      <Image Margin={10} Height={40} Source={`icon_${weatherCode}.png`} />
      <TextBlock HorizontalAlignment={HorizontalAlignment.Center}>
        {Math.round(data.temp)}°{unitSymbol}
      </TextBlock>
    </StackPanel>
  );
};
export default HourlyItem;
