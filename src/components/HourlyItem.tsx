import { Image, StackPanel, TextBlock } from '@ringozz/react-noesis';
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
      <TextBlock>{new Date(data.dt * 1000).getHours()}:00</TextBlock>
      <Image Source={import(`../resources/icon_${weatherCode}.png`)} />
      <TextBlock>
        {Math.round(data.temp)}°{unitSymbol}
      </TextBlock>
    </StackPanel>
  );
};
export default HourlyItem;
