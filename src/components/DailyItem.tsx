import { Button, Image, StackPanel, TextBlock } from '@ringozz/react-noesis';
import { SettingsModel } from '../models';
import { DailyWeatherDetailsModel } from '../models/DailyWeatherDetailsModel';

type DailyItemProps = {
  settings: SettingsModel;
  data: DailyWeatherDetailsModel;
  onClick: () => void;
};

export const DailyItem = ({ settings, data, onClick }: DailyItemProps) => {
  const weatherCode =
    settings.theme === 'dark'
      ? `${data.weather.icon}_n`
      : `${data.weather.icon}`;
  const unitSymbol = settings.unit === 'metric' ? 'C' : 'F';
  return (
    <Button onClick={onClick}>
      <StackPanel>
        <Image Source={require(`../resources/icon_${weatherCode}.png`)} />
        <TextBlock>
          {new Date(data.dt * 1000).toLocaleString('en-GB', {
            weekday: 'long',
          })}
        </TextBlock>
        <TextBlock>{data.weather.description}</TextBlock>
        <TextBlock>
          {Math.round(data.minTemp)}°{unitSymbol} / {Math.round(data.maxTemp)}°
          {unitSymbol}
        </TextBlock>
      </StackPanel>
    </Button>
  );
};

export default DailyItem;
